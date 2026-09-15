import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { PDFIcon, RotateLeft, SuccessIcon } from "../components/icons";

export default function Home() {
  const router = useRouter();
  const basePath = router?.basePath || "/PDFActions";
  const tools = [
    {
      title: "Merge PDF",
      description: "Combine multiple PDF documents into a single sculpted file with custom ordering.",
      href: "/pdf-tools/merge",
      color: "clay-icon-blue",
      badge: "Popular",
      tilt: "-rotate-1",
    },
    {
      title: "Compress PDF",
      description: "Reduce file sizes with Ghostscript WebAssembly while preserving crisp quality.",
      href: "/pdf-tools/compress",
      color: "clay-icon-green",
      badge: "Save Space",
      tilt: "rotate-0",
    },
    {
      title: "Split PDF",
      description: "Extract specific page ranges into standalone PDFs with effortless accuracy.",
      href: "/pdf-tools/split",
      color: "clay-icon-coral",
      badge: "Flexible",
      tilt: "rotate-1",
    },
    {
      title: "Rotate PDF",
      description: "Rotate orientation of individual pages or batch rotate all pages in seconds.",
      href: "/pdf-tools/rotate",
      color: "clay-icon-purple",
      badge: "Quick",
      tilt: "-rotate-1",
    },
    {
      title: "JPG to PDF",
      description: "Convert image galleries and photos directly into beautifully aligned PDF pages.",
      href: "/pdf-tools/jpgtopdf",
      color: "clay-icon-yellow",
      badge: "Converter",
      tilt: "rotate-0",
    },
    {
      title: "Break PDF",
      description: "Slice large multi-page PDF documents into smaller fixed page chunks.",
      href: "/pdf-tools/break",
      color: "clay-icon-teal",
      badge: "Chunking",
      tilt: "rotate-1",
    },
    {
      title: "Add Page Numbers",
      description: "Stamp customized page numbers with full control over placement, font, and margins.",
      href: "/pdf-tools/addpagenumbers",
      color: "clay-icon-blue",
      badge: "Organize",
      tilt: "-rotate-1",
    },
    {
      title: "Resize PDF",
      description: "Re-standardize page dimensions to A4, Letter, Legal, or Tabloid formats.",
      href: "/pdf-tools/resize",
      color: "clay-icon-orange",
      badge: "Standardize",
      tilt: "rotate-0",
    },
    {
      title: "Add Margin",
      description: "Pad pages with millimeter-precise margins for clean binding and printing.",
      href: "/pdf-tools/addmargin",
      color: "clay-icon-coral",
      badge: "Printing",
      tilt: "rotate-1",
    },
    {
      title: "Flatten PDF Forms",
      description: "Flatten interactive form fields into permanent, read-only PDF content.",
      href: "/pdf-tools/flattenform",
      color: "clay-icon-green",
      badge: "Secure",
      tilt: "-rotate-1",
    },
    {
      title: "Edit Metadata",
      description: "Modify title, author, subject, creator, and keyword tags embedded in your files.",
      href: "/pdf-tools/editmetadata",
      color: "clay-icon-purple",
      badge: "Details",
      tilt: "rotate-0",
    },
    {
      title: "Remove Metadata",
      description: "Strip all hidden tracking tags and author metadata for clean anonymization.",
      href: "/pdf-tools/removemetadata",
      color: "clay-icon-teal",
      badge: "Privacy",
      tilt: "rotate-1",
    },
  ];

  return (
    <>
      <Head>
        <title>PDFActions - Free Open Source PDF Tools Online | Ghostscript WASM</title>
        <meta
          name="description"
          content="PDFActions is a 100% Free & Open Source PDF Tools suite powered by Ghostscript WASM. PDF Compress Online, PDF Merger Online, Split, Rotate, and edit PDFs with zero server uploads."
        />
        <meta
          name="keywords"
          content="Open Source, pdf compress Online, PDF Merger Online, Open Source PDF Tools, Ghostscript WASM, free pdf editor, client-side pdf, pdfactions"
        />
        <link rel="canonical" href="https://pdfactions.com/" />
        <meta property="og:title" content="PDFActions - Free Open Source PDF Tools Online | Ghostscript WASM" />
        <meta
          property="og:description"
          content="100% Free & Open Source PDF Tools running directly in your browser. PDF Compress Online, PDF Merger Online, and more with Ghostscript WASM."
        />
        <meta property="og:url" content="https://pdfactions.com/" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "PDFActions",
              "url": "https://pdfactions.com",
              "description": "Free & Open Source PDF Tools suite running locally with Ghostscript WASM. PDF Compress Online, PDF Merger Online, Split, and more.",
              "applicationCategory": "UtilitiesApplication",
              "operatingSystem": "All",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
              },
            }),
          }}
        />
      </Head>

      {/* Hero Section - Tactile 3D Clay Card with Floating Ghost Mascot */}
      <section className="relative pt-6 pb-14 md:pt-8 md:pb-16 px-4">
        {/* Soft Decorative Ambient Blobs */}
        <div
          className="blob bg-clay-purple w-[480px] h-[480px] -top-32 -left-20"
          aria-hidden="true"
        />
        <div
          className="blob bg-clay-blue w-[420px] h-[420px] top-20 -right-24"
          aria-hidden="true"
        />
        <div
          className="blob bg-clay-coral w-[360px] h-[360px] -bottom-20 left-1/3"
          aria-hidden="true"
        />

        {/* Big Rounded Hero Card matching mockup */}
        <div className="relative z-10 max-w-5xl mx-auto flex flex-col md:flex-row items-stretch">
          {/* Left Column: Heading, Badges, Copy, CTAs */}
          <div className="w-full bg-white mx-auto rounded-[32px] md:rounded-[40px] shadow-[0_16px_48px_rgba(30,27,75,0.06),0_6px_0_0_#CBD5E1] border-2 border-white md:w-[58%] lg:w-[70%] p-6 sm:p-10 lg:p-12 flex flex-col justify-center text-left z-10">
            {/* Top Pill Badge */}
            <div className="clay-badge bg-white text-slate-700 text-[10px] sm:text-[11px] font-black tracking-wider uppercase px-3.5 py-1.5 shadow-sm border border-slate-200/80 mb-6 flex items-center gap-2 w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>100% CLIENT-SIDE • OPEN SOURCE • GHOSTSCRIPT WASM</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-clay-heading tracking-tight leading-[1.14] mb-4">
              Sculpt, Edit & Tame <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Your PDFs
              </span>{" "}
              with Ease.
            </h1>

            <p className="text-sm sm:text-[15px] font-medium text-slate-600 leading-relaxed mb-8 max-w-lg">
              The private <strong>Open Source PDF Tools</strong> suite. Run <strong>PDF Compress Online</strong> and <strong>PDF Merger Online</strong> directly in your browser using <strong>Ghostscript WASM</strong> — zero server uploads, total confidentiality.
            </p>

            {/* CTAs Row */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <Link href="/pdf-tools/compress" passHref>
                <a className="clay-btn clay-btn-green text-xs sm:text-sm px-5 sm:px-6 py-3.5 shadow-clay-btn-green flex items-center gap-2">
                  <PDFIcon width="18" />
                  <span>PDF Compress</span>
                </a>
              </Link>
              <Link href="/pdf-tools/merge" passHref>
                <a className="clay-btn clay-btn-blue text-xs sm:text-sm px-5 sm:px-6 py-3.5 shadow-clay-btn-blue flex items-center gap-2">
                  <PDFIcon width="18" />
                  <span>PDF Merge</span>
                </a>
              </Link>
              <Link href="/pdf-tools" passHref>
                <a className="clay-btn clay-btn-white text-xs sm:text-sm px-5 sm:px-6 py-3.5 border border-slate-200 shadow-sm text-slate-700 font-black hover:bg-slate-50">
                  <span>Explore All Tools</span>
                </a>
              </Link>
            </div>
          </div>

          {/* Right Column: Pastel Gradient Backdrop + Floating Ghost Mascot */}
          <div className="w-full md:w-[42%] lg:w-[32%] flex flex-col items-center justify-center relative p-6 sm:p-8 min-h-[360px] md:min-h-[480px]">
            {/* Subtle soft circular ambient backlight */}
            <div className="absolute w-64 h-64 rounded-full bg-white/50 blur-3xl pointer-events-none" />

            {/* Floating Ghost Character */}
            <div className="relative z-10 flex flex-col items-center justify-center w-full">
              <img
                src={`${basePath}/assets/images/char.webp`}
                alt="PDFActions Ghost Mascot holding PDF documents"
                className="w-[500px] sm:ml-[0px] md:ml-[-100px] md:w-[500px] max-w-[320px] sm:max-w-[380px] md:max-w-[420px] lg:max-w-[700px] h-auto object-contain select-none pointer-events-none drop-shadow-2xl animate-float-ghost"
              />
              {/* Floating shadow illusion */}
              <div className="w-44 sm:w-56 h-4 sm:h-5 bg-purple-950/25 rounded-full blur-md animate-float-shadow -mt-4 sm:-mt-5" />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Tools Grid */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 pb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-clay-heading tracking-tight mb-2">
            Every PDF Tool You Need
          </h2>
          <p className="text-base font-semibold text-clay-muted">
            Crafted with soft silicone tactile feedback and zero latency.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {tools.map((tool) => (
            <Link href={tool.href} key={tool.href} passHref>
              <a
                className={`clay-card-white p-7 flex flex-col justify-between min-h-[240px] group transition-all duration-200 hover:-translate-y-2 hover:shadow-2xl ${tool.tilt} hover:rotate-0`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`clay-icon-box ${tool.color} group-hover:scale-110 transition-transform`}>
                      <PDFIcon width="28" />
                    </div>
                    <span className="clay-badge bg-clay-bg text-clay-muted text-[11px] font-extrabold uppercase tracking-wider">
                      {tool.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-clay-heading mb-2 group-hover:text-clay-blue-shadow transition-colors">
                    {tool.title}
                  </h3>

                  <p className="text-sm font-medium text-clay-slate leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-black text-clay-blue-shadow mt-4 uppercase tracking-wider">
                  <span>Open Tool</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust & Performance Stat Ribbon */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 pb-20">
        <div className="clay-card-white p-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center">
            <span className="text-4xl md:text-5xl font-black text-clay-heading mb-1">
              100%
            </span>
            <span className="text-sm font-bold text-clay-muted">
              Private & In-Browser
            </span>
          </div>
          <div className="flex flex-col items-center border-y sm:border-y-0 sm:border-x border-slate-100 py-4 sm:py-0">
            <span className="text-4xl md:text-5xl font-black text-clay-heading mb-1">
              12+
            </span>
            <span className="text-sm font-bold text-clay-muted">
              Sculpted PDF Tools
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl md:text-5xl font-black text-clay-heading mb-1">
              0 KB
            </span>
            <span className="text-sm font-bold text-clay-muted">
              Uploaded to External Servers
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
