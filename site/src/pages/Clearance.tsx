import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Link } from "react-router";
import { ArrowRight } from "@/components/icons";

const levels = [
  {
    tier: "Level 0",
    name: "Unverified",
    access: "None",
    description:
      "You've heard of the Department. Maybe someone mentioned it in passing. But you haven't been through the process yet. You're on the outside looking in.",
    requirements: [
      "No prior association with the Department",
      "No verified references from active operatives",
    ],
  },
  {
    tier: "Level 1",
    name: "Probationary",
    access: "Limited",
    description:
      "You've been referred by an existing member and your initial background has been reviewed. You can observe operations, but you can't touch cargo. You're being watched.",
    requirements: [
      "Referral from a Level 2+ operative",
      "Background review completed",
      "Probation period: minimum 30 days",
    ],
  },
  {
    tier: "Level 2",
    name: "Cleared Operative",
    access: "Standard",
    description:
      "Full operational clearance. You can handle cargo, plan routes, run transit ops, and access the briefing room. You've earned it. Don't waste it.",
    requirements: [
      "Completed probation with no incidents",
      "Demonstrated operational competence",
      "Cleared by two existing Level 2+ operatives",
    ],
  },
  {
    tier: "Level 3",
    name: "Senior Operative",
    access: "Extended",
    description:
      "You've handled enough operations to know the system inside out. You vet new applicants, review compliance issues, and have a say in Department decisions. Experience is the only way here.",
    requirements: [
      "Sustained track record across multiple operations",
      "Zero compliance violations",
      "Approval from the Director's Office",
    ],
  },
  {
    tier: "Level 4",
    name: "Director",
    access: "Unrestricted",
    description:
      "You don't apply for this. The Department comes to you. Directors oversee all operations, authorize the Recovery Division, and define the standards. If you're reading this and wondering how to get here, you're not ready.",
    requirements: ["By appointment only", "Details are not disclosed"],
  },
];

export default function Clearance() {
  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div className="mx-auto max-w-4xl px-6">
          <ScrollReveal>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Clearance
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg text-text-secondary leading-relaxed">
              Not everyone gets access to the Department. There's a process.
              You're either cleared or you're not -- and the distinction matters.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Process overview */}
      <section className="bg-surface-muted py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <ScrollReveal>
            <h2 className="text-2xl font-semibold mb-8">How It Works</h2>
          </ScrollReveal>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                step: "01",
                title: "Referral",
                desc: "Someone already inside vouches for you. We don't accept walk-ins.",
              },
              {
                step: "02",
                title: "Review",
                desc: "Your background, character, and operational history are evaluated by the clearance board.",
              },
              {
                step: "03",
                title: "Decision",
                desc: "You're either cleared for probation or you're not. The board's decision is final.",
              },
            ].map((item, i) => (
              <ScrollReveal key={item.step} delay={i * 0.1}>
                <div className="bg-white p-6 sm:p-8 border border-border">
                  <span className="font-mono text-xs text-text-muted">
                    {item.step}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Clearance Levels -- dossier-style stacked cards */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <ScrollReveal>
            <h2 className="text-xs font-semibold tracking-widest text-text-muted uppercase mb-12">
              Clearance Levels
            </h2>
          </ScrollReveal>

          <div className="flex flex-col gap-6">
            {levels.map((level, i) => (
              <ScrollReveal key={level.tier} delay={i * 0.08}>
                <div
                  className={`border p-6 sm:p-8 ${
                    level.tier === "Level 4"
                      ? "border-navy bg-surface-dark text-text-inverse"
                      : "border-border bg-white"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                    <div>
                      <span
                        className={`font-mono text-xs tracking-wider ${
                          level.tier === "Level 4"
                            ? "text-text-inverse-muted"
                            : "text-text-muted"
                        }`}
                      >
                        {level.tier}
                      </span>
                      <h3
                        className={`mt-1 text-xl font-semibold ${
                          level.tier === "Level 4"
                            ? "text-text-inverse"
                            : "text-text"
                        }`}
                      >
                        {level.name}
                      </h3>
                    </div>
                    <span
                      className={`font-mono text-xs tracking-wider ${
                        level.tier === "Level 4"
                          ? "text-text-inverse-muted"
                          : "text-text-muted"
                      }`}
                    >
                      Access: {level.access}
                    </span>
                  </div>

                  <p
                    className={`text-sm leading-relaxed mb-4 ${
                      level.tier === "Level 4"
                        ? "text-text-inverse-muted"
                        : "text-text-secondary"
                    }`}
                  >
                    {level.description}
                  </p>

                  <div
                    className={`border-t pt-4 ${
                      level.tier === "Level 4"
                        ? "border-border-dark"
                        : "border-border"
                    }`}
                  >
                    <span
                      className={`text-xs font-medium tracking-wider uppercase ${
                        level.tier === "Level 4"
                          ? "text-text-inverse-muted"
                          : "text-text-muted"
                      }`}
                    >
                      Requirements
                    </span>
                    <ul className="mt-2 space-y-1">
                      {level.requirements.map((req) => (
                        <li
                          key={req}
                          className={`text-sm ${
                            level.tier === "Level 4"
                              ? "text-text-inverse-muted"
                              : "text-text-secondary"
                          }`}
                        >
                          -- {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface-muted py-16 sm:py-24">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <ScrollReveal>
            <h2 className="text-2xl font-semibold mb-4">
              Think you belong here?
            </h2>
            <p className="text-text-secondary mb-8">
              Submit your details. If someone inside has referred you, say so.
              If not, we'll be honest with you.
            </p>
            <Link
              to="/intake"
              className="inline-flex items-center gap-2 bg-navy px-6 py-3 text-sm font-medium text-white no-underline hover:bg-navy-light hover:-translate-y-px active:translate-y-0 transition-all duration-200"
            >
              Start Intake Process
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
