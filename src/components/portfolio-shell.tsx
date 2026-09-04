import Link from "next/link";

export function PortfolioHeader() {
  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label="Jasher Chan home">Jasher Chan</Link>
      <nav className="site-nav" aria-label="Primary navigation">
        <Link href="/work">Work</Link>
        <Link href="/experience">Experience</Link>
        <Link href="/notes">Notes</Link>
        <a className="nav-resume" href="/jasher-cv.pdf" download>Résumé</a>
      </nav>
    </header>
  );
}

export function PortfolioFooter() {
  return (
    <footer className="site-footer">
      <p>Jasher Chan. AI Automation Engineer.</p>
      <p><a href="mailto:jasherchan@truehubsolutions.com">jasherchan@truehubsolutions.com</a> · <a href="https://www.linkedin.com/in/jasherchan/" target="_blank" rel="noreferrer">LinkedIn</a></p>
    </footer>
  );
}

export function PortfolioShell({ children }: { children: React.ReactNode }) {
  return <div className="site-shell"><PortfolioHeader /><main className="page-main">{children}</main><PortfolioFooter /></div>;
}
