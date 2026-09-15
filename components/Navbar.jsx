import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { PDFIcon, GithubIcon } from "./icons";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const navOptions = [
    { label: "Merge PDF", href: "/pdf-tools/merge" },
    { label: "Compress PDF", href: "/pdf-tools/compress" },
    { label: "Split PDF", href: "/pdf-tools/split" },
    { label: "Rotate PDF", href: "/pdf-tools/rotate" },
    { label: "All Tools", href: "/pdf-tools" },
  ];

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [router.asPath]);

  return (
    <header className="sticky top-3 z-50 px-4 w-full max-w-5xl mx-auto">
      <nav
        className="clay-card-white px-5 py-3 flex items-center justify-between relative z-50"
        aria-label="Main Navigation"
      >
        {/* Brand Logo */}
        <Link href="/" passHref>
          <a className="flex items-center gap-3 group select-none">
            <div className="clay-icon-box clay-icon-blue !w-10 !h-10 !rounded-xl group-hover:scale-105 transition-transform">
              <PDFIcon width="24" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-clay-heading group-hover:text-clay-blue-shadow transition-colors">
                PDFActions
              </span>
              <span className="text-[10px] font-bold tracking-wider text-clay-muted uppercase -mt-1">
                AllInOne PDF Tools
              </span>
            </div>
          </a>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-2">
          {navOptions.map((opt) => {
            const isActive = router.pathname === opt.href;
            return (
              <Link href={opt.href} key={opt.href} passHref>
                <a
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-150 ${
                    isActive
                      ? "bg-clay-blue text-white shadow-[0_3px_0_0_#1D4ED8]"
                      : "text-clay-heading hover:bg-clay-bg hover:text-clay-blue-shadow"
                  }`}
                >
                  {opt.label}
                </a>
              </Link>
            );
          })}

          <a
            href="https://github.com/harimayco/PDFActions"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Repository (Open Source)"
            title="GitHub Repository (Open Source)"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-bold text-clay-heading hover:bg-slate-100 hover:text-clay-blue-shadow transition-all duration-150 ml-1 border border-slate-200"
          >
            <GithubIcon size={18} className="text-slate-800" />
            <span className="hidden lg:inline text-xs font-black">GitHub</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-xl bg-clay-bg text-clay-heading hover:bg-slate-200 transition-colors p-2"
        >
          <span
            className={`w-5 h-0.5 bg-clay-heading rounded-full transition-transform duration-200 ${
              isOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          />
          <span
            className={`w-5 h-0.5 bg-clay-heading rounded-full my-1 transition-opacity duration-200 ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-5 h-0.5 bg-clay-heading rounded-full transition-transform duration-200 ${
              isOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile Drawer & Backdrop */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-clay-heading/20 backdrop-blur-xs z-40 md:hidden"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute top-16 left-4 right-4 clay-card-white p-4 flex flex-col gap-2 z-50 md:hidden animate-in fade-in slide-in-from-top-2 duration-150">
            {navOptions.map((opt) => {
              const isActive = router.pathname === opt.href;
              return (
                <Link href={opt.href} key={opt.href} passHref>
                  <a
                    onClick={() => setIsOpen(false)}
                    className={`px-4 py-3 rounded-xl text-base font-bold transition-all ${
                      isActive
                        ? "bg-clay-blue text-white shadow-[0_3px_0_0_#1D4ED8]"
                        : "text-clay-heading hover:bg-clay-bg"
                    }`}
                  >
                    {opt.label}
                  </a>
                </Link>
              );
            })}

            <div className="pt-2 mt-1 border-t border-slate-100">
              <a
                href="https://github.com/harimayco/PDFActions"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-black bg-slate-900 text-white hover:bg-slate-800 shadow-sm transition-all"
              >
                <GithubIcon size={18} />
                <span>Open Source on GitHub</span>
              </a>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
