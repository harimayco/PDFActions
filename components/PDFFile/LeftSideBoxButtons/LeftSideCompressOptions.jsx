import React, { useState } from "react";

const PRESETS = [
  {
    code: "1",
    dpi: 72,
    label: "Low (72 DPI)",
    tag: "Max Compress",
    desc: "Smallest file size. Best for email and web upload.",
  },
  {
    code: "2",
    dpi: 150,
    label: "Standard (150 DPI)",
    tag: "Balanced",
    desc: "Balanced size & clarity for screens and tablets.",
  },
  {
    code: "3",
    dpi: 300,
    label: "High (300 DPI)",
    tag: "Crisp Print",
    desc: "Maximum visual fidelity for printing documents.",
  },
];

const QUICK_DPI_CHIPS = [72, 96, 120, 150, 200, 300];

export default function LeftSideCompressOptions({ quality = "2", setQuality }) {
  // Determine if incoming quality is a preset ("1", "2", "3") or custom numeric DPI
  const isPreset = quality === "1" || quality === "2" || quality === "3";
  const [activeTab, setActiveTab] = useState(isPreset ? "preset" : "manual");

  // Track custom numeric DPI (e.g. 120)
  const initialCustomDpi =
    !isPreset && !isNaN(Number(quality)) && Number(quality) > 10
      ? Math.round(Number(quality))
      : quality === "1"
      ? 72
      : quality === "3"
      ? 300
      : 150;

  const [customDpi, setCustomDpi] = useState(initialCustomDpi);

  // Active label & badge helper
  const getBadgeInfo = () => {
    if (activeTab === "manual") {
      return {
        label: `${customDpi} DPI`,
        sub: "Manual",
      };
    }
    const found = PRESETS.find((p) => p.code === String(quality));
    return {
      label: found ? found.label : "Standard (150 DPI)",
      sub: found ? found.tag : "Balanced",
    };
  };

  const badgeInfo = getBadgeInfo();

  // Handlers
  const handleSelectPreset = (code) => {
    setActiveTab("preset");
    if (setQuality) {
      setQuality(code);
    }
  };

  const handleCustomDpiChange = (val) => {
    const num = Math.max(30, Math.min(600, Math.round(Number(val) || 150)));
    setCustomDpi(num);
    if (setQuality) {
      setQuality(String(num));
    }
  };

  const handleSwitchTab = (tab) => {
    setActiveTab(tab);
    if (tab === "manual") {
      if (setQuality) {
        setQuality(String(customDpi));
      }
    } else {
      let closestPreset = "2";
      if (customDpi <= 100) closestPreset = "1";
      else if (customDpi >= 250) closestPreset = "3";
      if (setQuality) {
        setQuality(closestPreset);
      }
    }
  };

  return (
    <div className="flex flex-col gap-3.5 p-4 bg-clay-bg rounded-2xl border border-slate-200">
      {/* Header with clear title and badge */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-extrabold text-clay-heading">
          Quality & Resolution
        </span>
        <span className="clay-badge bg-clay-blue text-white text-[11px] font-bold">
          {badgeInfo.label}
        </span>
      </div>

      {/* Mode Selector Tabs */}
      <div className="flex p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold">
        <button
          type="button"
          onClick={() => handleSwitchTab("preset")}
          className={`flex-1 py-1.5 rounded-lg transition-all text-center ${
            activeTab === "preset"
              ? "bg-white text-clay-blue shadow-sm font-extrabold"
              : "text-clay-muted hover:text-clay-heading"
          }`}
        >
          Presets
        </button>
        <button
          type="button"
          onClick={() => handleSwitchTab("manual")}
          className={`flex-1 py-1.5 rounded-lg transition-all text-center ${
            activeTab === "manual"
              ? "bg-white text-clay-blue shadow-sm font-extrabold"
              : "text-clay-muted hover:text-clay-heading"
          }`}
        >
          Manual DPI
        </button>
      </div>

      {/* Preset View */}
      {activeTab === "preset" ? (
        <div className="flex flex-col gap-2">
          {PRESETS.map((p) => {
            const isSelected = String(quality) === p.code;
            return (
              <button
                key={p.code}
                type="button"
                onClick={() => handleSelectPreset(p.code)}
                className={`flex flex-col p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? "bg-blue-50/70 border-clay-blue shadow-sm ring-1 ring-clay-blue"
                    : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-bold ${
                      isSelected ? "text-clay-blue" : "text-clay-heading"
                    }`}
                  >
                    {p.label}
                  </span>
                  <span
                    className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                      isSelected
                        ? "bg-clay-blue text-white"
                        : "bg-slate-100 text-clay-muted"
                    }`}
                  >
                    {p.tag}
                  </span>
                </div>
                <p className="text-[11px] text-clay-muted mt-1 leading-snug">
                  {p.desc}
                </p>
              </button>
            );
          })}
        </div>
      ) : (
        /* Manual DPI View */
        <div className="flex flex-col gap-3 bg-white p-3 rounded-xl border border-slate-200">
          {/* Direct Numeric Input with DPI suffix */}
          <div className="flex items-center justify-between gap-2">
            <label htmlFor="custom-dpi-input" className="text-xs font-bold text-clay-muted">
              Custom DPI
            </label>
            <div className="relative w-28">
              <input
                id="custom-dpi-input"
                type="number"
                min="30"
                max="600"
                step="5"
                value={customDpi}
                onChange={(e) => handleCustomDpiChange(e.target.value)}
                className="clay-input text-right text-xs py-1.5 pr-9 w-full font-bold"
              />
              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] font-bold text-clay-muted pointer-events-none">
                DPI
              </span>
            </div>
          </div>

          {/* Smooth Range Slider */}
          <input
            id="custom-dpi-slider"
            type="range"
            min="50"
            max="600"
            step="10"
            value={customDpi}
            onChange={(e) => handleCustomDpiChange(e.target.value)}
            className="w-full accent-clay-blue cursor-pointer h-2 bg-slate-200 rounded-lg"
          />

          {/* Quick Select DPI Chips */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold text-clay-muted uppercase tracking-wider">
              Quick Presets
            </span>
            <div className="flex flex-wrap gap-1.5">
              {QUICK_DPI_CHIPS.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => handleCustomDpiChange(chip)}
                  className={`px-2 py-1 text-[11px] font-bold rounded-lg border transition-colors ${
                    customDpi === chip
                      ? "bg-clay-blue text-white border-clay-blue"
                      : "bg-slate-50 hover:bg-slate-100 text-clay-heading border-slate-200"
                  }`}
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          {/* Real-time Dynamic Advisory */}
          <div className="p-2 bg-slate-50 rounded-lg border border-slate-100 text-[11px] text-clay-slate leading-relaxed">
            {customDpi < 100 && (
              <span>⚡ <strong>High Compression:</strong> Produces compact files, ideal for email or mobile messaging.</span>
            )}
            {customDpi >= 100 && customDpi <= 200 && (
              <span>⚖️ <strong>Balanced:</strong> Great screen clarity for laptops, PDFs, and office presentations.</span>
            )}
            {customDpi > 200 && (
              <span>🖨️ <strong>High Fidelity:</strong> Retains fine details for high-resolution displays and printing.</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}