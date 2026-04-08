import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Department" },
  { href: "/operations", label: "Operations" },
  { href: "/clearance", label: "Clearance" },
  { href: "/protocols", label: "Protocols" },
  { href: "/recovery", label: "Recovery" },
  { href: "/intake", label: "Intake" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300",
        scrolled
          ? "border-border bg-surface/98 backdrop-blur-md shadow-sm"
          : "border-border/60 bg-surface/80 backdrop-blur-md"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 no-underline group"
        >
          <img
            src="/logo-transparent.png"
            alt="Department of Logistics"
            className="h-10 w-10 transition-transform duration-200 group-hover:scale-105"
          />
          <span className="text-sm font-semibold tracking-widest text-text uppercase transition-colors duration-200 group-hover:text-navy">
            Logistics HQ
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "relative pb-1 text-xs font-medium tracking-wider uppercase no-underline transition-colors duration-200 group",
                  isActive ? "text-navy" : "text-text-secondary hover:text-text"
                )}
              >
                {link.label}
                {/* Animated underline */}
                <span
                  className={cn(
                    "absolute bottom-0 left-0 h-px transition-all duration-200",
                    isActive
                      ? "w-full bg-navy"
                      : "w-0 bg-text-muted group-hover:w-full"
                  )}
                />
              </Link>
            );
          })}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded lg:hidden hover:bg-surface-muted transition-colors duration-150"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <svg
            width="20"
            height="14"
            viewBox="0 0 20 14"
            fill="none"
            className="text-text transition-transform duration-200"
          >
            {menuOpen ? (
              <>
                <line x1="2" y1="2" x2="18" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="2" y1="12" x2="18" y2="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </>
            ) : (
              <>
                <line x1="0" y1="1" x2="20" y2="1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="0" y1="7" x2="20" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="0" y1="13" x2="20" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "overflow-hidden border-t border-border bg-surface transition-all duration-300 lg:hidden",
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 border-t-0"
        )}
      >
        <nav className="mx-auto flex max-w-7xl flex-col px-6 py-3">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "flex items-center justify-between py-3.5 text-sm font-medium tracking-wider uppercase no-underline border-b border-border last:border-0 transition-colors duration-150",
                  isActive ? "text-navy" : "text-text-secondary hover:text-text"
                )}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="block h-1.5 w-1.5 rounded-full bg-navy" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
