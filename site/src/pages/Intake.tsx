import { useState, type FormEvent } from "react";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

export default function Intake() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
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
          {submitted ? (
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
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-text mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full border border-border bg-white px-4 py-3 text-sm text-text placeholder:text-text-muted outline-none focus:border-navy transition-colors"
                    placeholder="As it appears on official documents"
                  />
                </div>

                {/* Handle / callsign */}
                <div>
                  <label
                    htmlFor="handle"
                    className="block text-sm font-medium text-text mb-2"
                  >
                    Callsign / Handle
                  </label>
                  <input
                    id="handle"
                    name="handle"
                    type="text"
                    className="w-full border border-border bg-white px-4 py-3 text-sm text-text placeholder:text-text-muted outline-none focus:border-navy transition-colors"
                    placeholder="What the boys call you"
                  />
                </div>

                {/* Contact */}
                <div>
                  <label
                    htmlFor="contact"
                    className="block text-sm font-medium text-text mb-2"
                  >
                    Contact Method
                  </label>
                  <input
                    id="contact"
                    name="contact"
                    type="text"
                    required
                    className="w-full border border-border bg-white px-4 py-3 text-sm text-text placeholder:text-text-muted outline-none focus:border-navy transition-colors"
                    placeholder="Email, phone, or preferred channel"
                  />
                </div>

                {/* Inquiry type */}
                <div>
                  <label
                    htmlFor="type"
                    className="block text-sm font-medium text-text mb-2"
                  >
                    Inquiry Type
                  </label>
                  <select
                    id="type"
                    name="type"
                    required
                    className="w-full border border-border bg-white px-4 py-3 text-sm text-text outline-none focus:border-navy transition-colors appearance-none"
                  >
                    <option value="">Select one</option>
                    <option value="clearance">Clearance Application</option>
                    <option value="debrief">Debrief Submission</option>
                    <option value="recovery">Recovery Report</option>
                    <option value="general">General Inquiry</option>
                    <option value="complaint">Compliance Complaint</option>
                  </select>
                </div>

                {/* Referral */}
                <div>
                  <label
                    htmlFor="referral"
                    className="block text-sm font-medium text-text mb-2"
                  >
                    Referred By
                  </label>
                  <input
                    id="referral"
                    name="referral"
                    type="text"
                    className="w-full border border-border bg-white px-4 py-3 text-sm text-text placeholder:text-text-muted outline-none focus:border-navy transition-colors"
                    placeholder="Name of the operative who sent you (if applicable)"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-text mb-2"
                  >
                    Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="w-full border border-border bg-white px-4 py-3 text-sm text-text placeholder:text-text-muted outline-none focus:border-navy transition-colors resize-y"
                    placeholder="Describe your situation. Be specific. Be honest."
                  />
                </div>

                {/* Submit */}
                <div>
                  <button
                    type="submit"
                    className="bg-navy px-8 py-3 text-sm font-medium text-white hover:bg-navy/90 transition-colors cursor-pointer"
                  >
                    Submit
                  </button>
                  <p className="mt-3 text-xs text-text-muted">
                    All submissions are confidential and reviewed within 72
                    hours.
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
              this form. Contact the Director's Office directly through
              established internal channels.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
