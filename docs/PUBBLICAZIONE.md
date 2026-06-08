# Pubblicazione su VPS

Questa configurazione pubblica il portale con Docker Compose:

- `web`: frontend React buildato e servito da Nginx
- `api`: backend Node.js/Express
- `postgres`: database PostgreSQL persistente

## 1. Preparare il server

Sul VPS installare:

- Docker
- Docker Compose plugin
- un reverse proxy HTTPS esterno, se gia usato per il portale prenotazioni

Aprire le porte:

- `80` per HTTP
- `443` per HTTPS, se gestito sullo stesso server

## 2. Copiare il progetto

Caricare la cartella progetto sul VPS, ad esempio in:

```bash
/opt/spbnext-portal
```

## 3. Configurare ambiente produzione

```bash
cp .env.production.example .env.production
```

Modificare almeno:

```env
POSTGRES_PASSWORD=password-database-sicura
APP_URL=https://tuo-dominio.it
JWT_SECRET=segreto-lungo-casuale
COOKIE_SECRET=altro-segreto-lungo-casuale
SMTP_HOST=smtp.tuodominio.it
SMTP_USER=utente-smtp
SMTP_PASS=password-smtp
SMTP_FROM="SPBnext Portal <no-reply@tuo-dominio.it>"
```

## 4. Avviare

```bash
docker compose -f docker-compose.prod.yml --env-file .env.production up -d --build
```

Verifica:

```bash
docker compose -f docker-compose.prod.yml ps
docker compose -f docker-compose.prod.yml logs -f api
```

## 5. Creare utente admin

Generare un hash bcrypt:

```bash
docker compose -f docker-compose.prod.yml exec api node -e "const bcrypt=require('bcryptjs'); bcrypt.hash('PasswordSicura123!',12).then(console.log)"
```

Entrare in PostgreSQL:

```bash
docker compose -f docker-compose.prod.yml exec postgres psql -U spbnext -d spbnext_portal
```

Eseguire:

```sql
insert into users (email, password_hash, role_id, status, preferred_language)
select 'admin@tuodominio.it', 'HASH_BCRYPT_GENERATO', r.id, 'active', 'it'
from roles r
where r.name = 'admin'
on conflict (email) do nothing;
```

## 6. Reverse proxy HTTPS

Se il portale prenotazioni usa gia Nginx/Traefik/Caddy sul VPS, puntare il nuovo dominio verso il container `web`.

Esempio Nginx sul server host:

```nginx
server {
  listen 80;
  server_name portal.tuodominio.it;

  location / {
    proxy_pass http://127.0.0.1:80;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

Con piu portali sullo stesso server, cambiare `HTTP_PORT` in `.env.production`, ad esempio:

```env
HTTP_PORT=8082
```

e nel reverse proxy usare:

```nginx
proxy_pass http://127.0.0.1:8082;
```

## 7. Aggiornamenti

```bash
docker compose -f docker-compose.prod.yml --env-file .env.production up -d --build
```

## 8. Backup

Eseguire backup database:

```bash
docker compose -f docker-compose.prod.yml exec postgres pg_dump -U spbnext spbnext_portal > spbnext_portal_backup.sql
```

Conservare anche il volume `uploads_data`, che contiene gli allegati ticket.
