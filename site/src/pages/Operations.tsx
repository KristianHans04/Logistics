import { Link } from "react-router";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { ArrowRight } from "@/components/icons";

const divisions = [
  {
    title: "Clearing & Forwarding",
    description:
      "The first point of contact. We assess new cargo, evaluate the conditions, and determine whether it's ready for transit. Some shipments clear fast. Others need more work before they can move.",
    note: "This is where every operation begins.",
  },
  {
    title: "Transit & Handling",
    description:
      "Once a shipment is cleared, we manage the entire journey. Monitoring conditions, adjusting routes in real time, making sure nothing gets damaged along the way. Active shipments require active attention.",
    note: "Safe movement is everything.",
  },
  {
    title: "Route Planning & Strategy",
    description:
      "Not every delivery is straightforward. Some require careful planning, timing, and environmental awareness. Our strategists design custom routes for complex operations so nothing is left to chance.",
    note: "Preparation separates success from failure.",
  },
  {
    title: "Cargo Assessment",
    description:
      "Before we commit resources, we evaluate. What are we working with? What's the value? What are the risks? Not all cargo is worth the same effort, and we're honest about that upfront.",
    note: "Know what you're carrying.",
  },
  {
    title: "Compliance & Standards",
    description:
      "Every operation follows the Department's internal standards. No shortcuts, no rogue deliveries, no unsanctioned cargo. Operatives who break protocol answer to the review board.",
    note: "Rules exist for a reason.",
  },
  {
    title: "Recovery & Resolution",
    description:
      "When a delivery fails -- and sometimes they do -- the Recovery Division takes over. They specialize in resolving situations that others couldn't handle. More details on the Recovery page.",
    note: "We don't leave loose ends.",
    link: "/recovery",
  },
];

const phases = [
  {
    number: "01",
    title: "Identification",
    desc: "A potential shipment is identified. Initial assessment determines viability and priority level.",
  },
  {
    number: "02",
    title: "Clearance",
    desc: "The cargo is evaluated, authorized, and prepared for transit. Not everything makes it past this stage.",
  },
  {
    number: "03",
    title: "Route Planning",
    desc: "A delivery path is mapped based on cargo profile, conditions, and timing. Every detail matters.",
  },
  {
    number: "04",
    title: "Active Transit",
    desc: "The shipment is live. Monitored, managed, and adjusted in real time as conditions change.",
  },
  {
    number: "05",
    title: "Delivery",
    desc: "Successful handoff confirmed. Documentation filed. The job is done.",
  },
  {
    number: "06",
    title: "Debrief",
    desc: "Post-delivery review. What went well, what didn't, and what we learned for next time.",
  },
];

export default function Operations() {
  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="mx-auto max-w-4xl px-6">
          <ScrollReveal>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Operations
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg text-text-secondary leading-relaxed">
              The Department runs six operational divisions. Each handles a
              different phase of the logistics pipeline. Together, they cover
              everything from first contact to final resolution.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Divisions -- alternating layouts */}
      <section className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-5xl px-6">
          {divisions.map((div, i) => (
            <ScrollReveal key={div.title}>
              <div
                className={`py-12 sm:py-16 ${i < divisions.length - 1 ? "border-b border-border" : ""}`}
              >
                <div
                  className={`flex flex-col gap-6 lg:flex-row lg:gap-16 ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
                >
                  <div className="lg:w-1/3 flex-shrink-0">
                    <span className="font-mono text-xs text-text-muted tracking-wider">
                      DIVISION {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-2 text-2xl font-semibold text-text">
                      {div.title}
                    </h3>
                  </div>
                  <div className="lg:w-2/3">
                    <p className="text-base text-text-secondary leading-relaxed sm:text-lg sm:leading-relaxed">
                      {div.description}
                    </p>
                    <p className="mt-4 text-sm text-text-muted font-medium italic">
                      {div.note}
                    </p>
                    {div.link && (
                      <Link
                        to={div.link}
                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-navy no-underline hover:gap-3 transition-all duration-200 group"
                      >
                        Recovery Division
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Operational Pipeline -- phases */}
      <section className="bg-surface-dark py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <ScrollReveal>
            <h2 className="text-xs font-semibold tracking-widest text-text-inverse-muted uppercase mb-16">
              The Pipeline
            </h2>
          </ScrollReveal>
          <div className="relative">
            {/* Vertical line connector */}
            <div className="absolute left-[23px] top-0 bottom-0 w-px bg-border-dark hidden sm:block" />

            <div className="flex flex-col gap-12 sm:gap-16">
              {phases.map((phase, i) => (
                <ScrollReveal key={phase.number} delay={i * 0.08}>
                  <div className="flex gap-6 sm:gap-10">
                    <div className="relative flex-shrink-0">
                      <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-border-dark bg-surface-dark font-mono text-sm text-text-inverse-muted">
                        {phase.number}
                      </span>
                    </div>
                    <div className="pt-2">
                      <h3 className="text-lg font-semibold text-text-inverse">
                        {phase.title}
                      </h3>
                      <p className="mt-2 text-sm text-text-inverse-muted leading-relaxed max-w-lg">
                        {phase.desc}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
