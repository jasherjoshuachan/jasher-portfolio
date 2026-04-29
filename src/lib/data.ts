export const person = {
  name: "Jasher Joshua A. Chan",
  firstName: "Jasher",
  title: "AI Automation Engineer · n8n · Claude · Agent Systems",
  tagline: "Systems that think. Agents that act. Operations that scale.",
  bio: "AI Automation Engineer building production multi-agent systems and end-to-end workflow automation for international SMEs and AI-native agencies. I architect agent systems on Claude and OpenAI, orchestrate them through n8n and custom Python infrastructure, and ship operational platforms that replace 30+ hours of weekly manual ops with supervised automation. My edge: I'm an operator who learned to engineer the way out — a decade across hospitality operations in Singapore, multi-currency bookkeeping for international SMEs, and an AI agency I built from scratch. Certified QBO ProAdvisor and Xero Advisor — useful when your automation has to handle real money correctly. Open to senior remote roles and Founding Engineer positions at AI-native startups.",
  contact: {
    phone: "+63 998 972 8783",
    email: "jasherchan@truehubsolutions.com",
    location: "Bacolod City, Philippines",
    linkedin: "https://linkedin.com/in/jasherchan",
    github: "https://github.com/jasherjoshuachan",
  },
  calUrl: "https://cal.com/truehubsolutions/career-chat",
  availability: "OPEN TO WORK & CONSULTING",
};

export type Service = {
  title: string;
  description: string;
  highlights: string[];
  iconName: string;
};

export const services: Service[] = [
  {
    title: "AI Agents & Automation",
    description:
      "Multi-agent architectures and end-to-end workflow automation. Claude / OpenAI orchestration, n8n workflows, intake pipelines on WhatsApp / Telegram / API. Production systems that replace manual ops with supervised automation.",
    highlights: ["Multi-Agent Systems", "n8n Workflows", "LLM Orchestration", "API Integration"],
    iconName: "Zap",
  },
  {
    title: "Custom Software & Web Apps",
    description:
      "Internal tools, dashboards, and operational platforms built around how your business actually runs. AppSheet for rapid no-code, Next.js for production web, Cloudflare Workers for the edge — picked per use case, not per ego.",
    highlights: ["Web Applications", "Operational Dashboards", "AppSheet · Next.js", "Edge Deployment"],
    iconName: "Settings",
  },
  {
    title: "AI-Augmented Bookkeeping",
    description:
      "Xero and QuickBooks reconciliation, payroll, and financial reporting — augmented with LLM categorization, anomaly detection, and custom integrations. Clean books that maintain themselves.",
    highlights: ["Xero & QuickBooks", "AI Categorization", "Custom Integrations", "Bank Reconciliation"],
    iconName: "BookOpen",
  },
];

export type CaseStudy = {
  client: string;
  industry: string;
  scope: string;
  description: string;
  outcomes: string[];
  tags: string[];
  stack?: string;
  githubUrl?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    client: "AI-Powered Business Operations Agency",
    industry: "Business Services",
    scope: "Multi-agent AI infrastructure for agency operations",
    description:
      "Architected and deployed a multi-agent AI team to handle day-to-day agency operations — communications, task routing, bookkeeping support, and client workflows. Built on a self-hosted gateway with six specialized AI agents operating across Telegram and WhatsApp, replacing manual coordination overhead with autonomous systems.",
    outcomes: [
      "Multi-agent AI architecture (6 specialized agents)",
      "Self-hosted LLM gateway on cloud VPS",
      "Telegram & WhatsApp integration for real-time operations",
      "Automated task routing and internal communications",
      "AI-assisted bookkeeping and client workflow support",
    ],
    tags: ["AI", "Automation", "Infrastructure", "Operations"],
    stack: "OpenClaw · Python · Telegram Bot API · WhatsApp (Baileys) · Hetzner VPS · Linux",
    githubUrl: "https://github.com/jasherjoshuachan/claude-max-api-proxy",
  },
  {
    client: "True Hub Solutions (Internal)",
    industry: "Business Services · Automation",
    scope: "Automated WhatsApp client intake pipeline",
    description:
      "Built a structured client intake system on top of WhatsApp Cloud API. Inbound messages from the portfolio and website hit a dedicated THS number, trigger an n8n webhook workflow, auto-acknowledge the contact, log them to a CRM, and push a real-time notification to the ops channel — replacing a manual inbox with an auditable, zero-touch intake process.",
    outcomes: [
      "WhatsApp Cloud API integration via Meta Business Platform",
      "n8n webhook workflow for real-time message processing",
      "Auto-reply with intake acknowledgement on first contact",
      "CRM logging to Notion with contact details & timestamp",
      "Instant ops notification routed to personal WhatsApp",
      "Clean separation: org intake number vs. personal comms",
    ],
    tags: ["WhatsApp API", "n8n", "Meta Cloud", "Automation"],
    stack: "WhatsApp Cloud API · Meta Business Platform · n8n · Notion · Hetzner VPS",
    githubUrl: "https://github.com/jasherjoshuachan/ths-whatsapp-intake",
  },
  {
    client: "Recycled Materials Trading Client",
    industry: "Waste Management & Recycling",
    scope: "Full operational infrastructure",
    description:
      "Inherited a business running entirely on spreadsheets and manual processes. Built the complete financial and operational stack from scratch — giving the team accurate books, automated payroll, and a unified web platform to manage the business day-to-day.",
    outcomes: [
      "Xero bookkeeping set up from scratch",
      "Custom payroll & leave management system",
      "Automated expense tracking & categorisation",
      "Internal web application for daily operations",
    ],
    tags: ["Xero", "Payroll", "Web App", "Automation"],
    stack: "AppSheet · FastAPI · Python · Google Sheets · Apps Script · Xero API",
    githubUrl: "https://github.com/truehubsolutions/hsk-platform",
  },
  {
    client: "NGO / Foundation",
    industry: "Non-Profit",
    scope: "Website + full automation stack",
    description:
      "Rebuilt the organisation's web presence and automated their core workflows — from communications to internal reporting. A lean team now operates with the leverage of a much larger one.",
    outcomes: [
      "Website redesign & development",
      "Automated donor & stakeholder communications",
      "Internal reporting & data workflows",
      "End-to-end operational process automation",
    ],
    tags: ["Web Dev", "n8n", "Automation", "Operations"],
    stack: "WordPress · n8n · Cloudflare Pages · Automation Workflows",
    githubUrl: "https://github.com/truehubsolutions/wao-foundation-stack",
  },
];

export type SkillGroup = {
  category: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: "AI & Automation",
    skills: ["AI Agent Architecture", "Multi-Agent Systems", "Claude (Anthropic)", "OpenAI API", "LLM Integration", "Prompt Engineering", "Workflow Automation", "Business Process Automation", "n8n", "System Integration", "Data Pipelines"],
  },
  {
    category: "Development & Infrastructure",
    skills: ["Python", "FastAPI", "TypeScript", "Next.js", "React", "Tailwind CSS", "Google Apps Script", "AppSheet", "REST API Integration", "Xero API", "WhatsApp Cloud API", "Telegram Bot API", "WordPress", "Cloudflare Workers", "Cloudflare Pages", "Git", "Linux / VPS", "Server Deployment"],
  },
  {
    category: "Finance & Accounting",
    skills: ["Xero Online", "QuickBooks Online", "Bookkeeping", "Payroll", "Financial Reporting", "A/P · A/R", "Bank Reconciliation", "Expense Management"],
  },
  {
    category: "Business Operations",
    skills: ["Operations Management", "Project Management", "Team Leadership", "Vendor Management", "Restaurant & Hotel Ops", "Revenue Management", "Night Audit & Reporting", "Staff Training", "Hospitality Auditing", "Cost Control"],
  },
  {
    category: "Workspace & Collaboration",
    skills: ["Google Workspace", "Notion", "Figma / Canva", "Docker", "GitHub Actions", "Postman", "VS Code", "SSH / CLI"],
  },
  {
    category: "Tools & Tech",
    skills: ["Microsoft Office Suite", "Adobe Creative Suite", "POS Systems", "Hotel Management Systems", "Stripe", "Google Analytics", "Loom", "Make / Zapier"],
  },
];

export type TimelineItem = {
  period: string;
  role: string;
  company: string;
  location: string;
  type: "current" | "business" | "corporate" | "early";
  description: string;
};

export const timeline: TimelineItem[] = [
  {
    period: "Nov 2025 – Present",
    role: "Founder · AI Automation Engineer & Systems Developer",
    company: "True Hub Solutions",
    location: "Philippines (Remote)",
    type: "current",
    description:
      "Founded a boutique consultancy shipping production multi-agent systems, end-to-end workflow automation, and operational platforms for SMEs and AI-native agencies across AU, US, SG, NZ, UK, PNG, and PH. Stack: Claude · OpenAI · n8n · Python · Next.js · Cloudflare. Notable: OpenClaw multi-agent gateway, WhatsApp Cloud API intake pipeline.",
  },
  {
    period: "Oct 2024 – Nov 2025",
    role: "Founder · Automation-First Bookkeeper",
    company: "JChan Bookkeeping Services",
    location: "Philippines (Remote)",
    type: "current",
    description:
      "Specialist bookkeeping practice built on automation-first principles: AI-assisted categorization, custom Xero/QBO integrations, and operational dashboards that eliminate manual close cycles. Foundation for True Hub Solutions.",
  },
  {
    period: "Feb 2023 – Feb 2026",
    role: "Daily Operations Manager",
    company: "Best Holistic Life",
    location: "Remote",
    type: "business",
    description:
      "Managed daily operations for a lifestyle magazine — content scheduling, vendor relations, workflows, and process automation.",
  },
  {
    period: "Jan 2022 – Dec 2024",
    role: "Small Business Owner",
    company: "Jean's Delights",
    location: "Philippines",
    type: "business",
    description:
      "Founded and operated a food cart business. Direct P&L management, inventory, payroll, and small-business financial operations from day one.",
  },
  {
    period: "Dec 2018 – Nov 2021",
    role: "Assistant Front Office Manager",
    company: "CherryLoft Resorts and Hotels Pte Ltd",
    location: "Singapore",
    type: "corporate",
    description:
      "Managed front office operations for a Singapore boutique hotel — revenue management, reservations, team supervision, and guest experience.",
  },
  {
    period: "Nov 2017 – Feb 2018",
    role: "Financial Services Representative",
    company: "Prudential Assurance Company Singapore",
    location: "Singapore",
    type: "corporate",
    description:
      "Financial advisory and insurance services for individual and corporate clients.",
  },
  {
    period: "Dec 2016 – Aug 2017",
    role: "Assistant Front Office Manager",
    company: "CherryLoft Resorts and Hotels Pte Ltd",
    location: "Singapore",
    type: "corporate",
    description:
      "First stint at CherryLoft — front office operations, reservations, and guest relations.",
  },
  {
    period: "Oct 2015 – Mar 2016",
    role: "Restaurant Manager",
    company: "Integrated Food Concepts Pte Ltd / Jamie Oliver",
    location: "Singapore",
    type: "early",
    description:
      "Full restaurant operations management — staffing, P&L, service standards, and vendor relations.",
  },
  {
    period: "Sep 2014 – Sep 2015",
    role: "Earlier Roles",
    company: "Olivine Networks & Others",
    location: "Singapore · Philippines",
    type: "early",
    description:
      "Operations management and customer service roles across Singapore and the Philippines. Full details available upon request.",
  },
];

export const stats = [
  { value: "10+", label: "Years Experience", sub: "Business Operations" },
  { value: "2", label: "Certifications", sub: "QBO ProAdvisor · Xero" },
  { value: "2", label: "Active Clients", sub: "International Retainers" },
];

export const education = {
  degree: "B.S. in Business Administration",
  major: "Major in Operations Management",
  fullDegree: "Bachelor of Science in Business Administration",
  institution: "University of St. La Salle",
  period: "2009 – 2013",
  location: "Bacolod City, Philippines",
};

export const credentials = [
  { name: "QuickBooks ProAdvisor", issuer: "Intuit", short: "QBO" },
  { name: "Xero Advisor Certified", issuer: "Xero Limited", short: "Xero" },
];

export type Reference = {
  name: string;
  role: string;
  company: string;
  phone: string;
  email: string;
};

export const references: Reference[] = [
  {
    name: "Dhamielyn A. Sarno MIT",
    role: "ProVA PH Coach",
    company: "ProVA PH",
    phone: "+63 915 832 5769",
    email: "dhamsarno@gmail.com",
  },
  {
    name: "Jeanette Hizole-Rey",
    role: "Kajea Bookkeeping Coach",
    company: "Kajea Bookkeeping",
    phone: "+63 948 719 6309",
    email: "admin@kajeaskeperskeeping.com",
  },
];
