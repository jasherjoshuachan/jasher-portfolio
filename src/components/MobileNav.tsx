"use client";

import { useState, useEffect } from "react";
import { User, Briefcase, Wrench, Mail, LayoutGrid } from "lucide-react";

const items = [
  { label: "About",    icon: User,        href: "#about" },
  { label: "Services", icon: LayoutGrid,  href: "#services" },
  { label: "Work",     icon: Briefcase,   href: "#work" },
  { label: "Skills",   icon: Wrench,      href: "#skills" },
  { label: "Contact",  icon: Mail,        href: "#contact" },
];

export default function MobileNav() {
  const [active, setActive] = useState("about");

  useEffect(() => {
    const ids = items.map(i => i.href.slice(1));
    const hitting = new Set<string>();
    const pick = () => {
      let found = "";
      for (const id of ids) if (hitting.has(id)) found = id;
      if (found) setActive(found);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e =>
          e.isIntersecting ? hitting.add(e.target.id) : hitting.delete(e.target.id)
        );
        pick();
      },
      { rootMargin: "-20px 0px -60% 0px", threshold: 0 }
    );
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-50 md:hidden"
      style={{
        background: "oklch(13% 0.022 254 / 0.95)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="flex items-center justify-around px-2 py-2 pb-safe">
        {items.map(({ label, icon: Icon, href }) => {
          const isActive = active === href.slice(1);
          return (
            <a
              key={label}
              href={href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 ${
                isActive
                  ? "text-accent"
                  : "text-ink-muted hover:text-ink-text"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-semibold tracking-wide">{label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
