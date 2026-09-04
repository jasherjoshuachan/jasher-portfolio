import { notFound } from "next/navigation";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PortfolioShell } from "@/components/portfolio-shell";
import { cases, labelForVisibility } from "@/lib/portfolio";

export function generateStaticParams() { return cases.map(({ slug }) => ({ slug })); }

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const caseStudy = cases.find((item) => item.slug === slug);
  if (!caseStudy) notFound();
  return <PortfolioShell>
    <section className="case-hero"><p className={`tag tag--${caseStudy.visibility}`}>{labelForVisibility(caseStudy.visibility)}</p><h1>{caseStudy.title}</h1><p className="hero-lede">{caseStudy.summary}</p><div className="case-meta"><span>{caseStudy.role}</span><span>Verified {caseStudy.verified}</span></div></section>
    <section className="case-layout"><aside className="case-rail"><span>System frame</span><strong>{caseStudy.stack.join(" · ")}</strong><span>Evidence boundary</span><strong>{labelForVisibility(caseStudy.visibility)}</strong></aside><div className="case-body"><article className="case-section"><p className="section-kicker">Problem</p><h2>What needed to change</h2><p>{caseStudy.problem}</p></article><article className="case-section"><p className="section-kicker">System</p><h2>How the work was shaped</h2><p>{caseStudy.system}</p></article><article className="case-section"><p className="section-kicker">Safeguards</p><h2>What keeps it honest</h2><p>{caseStudy.safeguards}</p></article><article className="case-section"><p className="section-kicker">Outcome</p><h2>What this proves</h2><p>{caseStudy.outcome}</p></article><Accordion className="case-accordion"><AccordionItem value="evidence"><AccordionTrigger>Evidence and verification</AccordionTrigger><AccordionContent><ul className="proof-list">{caseStudy.evidence.map((item) => <li key={item.label}><span>{item.checked}</span>{item.href ? <a href={item.href} target="_blank" rel="noreferrer">{item.label}</a> : item.label}</li>)}</ul></AccordionContent></AccordionItem><AccordionItem value="limits"><AccordionTrigger>Limits and disclosure</AccordionTrigger><AccordionContent>{caseStudy.limits}</AccordionContent></AccordionItem></Accordion></div></section>
  </PortfolioShell>;
}
