import React from "react";

export default function ToolBanner({
  title,
  description,
  badge = "PDF Tool",
  icon,
  iconColor = "clay-icon-blue",
}) {
  return (
    <section className="relative overflow-hidden py-10 md:py-14 px-4 flex flex-col items-center text-center select-none">
      {/* Soft Clay Ambient Background Blobs */}
      <div
        className="blob bg-clay-purple w-[340px] h-[340px] -top-24 -left-20"
        aria-hidden="true"
      />
      <div
        className="blob bg-clay-blue w-[380px] h-[380px] -bottom-28 -right-20"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center max-w-2xl">
        {/* Clay Icon Container */}
        {icon && (
          <div className={`clay-icon-box ${iconColor} mb-4 scale-110 shadow-clay-card`}>
            {icon}
          </div>
        )}

        {badge && (
          <span className="clay-badge bg-white text-clay-blue-shadow text-xs font-black uppercase tracking-wider mb-3 shadow-xs">
            {badge}
          </span>
        )}

        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-clay-heading mb-3">
          {title}
        </h1>

        <p className="text-base md:text-lg font-semibold text-clay-muted max-w-xl">
          {description}
        </p>
      </div>
    </section>
  );
}
