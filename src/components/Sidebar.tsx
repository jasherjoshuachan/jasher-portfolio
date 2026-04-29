"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { Phone, Mail, MapPin, ExternalLink, Calendar, FileText, GitBranch } from "lucide-react";
import { person, credentials } from "@/lib/data";
import RequestResumeModal from "./RequestResumeModal";

const navLinks = ["About", "Services", "Work", "Skills", "Contact"];
const sectionIds = ["about", "services", "work", "skills", "contact"];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.3 } },
};
const navItemVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] } },
};
const contactVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.5 } },
};
const contactItemVariants: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] } },
};

export default function Sidebar() {
  const [scrollActive, setScrollActive] = useState("about");
  const [hoverActive, setHoverActive] = useState<string | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const active = hoverActive ?? scrollActive;

  useEffect(() => {
    const hitting = new Set<string>();
    const pick = () => {
      let found = "";
      for (const id of sectionIds) if (hitting.has(id)) found = id;
      if (found) setScrollActive(found);
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
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const cleanups: (() => void)[] = [];
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) {
        const enter = () => setHoverActive(id);
        const leave = () => setHoverActive(null);
        el.addEventListener("mouseenter", enter);
        el.addEventListener("mouseleave", leave);
        cleanups.push(() => {
          el.removeEventListener("mouseenter", enter);
          el.removeEventListener("mouseleave", leave);
        });
      }
    }
    return () => cleanups.forEach(fn => fn());
  }, []);

  return (
    <motion.aside
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full md:w-56 lg:w-64 xl:w-72 2xl:w-80 md:flex-shrink-0 md:sticky md:top-0 md:h-screen flex flex-col bg-ink-bg text-ink-text relative overflow-hidden"
    >
      {/* Radial glow behind avatar */}
      <div
        className="absolute top-0 inset-x-0 h-56 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 0%, oklch(50% 0.22 258 / 0.18) 0%, transparent 70%)" }}
      />

      {/* Profile block */}
      <div className="sid-profile relative p-6 flex flex-col items-center text-center border-b border-white/8">
        {/* Avatar */}
        <div className="sid-av relative mb-4">
          <div
            className="absolute inset-0 rounded-full border-2 border-accent/25 animate-pulse-ring"
            style={{ margin: "-6px" }}
          />
          <div className="sid-av-img w-20 h-20 rounded-full border-2 border-accent/40 overflow-hidden">
            <Image
              src="/jasher-avatar.png"
              alt="Jasher Joshua Chan"
              width={80}
              height={80}
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-heading text-lg leading-tight text-ink-text mb-1"
        >
          {person.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-ink-muted text-xs leading-snug px-2"
        >
          AI Automation Engineer ·<br />n8n · Claude · Agent Systems
        </motion.p>

        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
          className="sid-mt mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/20 border border-accent/40 animate-badge-breathe"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="text-white text-[10px] font-bold tracking-wider">
            {person.availability}
          </span>
        </motion.div>

        {/* Credentials badges */}
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.48 }}
          className="sid-mt mt-3 flex gap-2"
        >
          {credentials.map((cred, i) => (
            <span
              key={cred.short}
              className="px-2.5 py-1 rounded-lg bg-accent/20 border border-accent/40 text-white text-xs font-semibold animate-cert-glow"
              style={{ animationDelay: `${i * 1.4}s` }}
            >
              {cred.short}
            </span>
          ))}
        </motion.div>

        {/* Book a Call CTA */}
        <motion.a
          href={person.calUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.55 }}
          className="sid-btn mt-3 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-accent hover:bg-accent-hover border border-accent/40 text-white text-sm font-semibold transition-colors"
        >
          <Calendar className="w-4 h-4" />
          Schedule a Call
        </motion.a>

        {/* Request Resume */}
        <motion.button
          onClick={() => setResumeOpen(true)}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.63 }}
          className="sid-btn mt-2 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white/6 hover:bg-white/12 border border-white/12 text-ink-muted hover:text-ink-text text-sm font-semibold transition-colors cursor-pointer"
        >
          <FileText className="w-4 h-4" />
          Request Resume
        </motion.button>
        {resumeOpen && <RequestResumeModal onClose={() => setResumeOpen(false)} />}

        {/* ATS hint */}
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.66 }}
          className="sid-hint text-center text-[10px] text-ink-muted mt-1.5"
        >
          Uploading to a job portal?<br />The email includes both formats.
        </motion.p>

        {/* LinkedIn */}
        <motion.a
          href={person.contact.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.63 }}
          className="sid-btn mt-2 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white/6 hover:bg-white/12 border border-white/12 text-ink-muted hover:text-ink-text text-sm font-semibold transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          LinkedIn Profile
        </motion.a>

        {/* GitHub */}
        <motion.a
          href={person.contact.github}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.7 }}
          className="sid-btn mt-2 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white/6 hover:bg-white/12 border border-white/12 text-ink-muted hover:text-ink-text text-sm font-semibold transition-colors"
        >
          <GitBranch className="w-4 h-4" />
          GitHub
        </motion.a>

      </div>

      {/* Navigation — desktop only */}
      <nav className="sid-nav hidden md:block p-4 border-b border-white/8">
        <motion.ul
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-0.5"
        >
          {navLinks.map((item) => {
            const isActive = active === item.toLowerCase();
            return (
              <motion.li key={item} variants={navItemVariants}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className={`group flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                    isActive
                      ? "text-ink-text bg-white/12"
                      : "text-ink-muted hover:text-ink-text hover:bg-white/8"
                  }`}
                >
                  <span
                    className={`h-3 rounded-full bg-accent transition-all duration-200 flex-shrink-0 ${
                      isActive ? "w-1" : "w-0 group-hover:w-1"
                    }`}
                  />
                  {item}
                </a>
              </motion.li>
            );
          })}
        </motion.ul>
      </nav>

      {/* Contact info */}
      <motion.div
        variants={contactVariants}
        initial="hidden"
        animate="visible"
        className="p-5 flex-1 space-y-3"
      >
        <motion.a
          variants={contactItemVariants}
          href={`tel:${person.contact.phone}`}
          className="flex items-center gap-2.5 text-ink-muted hover:text-ink-text text-sm transition-colors"
        >
          <Phone className="w-4 h-4 text-accent flex-shrink-0" />
          <span>{person.contact.phone}</span>
        </motion.a>
        <motion.a
          variants={contactItemVariants}
          href={`mailto:${person.contact.email}`}
          title={person.contact.email}
          className="flex items-center gap-2.5 text-ink-muted hover:text-ink-text text-xs transition-colors"
        >
          <Mail className="w-4 h-4 text-accent flex-shrink-0" />
          <span>{person.contact.email}</span>
        </motion.a>
        <motion.div
          variants={contactItemVariants}
          className="flex items-start gap-2.5 text-ink-muted text-sm"
        >
          <MapPin className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
          <span>{person.contact.location}</span>
        </motion.div>
      </motion.div>
    </motion.aside>
  );
}
