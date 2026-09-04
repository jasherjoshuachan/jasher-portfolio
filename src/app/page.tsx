import Image from "next/image";
import Link from "next/link";
import { ArrowDownToLine, ArrowUpRight } from "lucide-react";
import { PortfolioShell } from "@/components/portfolio-shell";
import { SystemCutaway } from "@/components/system-cutaway";
import { cases, labelForVisibility } from "@/lib/portfolio";

export default function Home() {
  return (
    <PortfolioShell>
      <section className="hero" aria-labelledby="home-title">
        <div>
          <p className="eyebrow">AI Automation Engineer · n8n · Claude/OpenAI · Agent Systems</p>
          <h1 id="home-title">I build AI systems that know when the job is actually done.</h1>
          <p className="hero-lede">I came to engineering through operations. So I care about what happens after a model gives an answer: who can approve it, what system acts, and how the result is proved.</p>
          <div className="hero-actions">
            <a className="button" href="/jasher-cv.pdf" download>Download résumé <ArrowDownToLine size={17} /></a>
            <a className="button button--quiet" href="mailto:jasherchan@truehubsolutions.com">Start a conversation</a>
          </div>
          <div className="portrait-note">
            <Image src="/jasher-avatar.png" alt="Jasher Chan" width={116} height={144} priority />
            <span>Operator-minded engineer. Open to early engineering and automation roles.</span>
          </div>
        </div>
        <SystemCutaway />
      </section>

      <section className="section" aria-labelledby="systems-title">
        <div className="section-heading">
          <div><p className="section-kicker">Selected systems</p><h2 id="systems-title">Work that holds up under inspection.</h2></div>
          <p>Three systems, each with a different evidence boundary. Public source when it can be shared. Anonymized lessons when the work is current. Historical work clearly marked as archived.</p>
        </div>
        <div className="system-list">
          {cases.map((caseStudy, index) => (
            <Link className="system-row" href={`/work/${caseStudy.slug}`} key={caseStudy.slug}>
              <span className="system-number">0{index + 1}</span>
              <div><span className={`tag tag--${caseStudy.visibility}`}>{labelForVisibility(caseStudy.visibility)}</span><h3>{caseStudy.title}</h3></div>
              <p>{caseStudy.summary}</p>
              <ArrowUpRight className="arrow-link" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="principles-title">
        <div className="section-heading">
          <div><p className="section-kicker">Operating principles</p><h2 id="principles-title">Less theatre. More traceable work.</h2></div>
          <p>Automation earns trust when it makes decisions legible, preserves the right human boundary, and can show its work after the fact.</p>
        </div>
        <div className="principle-grid">
          <article className="principle"><span className="principle-mark">01</span><h3>Scope before speed</h3><p>Give an agent the smallest authority that can finish the job. Broad access is not a substitute for a clear operating rule.</p></article>
          <article className="principle"><span className="principle-mark">02</span><h3>Receipts over status</h3><p>A green check is not enough. The useful proof comes from the system that actually owns the action or result.</p></article>
          <article className="principle"><span className="principle-mark">03</span><h3>Recovery is part of the build</h3><p>Inputs go missing. Tools fail. People change their mind. The system needs a safe, visible way to stop and recover.</p></article>
        </div>
      </section>

      <section className="section split-section" aria-labelledby="operations-title">
        <div><p className="section-kicker">Why operations matters</p><h2 id="operations-title">The work starts where the diagram ends.</h2></div>
        <div className="detail-copy"><p>I’ve worked with the messy part of operations: partial requests, handoffs, exceptions, changing ownership, and people who need a clear answer before they can move.</p><p>That background shapes the systems I build now. The goal is not an impressive workflow diagram. It is a system that gives the next person the right context, protects the action boundary, and leaves a useful trail behind.</p><ul className="proof-list"><li><span>Public code</span><a href="https://github.com/jasherjoshuachan" target="_blank" rel="noreferrer">GitHub profile</a></li><li><span>Career context</span><a href="https://www.linkedin.com/in/jasherchan/" target="_blank" rel="noreferrer">LinkedIn profile</a></li></ul></div>
      </section>

      <section className="cta" aria-labelledby="contact-title">
        <p className="section-kicker">Available for the right team</p>
        <h2 id="contact-title">Need an operator who can turn an ambiguous workflow into a system people can trust?</h2>
        <p>I’m interested in AI automation engineering, automation lead, and early engineering roles where the work needs clear boundaries as much as technical momentum.</p>
        <div className="hero-actions"><a className="button" href="mailto:jasherchan@truehubsolutions.com">Email Jasher</a><a className="button button--quiet" href="/jasher-cv-ats.pdf" download>ATS résumé</a></div>
      </section>
    </PortfolioShell>
  );
}
