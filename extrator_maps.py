"""
EXTRATOR DE LEADS - GOOGLE MAPS (via Playwright)
Barbearias e Saloes da Regiao Metropolitana de Porto Alegre

Como usar:
1. pip install playwright
2. python -m playwright install chromium
3. python extrator_maps.py
"""

import json
import time
import re
from playwright.sync_api import sync_playwright

SEARCHES = [
    "barbearia Porto Alegre RS",
    "salao de beleza Porto Alegre RS",
    "barbearia Canoas RS",
    "salao de beleza Canoas RS",
    "barbearia Gravatai RS",
    "salao de beleza Gravatai RS",
    "barbearia Novo Hamburgo RS",
    "salao de beleza Novo Hamburgo RS",
    "barbearia Sao Leopoldo RS",
    "salao de beleza Sao Leopoldo RS",
    "barbearia Cachoeirinha RS",
    "barbearia Viamao RS",
    "barbearia Alvorada RS",
]

OUTPUT_FILE = "leads_extraidos.json"


def extract_city(search_term):
    city = search_term.replace("barbearia ", "").replace("salao de beleza ", "").replace(" RS", "")
    return city.strip()


def extract_phone(text):
    match = re.search(r'\(?\d{2}\)?\s*\d{4,5}[-.\s]?\d{4}', text)
    if match:
        return re.sub(r'\D', '', match.group())
    return ""


def scrape_maps(search_term, page):
    results = []
    city = extract_city(search_term)
    print(f"\n[BUSCA] {search_term}")

    url = f"https://www.google.com/maps/search/{search_term.replace(' ', '+')}"
    page.goto(url, timeout=30000)
    time.sleep(4)

    # Aceitar cookies se aparecer
    try:
        accept_btn = page.query_selector('button[aria-label*="Aceitar"]')
        if accept_btn:
            accept_btn.click()
            time.sleep(1)
    except:
        pass

    # Scroll para carregar mais resultados
    for i in range(10):
        try:
            page.evaluate("""
                const el = document.querySelector('[role="feed"]') || document.querySelector('.m6QErb.DxyBCb');
                if (el) el.scrollTop = el.scrollHeight;
            """)
            time.sleep(1.5)
            print(f"   [scroll {i+1}/10]")
        except:
            break

    print(f"   [>] Extraindo dados...")

    # Abordagem robusta: pegar TODOS os links de resultado e extrair aria-label
    try:
        all_data = page.evaluate("""
            () => {
                const results = [];
                // Tenta pegar todos os cards de resultado
                const links = document.querySelectorAll('a[href*="/maps/place/"]');
                links.forEach(link => {
                    const label = link.getAttribute('aria-label') || '';
                    if (!label) return;
                    
                    // Pega todo o texto dentro do card pai
                    const parent = link.closest('[jsaction]') || link.parentElement;
                    const fullText = parent ? parent.innerText : '';
                    
                    results.push({
                        name: label,
                        text: fullText
                    });
                });
                return results;
            }
        """)

        for item in all_data:
            name = item['name'].strip()
            text = item['text']

            if not name or len(name) < 3:
                continue

            phone = extract_phone(text)
            
            # Tentar extrair bairro do texto
            neighborhood = city
            lines = text.split('\n')
            for line in lines:
                line = line.strip()
                if any(x in line.lower() for x in ['r.', 'rua ', 'av.', 'av ', 'estr.']):
                    parts = line.split(' - ')
                    if len(parts) >= 2:
                        neighborhood = parts[-1].strip()
                    elif ',' in line:
                        parts = line.split(',')
                        if len(parts) >= 2:
                            neighborhood = parts[-1].strip()
                    break

            result = {
                "name": name,
                "city": city,
                "neighborhood": neighborhood,
                "whatsapp": phone if phone else "sem_numero"
            }

            if not any(r["name"] == name for r in results):
                results.append(result)

    except Exception as e:
        print(f"   [ERRO] {e}")

    print(f"   [OK] {len(results)} leads encontrados")
    return results


def main():
    all_leads = []
    seen = set()

    print("=" * 60)
    print("EXTRATOR DE LEADS - REGIAO METROPOLITANA DE POA")
    print("=" * 60)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        context = browser.new_context(
            viewport={"width": 1280, "height": 900},
            locale="pt-BR"
        )
        page = context.new_page()

        for search in SEARCHES:
            try:
                results = scrape_maps(search, page)
                for r in results:
                    key = f"{r['name']}_{r['city']}"
                    if key not in seen:
                        seen.add(key)
                        all_leads.append(r)
            except Exception as e:
                print(f"   [ERRO] {e}")
                continue

        browser.close()

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(all_leads, f, ensure_ascii=False, indent=2)

    print("\n" + "=" * 60)
    print(f"PRONTO! {len(all_leads)} leads salvos em '{OUTPUT_FILE}'")
    print("=" * 60)
    print(f"\nImporte no painel:")
    print(f">> https://beauty-bot-vendas.vercel.app/admin")


if __name__ == "__main__":
    main()
