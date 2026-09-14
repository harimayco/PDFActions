import React from "react";

export default function LeftSideResizePDF({
  size = "A4",
  setSize = () => {},
  orientation = "Portrait",
  setOrientation = () => {},
  position = "Center",
  setPosition = () => {},
}) {
  const resizeSizes = ["A4", "A3", "A5", "Legal", "Letter", "Tabloid"];
  const orientations = ["Portrait", "Landscape"];
  const positions = ["Center", "Start", "End"];

  return (
    <div className="flex flex-col gap-3 p-4 bg-clay-bg rounded-2xl border border-slate-200">
      <span className="text-sm font-extrabold text-clay-heading">Page Dimensions</span>

      {/* Page Size */}
      <div className="flex flex-col gap-1">
        <label htmlFor="resizeSize" className="text-xs font-bold text-clay-muted">
          Page Size
        </label>
        <select
          id="resizeSize"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="clay-input text-sm py-2 cursor-pointer"
        >
          {resizeSizes.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Orientation */}
      <div className="flex flex-col gap-1">
        <label htmlFor="orientation" className="text-xs font-bold text-clay-muted">
          Orientation
        </label>
        <select
          id="orientation"
          value={orientation}
          onChange={(e) => setOrientation(e.target.value)}
          className="clay-input text-sm py-2 cursor-pointer"
        >
          {orientations.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>

      {/* Alignment Position */}
      <div className="flex flex-col gap-1">
        <label htmlFor="position" className="text-xs font-bold text-clay-muted">
          Position on Page
        </label>
        <select
          id="position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          className="clay-input text-sm py-2 cursor-pointer"
        >
          {positions.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
