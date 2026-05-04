import json
import time

def simulate_extraction(city):
    """
    Simula a extração de dados do Google Maps para uma cidade específica.
    Em um cenário real, aqui usaríamos bibliotecas como Playwright ou APIs como Google Places.
    """
    print(f"Buscando barbearias e salões em {city}...")
    time.sleep(1)
    
    # Exemplo de como os dados seriam estruturados após o scraping
    results = [
        {"name": f"Barbearia Central {city}", "neighborhood": "Centro", "whatsapp": "51900000000"},
        {"name": f"Studio de Beleza {city}", "neighborhood": "Bairro Nobre", "whatsapp": "51911111111"},
        {"name": f"The Barber {city}", "neighborhood": "Zona Sul", "whatsapp": "51922222222"},
    ]
    return results

def main():
    cities = ["Porto Alegre", "Canoas", "Gravataí", "Novo Hamburgo", "São Leopoldo"]
    all_leads = []
    
    for city in cities:
        leads = simulate_extraction(city)
        all_leads.extend(leads)
        
    # Salva os resultados em um arquivo JSON
    with open('leads_regiao.json', 'w', encoding='utf-8') as f:
        json.dump(all_leads, f, ensure_ascii=False, indent=4)
        
    print(f"\nSucesso! {len(all_leads)} leads extraídos e salvos em 'leads_regiao.json'.")
    print("Agora você pode importar esses dados para o seu painel BeautyBot.")

if __name__ == "__main__":
    main()
