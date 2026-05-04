"""
EXTRATOR DE LEADS V3 - COM TELEFONE E BAIRRO
Clica em cada resultado do Google Maps e extrai:
- Nome
- Telefone
- Bairro
- Cidade

Como usar:
  pip install playwright
  python -m playwright install chromium
  python extrator_maps_v2.py
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
    "barbearia Novo Hamburgo RS",
    "barbearia Sao Leopoldo RS",
    "barbearia Cachoeirinha RS",
    "barbearia Viamao RS",
    "barbearia Alvorada RS",
]

OUTPUT_FILE = "leads_com_telefone.json"


def extract_city(search_term):
    city = search_term.replace("barbearia ", "").replace("salao de beleza ", "").replace(" RS", "")
    return city.strip()


def clean_phone(raw):
    """Extrai somente os digitos de telefone."""
    nums = re.sub(r'\D', '', raw)
    if nums.startswith('55') and len(nums) > 11:
        nums = nums[2:]
    if len(nums) >= 10:
        return nums
    return ""


def extract_details(page, city):
    """Extrai telefone e bairro da pagina de detalhes de um estabelecimento."""
    phone = ""
    bairro = ""
    endereco_completo = ""

    try:
        # TELEFONE: busca pelo icone de telefone na pagina de detalhes
        # O Google Maps usa data-item-id="phone:tel:..." para o botao de telefone
        phone_buttons = page.query_selector_all('button[data-item-id^="phone"]')
        for btn in phone_buttons:
            label = btn.get_attribute('aria-label') or ''
            if label:
                phone = clean_phone(label)
                if phone:
                    break
            # Tenta pegar do texto interno
            inner = btn.inner_text()
            if inner:
                phone = clean_phone(inner)
                if phone:
                    break
    except:
        pass

    try:
        # ENDERECO + BAIRRO: busca pelo botao de endereco
        addr_buttons = page.query_selector_all('button[data-item-id="address"]')
        for btn in addr_buttons:
            label = btn.get_attribute('aria-label') or ''
            if label:
                endereco_completo = label.replace("Endereco: ", "").replace("Endere\u00e7o: ", "")
                break
            inner = btn.inner_text()
            if inner and len(inner) > 5:
                endereco_completo = inner
                break
    except:
        pass

    if endereco_completo:
        # Padrao tipico: "R. Tal, 123 - Bairro, Cidade - RS, CEP"
        # ou "R. Tal, 123 - Bairro, Cidade - Estado"
        parts = endereco_completo.split(' - ')
        if len(parts) >= 3:
            # Ex: ["R. Tal, 123", "Bairro", "Cidade - RS, 90000-000"]
            bairro = parts[1].strip()
        elif len(parts) == 2:
            # Ex: ["R. Tal, 123", "Bairro, Cidade"]
            sub = parts[1].split(',')
            if len(sub) >= 1:
                bairro = sub[0].strip()
        
        # Se nao achou por " - ", tenta por virgula
        if not bairro:
            parts = endereco_completo.split(',')
            if len(parts) >= 3:
                bairro = parts[-3].strip()

    if not bairro:
        bairro = city

    return phone, bairro, endereco_completo


def scrape_with_details(search_term, page):
    """Busca no Maps, clica em cada resultado e pega telefone + bairro."""
    results = []
    city = extract_city(search_term)
    print(f"\n[BUSCA] {search_term}")

    url = f"https://www.google.com/maps/search/{search_term.replace(' ', '+')}"
    page.goto(url, timeout=30000)
    time.sleep(4)

    # Scroll para carregar resultados
    for i in range(6):
        try:
            page.evaluate("""
                const el = document.querySelector('[role="feed"]') || document.querySelector('.m6QErb.DxyBCb');
                if (el) el.scrollTop = el.scrollHeight;
            """)
            time.sleep(1.2)
        except:
            break

    # Pega todos os links de resultado
    links = page.query_selector_all('a[href*="/maps/place/"]')
    unique_names = []
    seen_labels = set()
    
    for link in links:
        label = link.get_attribute('aria-label') or ''
        if label and label not in seen_labels and len(label) > 2:
            seen_labels.add(label)
            unique_names.append(label)

    total = len(unique_names)
    print(f"   [{total} resultados] Clicando em cada um...")

    for idx, name in enumerate(unique_names):
        try:
            # Re-busca o link (a pagina pode ter mudado)
            link = page.query_selector(f'a[aria-label="{name.replace(chr(34), "")}"]')
            if not link:
                # Tenta com seletor parcial
                all_links = page.query_selector_all('a[href*="/maps/place/"]')
                for l in all_links:
                    if l.get_attribute('aria-label') == name:
                        link = l
                        break
            
            if not link:
                print(f"   [{idx+1}/{total}] --- {name[:45]} (nao encontrou link)")
                continue

            link.click()
            time.sleep(2.5)

            # Extrai detalhes
            phone, bairro, endereco = extract_details(page, city)

            result = {
                "name": name,
                "city": city,
                "neighborhood": bairro,
                "whatsapp": phone if phone else "sem_numero",
                "endereco": endereco
            }
            results.append(result)

            tag = "TEL" if phone else "---"
            bairro_show = bairro[:15] if bairro != city else ""
            print(f"   [{idx+1}/{total}] {tag} {name[:40]} | {bairro_show}")

            # Volta pra lista
            try:
                back_btn = page.query_selector('button[aria-label="Voltar"]')
                if back_btn:
                    back_btn.click()
                    time.sleep(1.5)
                else:
                    page.go_back()
                    time.sleep(2)
            except:
                page.go_back()
                time.sleep(2)

        except Exception as e:
            print(f"   [ERRO] {name[:30]}: {str(e)[:50]}")
            try:
                page.go_back()
                time.sleep(1)
            except:
                pass
            continue

    com_tel = sum(1 for r in results if r['whatsapp'] != 'sem_numero')
    print(f"   [OK] {len(results)} leads, {com_tel} com telefone")
    return results


def main():
    all_leads = []
    seen = set()

    print("=" * 60)
    print("EXTRATOR V3 - COM TELEFONE E BAIRRO")
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
                results = scrape_with_details(search, page)
                for r in results:
                    key = f"{r['name']}_{r['city']}"
                    if key not in seen:
                        seen.add(key)
                        all_leads.append(r)
                        
                # Salva parcial a cada busca
                with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
                    json.dump(all_leads, f, ensure_ascii=False, indent=2)
                print(f"   [SALVO] {len(all_leads)} leads acumulados ate agora")
                    
            except Exception as e:
                print(f"   [ERRO GERAL] {e}")
                continue

        browser.close()

    com_tel = sum(1 for l in all_leads if l['whatsapp'] != 'sem_numero')
    
    print("\n" + "=" * 60)
    print(f"CONCLUIDO! {len(all_leads)} leads ({com_tel} com telefone)")
    print(f"Arquivo: {OUTPUT_FILE}")
    print("=" * 60)


if __name__ == "__main__":
    main()
