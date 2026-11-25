# Repair Café – frontend

Samostatný frontend aplikace Repair Café postavený na Reactu a Vite. Všechny obrazové podklady a styly potřebné pro vykreslení rozhraní jsou součástí tohoto projektu ve složce `src/`. Projekt při běhu ani buildu nenačítá žádné soubory z jiného projektu.

## Požadavky

- Node.js kompatibilní s verzí Vite uvedenou v `package-lock.json`
- npm

## Lokální spuštění

```bash
npm ci
npm run dev
```

Produkční build:

```bash
npm run build
```

Náhled produkčního buildu:

```bash
npm run preview
```

## Konfigurace prostředí

Vytvořte soubor `.env` podle `.env.example`:

```env
VITE_API_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
```

`VITE_API_URL` nastavte na adresu běžícího backendu. `VITE_GOOGLE_CLIENT_ID` musí odpovídat OAuth Client ID nastavenému také na backendu. Proměnné s prefixem `VITE_` jsou součástí klientské aplikace; nevkládejte do nich tajné klíče.

## Struktura

- `src/app/` – aplikační shell a routování
- `src/auth/` – autentizační kontext
- `src/pages/` – jednotlivé stránky aplikace
- `src/assets/` – lokální fotografie, logo a obrazové podklady
- `src/styles.css` – kompletní styly aplikace včetně responzivního zobrazení

## Externí služby

Aplikace komunikuje s backendovým API na adrese z `VITE_API_URL` a využívá Google Identity Services pro přihlášení přes Google. Tyto služby jsou aplikační integrace; žádné externí úložiště designu, sdílená CSS cesta ani samostatný frontendový projekt nejsou potřeba.

## Ověření

Před nasazením spusťte `npm ci` a `npm run build`. Backend musí být dostupný na nakonfigurované adrese a musí povolovat origin frontendu v CORS.
