import { ScrollReveal } from "@/components/shared/ScrollReveal";

const protocols = [
  {
    id: "P-001",
    title: "Know Your Cargo",
    body: "Before committing to any shipment, operatives must conduct a proper assessment. Understand what you're dealing with, evaluate the conditions, and make an informed call. We don't do blind deliveries.",
  },
  {
    id: "P-002",
    title: "One Shipment at a Time",
    body: "Do not attempt to manage multiple active shipments simultaneously. Divided attention leads to failed deliveries. Focus on the operation in front of you. When it's done, you move to the next one.",
  },
  {
    id: "P-003",
    title: "Document Everything",
    body: "Every operation should be debriefed with the team. What happened, how it went, what you learned. The Department improves through shared experience. Silence helps no one.",
  },
  {
    id: "P-004",
    title: "Respect the Timeline",
    body: "Rushing a delivery is the fastest way to damage the cargo. Every shipment has its own pace. Respect it. The worst outcomes happen when operatives try to force a timeline that doesn't fit.",
  },
  {
    id: "P-005",
    title: "No Unauthorized Handling",
    body: "If a shipment has been assigned to another operative, leave it alone. Interference with another operative's cargo is a direct violation. This is non-negotiable.",
  },
  {
    id: "P-006",
    title: "Maintain Operational Integrity",
    body: "What happens in operations stays in operations. Briefings are internal. Debriefs are internal. Do not share operational details outside the Department. Loose comms sink ships.",
  },
  {
    id: "P-007",
    title: "Failed Deliveries Are Not the End",
    body: "Not every delivery succeeds. That's reality. The Department does not penalize failed deliveries -- only failed process. If you followed protocol and it still didn't work out, debrief and move on. There's always more cargo.",
  },
  {
    id: "P-008",
    title: "The Recovery Division Exists for a Reason",
    body: "If someone outside the Department has an outstanding obligation that hasn't been settled, Recovery handles it. Do not attempt personal enforcement. Escalate through proper channels.",
  },
  {
    id: "P-009",
    title: "Vetting Is Non-Negotiable",
    body: "New members enter through referral only. The clearance process is not optional and cannot be rushed. If someone isn't cleared, they're not part of this -- no matter who they know.",
  },
  {
    id: "P-010",
    title: "Represent the Department",
    body: "You carry the Department's name in every operation. Conduct yourself accordingly. Poor handling reflects on everyone, not just you.",
  },
];

export default function Protocols() {
  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div className="mx-auto max-w-4xl px-6">
          <ScrollReveal>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Protocols
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg text-text-secondary leading-relaxed">
              The Department runs on a set of core principles. These aren't
              suggestions. Every operative is expected to know them and follow
              them. No exceptions.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Protocol list */}
      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-3xl px-6">
          {protocols.map((protocol, i) => (
            <ScrollReveal key={protocol.id} delay={i * 0.05}>
              <article
                className={`py-10 sm:py-12 ${i < protocols.length - 1 ? "border-b border-border" : ""}`}
              >
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="font-mono text-xs text-text-muted tracking-wider flex-shrink-0">
                    {protocol.id}
                  </span>
                  <h3 className="text-lg font-semibold text-text sm:text-xl">
                    {protocol.title}
                  </h3>
                </div>
                <p className="text-base text-text-secondary leading-relaxed pl-0 sm:pl-[4.5rem]">
                  {protocol.body}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Closing note */}
      <section className="bg-surface-dark py-16 sm:py-24">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <ScrollReveal>
            <p className="text-lg text-text-inverse-muted leading-relaxed">
              These protocols exist because the Department has learned from
              experience. Every rule here was written because someone, at some
              point, did the opposite -- and it didn't end well.
            </p>
            <p className="mt-6 font-mono text-xs tracking-wider text-text-inverse-muted">
              Updated annually by the Standards Review Board
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
