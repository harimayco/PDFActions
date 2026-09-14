import React from "react";

export default function LeftSideCompressOptions({ quality = "2", setQuality }) {
  const getQualityDesc = (q) => {
    switch (String(q)) {
      case "1":
        return { label: "Low Quality", detail: "Maximum compression (72 DPI)" };
      case "2":
        return { label: "Standard Quality", detail: "Balanced size & quality (150 DPI)" };
      case "3":
        return { label: "High Quality", detail: "Crisp print quality (300 DPI)" };
      default:
        return { label: "Standard Quality", detail: "Balanced compression" };
    }
  };

  const currentDesc = getQualityDesc(quality);

  const handleRangeChange = (e) => {
    if (setQuality) {
      setQuality(e.target.value);
    }
  };

  return (
    <div className="flex flex-col gap-3 p-4 bg-clay-bg rounded-2xl border border-slate-200">
      <div className="flex items-center justify-between">
        <label htmlFor="quality-slider" className="text-sm font-extrabold text-clay-heading">
          Compression Level
        </label>
        <span className="clay-badge bg-clay-blue text-white text-[11px] font-bold">
          {currentDesc.label}
        </span>
      </div>

      <input
        id="quality-slider"
        type="range"
        min="1"
        max="3"
        step="1"
        value={quality}
        onChange={handleRangeChange}
        className="w-full accent-clay-blue cursor-pointer h-2 bg-slate-200 rounded-lg"
      />

      <div className="flex justify-between text-[11px] font-bold text-clay-muted px-1">
        <span>Low</span>
        <span>Standard</span>
        <span>High</span>
      </div>

      <p className="text-xs text-clay-slate font-medium mt-1">
        {currentDesc.detail}
      </p>
    </div>
  );
}