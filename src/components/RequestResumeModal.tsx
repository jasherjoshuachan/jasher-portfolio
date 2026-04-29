"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle, AlertCircle, FileText } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export default function RequestResumeModal({ onClose }: { onClose: () => void }) {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", company: "", email: "", role: "" });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const webhookUrl = process.env.NEXT_PUBLIC_N8N_RESUME_WEBHOOK;
      if (!webhookUrl) throw new Error("Webhook not configured");
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          source: "portfolio",
          timestamp: new Date().toISOString(),
          referrer: typeof window !== "undefined" ? document.referrer : "",
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const field = (
    id: keyof typeof form,
    label: string,
    type = "text",
    required = true,
    placeholder = ""
  ) => (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-xs font-medium text-white/70">
        {label}{required && <span className="text-accent ml-0.5">*</span>}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        placeholder={placeholder}
        value={form[id]}
        onChange={(e) => setForm((f) => ({ ...f, [id]: e.target.value }))}
        className="w-full px-3 py-2 rounded-lg bg-white/8 border border-white/12 text-ink-text text-sm placeholder:text-white/30 focus:outline-none focus:border-accent/60 focus:bg-white/12 transition-colors"
      />
    </div>
  );

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: "rgba(0,0,0,0.72)", backdropFilter: "blur(6px)" }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 12 }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          className="w-full max-w-sm rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
          style={{ background: "oklch(13% 0.022 254)" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-accent/15 border border-accent/30 flex items-center justify-center">
                <FileText className="w-3.5 h-3.5 text-accent" />
              </div>
              <div>
                <p className="text-sm font-semibold text-ink-text">Request Resume</p>
                <p className="text-[10px] text-ink-muted">Sent directly to your inbox</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-ink-muted hover:text-ink-text hover:bg-white/8 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="px-5 py-4">
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center text-center gap-3 py-4"
              >
                <div className="w-12 h-12 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink-text">On its way!</p>
                  <p className="text-xs text-ink-muted mt-1">
                    Check your inbox —<br />the resume link will arrive within a few minutes.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="mt-1 text-xs text-accent hover:underline"
                >
                  Close
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                {field("name", "Full Name", "text", true, "Jane Smith")}
                {field("company", "Company / Organisation", "text", true, "Acme Corp")}
                {field("email", "Work Email", "email", true, "jane@acmecorp.com")}
                {field("role", "Your Role", "text", false, "HR Manager, Recruiter…")}

                {status === "error" && (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    Something went wrong. Please try emailing directly.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="mt-1 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-accent hover:bg-accent-hover border border-accent/40 text-white text-sm font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  {status === "loading" ? "Sending…" : "Send Me the Resume"}
                </button>

                <p className="text-center text-[10px] text-ink-muted">
                  No spam. Your details are used only to send you the resume.
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
