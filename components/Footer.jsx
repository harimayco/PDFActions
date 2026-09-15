import React from "react";
import Link from "next/link";
import { PDFIcon, GithubIcon } from "./icons";

export default function Footer() {
  return (
    <footer className="w-full mt-16 border-t border-slate-200/80 bg-white/70 backdrop-blur-md relative z-10">
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand & Open Source Mission */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link href="/" passHref>
              <a className="flex items-center gap-3 select-none group w-fit">
                <div className="clay-icon-box clay-icon-blue !w-10 !h-10 !rounded-xl group-hover:scale-105 transition-transform">
                  <PDFIcon width="24" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-black tracking-tight text-clay-heading group-hover:text-clay-blue-shadow transition-colors">
                    PDFActions
                  </span>
                  <span className="text-[10px] font-bold tracking-wider text-clay-muted uppercase -mt-1">
                    Open Source PDF Tools
                  </span>
                </div>
              </a>
            </Link>

            <p className="text-sm font-medium text-slate-600 max-w-sm leading-relaxed">
              <strong>PDFActions</strong> is a 100% free and <strong>Open Source PDF Tools</strong> suite with <strong>no registration</strong> required, powered by <strong>Ghostscript WASM</strong>. Compress, merge, split, and edit PDFs locally in your browser with absolute data privacy — zero files ever leave your device.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="clay-badge bg-emerald-50 text-emerald-700 text-[11px] font-extrabold px-3 py-1 border border-emerald-200">
                🎉 100% Free & No Registration
              </span>
              <span className="clay-badge bg-clay-bg text-clay-heading text-[11px] font-extrabold px-3 py-1 border border-slate-200">
                ⚡ Ghostscript WASM
              </span>
              <span className="clay-badge bg-blue-50 text-blue-700 text-[11px] font-extrabold px-3 py-1 border border-blue-200">
                ⭐ MIT Open Source
              </span>
            </div>

            {/* GitHub Repo Button */}
            <div className="pt-2">
              <a
                href="https://github.com/harimayco/PDFActions"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-black text-white bg-slate-900 hover:bg-slate-800 shadow-clay-card hover:shadow-none hover:translate-y-0.5 transition-all"
                title="Star PDFActions on GitHub"
              >
                <GithubIcon size={18} />
                <span>Star on GitHub (harimayco/PDFActions)</span>
              </a>
            </div>
          </div>

          {/* Column 1: Core Target Tools */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-clay-heading">
              Popular Tools
            </h4>
            <ul className="flex flex-col gap-2 text-sm font-bold text-slate-600">
              <li>
                <Link href="/pdf-tools/compress">
                  <a className="hover:text-clay-blue transition-colors">PDF Compress Online</a>
                </Link>
              </li>
              <li>
                <Link href="/pdf-tools/merge">
                  <a className="hover:text-clay-blue transition-colors">PDF Merger Online</a>
                </Link>
              </li>
              <li>
                <Link href="/pdf-tools/split">
                  <a className="hover:text-clay-blue transition-colors">Split PDF Online</a>
                </Link>
              </li>
              <li>
                <Link href="/pdf-tools/rotate">
                  <a className="hover:text-clay-blue transition-colors">Rotate PDF</a>
                </Link>
              </li>
              <li>
                <Link href="/pdf-tools">
                  <a className="hover:text-clay-blue transition-colors">All Open Source Tools</a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Transform & Format */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-clay-heading">
              Format & Layout
            </h4>
            <ul className="flex flex-col gap-2 text-sm font-bold text-slate-600">
              <li>
                <Link href="/pdf-tools/jpgtopdf">
                  <a className="hover:text-clay-blue transition-colors">JPG to PDF Online</a>
                </Link>
              </li>
              <li>
                <Link href="/pdf-tools/resize">
                  <a className="hover:text-clay-blue transition-colors">Resize PDF (A4/Letter)</a>
                </Link>
              </li>
              <li>
                <Link href="/pdf-tools/break">
                  <a className="hover:text-clay-blue transition-colors">Break PDF into Chunks</a>
                </Link>
              </li>
              <li>
                <Link href="/pdf-tools/addpagenumbers">
                  <a className="hover:text-clay-blue transition-colors">Add Page Numbers</a>
                </Link>
              </li>
              <li>
                <Link href="/pdf-tools/addmargin">
                  <a className="hover:text-clay-blue transition-colors">Add Page Margins</a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Security & Privacy */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-clay-heading">
              Privacy & Forms
            </h4>
            <ul className="flex flex-col gap-2 text-sm font-bold text-slate-600">
              <li>
                <Link href="/pdf-tools/flattenform">
                  <a className="hover:text-clay-blue transition-colors">Flatten PDF Forms</a>
                </Link>
              </li>
              <li>
                <Link href="/pdf-tools/editmetadata">
                  <a className="hover:text-clay-blue transition-colors">Edit PDF Metadata</a>
                </Link>
              </li>
              <li>
                <Link href="/pdf-tools/removemetadata">
                  <a className="hover:text-clay-blue transition-colors">Remove PDF Metadata</a>
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/harimayco/PDFActions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-clay-blue transition-colors flex items-center gap-1"
                >
                  <span>Source Code</span>
                  <span className="text-[10px] text-slate-400">↗</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-bold text-slate-500">
          <p>
            © {new Date().getFullYear()} PDFActions. Free & Open Source under the MIT License.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-slate-400">Powered by WebAssembly & Ghostscript</span>
            <a
              href="https://github.com/harimayco/PDFActions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-700 hover:text-clay-blue flex items-center gap-1.5 font-black"
            >
              <GithubIcon size={15} />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
