import React from "react";

export default function LeftSideBreakPDF({
  breakOptions = { maxPages: 1, includeLastPages: true },
  setBreakOptions = () => {},
  file,
}) {
  const maxLimit = file?.pageCount || 100;

  const handleMaxPagesChange = (e) => {
    let val = parseInt(e.target.value, 10);
    if (isNaN(val) || val < 1) val = 1;
    if (val > maxLimit) val = maxLimit;
    setBreakOptions((prev) => ({ ...prev, maxPages: val }));
  };

  const handleIncludeChange = (e) => {
    setBreakOptions((prev) => ({ ...prev, includeLastPages: e.target.checked }));
  };

  return (
    <div className="flex flex-col gap-3 p-4 bg-clay-bg rounded-2xl border border-slate-200">
      <span className="text-sm font-extrabold text-clay-heading">Break Configuration</span>

      <div className="flex flex-col gap-1">
        <label htmlFor="maxPages" className="text-xs font-bold text-clay-muted">
          Max Pages per Chunk
        </label>
        <input
          id="maxPages"
          type="number"
          min={1}
          max={maxLimit}
          value={breakOptions.maxPages || 1}
          onChange={handleMaxPagesChange}
          className="clay-input text-xs py-2 text-center"
        />
      </div>

      <label className="flex items-center gap-2 cursor-pointer mt-1 select-none">
        <input
          type="checkbox"
          checked={breakOptions.includeLastPages !== false}
          onChange={handleIncludeChange}
          className="w-4 h-4 rounded text-clay-blue accent-clay-blue"
        />
        <span className="text-xs font-bold text-clay-heading">Include remaining trailing pages</span>
      </label>
    </div>
  );
}
