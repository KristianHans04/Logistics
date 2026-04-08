import { ScrollReveal } from "@/components/shared/ScrollReveal";

const dispatches = [
  {
    id: "D-2026-012",
    date: "2026-04-18",
    title: "Field Report: Unexpected Route Change",
    category: "Operations",
    summary:
      "An operative's planned route was disrupted mid-transit due to unforeseen environmental changes. The cargo was rerouted successfully but arrived later than projected. Debrief confirmed that better initial route assessment would have flagged the risk earlier.",
    status: "Resolved",
  },
  {
    id: "D-2026-011",
    date: "2026-04-11",
    title: "Advisory: Multiple Shipments in Transit",
    category: "Compliance",
    summary:
      "A reminder has been issued to all operatives: Protocol P-002 exists for a reason. We've observed an increase in operatives attempting to manage multiple active shipments at once. This consistently results in at least one failed delivery. Focus on one at a time.",
    status: "Active",
  },
  {
    id: "D-2026-010",
    date: "2026-04-03",
    title: "Recovery Division Case Summary",
    category: "Recovery",
    summary:
      "A matter referred to Recovery on March 15 has been resolved. Total resolution time: 36 hours. The obligating party cooperated after the Fixer made initial contact. No further action required.",
    status: "Closed",
  },
  {
    id: "D-2026-009",
    date: "2026-03-27",
    title: "New Operative Cleared: Level 2",
    category: "Clearance",
    summary:
      "Following a successful probation period and endorsement from two existing Level 2 operatives, a new member has been granted full operational clearance. The Department welcomes all new operatives but expects adherence to standards from day one.",
    status: "Confirmed",
  },
  {
    id: "D-2026-008",
    date: "2026-03-20",
    title: "Cargo Assessment Failure: Lessons Learned",
    category: "Operations",
    summary:
      "An operative committed resources to a shipment without conducting a proper initial assessment. The cargo turned out to be significantly more complicated than anticipated. The delivery failed at the transit stage. This is exactly why Protocol P-001 exists.",
    status: "Archived",
  },
  {
    id: "D-2026-007",
    date: "2026-03-12",
    title: "Debrief: Successful Long-Haul Delivery",
    category: "Operations",
    summary:
      "An operative completed a complex, multi-phase delivery over a four-month period. The route required multiple adjustments, two holds, and a full re-assessment at the halfway point. Final outcome: successful delivery, all obligations settled. Textbook operation.",
    status: "Archived",
  },
];

const statusColor: Record<string, string> = {
  Resolved: "text-text-muted",
  Active: "text-navy",
  Closed: "text-text-muted",
  Confirmed: "text-text-muted",
  Archived: "text-text-muted",
};

export default function Dispatches() {
  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div className="mx-auto max-w-4xl px-6">
          <ScrollReveal>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Dispatches
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg text-text-secondary leading-relaxed">
              Field reports, operational updates, and internal advisories from
              across the Department. These are shared with cleared operatives to
              keep everyone aligned.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Dispatch list */}
      <section className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-4xl px-6">
          {dispatches.map((dispatch, i) => (
            <ScrollReveal key={dispatch.id} delay={i * 0.05}>
              <article
                className={`py-8 sm:py-10 ${i < dispatches.length - 1 ? "border-b border-border" : ""}`}
              >
                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-4">
                  <span className="font-mono text-xs text-text-muted tracking-wider">
                    {dispatch.id}
                  </span>
                  <span className="text-border select-none">|</span>
                  <span className="text-xs text-text-muted">
                    {dispatch.date}
                  </span>
                  <span className="text-border select-none">|</span>
                  <span className="text-xs font-medium text-text-muted uppercase tracking-wider">
                    {dispatch.category}
                  </span>
                  <span className="ml-auto">
                    <span
                      className={`font-mono text-xs tracking-wider ${statusColor[dispatch.status] || "text-text-muted"}`}
                    >
                      {dispatch.status}
                    </span>
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-text mb-3 sm:text-xl">
                  {dispatch.title}
                </h3>

                {/* Body */}
                <p className="text-sm text-text-secondary leading-relaxed sm:text-base sm:leading-relaxed">
                  {dispatch.summary}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Archive note */}
      <section className="bg-surface-muted py-12 sm:py-16">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <ScrollReveal>
            <p className="text-sm text-text-muted">
              Older dispatches are archived and available to Level 3+ operatives
              upon request. Contact the Director's Office for access.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
