import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Link } from "react-router";
import { ArrowRight } from "@/components/icons";

export default function Recovery() {
  return (
    <>
      {/* Full-screen dark opening */}
      <section className="relative flex min-h-[70vh] items-end bg-surface-dark overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(30,58,95,0.25)_0%,_transparent_60%)]" />
        <div className="relative z-10 mx-auto w-full max-w-4xl px-6 pb-20 sm:pb-28">
          <ScrollReveal>
            <span className="font-mono text-xs tracking-widest text-text-inverse-muted uppercase">
              Recovery Division
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-text-inverse sm:text-5xl lg:text-6xl">
              We settle what's owed.
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="mt-6 max-w-xl text-lg text-text-inverse-muted leading-relaxed">
              When a delivery fails and someone walks away without settling
              their obligations, the Recovery Division is activated. We don't
              negotiate. We resolve.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* About the Division */}
      <section className="bg-surface-navy py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <ScrollReveal>
              <div>
                <h2 className="text-2xl font-semibold text-text-inverse mb-6">
                  What We Do
                </h2>
                <p className="text-base text-text-inverse-muted leading-relaxed">
                  Most operations go smoothly. Cargo is delivered, obligations
                  are settled, and everyone moves on. But occasionally, someone
                  doesn't hold up their end. Debts go unpaid. Commitments are
                  broken. Things are left unresolved.
                </p>
                <p className="mt-4 text-base text-text-inverse-muted leading-relaxed">
                  That's when we get called.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div>
                <h2 className="text-2xl font-semibold text-text-inverse mb-6">
                  How It Works
                </h2>
                <p className="text-base text-text-inverse-muted leading-relaxed">
                  A case is referred to the Recovery Division through the
                  Director's Office. A Fixer is assigned. The situation is
                  assessed, contact is made, and the matter is resolved.
                </p>
                <p className="mt-4 text-base text-text-inverse-muted leading-relaxed">
                  We have never left a case unresolved.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* The Fixer */}
      <section className="bg-surface-dark py-20 sm:py-28 border-t border-border-dark">
        <div className="mx-auto max-w-3xl px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="font-mono text-xs tracking-widest text-text-inverse-muted uppercase">
                Personnel
              </span>
              <h2 className="mt-4 text-3xl font-bold text-text-inverse sm:text-4xl">
                The Fixer
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="border border-border-dark p-8 sm:p-12">
              <p className="text-base text-text-inverse-muted leading-relaxed sm:text-lg sm:leading-relaxed">
                The Fixer is the person assigned to your case when you've failed
                to settle what you owe. You've probably heard the name before.
                Everyone has.
              </p>
              <p className="mt-6 text-base text-text-inverse-muted leading-relaxed sm:text-lg sm:leading-relaxed">
                Large presence. Direct approach. No small talk. The Fixer
                doesn't send emails or leave voicemails. When a Fixer shows up,
                the situation is handled. Quickly and completely.
              </p>
              <p className="mt-6 text-base text-text-inverse-muted leading-relaxed sm:text-lg sm:leading-relaxed">
                If a Fixer has been assigned to your matter, it's already too
                late to handle it on your own. Cooperate and settle what's owed.
                That's the best advice anyone can give you.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="mt-12 grid gap-px bg-border-dark sm:grid-cols-3">
              {[
                { label: "Resolution Rate", value: "100%" },
                { label: "Average Resolution Time", value: "48 hours" },
                { label: "Active Fixers", value: "Classified" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-surface-dark p-6 text-center"
                >
                  <span className="block text-2xl font-bold text-text-inverse">
                    {stat.value}
                  </span>
                  <span className="mt-1 block text-xs text-text-inverse-muted font-mono tracking-wider">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ-style */}
      <section className="bg-surface-navy py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <ScrollReveal>
            <h2 className="text-xs font-semibold tracking-widest text-text-inverse-muted uppercase mb-12">
              Common Questions
            </h2>
          </ScrollReveal>

          {[
            {
              q: "Can I stop the process once a Fixer has been assigned?",
              a: "No. Once a case is referred to Recovery, it is resolved through Recovery. Personal resolution attempts are no longer accepted at that stage.",
            },
            {
              q: "What if I think the case was filed in error?",
              a: "Disputes can be submitted to the Director's Office. However, the Recovery process is not paused during review.",
            },
            {
              q: "Has a Fixer ever failed to resolve a case?",
              a: "No.",
            },
            {
              q: "How do I avoid Recovery involvement?",
              a: "Settle your obligations on time. That's it. The Department is very reasonable with operatives who communicate and follow through. Recovery only gets involved when someone stops communicating.",
            },
          ].map((faq, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <div
                className={`py-8 ${i > 0 ? "border-t border-border-dark" : ""}`}
              >
                <h3 className="text-base font-semibold text-text-inverse mb-3">
                  {faq.q}
                </h3>
                <p className="text-sm text-text-inverse-muted leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-surface-dark py-16 sm:py-24 border-t border-border-dark">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <ScrollReveal>
            <p className="text-base text-text-inverse-muted mb-8">
              If you have an outstanding matter and want to resolve it before
              escalation, contact the Department directly.
            </p>
            <Link
              to="/intake"
              className="inline-flex items-center gap-2 border border-text-inverse-muted px-6 py-3 text-sm font-medium text-text-inverse no-underline hover:bg-white/5 transition-colors"
            >
              Contact the Department
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
