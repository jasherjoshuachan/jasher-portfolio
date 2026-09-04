export type Visibility = "public" | "anonymized" | "historical";

export type Evidence = {
  label: string;
  href?: string;
  checked: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  visibility: Visibility;
  role: string;
  summary: string;
  problem: string;
  system: string;
  safeguards: string;
  outcome: string;
  limits: string;
  stack: string[];
  evidence: Evidence[];
  verified: string;
};

export const cases: CaseStudy[] = [
  {
    slug: "receipt-bound-agentic-runtime",
    title: "Receipt-Bound Agentic Runtime",
    visibility: "anonymized",
    role: "AI automation engineer and runtime architect",
    summary: "A current pattern for agent work that separates intent, approval, action, and a read-back receipt.",
    problem: "An agent can sound finished before anything has happened. The hard part is not generating a convincing answer. It is knowing what may act, proving what did act, and stopping safely when proof is unavailable.",
    system: "The runtime treats each request as a bounded operation. It records source context, applies the appropriate approval rule, runs only the allowed tool path, and returns a receipt from the system that owns the result.",
    safeguards: "Tenant boundaries, explicit action policies, stable request identifiers, duplicate protection, and fail-closed reporting when a destination cannot be read back.",
    outcome: "A reusable operating pattern for agent work where a completion claim is tied to evidence, not confidence in generated text.",
    limits: "This is anonymized current work. Client names, volumes, internal tools, and private operational evidence are intentionally omitted.",
    stack: ["Agent systems", "approval policies", "read-back receipts"],
    evidence: [{ label: "Public agent-patterns repository", href: "https://github.com/jasherjoshuachan/claude-agent-patterns", checked: "Public source" }],
    verified: "2026-09-04",
  },
  {
    slug: "openclaw-six-agent-operations-system",
    title: "OpenClaw Six-Agent Operations System",
    visibility: "historical",
    role: "System designer and operator",
    summary: "An archived six-agent operations system that clarified how specialized agents coordinate without sharing one broad identity.",
    problem: "Operations work crosses intake, research, preparation, execution, and follow-up. Giving one agent all authority made boundaries difficult to inspect and recover.",
    system: "OpenClaw split the work into focused roles with handoffs, defined tool access, and an orchestration layer. The goal was not to make agents look busy. It was to make their responsibilities inspectable.",
    safeguards: "Role-specific scopes, explicit handoffs, separation between personal and work lanes, and documented recovery paths.",
    outcome: "Historical system work that shaped the current emphasis on narrow authority, visible handoffs, and source-owned proof.",
    limits: "Archived and historical. It is not presented as a current live product or a claim about present availability.",
    stack: ["Multi-agent design", "n8n orchestration", "VPS operations"],
    evidence: [{ label: "Public Claude Max API Proxy repository", href: "https://github.com/jasherjoshuachan/claude-max-api-proxy", checked: "Related public source" }],
    verified: "2026-09-04",
  },
  {
    slug: "ths-whatsapp-intake",
    title: "THS WhatsApp Intake",
    visibility: "public",
    role: "Builder and maintainer",
    summary: "A public intake project focused on turning conversational requests into a clearer starting point for operations.",
    problem: "Inbound requests arrive incomplete, ambiguous, and in the wrong format for the next person or system. The first job is to capture useful context without pretending ambiguity has disappeared.",
    system: "The project provides a structured intake route for WhatsApp-originated requests. It keeps the request, routing details, and operational follow-up visible rather than burying them in a chat history.",
    safeguards: "Clear input handling, scoped routing, and a public codebase that can be inspected directly.",
    outcome: "A public example of building around operational context, not only model output.",
    limits: "The public repository is the source of truth for what is currently visible. No client performance or volume claims are made here.",
    stack: ["WhatsApp", "automation", "intake design"],
    evidence: [{ label: "View public repository", href: "https://github.com/jasherjoshuachan/ths-whatsapp-intake", checked: "Public source" }],
    verified: "2026-09-04",
  },
];

export const notes = [
  { label: "Public note", title: "My AI agent kept acting in my name", description: "A public reflection on authority and the cost of vague agent boundaries.", href: "https://www.linkedin.com/posts/jasherchan_my-ai-agent-kept-acting-in-my-name-while-activity-7462290962078203904-vGLL" },
  { label: "Public note", title: "What I judge automation by now", description: "A short note on measuring automation by finished work instead of visible activity.", href: "https://www.linkedin.com/posts/jasherchan_i-used-to-judge-automation-by-how-much-human-activity-7491466467981316096-7Q-3" },
  { label: "Public note", title: "Giving an agent an operational job", description: "A public note about handing an agent a real responsibility with defined boundaries.", href: "https://www.linkedin.com/posts/jasherchan_i-gave-an-ai-agent-the-job-of-managing-my-activity-7456808067058327554-a03H" },
];

export const experience = [
  { label: "Current", title: "AI Automation Lead, Cyndra", copy: "Works on AI-enabled operations with a focus on boundaries, traceability, and systems people can operate after handoff." },
  { label: "Current", title: "Builder, True Hub Solutions", copy: "Builds practical automation and intake systems for operations work, from the first request to a clear next action." },
  { label: "Foundation", title: "Operations background", copy: "Approaches engineering through real workflows: incomplete inputs, ownership changes, exception handling, and the need to prove a job is done." },
];

export function labelForVisibility(visibility: Visibility) {
  return visibility === "public" ? "Public evidence" : visibility === "anonymized" ? "Anonymized current work" : "Historical / archived";
}
