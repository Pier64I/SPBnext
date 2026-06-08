# API principali

Base URL locale: `http://localhost:4000/api`

## Pubbliche

- `GET /health`
- `GET /public/service-pages/:lang`
- `GET /public/news/:lang`
- `GET /public/news/:lang/:slug`
- `POST /public/contact-requests`

## Autenticazione

- `GET /csrf-token`
- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/logout`
- `POST /auth/password-recovery`
- `GET /auth/me`

## Cliente

- `GET /customer/profile`
- `GET /customer/documents`
- `GET /customer/communications`
- `GET /tickets`
- `POST /tickets`
- `GET /tickets/:id/messages`
- `POST /tickets/:id/messages`

## Admin e operatori

- `GET /admin/dashboard`
- `GET /admin/customers`
- `PATCH /admin/customers/:id/approval`
- `GET /admin/users`
- `PATCH /admin/users/:id`
- `GET /admin/contact-requests`
- `PATCH /admin/contact-requests/:id/handled`
- `GET /admin/news`
- `POST /admin/news`
- `PUT /admin/news/:id`
- `GET /admin/service-pages`
- `PUT /admin/service-pages/:id`
- `GET /admin/documents`
- `POST /admin/documents`
- `GET /admin/login-logs`
- `PATCH /tickets/:id`

Le richieste `POST`, `PUT` e `PATCH` verso rotte protette richiedono header `CSRF-Token`, ottenuto da `GET /csrf-token`.
