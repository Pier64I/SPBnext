# Pubblicazione su Render

Questa guida usa lo stesso flusso della schermata `New Web Service` mostrata dal pannello Render.

## Opzione consigliata: Blueprint

Il repository contiene `render.yaml`, quindi Render puo creare automaticamente:

- `spbnext-frontend`: sito React statico
- `spbnext-api`: backend Node/Express
- `spbnext-db`: database PostgreSQL

Nel pannello Render:

1. Clicca `+ New`
2. Scegli `Blueprint`
3. Seleziona `Pier64I / SPBnext`
4. Conferma la creazione dei servizi

Poi apri le variabili ambiente.

## Variabili frontend

Nel servizio `spbnext-frontend` impostare:

```env
VITE_API_URL=https://URL-DEL-BACKEND/api
```

Esempio:

```env
VITE_API_URL=https://spbnext-api.onrender.com/api
```

## Variabili backend

Nel servizio `spbnext-api` impostare:

```env
APP_URL=https://URL-DEL-FRONTEND
SMTP_HOST=smtp.tuodominio.it
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=utente-smtp
SMTP_PASS=password-smtp
SMTP_FROM="SPBnext Portal <no-reply@tuodominio.it>"
```

Esempio:

```env
APP_URL=https://spbnext-frontend.onrender.com
```

`DATABASE_URL`, `JWT_SECRET` e `COOKIE_SECRET` vengono gestiti dal Blueprint.

## Dominio Aruba

Per usare un dominio o sottodominio Aruba:

1. Nel servizio `spbnext-frontend`, apri `Settings`
2. Vai in `Custom Domains`
3. Aggiungi il dominio, ad esempio `spbnext.tuodominio.it`
4. Render mostra il record DNS da creare
5. Nel pannello Aruba DNS crea quel record

Di solito per un sottodominio serve un record:

```text
Tipo: CNAME
Nome: spbnext
Valore: valore indicato da Render
```

Dopo la propagazione DNS, aggiornare nel backend:

```env
APP_URL=https://spbnext.tuodominio.it
```

## Opzione manuale dalla schermata New Web Service

Se vuoi usare la schermata `New Web Service`:

1. Seleziona `Pier64I / SPBnext`
2. Per il backend usa:
   - Root Directory: `backend`
   - Build Command: `npm ci`
   - Start Command: `npm start`
3. Crea anche un database PostgreSQL
4. Crea poi uno Static Site per il frontend:
   - Root Directory: `frontend`
   - Build Command: `npm ci && npm run build`
   - Publish Directory: `dist`

Il Blueprint e piu semplice perche crea i tre pezzi insieme.
