import { Link } from "react-router";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { ArrowRight } from "@/components/icons";

export default function Home() {
  return (
    <>
      {/* Opening -- full viewport, dark, cinematic */}
      <section className="relative flex min-h-screen items-center justify-center bg-surface-dark overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(30,58,95,0.3)_0%,_transparent_70%)]" />
        <div className="relative z-10 flex flex-col items-center px-6 text-center">
          <motion.img
            src="/logo.png"
            alt="Department of Logistics"
            className="mb-8 h-20 w-20 brightness-0 invert opacity-90"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 0.9, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.h1
            className="text-4xl font-bold tracking-tight text-text-inverse sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Department of Logistics
          </motion.h1>
          <motion.p
            className="mt-4 max-w-lg text-lg text-text-inverse-muted sm:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            We move what matters. Carefully.
          </motion.p>
          <motion.div
            className="mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <svg
              width="16"
              height="24"
              viewBox="0 0 16 24"
              fill="none"
              className="animate-bounce text-text-inverse-muted"
            >
              <path d="M8 4v14M3 14l5 5 5-5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </motion.div>
        </div>
      </section>

      {/* Mission statement -- editorial white section */}
      <section className="py-24 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-2xl px-6">
          <ScrollReveal>
            <p className="text-lg leading-relaxed text-text-secondary sm:text-xl lg:text-2xl lg:leading-relaxed">
              The Department of Logistics handles the full lifecycle of
              high-value cargo -- from initial pickup and assessment, through
              transit and handling, all the way to final delivery. We specialize
              in shipments that require discretion, careful planning, and a
              personal touch.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="mt-8 text-lg leading-relaxed text-text-secondary sm:text-xl lg:text-2xl lg:leading-relaxed">
              Not every package arrives on the first attempt. Not every route is
              straightforward. That's why we exist. When the situation gets
              complicated, we handle it.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* What we handle -- light gray band */}
      <section className="bg-surface-muted py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <ScrollReveal>
            <h2 className="text-xs font-semibold tracking-widest text-text-muted uppercase mb-12 sm:mb-16">
              What We Handle
            </h2>
          </ScrollReveal>
          <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Clearing & Forwarding",
                desc: "First contact, assessment, and processing of new cargo entering the system.",
              },
              {
                title: "Transit Management",
                desc: "Monitoring and safeguarding active shipments through every stage of the journey.",
              },
              {
                title: "Route Planning",
                desc: "Strategic route design for complex deliveries that need careful navigation.",
              },
              {
                title: "Recovery Operations",
                desc: "When a delivery fails, we send the right people to resolve it. Every time.",
              },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.1}>
                <div className="bg-surface-muted p-8 sm:p-10 h-full">
                  <h3 className="text-base font-semibold text-text mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Internal memo / directive */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-6">
          <ScrollReveal>
            <div className="border border-border p-8 sm:p-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-xs text-text-muted tracking-wider">
                  INTERNAL MEMO
                </span>
                <span className="h-px flex-1 bg-border" />
                <span className="font-mono text-xs text-text-muted">
                  2026-04
                </span>
              </div>
              <p className="text-base leading-relaxed text-text-secondary sm:text-lg sm:leading-relaxed">
                All operatives are reminded that unauthorized handling of cargo
                outside established channels is a direct violation of Department
                protocol. If you're moving something, it goes through the proper
                channels first. No exceptions.
              </p>
              <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg sm:leading-relaxed">
                Failure to comply will result in review by the Recovery Division.
              </p>
              <p className="mt-6 text-sm text-text-muted font-medium">
                -- Office of the Director
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Navigation links to key pages */}
      <section className="bg-surface-dark py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                to: "/operations",
                title: "Operations",
                desc: "See how we handle every type of shipment, from first contact to final delivery.",
              },
              {
                to: "/clearance",
                title: "Clearance",
                desc: "Not everyone gets access. Learn what it takes to operate within our network.",
              },
              {
                to: "/recovery",
                title: "Recovery Division",
                desc: "When standard delivery fails, the Recovery Division steps in. 100% resolution rate.",
              },
            ].map((item, i) => (
              <ScrollReveal key={item.to} delay={i * 0.1}>
                <Link
                  to={item.to}
                  className="group block border border-border-dark p-8 sm:p-10 no-underline hover:border-steel transition-colors h-full"
                >
                  <h3 className="text-lg font-semibold text-text-inverse mb-3 flex items-center gap-2">
                    {item.title}
                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                  </h3>
                  <p className="text-sm text-text-inverse-muted leading-relaxed">
                    {item.desc}
                  </p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
