"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Settings,
  Zap,
  Award,
  MapPin,
  Calendar,
  Mail,
  Check,
  Phone,
  ExternalLink,
  GitBranch,
} from "lucide-react";
import {
  person,
  services,
  caseStudies,
  skillGroups,
  timeline,
  stats,
  education,
  credentials,
  references,
} from "@/lib/data";

// ─── Types ────────────────────────────────────────────────────────────────────

type ServiceIconName = "BookOpen" | "Settings" | "Zap";
const serviceIcons: Record<ServiceIconName, React.ComponentType<{ className?: string }>> = {
  BookOpen, Settings, Zap,
};

// ─── Card ─────────────────────────────────────────────────────────────────────

function Card({
  children,
  className = "",
  featured = false,
  center = false,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  featured?: boolean;
  center?: boolean;
  id?: string;
}) {
  return (
    <div
      id={id}
      className={`relative rounded-2xl p-6 overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-default flex flex-col ${center ? "justify-center" : ""} ${className}`}
    >
      {featured && (
        <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-accent" />
      )}
      {children}
    </div>
  );
}

// ─── Section label ─────────────────────────────────────────────────────────────

function Label({ children, icon, center }: { children: React.ReactNode; icon?: React.ReactNode; center?: boolean }) {
  return (
    <div className={`flex items-center gap-1.5 mb-3 ${center ? "justify-center" : ""}`}>
      {icon}
      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-accent">
        {children}
      </p>
    </div>
  );
}

// ─── Animated stat counter ────────────────────────────────────────────────────

const statAccents = [
  { bg: "bg-accent/8",  border: "border-accent/20" },
  { bg: "bg-accent/12", border: "border-accent/25" },
  { bg: "bg-accent/8",  border: "border-accent/20" },
];

function AnimatedStat({
  value, label, sub, accent, delay = 0,
}: {
  value: string; label: string; sub: string;
  accent: { bg: string; border: string };
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const num = parseInt(value, 10);
  const suffix = value.replace(/\d/g, "");
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { rootMargin: "-40px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setDisplay(Math.floor((1 - Math.pow(1 - t, 3)) * num));
      if (t < 1) requestAnimationFrame(tick);
    };
    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, num]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.5, delay: 0.3 + delay, ease: [0.4, 0, 0.2, 1] }}
      className={`rounded-2xl p-6 shadow-sm border cursor-default flex flex-col justify-center hover:shadow-md transition-shadow duration-200 ${accent.bg} ${accent.border}`}
    >
      <p className="font-heading text-4xl text-accent mb-1">{display}{suffix}</p>
      <p className="text-sm font-semibold text-text">{label}</p>
      <p className="text-xs text-text-muted mt-0.5">{sub}</p>
    </motion.div>
  );
}

// ─── Ambient background orbs ──────────────────────────────────────────────────

function AmbientOrbs() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      <div className="absolute top-[4%]  left-[6%]   w-80 h-80 rounded-full bg-accent/6  blur-3xl animate-orb-float"   style={{ animationDelay: "0s" }} />
      <div className="absolute top-[18%] right-[4%]  w-96 h-96 rounded-full bg-accent/4  blur-3xl animate-orb-float-b" style={{ animationDelay: "-14s" }} />
      <div className="absolute top-[52%] left-[12%]  w-72 h-72 rounded-full bg-accent/5  blur-3xl animate-orb-float"   style={{ animationDelay: "-8s" }} />
      <div className="absolute top-[68%] right-[8%]  w-96 h-96 rounded-full bg-accent/4  blur-3xl animate-orb-float-b" style={{ animationDelay: "-26s" }} />
      <div className="absolute top-[38%] left-[42%]  w-64 h-64 rounded-full bg-accent/3  blur-3xl animate-orb-float"   style={{ animationDelay: "-36s" }} />
    </div>
  );
}

// ─── Timeline dot colors ──────────────────────────────────────────────────────

const timelineDot: Record<string, string> = {
  current:   "bg-accent",
  business:  "bg-accent/60",
  corporate: "bg-border",
  early:     "bg-border/50",
};

// ─── Shared entrance transition ───────────────────────────────────────────────

const sectionVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};
const sectionTransition = (delay: number) => ({
  duration: 0.5,
  delay,
  ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
});

// ─── Main component ───────────────────────────────────────────────────────────

export default function BentoGrid() {
  const [emailCopied, setEmailCopied] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);

  function copyEmail() {
    navigator.clipboard.writeText(person.contact.email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  }
  function copyPhone() {
    navigator.clipboard.writeText(person.contact.phone);
    setPhoneCopied(true);
    setTimeout(() => setPhoneCopied(false), 2000);
  }

  return (
    <motion.main
      className="flex-1 min-h-screen dot-grid pb-24 md:pb-0 relative overflow-hidden"
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1], delay: 0.15 }}
    >
      <AmbientOrbs />
      <div className="max-w-5xl mx-auto px-6 md:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* ── Profile (full row) ─────────────────────────────────────────── */}
          <motion.div
            className="md:col-span-2 lg:col-span-3"
            variants={sectionVariants}
            initial="initial"
            animate="animate"
            transition={sectionTransition(0.2)}
          >
            <Card
              id="about"
              className="bg-gradient-to-br from-accent/8 to-bg shadow-sm border border-accent/15"
            >
              <div
                className="absolute -top-14 -right-14 w-48 h-48 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, oklch(50% 0.22 258 / 0.15) 0%, transparent 70%)" }}
              />
              <div className="relative max-w-none">
                <Label>Profile</Label>
                <h2 className="font-heading text-2xl md:text-3xl leading-snug mb-3 animate-shimmer">
                  {person.tagline}
                </h2>
                <p className="text-sm text-text-muted leading-relaxed">
                  {person.bio}
                </p>
              </div>
            </Card>
          </motion.div>

          {/* ── Stats + Credentials ────────────────────────────────────────── */}
          <motion.div
            className="col-span-full flex flex-col lg:flex-row gap-6"
            variants={sectionVariants}
            initial="initial"
            animate="animate"
            transition={sectionTransition(0.3)}
          >
            <div className="flex-1 grid grid-cols-3 gap-6">
              {stats.map((stat, i) => (
                <AnimatedStat
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                  sub={stat.sub}
                  accent={statAccents[i]}
                  delay={i * 0.09}
                />
              ))}
            </div>

            {/* Credentials */}
            <Card
              id="credentials"
              className="lg:w-80 flex-shrink-0 bg-accent/6 shadow-sm border border-accent/20"
              featured
            >
              <div className="flex items-center gap-4">
                <div className="flex flex-col gap-2 flex-shrink-0">
                  {credentials.map((cred, i) => (
                    <span
                      key={cred.short}
                      className="px-3 py-1.5 rounded-lg bg-accent/15 border border-accent/30 text-xs font-semibold text-accent text-center animate-cert-glow hover:bg-accent/25 hover:border-accent/50 transition-colors duration-150 cursor-default"
                      style={{ animationDelay: `${i * 1.4}s` }}
                    >
                      {cred.short}
                    </span>
                  ))}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-accent mb-1.5">
                    Certified & Qualified
                  </p>
                  {credentials.map(cred => (
                    <div key={cred.name} className="mb-1">
                      <p className="text-sm font-semibold text-text leading-tight">{cred.name}</p>
                      <p className="text-xs text-text-muted">{cred.issuer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* ── What I Do (Services) ──────────────────────────────────────── */}
          <motion.div
            id="services"
            className="col-span-full"
            variants={sectionVariants}
            initial="initial"
            animate="animate"
            transition={sectionTransition(0.38)}
          >
            <Card className="bg-white shadow-sm border border-border/50">
              <Label>What I Do</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-1">
                {services.map((service, i) => {
                  const Icon = serviceIcons[service.iconName as ServiceIconName] ?? Zap;
                  return (
                    <motion.div
                      key={service.title}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-20px" }}
                      transition={{ duration: 0.4, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] }}
                      className="flex flex-col gap-3 p-4 rounded-xl bg-bg hover:bg-accent/6 border border-border/40 transition-colors duration-200"
                    >
                      <div className="w-9 h-9 rounded-lg bg-accent/15 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-heading text-sm font-semibold text-text mb-1">{service.title}</h3>
                        <p className="text-xs text-text-muted leading-relaxed mb-3">{service.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {service.highlights.map(h => (
                            <span key={h} className="px-2 py-0.5 rounded-full bg-accent/8 border border-accent/15 text-[10px] font-medium text-accent hover:bg-accent/18 hover:border-accent/30 transition-colors duration-150 cursor-default">
                              {h}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </Card>
          </motion.div>

          {/* ── Work: Case Studies + Timeline ────────────────────────────── */}
          <motion.div
            id="work"
            className="col-span-full flex flex-col gap-6"
            variants={sectionVariants}
            initial="initial"
            animate="animate"
            transition={sectionTransition(0.44)}
          >
            {/* Case Studies */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {caseStudies.map((cs, i) => (
                <div key={cs.client}>
                <Card
                  className="bg-white shadow-sm border border-border/50 h-full"
                  featured
                >
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {cs.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 rounded-full bg-accent/10 border border-accent/20 text-[10px] font-semibold text-accent hover:bg-accent/20 hover:border-accent/40 transition-colors duration-150 cursor-default">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-accent mb-1">
                    Case Study {i + 1}
                  </p>
                  <h3 className="font-heading text-base text-text leading-snug mb-0.5">{cs.client}</h3>
                  <p className="text-xs text-text-muted mb-1">{cs.industry} · {cs.scope}</p>
                  {cs.stack && (
                    <p className="text-[10px] text-text-muted/60 mb-3">
                      <span className="font-semibold text-text-muted/80">Stack:</span> {cs.stack}
                    </p>
                  )}
                  <p className="text-sm text-text-muted leading-relaxed mb-4">{cs.description}</p>
                  <div className="space-y-1.5 mt-auto">
                    {cs.outcomes.map((outcome, j) => (
                      <motion.div
                        key={outcome}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-10px" }}
                        transition={{ duration: 0.3, delay: j * 0.07, ease: [0.4, 0, 0.2, 1] }}
                        className="flex items-center gap-2"
                      >
                        <Check className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                        <span className="text-xs text-text">{outcome}</span>
                      </motion.div>
                    ))}
                  </div>
                  {cs.githubUrl && (
                    <a
                      href={cs.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-4 pt-3 border-t border-border/40 text-xs text-text-muted hover:text-accent transition-colors font-medium w-full"
                    >
                      <GitBranch className="w-3.5 h-3.5 flex-shrink-0" />
                      View documentation on GitHub
                      <ExternalLink className="w-3 h-3 ml-auto flex-shrink-0 opacity-60" />
                    </a>
                  )}
                </Card>
                </div>
              ))}
            </div>

            {/* Career Timeline */}
            <Card className="bg-white shadow-sm border border-border/50">
              <Label>Career Arc</Label>
              <div className="space-y-1">
                {timeline.map((item, i) => (
                  <div
                    key={i}
                    className={`flex gap-3 rounded-xl px-3 -mx-3 py-3 transition-colors duration-150 ${
                      item.type === "early" ? "opacity-45" : "hover:bg-bg"
                    }`}
                  >
                    <div className="flex flex-col items-center pt-1">
                      <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${timelineDot[item.type]}`} />
                      {i < timeline.length - 1 && (
                        <motion.div
                          className="w-px flex-1 bg-border/60 my-1 min-h-[1rem]"
                          initial={{ scaleY: 0 }}
                          whileInView={{ scaleY: 1 }}
                          viewport={{ once: true, margin: "-10px" }}
                          style={{ originY: 0 }}
                          transition={{ duration: 0.45, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] }}
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 mb-1">
                        <div className="flex flex-wrap items-baseline gap-x-1.5">
                          <span className="font-semibold text-sm text-text">{item.role}</span>
                          <span className="text-text-muted text-sm">· {item.company}</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-3 text-xs text-text-muted shrink-0">
                          <span>{item.period}</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {item.location}
                          </span>
                        </div>
                      </div>
                      {item.type !== "early" && (
                        <p className="text-xs text-text-muted leading-relaxed">{item.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* ── Skills (2 cols) ────────────────────────────────────────────── */}
          <motion.div
            id="skills"
            className="md:col-span-2"
            variants={sectionVariants}
            initial="initial"
            animate="animate"
            transition={sectionTransition(0.5)}
          >
            <Card className="bg-white shadow-sm border border-border/50">
              <Label>Skills & Tools</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {skillGroups.map((group, i) => (
                  <motion.div
                    key={group.category}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ duration: 0.4, delay: i * 0.08, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-accent mb-2">
                      {group.category}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {group.skills.map(skill => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 rounded-lg bg-bg border border-border text-xs font-medium text-text hover:border-accent/40 hover:bg-accent/6 transition-colors duration-150"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* ── References + Education (right col) ────────────────────────── */}
          <motion.div
            className="md:col-span-2 lg:col-span-1 flex flex-col gap-4 h-full"
            variants={sectionVariants}
            initial="initial"
            animate="animate"
            transition={sectionTransition(0.5)}
          >
            {/* References */}
            <Card className="bg-accent/6 shadow-sm border border-accent/20 flex-1" featured>
              <Label>References</Label>
              <div className="flex flex-col flex-1 gap-4">
                {references.map(ref => (
                  <div key={ref.name} className="flex-1 p-3 rounded-xl bg-white/60 border border-border/40 hover:bg-white/90 hover:border-accent/30 hover:shadow-sm transition-all duration-150 cursor-default flex flex-col justify-center">
                    <p className="font-semibold text-sm text-text">{ref.name}</p>
                    <p className="text-xs text-accent font-medium">{ref.role}</p>
                    <p className="text-xs text-text-muted mt-0.5">{ref.company}</p>
                    <div className="mt-2 space-y-0.5">
                      <p className="text-xs text-text-muted">{ref.phone}</p>
                      <p className="text-xs text-text-muted break-all">{ref.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Education */}
            <Card
              id="education"
              className="bg-white shadow-sm border border-border/50"
              featured
            >
              <Label>Education</Label>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/12 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Award className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-heading text-base text-text leading-snug">
                    {education.fullDegree}
                  </h3>
                  <p className="text-xs text-accent font-semibold mt-0.5">{education.major}</p>
                  <p className="text-sm font-semibold text-text-muted mt-0.5">
                    {education.institution}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-text-muted mt-1">
                    <MapPin className="w-3 h-3" />
                    {education.location}
                  </div>
                  <p className="text-xs text-text-muted/70 mt-0.5">{education.period}</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border/40 space-y-2.5">
                {credentials.map((cred) => (
                  <div key={cred.name} className="flex items-center gap-2.5">
                    <span className="px-2 py-0.5 rounded-md bg-accent/12 border border-accent/25 text-[10px] font-semibold text-accent flex-shrink-0 hover:bg-accent/22 hover:border-accent/45 transition-colors duration-150 cursor-default">
                      {cred.short}
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-text leading-tight">{cred.name}</p>
                      <p className="text-[10px] text-text-muted">{cred.issuer} · Certified</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* ── Contact CTA (full row) ─────────────────────────────────────── */}
          <motion.div
            id="contact"
            className="md:col-span-2 lg:col-span-3"
            variants={sectionVariants}
            initial="initial"
            animate="animate"
            transition={sectionTransition(0.56)}
          >
            <Card className="bg-gradient-to-br from-accent/8 via-bg to-bg shadow-sm border border-accent/15">
              <div
                className="absolute -top-16 -right-16 w-56 h-56 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, oklch(50% 0.22 258 / 0.12) 0%, transparent 70%)" }}
              />
              <div className="relative text-center">
                <Label center>Ready to Work Together?</Label>
                <h3 className="font-heading text-2xl md:text-3xl text-text mt-2 mb-2">
                  Let&apos;s talk about your business.
                </h3>
                <p className="text-sm text-text-muted mb-6 max-w-md mx-auto">
                  Book a free discovery call to discuss your AI automation, agent systems, or workflow engineering goals. International engagements welcome.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-sm mx-auto">
                  <a
                    href={person.calUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-accent text-white text-sm font-semibold hover:bg-accent-hover transition-colors shadow-sm"
                  >
                    <Calendar className="w-4 h-4" />
                    Book a Discovery Call
                  </a>
                  <a
                    href={`mailto:${person.contact.email}`}
                    onClick={copyEmail}
                    className="flex items-center justify-center gap-2 py-3 px-6 rounded-xl border border-accent/30 text-accent text-sm font-semibold hover:bg-accent/8 transition-colors"
                  >
                    {emailCopied ? <Check className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                    {emailCopied ? "Copied!" : "Send Email"}
                  </a>
                </div>
                <a
                  href={`tel:${person.contact.phone.replace(/\s/g, "")}`}
                  onClick={copyPhone}
                  className="inline-flex items-center gap-1.5 mt-4 text-sm text-text-muted hover:text-accent hover:underline transition-colors font-medium"
                >
                  {phoneCopied ? <Check className="w-3.5 h-3.5" /> : <Phone className="w-3.5 h-3.5" />}
                  {phoneCopied ? "Copied!" : person.contact.phone}
                </a>
                <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-text-muted">
                  <a href={person.contact.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-accent transition-colors">
                    <ExternalLink className="w-3 h-3" />
                    linkedin.com/in/jasherchan
                  </a>
                  <a href={person.contact.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-accent transition-colors">
                    <GitBranch className="w-3 h-3" />
                    github.com/jasherjoshuachan
                  </a>
                </div>
              </div>
            </Card>
          </motion.div>

        </div>
      </div>
    </motion.main>
  );
}
