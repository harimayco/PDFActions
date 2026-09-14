import React from "react";

export default function LeftSidePageNumbers({
  options = {
    firstPageNumber: 1,
    startingPage: 1,
    endingPage: 1,
    margin: "Recommended",
    position: "b-c",
    fontSize: 12,
  },
  setOptions = () => {},
  file,
}) {
  const maxPages = file?.pageCount || 1;

  const update = (key, val) => {
    setOptions((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  const positions = [
    { id: "t-l", label: "Top Left" },
    { id: "t-c", label: "Top Center" },
    { id: "t-r", label: "Top Right" },
    { id: "b-l", label: "Bottom Left" },
    { id: "b-c", label: "Bottom Center" },
    { id: "b-r", label: "Bottom Right" },
  ];

  return (
    <div className="flex flex-col gap-3.5 p-4 bg-clay-bg rounded-2xl border border-slate-200">
      <span className="text-sm font-extrabold text-clay-heading">Page Number Options</span>

      {/* Position Matrix */}
      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-bold text-clay-muted">Number Position</span>
        <div className="grid grid-cols-3 gap-1.5 p-2 bg-white rounded-xl border border-slate-200">
          {positions.slice(0, 3).map((pos) => (
            <button
              key={pos.id}
              type="button"
              title={pos.label}
              onClick={() => update("position", pos.id)}
              className={`h-8 rounded-lg text-xs font-bold transition-all ${
                options.position === pos.id
                  ? "bg-clay-blue text-white shadow-[0_2px_0_0_#1D4ED8]"
                  : "bg-slate-100 text-clay-heading hover:bg-slate-200"
              }`}
            >
              {pos.id.toUpperCase()}
            </button>
          ))}
          {positions.slice(3, 6).map((pos) => (
            <button
              key={pos.id}
              type="button"
              title={pos.label}
              onClick={() => update("position", pos.id)}
              className={`h-8 rounded-lg text-xs font-bold transition-all ${
                options.position === pos.id
                  ? "bg-clay-blue text-white shadow-[0_2px_0_0_#1D4ED8]"
                  : "bg-slate-100 text-clay-heading hover:bg-slate-200"
              }`}
            >
              {pos.id.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Margin Select */}
      <div className="flex flex-col gap-1">
        <label htmlFor="pageNumberMargin" className="text-xs font-bold text-clay-muted">
          Page Margin
        </label>
        <select
          id="pageNumberMargin"
          value={options.margin || "Recommended"}
          onChange={(e) => update("margin", e.target.value)}
          className="clay-input text-xs py-2"
        >
          <option value="Small">Small</option>
          <option value="Recommended">Recommended</option>
          <option value="Big">Big</option>
        </select>
      </div>

      {/* Page Ranges & Sizing */}
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="startPage" className="text-[11px] font-bold text-clay-muted">
            Starting Page
          </label>
          <input
            id="startPage"
            type="number"
            min="1"
            max={maxPages}
            value={options.startingPage || 1}
            onChange={(e) => update("startingPage", parseInt(e.target.value, 10) || 1)}
            className="clay-input text-xs py-1.5 text-center"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="endPage" className="text-[11px] font-bold text-clay-muted">
            Ending Page
          </label>
          <input
            id="endPage"
            type="number"
            min="1"
            max={maxPages}
            value={options.endingPage || maxPages}
            onChange={(e) => update("endingPage", parseInt(e.target.value, 10) || maxPages)}
            className="clay-input text-xs py-1.5 text-center"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="firstNum" className="text-[11px] font-bold text-clay-muted">
            First Number
          </label>
          <input
            id="firstNum"
            type="number"
            min="1"
            value={options.firstPageNumber || 1}
            onChange={(e) => update("firstPageNumber", parseInt(e.target.value, 10) || 1)}
            className="clay-input text-xs py-1.5 text-center"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="fontSize" className="text-[11px] font-bold text-clay-muted">
            Font Size (pt)
          </label>
          <input
            id="fontSize"
            type="number"
            min="8"
            max="36"
            value={options.fontSize || 12}
            onChange={(e) => update("fontSize", parseInt(e.target.value, 10) || 12)}
            className="clay-input text-xs py-1.5 text-center"
          />
        </div>
      </div>
    </div>
  );
}
