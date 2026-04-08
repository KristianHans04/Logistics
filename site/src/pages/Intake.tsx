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
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text mb-2">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full border border-border bg-white px-4 py-3 text-sm text-text placeholder:text-text-muted outline-none focus:border-navy transition-colors"
                    placeholder="As it appears on official documents"
                  />
                </div>

                {/* Handle */}
                <div>
                  <label htmlFor="handle" className="block text-sm font-medium text-text mb-2">
                    Callsign / Handle
                  </label>
                  <input
                    id="handle"
                    name="handle"
                    type="text"
                    value={form.handle}
                    onChange={handleChange}
                    className="w-full border border-border bg-white px-4 py-3 text-sm text-text placeholder:text-text-muted outline-none focus:border-navy transition-colors"
                    placeholder="What the boys call you"
                  />
                </div>

                {/* Contact */}
                <div>
                  <label htmlFor="contact" className="block text-sm font-medium text-text mb-2">
                    Contact Method
                  </label>
                  <input
                    id="contact"
                    name="contact"
                    type="text"
                    required
                    value={form.contact}
                    onChange={handleChange}
                    className="w-full border border-border bg-white px-4 py-3 text-sm text-text placeholder:text-text-muted outline-none focus:border-navy transition-colors"
                    placeholder="Email, phone, or preferred channel"
                  />
                </div>

                {/* Inquiry type */}
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-text mb-2">
                    Inquiry Type
                  </label>
                  <select
                    id="type"
                    name="type"
                    required
                    value={form.type}
                    onChange={handleChange}
                    className="w-full border border-border bg-white px-4 py-3 text-sm text-text outline-none focus:border-navy transition-colors appearance-none"
                  >
                    <option value="">Select one</option>
                    <option value="Clearance Application">Clearance Application</option>
                    <option value="Debrief Submission">Debrief Submission</option>
                    <option value="Recovery Report">Recovery Report</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Compliance Complaint">Compliance Complaint</option>
                  </select>
                </div>

                {/* Referral */}
                <div>
                  <label htmlFor="referral" className="block text-sm font-medium text-text mb-2">
                    Referred By
                  </label>
                  <input
                    id="referral"
                    name="referral"
                    type="text"
                    value={form.referral}
                    onChange={handleChange}
                    className="w-full border border-border bg-white px-4 py-3 text-sm text-text placeholder:text-text-muted outline-none focus:border-navy transition-colors"
                    placeholder="Name of the operative who sent you (if applicable)"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-text mb-2">
                    Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    className="w-full border border-border bg-white px-4 py-3 text-sm text-text placeholder:text-text-muted outline-none focus:border-navy transition-colors resize-y"
                    placeholder="Describe your situation. Be specific. Be honest."
                  />
                </div>

                {status === "error" && (
                  <p className="text-sm text-red-600">
                    Something went wrong. Please try again or reach out directly.
                  </p>
                )}

                {/* Submit */}
                <div>
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="bg-navy px-8 py-3 text-sm font-medium text-white hover:bg-navy/90 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "submitting" ? "Submitting..." : "Submit"}
                  </button>
                  <p className="mt-3 text-xs text-text-muted">
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
