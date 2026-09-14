import React from "react";
import Head from "next/head";
import Link from "next/link";
import ToolBanner from "../../components/ToolBanner";
import { PDFIcon } from "../../components/icons";

export default function AllPDFTools() {
  const tools = [
    {
      title: "Merge PDF",
      description: "Combine multiple PDF documents into a single sculpted file with custom ordering.",
      href: "/pdf-tools/merge",
      color: "clay-icon-blue",
      badge: "Popular",
    },
    {
      title: "Compress PDF",
      description: "Reduce file sizes with Ghostscript WebAssembly while preserving crisp quality.",
      href: "/pdf-tools/compress",
      color: "clay-icon-green",
      badge: "Save Space",
    },
    {
      title: "Split PDF",
      description: "Extract specific page ranges into standalone PDFs with effortless accuracy.",
      href: "/pdf-tools/split",
      color: "clay-icon-coral",
      badge: "Flexible",
    },
    {
      title: "Rotate PDF",
      description: "Rotate orientation of individual pages or batch rotate all pages in seconds.",
      href: "/pdf-tools/rotate",
      color: "clay-icon-purple",
      badge: "Quick",
    },
    {
      title: "JPG to PDF",
      description: "Convert image galleries and photos directly into beautifully aligned PDF pages.",
      href: "/pdf-tools/jpgtopdf",
      color: "clay-icon-yellow",
      badge: "Converter",
    },
    {
      title: "Break PDF",
      description: "Slice large multi-page PDF documents into smaller fixed page chunks.",
      href: "/pdf-tools/break",
      color: "clay-icon-teal",
      badge: "Chunking",
    },
    {
      title: "Add Page Numbers",
      description: "Stamp customized page numbers with full control over placement, font, and margins.",
      href: "/pdf-tools/addpagenumbers",
      color: "clay-icon-blue",
      badge: "Organize",
    },
    {
      title: "Resize PDF",
      description: "Re-standardize page dimensions to A4, Letter, Legal, or Tabloid formats.",
      href: "/pdf-tools/resize",
      color: "clay-icon-orange",
      badge: "Standardize",
    },
    {
      title: "Add Margin",
      description: "Pad pages with millimeter-precise margins for clean binding and printing.",
      href: "/pdf-tools/addmargin",
      color: "clay-icon-coral",
      badge: "Printing",
    },
    {
      title: "Flatten PDF Forms",
      description: "Flatten interactive form fields into permanent, read-only PDF content.",
      href: "/pdf-tools/flattenform",
      color: "clay-icon-green",
      badge: "Secure",
    },
    {
      title: "Edit Metadata",
      description: "Modify title, author, subject, creator, and keyword tags embedded in your files.",
      href: "/pdf-tools/editmetadata",
      color: "clay-icon-purple",
      badge: "Details",
    },
    {
      title: "Remove Metadata",
      description: "Strip all hidden tracking tags and author metadata for clean anonymization.",
      href: "/pdf-tools/removemetadata",
      color: "clay-icon-teal",
      badge: "Privacy",
    },
  ];

  return (
    <>
      <Head>
        <title>All PDF Tools - PDFActions Suite</title>
        <meta
          name="description"
          content="Explore the complete suite of 12 client-side PDF actions with soft Claymorphism design."
        />
      </Head>

      <ToolBanner
        title="All PDF Tools"
        description="Sculpt, split, compress, or reorganize your PDF documents with private browser-based utilities."
        badge="Tool Directory"
        icon={<PDFIcon width="28" />}
        iconColor="clay-icon-blue"
      />

      <section className="relative z-10 max-w-[1140px] mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {tools.map((tool) => (
            <Link href={tool.href} key={tool.href} passHref>
              <a className="clay-card-white p-7 flex flex-col justify-between min-h-[230px] group transition-all duration-200 hover:-translate-y-2 hover:shadow-2xl">
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
    </>
  );
}
