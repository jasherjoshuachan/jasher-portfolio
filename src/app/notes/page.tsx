import { ArrowUpRight } from "lucide-react";
import { PortfolioShell } from "@/components/portfolio-shell";
import { notes } from "@/lib/portfolio";

export default function NotesPage() {
  return <PortfolioShell><section className="page-intro"><p className="eyebrow">Notes</p><h1>Public thinking about agent work and operations.</h1><p>A small set of public notes. The code and case studies remain the more useful source when you need to inspect the work itself.</p></section><section className="notes-list" aria-label="Public notes">{notes.map((note) => <a className="note-row" href={note.href} target="_blank" rel="noreferrer" key={note.href}><span>{note.label}</span><div><h2>{note.title}</h2><p>{note.description}</p></div><ArrowUpRight className="arrow-link" aria-hidden="true" /></a>)}</section></PortfolioShell>;
}
