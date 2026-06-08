create extension if not exists pgcrypto;

create table roles (
  id uuid primary key default gen_random_uuid(),
  name varchar(40) not null unique,
  description text
);

create table users (
  id uuid primary key default gen_random_uuid(),
  email varchar(255) not null unique,
  password_hash text not null,
  role_id uuid not null references roles(id),
  status varchar(20) not null default 'pending' check (status in ('pending','active','disabled')),
  preferred_language varchar(2) not null default 'it' check (preferred_language in ('it','es','en')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table customers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references users(id) on delete cascade,
  business_name varchar(255) not null,
  tax_id varchar(80) not null,
  contact_name varchar(255) not null,
  phone varchar(80) not null,
  country varchar(120) not null,
  preferred_language varchar(2) not null default 'it',
  privacy_accepted boolean not null default false,
  terms_accepted boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table tickets (
  id uuid primary key default gen_random_uuid(),
  ticket_number bigint generated always as identity unique,
  customer_id uuid not null references customers(id) on delete cascade,
  subject varchar(255) not null,
  category varchar(40) not null check (category in ('reti-informatiche','elettronica','sicurezza','automazione','wms','energia-green','portali-web','programmi-app','altro')),
  description text not null,
  priority varchar(20) not null check (priority in ('bassa','media','alta','urgente')),
  status varchar(30) not null default 'aperto' check (status in ('aperto','in-lavorazione','in-attesa-cliente','risolto','chiuso')),
  assigned_operator_id uuid references users(id),
  opened_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table ticket_messages (
  id uuid primary key default gen_random_uuid(),
  ticket_id uuid not null references tickets(id) on delete cascade,
  sender_user_id uuid not null references users(id),
  message text not null,
  is_admin_reply boolean not null default false,
  created_at timestamptz not null default now()
);

create table ticket_attachments (
  id uuid primary key default gen_random_uuid(),
  ticket_id uuid not null references tickets(id) on delete cascade,
  message_id uuid references ticket_messages(id) on delete cascade,
  uploaded_by_user_id uuid not null references users(id),
  file_name varchar(255) not null,
  file_path text not null,
  mime_type varchar(120),
  file_size integer,
  created_at timestamptz not null default now()
);

create table news (
  id uuid primary key default gen_random_uuid(),
  language varchar(2) not null check (language in ('it','es','en')),
  slug varchar(160) not null,
  title varchar(255) not null,
  excerpt text not null,
  body text not null,
  category varchar(120) not null,
  status varchar(20) not null default 'draft' check (status in ('draft','published','disabled')),
  show_on_home boolean not null default false,
  author_user_id uuid references users(id),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(language, slug)
);

create table contact_requests (
  id uuid primary key default gen_random_uuid(),
  name varchar(255) not null,
  company varchar(255),
  email varchar(255) not null,
  phone varchar(80),
  country varchar(120) not null,
  language varchar(2) not null check (language in ('it','es','en')),
  interest_area varchar(120) not null,
  message text not null,
  privacy_accepted boolean not null default false,
  handled_at timestamptz,
  handled_by_user_id uuid references users(id),
  created_at timestamptz not null default now()
);

create table service_pages (
  id uuid primary key default gen_random_uuid(),
  language varchar(2) not null check (language in ('it','es','en')),
  slug varchar(120) not null,
  title varchar(255) not null,
  summary text not null,
  body text not null,
  features jsonb not null default '[]'::jsonb,
  sort_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(language, slug)
);

create table translations (
  id uuid primary key default gen_random_uuid(),
  language varchar(2) not null check (language in ('it','es','en')),
  namespace varchar(80) not null,
  key varchar(160) not null,
  value text not null,
  updated_at timestamptz not null default now(),
  unique(language, namespace, key)
);

create table documents (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references customers(id) on delete cascade,
  title varchar(255) not null,
  description text,
  file_url text not null,
  uploaded_by_user_id uuid references users(id),
  created_at timestamptz not null default now()
);

create table customer_communications (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references customers(id) on delete cascade,
  subject varchar(255) not null,
  body text not null,
  created_by_user_id uuid references users(id),
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create table login_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete set null,
  email varchar(255),
  ip_address inet,
  user_agent text,
  success boolean not null,
  created_at timestamptz not null default now()
);

create index idx_tickets_customer on tickets(customer_id);
create index idx_tickets_status on tickets(status);
create index idx_news_language_status on news(language, status);
create index idx_service_pages_language on service_pages(language);
create index idx_contact_requests_created on contact_requests(created_at desc);
create index idx_login_logs_created on login_logs(created_at desc);
