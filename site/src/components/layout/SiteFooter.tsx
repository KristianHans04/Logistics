import { Link } from "react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface-dark text-text-inverse">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/logo-white.png"
                alt="Department of Logistics"
                className="h-8 w-8"
              />
              <span className="text-sm font-semibold tracking-widest uppercase">
                Logistics HQ
              </span>
            </div>
            <p className="text-sm text-text-inverse-muted leading-relaxed max-w-xs">
              End-to-end logistics for high-value cargo. 
              We handle what others won't touch.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase mb-4 text-text-inverse-muted">
              Navigation
            </h4>
            <nav className="flex flex-col gap-2">
              {[
                { href: "/operations", label: "Operations" },
                { href: "/clearance", label: "Clearance" },
                { href: "/protocols", label: "Protocols" },
                { href: "/recovery", label: "Recovery" },
                { href: "/intake", label: "Intake" },
              ].map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="group flex items-center gap-1.5 text-sm text-text-inverse-muted no-underline hover:text-text-inverse transition-colors duration-200"
                >
                  <span className="inline-block w-0 overflow-hidden opacity-0 transition-all duration-200 group-hover:w-3 group-hover:opacity-100 text-text-inverse-muted">—</span>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase mb-4 text-text-inverse-muted">
              Official Channels
            </h4>
            <a
              href="https://www.instagram.com/logistics_hq/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-inverse-muted no-underline hover:text-text-inverse transition-colors"
            >
              Instagram — @logistics_hq
            </a>
            <div className="mt-6 pt-6 border-t border-border-dark space-y-1">
              <p className="text-xs text-text-inverse-muted">
                Chief of Staff — Director's Office
              </p>
              <p className="text-xs text-text-inverse-muted font-mono">
                Recovery Division — Operational 24/7
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border-dark flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-text-inverse-muted">
            Department of Logistics. All rights reserved.
          </p>
          <p className="text-xs text-text-inverse-muted font-mono">
            Authorization required for all operations.
          </p>
        </div>
      </div>
    </footer>
  );
}
