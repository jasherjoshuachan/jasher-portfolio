import { PortfolioShell } from "@/components/portfolio-shell";
import { experience } from "@/lib/portfolio";

export default function ExperiencePage() {
  return <PortfolioShell><section className="page-intro"><p className="eyebrow">Experience</p><h1>Operations gave the engineering work a standard.</h1><p>A concise record of the context behind the portfolio. The common thread is building clearer paths through work that starts messy.</p></section><section className="timeline" aria-label="Career progression">{experience.map((item) => <article className="timeline-item" key={item.title}><span>{item.label}</span><div><h2>{item.title}</h2><p>{item.copy}</p></div></article>)}</section></PortfolioShell>;
}
