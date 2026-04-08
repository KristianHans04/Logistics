import { useState, type FormEvent, type ChangeEvent } from "react";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

interface FormState {
  name: string;
  handle: string;
  contact: string;
  type: string;
  referral: string;
  message: string;
}

const INITIAL: FormState = {
  name: "",
  handle: "",
  contact: "",
  type: "",
  referral: "",
  message: "",
};

const inputClass =
  "w-full border border-border bg-white px-4 py-3 text-sm text-text placeholder:text-text-muted outline-none focus:border-navy focus:ring-2 focus:ring-navy/10 transition-all duration-200";

export default function Intake() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("done");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div className="mx-auto max-w-3xl px-6">
          <ScrollReveal>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Intake
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mt-6 max-w-xl text-lg text-text-secondary leading-relaxed">
              Want to join the Department, report a matter, or get in touch?
              Fill out the form below. All submissions are reviewed by the
              Director's Office.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Form */}
      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-2xl px-6">
          {status === "done" ? (
            <ScrollReveal>
              <div className="border border-border p-8 sm:p-12 text-center">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center border border-border">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-navy">
                    <path d="M3 10l5 5 9-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold mb-4">
                  Submission Received
                </h2>
                <p className="text-text-secondary leading-relaxed">
                  Your inquiry has been logged and forwarded to the
                  Director's Office. If your matter requires action, you'll
                  hear from us. If it doesn't, you won't.
                </p>
                <p className="mt-4 text-sm text-text-muted">
                  Do not submit duplicate requests.
                </p>
              </div>
            </ScrollReveal>
          ) : (
            <ScrollReveal>
              <form onSubmit={handleSubmit} className="flex flex-col gap-7">
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-xs font-semibold tracking-wider uppercase text-text-secondary">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="As it appears on official documents"
                  />
                </div>

                {/* Handle */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="handle" className="text-xs font-semibold tracking-wider uppercase text-text-secondary">
                    Callsign / Handle
                  </label>
                  <input
                    id="handle"
                    name="handle"
                    type="text"
                    value={form.handle}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="What we know you by"
                  />
                </div>

                {/* Contact */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact" className="text-xs font-semibold tracking-wider uppercase text-text-secondary">
                    Contact Method
                  </label>
                  <input
                    id="contact"
                    name="contact"
                    type="text"
                    required
                    value={form.contact}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Email, phone, or preferred channel"
                  />
                </div>

                {/* Inquiry type */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="type" className="text-xs font-semibold tracking-wider uppercase text-text-secondary">
                    Inquiry Type
                  </label>
                  <div className="relative">
                    <select
                      id="type"
                      name="type"
                      required
                      value={form.type}
                      onChange={handleChange}
                      className={`${inputClass} appearance-none pr-10 cursor-pointer`}
                    >
                      <option value="">Select one</option>
                      <option value="Clearance Application">Clearance Application</option>
                      <option value="Debrief Submission">Debrief Submission</option>
                      <option value="Recovery Report">Recovery Report</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Compliance Complaint">Compliance Complaint</option>
                    </select>
                    {/* Custom chevron */}
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-text-muted">
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                        <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </div>

                {/* Referral */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="referral" className="text-xs font-semibold tracking-wider uppercase text-text-secondary">
                    Referred By
                  </label>
                  <input
                    id="referral"
                    name="referral"
                    type="text"
                    value={form.referral}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Name of the operative who sent you (if applicable)"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-xs font-semibold tracking-wider uppercase text-text-secondary">
                    Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    className={`${inputClass} resize-y`}
                    placeholder="Describe your situation. Be specific. Be honest."
                  />
                </div>

                {status === "error" && (
                  <div className="border border-red-200 bg-red-50 px-4 py-3">
                    <p className="text-sm text-red-700">
                      Submission failed. Please try again or reach out through internal channels.
                    </p>
                  </div>
                )}

                {/* Submit */}
                <div className="flex flex-col gap-3">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="self-start bg-navy px-8 py-3 text-sm font-medium text-white hover:bg-navy-light hover:-translate-y-px active:translate-y-0 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
                  >
                    {status === "submitting" ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Submitting...
                      </span>
                    ) : (
                      "Submit"
                    )}
                  </button>
                  <p className="text-xs text-text-muted">
                    All submissions are confidential and reviewed within 72 hours.
                  </p>
                </div>
              </form>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* Alternative contact */}
      <section className="bg-surface-muted py-12 sm:py-16">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <ScrollReveal>
            <p className="text-sm text-text-muted">
              For urgent matters involving the Recovery Division, do not use
              this form. Contact the Chief of Staff through established internal
              channels.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
