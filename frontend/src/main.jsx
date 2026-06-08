import React, { createContext, useContext, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Link, NavLink, Route, Routes, useParams } from "react-router-dom";
import {
  Activity,
  BarChart3,
  Bot,
  Code2,
  Cpu,
  FileText,
  Globe,
  Globe2,
  Headphones,
  Leaf,
  Lightbulb,
  Lock,
  Mail,
  Menu,
  Network,
  Newspaper,
  Package,
  Puzzle,
  RefreshCw,
  Rocket,
  Shield,
  ShieldCheck,
  Ticket,
  UserPlus,
  Users
} from "lucide-react";
import "./styles/app.css";
import { copy, services, serviceSlugs } from "./data/content.js";
import { api } from "./services/api.js";

const LanguageContext = createContext(null);

function useLang() {
  return useContext(LanguageContext);
}

function AppShell() {
  const [language, setLanguage] = useState(localStorage.getItem("language") || "it");
  const [menuOpen, setMenuOpen] = useState(false);
  const t = copy[language];
  const value = useMemo(() => ({ language, setLanguage, t }), [language, t]);

  function switchLanguage(next) {
    setLanguage(next);
    localStorage.setItem("language", next);
  }

  return (
    <LanguageContext.Provider value={value}>
      <header className="site-header">
        <Link to="/" className="brand" aria-label="SPBnext home">
          <img className="brand-logo" src="/assets/spbnext-logo.jpg" alt="SPB Next" />
        </Link>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <Menu size={22} />
        </button>
        <nav className={menuOpen ? "main-nav open" : "main-nav"}>
          <NavLink to="/">{t.nav.home}</NavLink>
          <NavLink to="/about">{t.nav.about}</NavLink>
          <NavLink to="/services">{t.nav.services}</NavLink>
          <NavLink to="/support">{t.nav.support}</NavLink>
          <NavLink to="/news">{t.nav.news}</NavLink>
          <NavLink to="/contact">{t.nav.contact}</NavLink>
          <NavLink to="/client">{t.nav.client}</NavLink>
          <NavLink to="/admin">{t.nav.admin}</NavLink>
        </nav>
        <div className="language-switcher" aria-label={t.language}>
          {["it", "es", "en"].map((item) => (
            <button key={item} className={language === item ? "active" : ""} onClick={() => switchLanguage(item)}>
              <span>{languageFlag[item]}</span>
              {languageNames[item]}
            </button>
          ))}
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/support" element={<Support />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/client" element={<ClientArea />} />
          <Route path="/admin" element={<AdminArea />} />
        </Routes>
      </main>
      <Footer />
    </LanguageContext.Provider>
  );
}

function Home() {
  const { t, language } = useLang();
  const serviceIcons = {
    "reti-informatiche": Network,
    elettronica: Cpu,
    sicurezza: Shield,
    automazione: Bot,
    wms: Package,
    "energia-green": Leaf,
    "portali-web": Globe,
    "programmi-app": Code2,
    servizi: Headphones
  };

  return (
    <section className="home-stage">
      <div className="home-hero">
        <div className="home-copy">
          <div className="actions">
            <Link className="btn primary" to="/contact"><Mail size={18} />{t.cta.info}</Link>
            <Link className="btn orange" to="/support"><Headphones size={18} />{t.cta.ticket}</Link>
            <Link className="btn outline" to="/register"><UserPlus size={18} />{t.cta.register}</Link>
          </div>
        </div>
        <div className="innovation-claim">
          <span>{t.hero.partner}</span>
          <strong>{t.hero.innovation}</strong>
        </div>
        <div className="hero-visual">
          <img className="visual-logo" src="/assets/spbnext-logo.jpg" alt="SPB Next" />
          <img src="/assets/home-tech-scene.png" alt="" />
        </div>
      </div>

      <div className="home-panel">
        <div className="home-service-grid">
          {serviceSlugs.map((slug, index) => {
            const Icon = serviceIcons[slug] || Activity;
            return (
              <Link className={`home-service-card tone-${index}`} to={`/services/${slug}`} key={slug}>
                <Icon size={42} />
                <h3>{services[language][slug].title}</h3>
                <p>{services[language][slug].summary}</p>
                <span>{t.home.discover}</span>
              </Link>
            );
          })}
        </div>
        <div className="quick-grid">
          {quickLinks(t).map(({ to, icon: Icon, title, text }) => (
            <Link className="quick-card" to={to} key={title}>
              <Icon size={34} />
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="brand-strip">
        {t.home.badges.map((badge, index) => {
          const badgeIcons = [Users, Puzzle, RefreshCw, Rocket, Globe2];
          const Icon = badgeIcons[index] || ShieldCheck;
          return (
            <div key={badge}>
              <Icon />
              <span>{badge}</span>
            </div>
          );
        })}
        <img src="/assets/spbnext-logo.jpg" alt="SPB Next" />
      </div>
    </section>
  );

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">{t.hero.eyebrow}</p>
          <h1>{t.hero.title}</h1>
          <p>{t.hero.subtitle}</p>
          <div className="actions">
            <Link className="btn primary" to="/contact">{t.cta.info}</Link>
            <Link className="btn" to="/support">{t.cta.ticket}</Link>
            <Link className="btn subtle" to="/login">{t.cta.login}</Link>
            <Link className="btn subtle" to="/register">{t.cta.register}</Link>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">{t.home.servicesEyebrow}</p>
          <h2>{t.home.servicesTitle}</h2>
        </div>
        <div className="service-grid">
          {serviceSlugs.map((slug) => (
            <Link className="service-card" to={`/services/${slug}`} key={slug}>
              <ShieldCheck size={24} />
              <h3>{services[language][slug].title}</h3>
              <p>{services[language][slug].summary}</p>
            </Link>
          ))}
        </div>
      </section>
      <section className="section two-column">
        <div>
          <p className="eyebrow">{t.nav.news}</p>
          <h2>{t.home.newsTitle}</h2>
        </div>
        <div className="news-list">
          {featured.map((item) => (
            <article className="news-card" key={item.slug}>
              <span>{item.category}</span>
              <h3>{item.title}</h3>
              <p>{item.excerpt}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="contact-band">
        <Mail />
        <div>
          <h2>{t.home.quickContacts}</h2>
          <p>info@example.com · +39 000 000000 · Remote support available</p>
        </div>
        <Link className="btn primary" to="/contact">{t.nav.contact}</Link>
      </section>
    </>
  );
}

function About() {
  const { t } = useLang();
  return (
    <section className="section two-column">
      <div>
        <p className="eyebrow">{t.nav.about}</p>
        <h1>{t.about.title}</h1>
        <p>{t.about.text}</p>
        <div className="status-list">
          {t.home.badges.map((item) => <span key={item}>{item}</span>)}
        </div>
      </div>
      <FormCard title={t.contact.formTitle}>
        <p>{t.contact.subtitle}</p>
        <Link className="btn primary" to="/contact">{t.cta.info}</Link>
      </FormCard>
    </section>
  );
}

function Services() {
  const { t, language } = useLang();
  return (
    <section className="section">
      <div className="section-heading">
        <p className="eyebrow">{t.nav.services}</p>
        <h1>{t.services.title}</h1>
        <p>{t.services.subtitle}</p>
      </div>
      <div className="service-grid">
        {serviceSlugs.map((slug) => (
          <Link className="service-card" to={`/services/${slug}`} key={slug}>
            <Activity size={24} />
            <h3>{services[language][slug].title}</h3>
            <p>{services[language][slug].summary}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ServiceDetail() {
  const { slug } = useParams();
  const { language } = useLang();
  const service = services[language][slug] || services[language][serviceSlugs[0]];
  return (
    <section className="section detail">
      <p className="eyebrow">SPBnext services</p>
      <h1>{service.title}</h1>
      <p>{service.body}</p>
      <div className="feature-list">
        {service.features.map((feature) => <span key={feature}>{feature}</span>)}
      </div>
      <div className="actions">
        <Link className="btn primary" to="/contact">Richiedi informazioni</Link>
        <Link className="btn" to="/support">Apri ticket</Link>
      </div>
    </section>
  );
}

function Support() {
  const { t } = useLang();
  return (
    <section className="section two-column">
      <div>
        <p className="eyebrow">{t.nav.support}</p>
        <h1>{t.support.title}</h1>
        <p>{t.support.subtitle}</p>
        <div className="status-list">
          {t.support.publicPoints.map((item) => <span key={item}>{item}</span>)}
        </div>
      </div>
      <TicketForm />
    </section>
  );
}

function News() {
  const { t } = useLang();
  return (
    <section className="section">
      <div className="section-heading">
        <p className="eyebrow">{t.nav.news}</p>
        <h1>{t.news.title}</h1>
      </div>
      <div className="news-list wide">
        {t.newsItems.map((item) => (
          <article className="news-card" key={item.slug}>
            <span>{item.category} · {item.date}</span>
            <h2>{item.title}</h2>
            <p>{item.excerpt}</p>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const { t, language } = useLang();
  return (
    <section className="section two-column">
      <div>
        <p className="eyebrow">{t.nav.contact}</p>
        <h1>{t.contact.title}</h1>
        <p>{t.contact.subtitle}</p>
      </div>
      <FormCard title={t.contact.formTitle}>
        <ApiForm
          endpoint="/public/contact-requests"
          submitLabel={t.form.send}
          initial={{ language, privacyAccepted: false }}
          fields={contactFields(t)}
        />
      </FormCard>
    </section>
  );
}

function Login() {
  const { t } = useLang();
  return (
    <section className="section auth-layout">
      <FormCard title={t.auth.login}>
        <ApiForm endpoint="/auth/login" submitLabel={t.auth.login} initial={{ email: "", password: "" }} fields={loginFields(t)} />
        <Link to="/register">{t.auth.registerHint}</Link>
      </FormCard>
      <FormCard title={t.auth.recovery}>
        <ApiForm endpoint="/auth/password-recovery" submitLabel={t.auth.recovery} initial={{ email: "" }} fields={[{ name: "email", label: "Email", type: "email" }]} />
      </FormCard>
    </section>
  );
}

function Register() {
  const { t, language } = useLang();
  return (
    <section className="section">
      <FormCard title={t.auth.register}>
        <ApiForm endpoint="/auth/register" submitLabel={t.auth.register} initial={{ preferredLanguage: language }} fields={registerFields(t)} />
      </FormCard>
    </section>
  );
}

function ClientArea() {
  const { t } = useLang();
  return (
    <section className="section dashboard">
      <div className="section-heading">
        <p className="eyebrow">{t.nav.client}</p>
        <h1>{t.client.title}</h1>
      </div>
      <DashboardCards cards={[
        [Ticket, t.client.openTickets, "8"],
        [FileText, t.client.documents, "12"],
        [Mail, t.client.communications, "3"],
        [Activity, t.client.interventions, "5"]
      ]} />
      <TicketForm />
    </section>
  );
}

function AdminArea() {
  const { t } = useLang();
  return (
    <section className="section dashboard">
      <div className="section-heading">
        <p className="eyebrow">{t.nav.admin}</p>
        <h1>{t.admin.title}</h1>
      </div>
      <DashboardCards cards={[
        [BarChart3, t.admin.stats, "24"],
        [UserPlus, t.admin.pendingCustomers, "4"],
        [Ticket, t.admin.ticketManagement, "31"],
        [Newspaper, t.admin.newsManagement, "9"]
      ]} />
      <div className="admin-grid">
        {t.admin.modules.map((module) => (
          <article className="admin-module" key={module}>
            <h3>{module}</h3>
            <p>{t.admin.moduleText}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function TicketForm() {
  const { t } = useLang();
  return (
    <FormCard title={t.ticket.title}>
      <ApiForm endpoint="/tickets" submitLabel={t.ticket.submit} initial={{ priority: "media", category: "altro" }} fields={ticketFields(t)} />
    </FormCard>
  );
}

function FormCard({ title, children }) {
  return (
    <div className="form-card">
      <h2>{title}</h2>
      {children}
    </div>
  );
}

function ApiForm({ endpoint, fields, initial, submitLabel }) {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState("");

  async function submit(event) {
    event.preventDefault();
    setStatus("...");
    try {
      await api.post(endpoint, form);
      setStatus("OK");
    } catch (error) {
      setStatus(error.message);
    }
  }

  return (
    <form className="stack-form" onSubmit={submit}>
      {fields.map((field) => (
        <label key={field.name}>
          <span>{field.label}</span>
          {field.type === "textarea" ? (
            <textarea required={field.required !== false} value={form[field.name] || ""} onChange={(e) => setForm({ ...form, [field.name]: e.target.value })} />
          ) : field.type === "select" ? (
            <select required={field.required !== false} value={form[field.name] || ""} onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}>
              <option value="">-</option>
              {field.options.map((option) => <option value={option.value} key={option.value}>{option.label}</option>)}
            </select>
          ) : field.type === "checkbox" ? (
            <input type="checkbox" checked={Boolean(form[field.name])} onChange={(e) => setForm({ ...form, [field.name]: e.target.checked })} />
          ) : (
            <input type={field.type || "text"} required={field.required !== false} value={form[field.name] || ""} onChange={(e) => setForm({ ...form, [field.name]: e.target.value })} />
          )}
        </label>
      ))}
      <button className="btn primary" type="submit">{submitLabel}</button>
      {status && <p className="form-status">{status}</p>}
    </form>
  );
}

function DashboardCards({ cards }) {
  return (
    <div className="metric-grid">
      {cards.map(([Icon, label, value]) => (
        <article className="metric-card" key={label}>
          <Icon />
          <strong>{value}</strong>
          <span>{label}</span>
        </article>
      ))}
    </div>
  );
}

function Footer() {
  const { t } = useLang();
  return (
    <footer className="site-footer">
      <div>
        <strong>SPB NEXT di Fabiola Vergas Barrera</strong>
        <p>{t.footer.company}</p>
        <p>P.IVA IT-05628310269 · <a href="mailto:info@spbnext.com">info@spbnext.com</a></p>
      </div>
      <nav>
        <Link to="/contact">{t.footer.privacy}</Link>
        <Link to="/contact">{t.footer.terms}</Link>
        <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
      </nav>
    </footer>
  );
}

function contactFields(t) {
  return [
    { name: "name", label: t.form.name },
    { name: "company", label: t.form.company, required: false },
    { name: "email", label: "Email", type: "email" },
    { name: "phone", label: t.form.phone, required: false },
    { name: "country", label: t.form.country },
    { name: "language", label: t.language, type: "select", options: languageOptions },
    { name: "interestArea", label: t.form.interest, type: "select", options: serviceOptions(t) },
    { name: "message", label: t.form.message, type: "textarea" },
    { name: "privacyAccepted", label: t.form.privacy, type: "checkbox" }
  ];
}

function loginFields() {
  return [
    { name: "email", label: "Email", type: "email" },
    { name: "password", label: "Password", type: "password" }
  ];
}

function registerFields(t) {
  return [
    { name: "businessName", label: t.form.businessName },
    { name: "taxId", label: t.form.taxId },
    { name: "contactName", label: t.form.contactName },
    { name: "email", label: "Email", type: "email" },
    { name: "phone", label: t.form.phone },
    { name: "country", label: t.form.country },
    { name: "preferredLanguage", label: t.language, type: "select", options: languageOptions },
    { name: "password", label: "Password", type: "password" },
    { name: "confirmPassword", label: t.form.confirmPassword, type: "password" },
    { name: "privacyAccepted", label: t.form.privacy, type: "checkbox" },
    { name: "termsAccepted", label: t.form.terms, type: "checkbox" }
  ];
}

function ticketFields(t) {
  return [
    { name: "subject", label: t.ticket.subject },
    { name: "category", label: t.ticket.category, type: "select", options: ticketCategoryOptions(t) },
    { name: "priority", label: t.ticket.priority, type: "select", options: priorityOptions(t) },
    { name: "description", label: t.ticket.description, type: "textarea" }
  ];
}

function serviceOptions(t) {
  return serviceSlugs.map((slug) => ({ value: slug, label: t.serviceLabels[slug] }));
}

function ticketCategoryOptions(t) {
  return [...serviceOptions(t), { value: "altro", label: t.ticket.other }];
}

const languageOptions = [
  { value: "it", label: "Italiano" },
  { value: "es", label: "Español" },
  { value: "en", label: "English" }
];

const languageNames = {
  it: "Italiano",
  es: "Español",
  en: "English"
};

const languageFlag = {
  it: "🇮🇹",
  es: "🇪🇸",
  en: "🇬🇧"
};

function quickLinks(t) {
  return [
    { to: "/client", icon: Lock, title: t.home.quick.clientTitle, text: t.home.quick.clientText },
    { to: "/support", icon: Headphones, title: t.home.quick.supportTitle, text: t.home.quick.supportText },
    { to: "/news", icon: Newspaper, title: t.home.quick.newsTitle, text: t.home.quick.newsText },
    { to: "/contact", icon: Mail, title: t.home.quick.infoTitle, text: t.home.quick.infoText },
    { to: "/services/sicurezza", icon: ShieldCheck, title: t.home.quick.securityTitle, text: t.home.quick.securityText },
    { to: "/services/automazione", icon: Lightbulb, title: t.home.quick.innovationTitle, text: t.home.quick.innovationText }
  ];
}

function priorityOptions(t) {
  return [
    { value: "bassa", label: t.ticket.low },
    { value: "media", label: t.ticket.medium },
    { value: "alta", label: t.ticket.high },
    { value: "urgente", label: t.ticket.urgent }
  ];
}

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppShell />
  </BrowserRouter>
);
