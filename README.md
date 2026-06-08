# SPBnext Portal

Portale aziendale multilingua per consulenza tecnologica con:

- sito pubblico in Italiano, Spagnolo e Inglese
- pagine servizi, news e modulo contatti
- registrazione cliente con approvazione amministratore
- autenticazione JWT con cookie httpOnly opzionale
- area clienti con ticket, documenti e comunicazioni
- area amministratore per clienti, utenti, ticket, news, contenuti, documenti, richieste e log
- backend Express con query parametrizzate PostgreSQL
- frontend React/Vite responsive

## Struttura

```text
backend/      API Node.js/Express
frontend/     Interfaccia React/Vite
database/     Schema e seed SQL PostgreSQL
docs/         Documentazione installazione e deploy
```

## Avvio rapido

```bash
npm install
npm run install:all
cp backend/.env.example backend/.env
```

Creare il database PostgreSQL:

```bash
createdb spbnext_portal
psql spbnext_portal < database/schema.sql
psql spbnext_portal < database/seed.sql
```

Aggiornare `backend/.env`, generare un hash bcrypt reale e creare l'admin iniziale:

```bash
node -e "const bcrypt=require('bcryptjs'); bcrypt.hash('Admin123!',12).then(console.log)"
```

Poi eseguire l'`insert` commentato in `database/seed.sql` sostituendo `HASH_BCRYPT_GENERATO`.

Avviare frontend e backend:

```bash
npm run dev
```

Frontend: `http://localhost:5173`  
Backend: `http://localhost:4000/api`

## Script utili

```bash
npm run dev                 # frontend + backend
npm run start --prefix backend
npm run build --prefix frontend
```

## Pubblicazione

La configurazione pronta per VPS e Docker Compose e in [docs/PUBBLICAZIONE.md](docs/PUBBLICAZIONE.md).

File principali:

- `docker-compose.prod.yml`
- `.env.production.example`
- `backend/Dockerfile`
- `frontend/Dockerfile`
- `deploy/nginx/frontend.conf`

## Sicurezza

Il progetto include password bcrypt, JWT, Helmet, CORS configurato, rate limit, CSRF sulle rotte riservate, validazione form, sanificazione anti-XSS e query SQL parametrizzate.

Prima della pubblicazione:

- impostare `JWT_SECRET` e `COOKIE_SECRET` lunghi e casuali
- usare HTTPS
- limitare `APP_URL` al dominio reale
- configurare backup database e retention log
- spostare gli upload su storage persistente
- sostituire l'utente admin seed con credenziali sicure

## SMTP

Configurare nel file `backend/.env`:

```env
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=utente
SMTP_PASS=password
SMTP_FROM="SPBnext Portal <no-reply@example.com>"
```

Se SMTP non e configurato, il backend stampa i messaggi email in console senza bloccare il flusso.
