import { useState } from "react";
import { Link, useLocation } from "react-router";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Department" },
  { href: "/operations", label: "Operations" },
  { href: "/clearance", label: "Clearance" },
  { href: "/protocols", label: "Protocols" },
  { href: "/recovery", label: "Recovery" },
  { href: "/dispatches", label: "Dispatches" },
  { href: "/intake", label: "Intake" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-surface/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-3 no-underline">
          <img src="/logo.png" alt="Department of Logistics" className="h-8 w-8" />
          <span className="text-sm font-semibold tracking-widest text-text uppercase">
            Logistics HQ
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "text-xs font-medium tracking-wider uppercase no-underline transition-colors",
                pathname === link.href
                  ? "text-navy"
                  : "text-text-secondary hover:text-text"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 items-center justify-center lg:hidden"
          aria-label="Toggle menu"
        >
          <svg
            width="20"
            height="14"
            viewBox="0 0 20 14"
            fill="none"
            className="text-text"
          >
            {menuOpen ? (
              <>
                <line x1="2" y1="2" x2="18" y2="12" stroke="currentColor" strokeWidth="1.5" />
                <line x1="2" y1="12" x2="18" y2="2" stroke="currentColor" strokeWidth="1.5" />
              </>
            ) : (
              <>
                <line x1="0" y1="1" x2="20" y2="1" stroke="currentColor" strokeWidth="1.5" />
                <line x1="0" y1="7" x2="20" y2="7" stroke="currentColor" strokeWidth="1.5" />
                <line x1="0" y1="13" x2="20" y2="13" stroke="currentColor" strokeWidth="1.5" />
              </>
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-border bg-surface lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-6 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "py-3 text-sm font-medium tracking-wider uppercase no-underline border-b border-border last:border-0",
                  pathname === link.href
                    ? "text-navy"
                    : "text-text-secondary"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
