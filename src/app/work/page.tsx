import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PortfolioShell } from "@/components/portfolio-shell";
import { cases, labelForVisibility } from "@/lib/portfolio";

export default function WorkPage() {
  return <PortfolioShell><section className="page-intro"><p className="eyebrow">Selected work</p><h1>Systems with boundaries you can point to.</h1><p>Each case study states what can be shown, what is anonymized, and what belongs to historical work. That distinction is part of the proof.</p></section><section className="case-grid" aria-label="Case studies">{cases.map((item) => <Link className="case-card" href={`/work/${item.slug}`} key={item.slug}><span className={`tag tag--${item.visibility}`}>{labelForVisibility(item.visibility)}</span><h2>{item.title}</h2><p>{item.summary}</p><ArrowUpRight className="arrow-link" aria-hidden="true" /></Link>)}</section></PortfolioShell>;
}
