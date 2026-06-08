export const serviceSlugs = [
  "reti-informatiche",
  "elettronica",
  "sicurezza",
  "automazione",
  "wms",
  "energia-green",
  "portali-web",
  "programmi-app",
  "servizi"
];

export const services = {
  it: {
    "reti-informatiche": service("Reti informatiche", "Infrastrutture LAN/WAN, server, firewall, VPN, Wi-Fi aziendale, virtualizzazione e assistenza sistemistica.", ["Infrastrutture LAN/WAN", "Server", "Firewall", "VPN", "Wi-Fi aziendale", "Virtualizzazione", "Assistenza sistemistica"]),
    elettronica: service("Elettronica", "Consulenza elettronica, dispositivi industriali, componentistica, diagnostica e supporto tecnico.", ["Consulenza elettronica", "Dispositivi industriali", "Componentistica", "Diagnostica e supporto tecnico"]),
    sicurezza: service("Sicurezza", "Videosorveglianza, controllo accessi, antifurto, cybersecurity, backup e protezione dati.", ["Videosorveglianza", "Controllo accessi", "Sistemi antifurto", "Cybersecurity", "Backup e protezione dati"]),
    automazione: service("Automazione", "Automazione industriale, integrazione dispositivi, controllo processi e sistemi intelligenti.", ["Automazione industriale", "Integrazione dispositivi", "Controllo processi", "Sistemi intelligenti"]),
    wms: service("WMS", "Gestione magazzino, tracciabilità, terminali barcode, ERP, dashboard e report.", ["Gestione magazzino", "Tracciabilità", "Terminali barcode", "Integrazione ERP", "Ottimizzazione logistica", "Dashboard e report"]),
    "energia-green": service("Energia green", "Fotovoltaico, batterie, inverter, monitoraggio consumi e soluzioni energetiche sostenibili.", ["Fotovoltaico", "Batterie", "Inverter", "Monitoraggio consumi", "Soluzioni energetiche sostenibili"]),
    "portali-web": service("Portali web", "Siti aziendali, portali multilingua, aree clienti, e-commerce e moduli online.", ["Siti aziendali", "Portali multilingua", "Area clienti", "E-commerce", "Moduli online", "Calendari e prenotazioni"]),
    "programmi-app": service("Programmi e app", "Software Windows, applicazioni web, app mobile, database SQL Server e integrazioni gestionali.", ["Software Windows", "Applicazioni web", "App mobile", "Database SQL Server", "Integrazioni gestionali", "Reportistica"]),
    servizi: service("Servizi", "Consulenza informatica, assistenza tecnica, formazione, analisi processi e supporto remoto.", ["Consulenza informatica", "Assistenza tecnica", "Formazione", "Analisi processi", "Progettazione soluzioni", "Supporto remoto"])
  },
  en: {
    "reti-informatiche": service("IT networks", "LAN/WAN infrastructure, servers, firewalls, VPN, corporate Wi-Fi, virtualization and system support.", ["LAN/WAN infrastructure", "Servers", "Firewalls", "VPN", "Corporate Wi-Fi", "Virtualization", "System support"]),
    elettronica: service("Electronics", "Electronics consulting, industrial devices, components, diagnostics and technical support.", ["Electronics consulting", "Industrial devices", "Components", "Diagnostics", "Technical support"]),
    sicurezza: service("Security", "Video surveillance, access control, alarm systems, cybersecurity, backup and data protection.", ["Video surveillance", "Access control", "Alarm systems", "Cybersecurity", "Backup and data protection"]),
    automazione: service("Automation", "Industrial automation, device integration, process control and smart systems.", ["Industrial automation", "Device integration", "Process control", "Smart systems"]),
    wms: service("WMS", "Warehouse management, traceability, barcode terminals, ERP integration, dashboards and reports.", ["Warehouse management", "Traceability", "Barcode terminals", "ERP integration", "Logistics optimization", "Dashboards and reports"]),
    "energia-green": service("Green energy", "Photovoltaic, batteries, inverters, consumption monitoring and sustainable energy solutions.", ["Photovoltaic", "Batteries", "Inverters", "Consumption monitoring", "Sustainable energy solutions"]),
    "portali-web": service("Web portals", "Company websites, multilingual portals, customer areas, e-commerce and online modules.", ["Company websites", "Multilingual portals", "Customer area", "E-commerce", "Online forms", "Calendars and bookings"]),
    "programmi-app": service("Software and apps", "Windows software, web applications, mobile apps, SQL Server databases and business integrations.", ["Windows software", "Web applications", "Mobile apps", "SQL Server databases", "Business integrations", "Reporting"]),
    servizi: service("Services", "IT consulting, technical support, training, process analysis and remote assistance.", ["IT consulting", "Technical support", "Training", "Process analysis", "Solution design", "Remote support"])
  },
  es: {
    "reti-informatiche": service("Redes informáticas", "Infraestructuras LAN/WAN, servidores, firewalls, VPN, Wi-Fi empresarial, virtualización y soporte.", ["Infraestructuras LAN/WAN", "Servidores", "Firewalls", "VPN", "Wi-Fi empresarial", "Virtualización", "Asistencia de sistemas"]),
    elettronica: service("Electrónica", "Consultoría electrónica, dispositivos industriales, componentes, diagnóstico y soporte técnico.", ["Consultoría electrónica", "Dispositivos industriales", "Componentes", "Diagnóstico", "Soporte técnico"]),
    sicurezza: service("Seguridad", "Videovigilancia, control de accesos, alarmas, ciberseguridad, backup y protección de datos.", ["Videovigilancia", "Control de accesos", "Alarmas", "Ciberseguridad", "Backup y protección de datos"]),
    automazione: service("Automatización", "Automatización industrial, integración de dispositivos, control de procesos y sistemas inteligentes.", ["Automatización industrial", "Integración de dispositivos", "Control de procesos", "Sistemas inteligentes"]),
    wms: service("WMS", "Gestión de almacén, trazabilidad, terminales barcode, ERP, dashboards e informes.", ["Gestión de almacén", "Trazabilidad", "Terminales barcode", "Integración ERP", "Optimización logística", "Dashboards e informes"]),
    "energia-green": service("Energía verde", "Fotovoltaico, baterías, inversores, monitorización de consumos y soluciones sostenibles.", ["Fotovoltaico", "Baterías", "Inversores", "Monitorización de consumos", "Soluciones sostenibles"]),
    "portali-web": service("Portales web", "Sitios empresariales, portales multilingües, área clientes, e-commerce y formularios online.", ["Sitios empresariales", "Portales multilingües", "Área clientes", "E-commerce", "Formularios online", "Calendarios y reservas"]),
    "programmi-app": service("Programas y apps", "Software Windows, aplicaciones web, apps móviles, bases SQL Server e integraciones.", ["Software Windows", "Aplicaciones web", "Apps móviles", "Bases SQL Server", "Integraciones empresariales", "Informes"]),
    servizi: service("Servicios", "Consultoría informática, asistencia técnica, formación, análisis de procesos y soporte remoto.", ["Consultoría informática", "Asistencia técnica", "Formación", "Análisis de procesos", "Diseño de soluciones", "Soporte remoto"])
  }
};

function service(title, summary, features) {
  return {
    title,
    summary,
    body: summary,
    features
  };
}

function localeCopy(heroTitle, heroSubtitle, info, ticket, login, register) {
  const isEn = heroTitle.startsWith("Integrated");
  const isEs = heroTitle.startsWith("Soluciones");
  const labels = isEn ? enLabels : isEs ? esLabels : itLabels;
  return {
    language: isEn ? "Language" : isEs ? "Idioma" : "Lingua",
    nav: labels.nav,
    hero: {
      eyebrow: isEn ? "Technology consulting portal" : isEs ? "Portal de consultoría tecnológica" : "Portale consulenza tecnologica",
      title: heroTitle,
      titleAccent: isEn ? "Technology solutions" : isEs ? "Soluciones tecnologicas" : "Soluzioni tecnologiche",
      titleMain: isEn ? "for your future" : isEs ? "para tu futuro" : "per il tuo futuro",
      promise: isEn ? "Technology. Reliability. Innovation." : isEs ? "Tecnologia. Fiabilidad. Innovacion." : "Tecnologia. Affidabilita. Innovazione.",
      partner: isEn ? "Your partner" : isEs ? "Tu partner" : "Il tuo partner",
      innovation: isEn ? "for innovation" : isEs ? "para la innovacion" : "per l'innovazione",
      subtitle: heroSubtitle
    },
    cta: { info, ticket, login, register },
    home: {
      servicesEyebrow: labels.services,
      servicesTitle: isEn ? "Public service areas" : isEs ? "Áreas de servicio públicas" : "Aree servizi pubbliche",
      newsTitle: isEn ? "Featured news" : isEs ? "Noticias destacadas" : "News in evidenza",
      quickContacts: isEn ? "Quick contacts" : isEs ? "Contactos rápidos" : "Contatti rapidi",
      discover: isEn ? "Discover more" : isEs ? "Descubre mas" : "Scopri di piu",
      badges: localizedHomeText(isEn, isEs).badges,
      quick: localizedHomeText(isEn, isEs).quick
    },
    about: labels.about,
    services: {
      title: labels.services,
      subtitle: isEn ? "Explore every consulting and implementation area." : isEs ? "Explora cada área de consultoría e implementación." : "Esplora ogni area di consulenza e realizzazione."
    },
    support: {
      title: labels.support,
      subtitle: isEn ? "Public support request or reserved ticket area for approved customers." : isEs ? "Solicitud pública de soporte o área ticket reservada para clientes aprobados." : "Richiesta pubblica di supporto o area ticket riservata ai clienti approvati.",
      publicPoints: isEn ? ["Support form", "Ticket area", "Email notifications", "Conversation history"] : isEs ? ["Formulario soporte", "Área ticket", "Notificaciones email", "Historial conversaciones"] : ["Modulo supporto", "Area ticket", "Notifiche email", "Storico conversazioni"]
    },
    news: { title: labels.news },
    contact: {
      title: labels.contact,
      subtitle: isEn ? "Tell us what you need and the right team will answer." : isEs ? "Cuéntanos qué necesitas y el equipo correcto responderá." : "Raccontaci cosa ti serve e il team giusto ti risponderà.",
      formTitle: isEn ? "Information request" : isEs ? "Solicitud de información" : "Richiesta informazioni"
    },
    auth: {
      login: isEn ? "Login" : isEs ? "Acceder" : "Accedi",
      register: register,
      recovery: isEn ? "Password recovery" : isEs ? "Recuperar contraseña" : "Recupero password",
      registerHint: register
    },
    client: {
      title: labels.client,
      openTickets: isEn ? "Open tickets" : isEs ? "Tickets abiertos" : "Ticket aperti",
      documents: isEn ? "Reserved documents" : isEs ? "Documentos reservados" : "Documenti riservati",
      communications: isEn ? "Reserved communications" : isEs ? "Comunicaciones reservadas" : "Comunicazioni riservate",
      interventions: isEn ? "Intervention status" : isEs ? "Estado intervenciones" : "Stato interventi"
    },
    admin: {
      title: labels.admin,
      stats: isEn ? "Ticket statistics" : isEs ? "Estadísticas ticket" : "Statistiche ticket",
      pendingCustomers: isEn ? "Pending customers" : isEs ? "Clientes pendientes" : "Clienti in attesa",
      ticketManagement: isEn ? "Ticket management" : isEs ? "Gestión ticket" : "Gestione ticket",
      newsManagement: isEn ? "News management" : isEs ? "Gestión noticias" : "Gestione news",
      moduleText: isEn ? "Connected to protected admin API endpoints." : isEs ? "Conectado a API admin protegidas." : "Collegato a endpoint admin protetti.",
      modules: labels.adminModules
    },
    ticket: labels.ticket,
    form: labels.form,
    serviceLabels: labels.serviceLabels,
    about: localizedHomeText(isEn, isEs).about,
    homeQuick: localizedHomeText(isEn, isEs).quick,
    footer: labels.footer,
    newsItems: labels.newsItems
  };
}

function localizedHomeText(isEn, isEs) {
  if (isEn) {
    return {
      about: { title: "Your technology partner", text: "SPB Next combines networks, security, automation, software, energy and web portals into practical solutions for companies that want reliable growth." },
      badges: ["Qualified expert team", "Tailored solutions", "Continuous support", "Advanced technologies", "International presence"],
      quick: {
        clientTitle: "Reserved customer area",
        clientText: "Access documents, tickets, communications and request history.",
        supportTitle: "Support and tickets",
        supportText: "Open a ticket and follow request status in real time.",
        newsTitle: "News and updates",
        newsText: "Stay informed about news, events and technologies.",
        infoTitle: "Information request",
        infoText: "Contact us for information and tailored solutions.",
        securityTitle: "Security and reliability",
        securityText: "We protect data, systems and business processes.",
        innovationTitle: "Continuous innovation",
        innovationText: "Advanced technologies to support your growth."
      }
    };
  }

  if (isEs) {
    return {
      about: { title: "Tu partner tecnologico", text: "SPB Next integra redes, seguridad, automatizacion, software, energia y portales web en soluciones concretas para empresas que quieren crecer con tecnologias fiables." },
      badges: ["Equipo experto cualificado", "Soluciones personalizadas", "Soporte continuo", "Tecnologias avanzadas", "Presencia internacional"],
      quick: {
        clientTitle: "Area clientes reservada",
        clientText: "Accede a documentos, tickets, comunicaciones e historial.",
        supportTitle: "Asistencia y tickets",
        supportText: "Abre un ticket y sigue el estado en tiempo real.",
        newsTitle: "Noticias y novedades",
        newsText: "Mantente informado sobre novedades, eventos y tecnologias.",
        infoTitle: "Solicitud de informacion",
        infoText: "Contactanos para informacion y soluciones a medida.",
        securityTitle: "Seguridad y fiabilidad",
        securityText: "Protegemos datos, sistemas y procesos empresariales.",
        innovationTitle: "Innovacion continua",
        innovationText: "Tecnologias avanzadas para acompanar tu crecimiento."
      }
    };
  }

  return {
    about: { title: "Il tuo partner tecnologico", text: "SPB Next integra reti, sicurezza, automazione, software, energia e portali web in soluzioni concrete per imprese che vogliono crescere con tecnologie affidabili." },
    badges: ["Team di esperti qualificati", "Soluzioni personalizzate", "Supporto continuativo", "Tecnologie all'avanguardia", "Presenza internazionale"],
    quick: {
      clientTitle: "Area clienti riservata",
      clientText: "Accedi a documenti, ticket, comunicazioni e storico richieste.",
      supportTitle: "Assistenza e ticket",
      supportText: "Apri un ticket e segui lo stato delle richieste in tempo reale.",
      newsTitle: "News e aggiornamenti",
      newsText: "Resta aggiornato su novita, eventi e tecnologie.",
      infoTitle: "Richiesta informazioni",
      infoText: "Contattaci per ricevere informazioni e soluzioni su misura.",
      securityTitle: "Sicurezza e affidabilita",
      securityText: "Proteggiamo dati, sistemi e processi aziendali.",
      innovationTitle: "Innovazione continua",
      innovationText: "Tecnologie avanzate per accompagnare la crescita."
    }
  };
}

const serviceLabels = {
  "reti-informatiche": "Reti informatiche",
  elettronica: "Elettronica",
  sicurezza: "Sicurezza",
  automazione: "Automazione",
  wms: "WMS",
  "energia-green": "Energia green",
  "portali-web": "Portali web",
  "programmi-app": "Programmi e app",
  servizi: "Servizi"
};

const itLabels = {
  nav: { home: "Home", about: "Chi siamo", services: "Servizi", support: "Assistenza", news: "News", contact: "Contatti", client: "Area clienti", admin: "Admin" },
  services: "Servizi",
  support: "Assistenza",
  news: "News",
  contact: "Contatti",
  client: "Area clienti",
  admin: "Area amministratore",
  serviceLabels,
  adminModules: ["Gestione clienti", "Approvazione nuovi clienti", "Gestione utenti", "Gestione contenuti multilingua", "Gestione documenti riservati", "Richieste informazioni", "Log accessi"],
  ticket: { title: "Nuovo ticket", submit: "Invia ticket", subject: "Oggetto", category: "Categoria", priority: "Priorità", description: "Descrizione problema", other: "Altro", low: "Bassa", medium: "Media", high: "Alta", urgent: "Urgente" },
  form: { send: "Invia", name: "Nome", company: "Azienda", phone: "Telefono", country: "Paese", interest: "Area di interesse", message: "Messaggio", privacy: "Accetto privacy", terms: "Accetto termini servizio", businessName: "Ragione sociale / Nome cliente", taxId: "Partita IVA / Codice fiscale", contactName: "Nome referente", confirmPassword: "Conferma password" },
  footer: { company: "Consulenza tecnologica, assistenza e soluzioni digitali.", privacy: "Privacy", terms: "Termini" },
  newsItems: [{ slug: "nuovo-portale", category: "Azienda", date: "2026-06-08", title: "Nuovo portale clienti", excerpt: "Ticket, documenti e comunicazioni in un ambiente riservato.", body: "Il portale è predisposto per contenuti multilingua e pubblicazione online." }]
};

const enLabels = {
  ...itLabels,
  nav: { home: "Home", about: "About us", services: "Services", support: "Support", news: "News", contact: "Contact", client: "Customer area", admin: "Admin" },
  serviceLabels: Object.fromEntries(Object.entries(services.en).map(([key, value]) => [key, value.title])),
  adminModules: ["Customer management", "New customer approval", "User management", "Multilingual content", "Reserved documents", "Information requests", "Access logs"],
  ticket: { title: "New ticket", submit: "Send ticket", subject: "Subject", category: "Category", priority: "Priority", description: "Problem description", other: "Other", low: "Low", medium: "Medium", high: "High", urgent: "Urgent" },
  form: { send: "Send", name: "Name", company: "Company", phone: "Phone", country: "Country", interest: "Interest area", message: "Message", privacy: "I accept privacy policy", terms: "I accept terms of service", businessName: "Company / Customer name", taxId: "VAT / Tax ID", contactName: "Contact person", confirmPassword: "Confirm password" },
  footer: { company: "Technology consulting, support and digital solutions.", privacy: "Privacy", terms: "Terms" },
  newsItems: [{ slug: "new-portal", category: "Company", date: "2026-06-08", title: "New customer portal", excerpt: "Tickets, documents and communications in a reserved workspace.", body: "The portal is ready for multilingual content and online publication." }]
};

const esLabels = {
  ...itLabels,
  nav: { home: "Home", about: "Quienes somos", services: "Servicios", support: "Asistencia", news: "Noticias", contact: "Contacto", client: "Área clientes", admin: "Admin" },
  serviceLabels: Object.fromEntries(Object.entries(services.es).map(([key, value]) => [key, value.title])),
  adminModules: ["Gestión clientes", "Aprobación nuevos clientes", "Gestión usuarios", "Contenido multilingüe", "Documentos reservados", "Solicitudes información", "Logs de acceso"],
  ticket: { title: "Nuevo ticket", submit: "Enviar ticket", subject: "Asunto", category: "Categoría", priority: "Prioridad", description: "Descripción problema", other: "Otro", low: "Baja", medium: "Media", high: "Alta", urgent: "Urgente" },
  form: { send: "Enviar", name: "Nombre", company: "Empresa", phone: "Teléfono", country: "País", interest: "Área de interés", message: "Mensaje", privacy: "Acepto privacidad", terms: "Acepto términos de servicio", businessName: "Razón social / Nombre cliente", taxId: "IVA / Código fiscal", contactName: "Nombre referente", confirmPassword: "Confirmar contraseña" },
  footer: { company: "Consultoría tecnológica, asistencia y soluciones digitales.", privacy: "Privacidad", terms: "Términos" },
  newsItems: [{ slug: "nuevo-portal", category: "Empresa", date: "2026-06-08", title: "Nuevo portal clientes", excerpt: "Tickets, documentos y comunicaciones en un área reservada.", body: "El portal está preparado para contenido multilingüe y publicación online." }]
};

export const copy = {
  it: localeCopy("Soluzioni tecnologiche integrate per aziende evolute", "Consulenza, infrastrutture, sicurezza, software e portali web con area clienti e assistenza strutturata.", "Richiedi informazioni", "Apri ticket", "Accedi area clienti", "Registrati come cliente"),
  en: localeCopy("Integrated technology solutions for growing companies", "Consulting, infrastructure, security, software and web portals with customer area and structured support.", "Request information", "Open ticket", "Customer login", "Register as customer"),
  es: localeCopy("Soluciones tecnológicas integradas para empresas", "Consultoría, infraestructuras, seguridad, software y portales web con área cliente y asistencia estructurada.", "Solicitar información", "Abrir ticket", "Acceso clientes", "Registrarse como cliente")
};
