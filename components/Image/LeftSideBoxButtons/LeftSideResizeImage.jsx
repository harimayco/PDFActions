import React from "react";

export default function LeftSideResizeImage({
  pageSize = "A4",
  setPageSize = () => {},
  pageOrientation = "Portrait",
  setPageOrientation = () => {},
  imagePosition = "Center",
  setImagePosition = () => {},
}) {
  const resizeSizes = [
    "Same as Image",
    "A4",
    "A3",
    "A5",
    "Legal",
    "Letter",
    "Tabloid",
  ];
  const orientations = ["Portrait", "Landscape"];
  const positions = ["Start", "Center", "End"];

  return (
    <div className="flex flex-col gap-3 p-4 bg-clay-bg rounded-2xl border border-slate-200">
      <span className="text-sm font-extrabold text-clay-heading">Page & Layout</span>

      {/* Page Size */}
      <div className="flex flex-col gap-1">
        <label htmlFor="pageSize" className="text-xs font-bold text-clay-muted">
          Page Size
        </label>
        <select
          id="pageSize"
          value={pageSize}
          onChange={(e) => setPageSize(e.target.value)}
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
        <label htmlFor="pageOrientation" className="text-xs font-bold text-clay-muted">
          Orientation
        </label>
        <select
          id="pageOrientation"
          value={pageOrientation}
          onChange={(e) => setPageOrientation(e.target.value)}
          className="clay-input text-sm py-2 cursor-pointer"
        >
          {orientations.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>

      {/* Image Position */}
      <div className="flex flex-col gap-1">
        <label htmlFor="imagePosition" className="text-xs font-bold text-clay-muted">
          Placement Position
        </label>
        <select
          id="imagePosition"
          value={imagePosition}
          onChange={(e) => setImagePosition(e.target.value)}
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
