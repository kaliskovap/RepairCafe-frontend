# Repair Café – frontend

## Krok 04: Přihlášení přes Google

Tento balíček navazuje na krok 03. Přidává přihlášení přes Google Identity Services a propojení s existujícím backendovým endpointem `POST /auth/google`.

### Nastavení

1. V Google Cloud Console vytvořte OAuth 2.0 Client ID typu Web application.
2. Do Authorized JavaScript origins přidejte adresu frontendu (např. `http://localhost:5173`).
3. Na backendu nastavte `GOOGLE_CLIENT_ID` na stejné Client ID a `JWT_SECRET`.
4. Zkopírujte `.env.example` do `.env` a doplňte `VITE_GOOGLE_CLIENT_ID`. `VITE_API_URL` nastavte na adresu backendu.
5. Spusťte `npm install` a `npm run dev`.

### Co je implementováno

- Google přihlašovací tlačítko na `/login`.
- Odeslání Google ID tokenu do `POST /auth/google`.
- Očekávání odpovědi `{ token, user }` a uložení JWT + uživatele do `localStorage`.
- Základní stav přihlášení dostupný přes `useAuth()`.
- Chybové hlášky při neúspěšném přihlášení.

### Omezení a navazující práce

- Microsoft a Apple poskytovatelé nejsou součástí tohoto kroku.
- Toto přihlášení samo o sobě ještě nechrání aplikační routy; autorizaci a role-based navigaci doplníme v dalším kroku.
- Backendový endpoint `/auth/google` v dodaném zdrojovém kódu obsahuje chybu při vytváření nového uživatele: používá `result.id` a `result.role`, ačkoliv MySQL INSERT vrací `insertId` a roli je nutné nastavit explicitně. Opravu je nutné provést v backendu (viz `backend-patch/auth.js`).
- Token se pro školní prototyp ukládá do localStorage. Pro produkční aplikaci je vhodné zvážit bezpečnější správu session.

### Doporučený commit

```text
feat: add Google OAuth sign-in
```

### Formátování kódu

Projekt používá Prettier pro jednotné formátování JavaScriptu, JSX, CSS a dalších podporovaných souborů.

Po instalaci závislostí spusťte ve složce `frontend`:

```bash
npm install
npm run format
```

Kontrola, zda je kód naformátovaný, bez provedení změn:

```bash
npm run format:check
```

Nastavení formátování je v `.prettierrc.json`; složky `node_modules` a `dist` se ignorují.

## S06 – Odeslání zájmu dobrovolníka o opravu (frontend)

Detail požadavku nyní vyžaduje přihlášení před odesláním zájmu. Přihlášený uživatel může otevřít formulář, napsat nepovinnou zprávu do 500 znaků, odeslání potvrdit nebo zrušit. Během odesílání je tlačítko deaktivované. Po úspěchu se zobrazí potvrzení „Zájem o opravu odeslán“ a informace o čekání na rozhodnutí zadavatele.

Frontend volá:

- `POST /requests/:id/interests`
- hlavičky: `Content-Type: application/json`, `Authorization: Bearer <JWT>`
- tělo: `{ "message": "..." }` (prázdný řetězec je povolen)
- očekávané úspěšné HTTP 2xx; `409 Conflict` se interpretuje jako již existující zájem; `401/403` zobrazí odpovídající chybu.

**Důležité napojení na backend:** V dodaném frontendovém repozitáři není implementace tohoto API endpointu ani API kontrakt. Backend musí endpoint doplnit a ověřit, že přihlášený uživatel má roli `VOLUNTEER`, požadavek je otevřený a daný dobrovolník již zájem neposlal. Ochrana proti duplicitě musí být vynucena také na serveru; samotný frontend ji nemůže garantovat po obnovení stránky.

## Frontend – S09: přehled zájemců o požadavek

Byla doplněna stránka `/requests/:id/interests`, která načítá zájemce přes API:

- `GET /requests/:id/interests`
- hlavička `Authorization: Bearer <token>`
- odpověď může být přímo pole zájemců nebo objekt `{ "interests": [...] }`
- položka může obsahovat `id`/`_id`, `message` (případně `note`), jméno dobrovolníka v `volunteer.name`, `user.name`, `name` nebo `volunteerName` a počet oprav v `successfulRepairs`, `completedRepairs` nebo vnořeném profilu.

Backend musí u tohoto endpointu ověřit, že přihlášený uživatel je zadavatelem požadavku. Frontend zpracovává odpovědi 401, 403 a 404; samotné oprávnění nikdy nepovažuje za zajištěné pouze skrytím odkazu.

Poznámka: endpoint je integrační kontrakt pro backend. V dodaném frontendovém archivu nebyla implementace tohoto GET endpointu doložena, proto je nutné ověřit jeho existenci nebo jej doplnit na backendu.

## S11 – Přehled oprav dobrovolníka

Doplněna stránka `/my-repairs` dostupná z přímého odkazu. Zobrazuje dvě oddělené skupiny: naplánované a dokončené opravy. Karty obsahují název, kategorii, zadavatele, datum/termín a odkaz na detail. Jsou doplněny počty obou skupin, prázdné stavy, načítání a chybové stavy.

### Backendový kontrakt

Frontend očekává `GET /volunteer/repairs` s hlavičkou `Authorization: Bearer <JWT>`. Odpověď může být pole položek nebo objekt `{ "repairs": [...] }`. Každá položka má obsahovat identifikátor opravy (`id`, `_id` nebo `requestId`), název (`title` nebo `request.title`), kategorii, zadavatele a datum (`scheduledAt`, `scheduledDate`, `repairDate`, `date` nebo `appointment.start`). Stav se vyhodnocuje z `status`/`state`; dokončené hodnoty jsou `completed`, `done`, `closed`, `finished`, `uzavreno`, `dokončeno` nebo `dokonceno`, ostatní se zobrazí jako naplánované.

Backend musí ověřit roli dobrovolníka a vracet pouze opravy přiřazené přihlášenému uživateli. Frontendové skrytí stránky není bezpečnostní kontrola. Endpoint je integrační kontrakt; jeho implementace v backendu nebyla součástí tohoto FE balíčku.

Doporučený commit: `feat: add volunteer repairs overview`
