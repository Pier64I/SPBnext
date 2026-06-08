# Installazione e configurazione

## Requisiti

- Node.js 20 o superiore
- PostgreSQL 15 o superiore
- Un account SMTP per notifiche email
- Hosting/VPS con HTTPS per produzione

## Database

1. Creare il database:

```bash
createdb spbnext_portal
```

2. Applicare schema e dati iniziali:

```bash
psql spbnext_portal < database/schema.sql
psql spbnext_portal < database/seed.sql
```

3. Aggiornare l'utente amministratore.

Il seed contiene un comando SQL commentato per creare l'admin. Generare prima un hash bcrypt:

```bash
cd backend
npm install
node -e "const bcrypt=require('bcryptjs'); bcrypt.hash('PasswordSicura123!',12).then(console.log)"
```

Poi eseguire:

```sql
update users
set password_hash = 'HASH_BCRYPT_GENERATO'
where email = 'admin@example.com';
```

## Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Variabili principali:

- `PORT`: porta API, default `4000`
- `APP_URL`: URL frontend autorizzato da CORS
- `DATABASE_URL`: connessione PostgreSQL
- `JWT_SECRET`: segreto firma JWT
- `COOKIE_SECRET`: segreto cookie
- `SMTP_*`: configurazione email

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Per puntare a una API diversa creare `frontend/.env`:

```env
VITE_API_URL=https://api.example.com/api
```

## Deploy VPS

1. Eseguire build frontend:

```bash
cd frontend
npm run build
```

2. Pubblicare `frontend/dist` con Nginx o Apache.

3. Eseguire backend con un process manager:

```bash
cd backend
npm ci --omit=dev
NODE_ENV=production npm start
```

4. Configurare reverse proxy HTTPS:

- `/api` verso `localhost:4000`
- frontend statico verso `frontend/dist`
- upload persistenti verso storage locale protetto o object storage

## Ruoli

- `visitor`: naviga le aree pubbliche senza account
- `customer`: accede ad area clienti dopo approvazione admin
- `operator`: gestisce ticket e richieste operative
- `admin`: gestisce utenti, clienti, contenuti, documenti e log

## Tabelle principali

Le tabelle richieste sono in `database/schema.sql`:

- `users`
- `customers`
- `roles`
- `tickets`
- `ticket_messages`
- `ticket_attachments`
- `news`
- `contact_requests`
- `service_pages`
- `translations`
- `documents`
- `login_logs`

Il progetto aggiunge anche `customer_communications` per le comunicazioni riservate.
