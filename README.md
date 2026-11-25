# Repair Café – frontend

Samostatná React aplikace pro správu požadavků na opravy a dobrovolnické pomoci. Projekt obsahuje vlastní komponenty, styly, lokální obrazové podklady a vizuální regresní testy. Nevyžaduje žádný externí projekt ani složku s předlohou.

## Technologie
- React + Vite
- React Router
- Google OAuth (`@react-oauth/google`)
- Playwright pro vizuální regresní testy

## Spuštění
```bash
npm ci
npm run dev
```

## Produkční build
```bash
npm run build
npm run preview
```

## Konfigurace
Zkopírujte `.env.example` do `.env` a doplňte hodnoty podle prostředí. Zejména `VITE_API_URL` a `VITE_GOOGLE_CLIENT_ID`.

## Vizuální regresní testy
Postup instalace a spuštění je popsán v `tests/visual-regression/README.md`. První referenční snímky je nutné před používáním testů vizuálně zkontrolovat a schválit.

## Poznámky k datům a API
Některé obrazovky stále používají lokální ukázková data nebo očekávají API endpointy, které nemusejí být dostupné v aktuálním backendu. Tyto části jsou v příslušných obrazovkách označeny; samotný frontend jejich dostupnost negarantuje.
