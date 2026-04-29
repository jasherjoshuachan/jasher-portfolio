"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { person } from "@/lib/data";

export default function SectionPill() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
      setVisible(window.scrollY > 180);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Reading progress bar */}
      <div
        className="fixed top-0 inset-x-0 z-50 md:hidden"
        style={{ height: "3px", background: "oklch(50% 0.22 258 / 0.15)" }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background: "linear-gradient(90deg, oklch(50% 0.22 258), oklch(45% 0.2 278))",
            transition: "width 0.1s linear",
          }}
        />
      </div>

      {/* Identity bar — slides in after scrolling past profile */}
      <div
        className="fixed inset-x-0 z-40 md:hidden"
        style={{
          top: "3px",
          transform: `translateY(${visible ? "0px" : "-100%"})`,
          opacity: visible ? 1 : 0,
          transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease",
          background: "oklch(13% 0.022 254 / 0.96)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div className="flex items-center gap-2.5 px-4 py-2">
          <div className="w-7 h-7 rounded-full border border-accent/40 overflow-hidden flex-shrink-0">
            <Image
              src="/jasher-avatar.png"
              alt="Jasher Chan"
              width={28}
              height={28}
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-ink-text text-sm font-semibold leading-tight truncate">{person.name}</p>
            <p className="text-ink-muted text-xs leading-tight">{person.title}</p>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-accent text-xs font-semibold tracking-wide">Open</span>
          </div>
        </div>
      </div>
    </>
  );
}
