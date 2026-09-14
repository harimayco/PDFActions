import React from "react";

export default function FileRangeInput({ file, onUpdate }) {
  const maxPages = file.pageCount || 1;
  const currentRange = file.splitRange || [1, maxPages];
  const [start, end] = currentRange;

  const handleStartChange = (e) => {
    let val = parseInt(e.target.value, 10);
    if (isNaN(val) || val < 1) val = 1;
    if (val > maxPages) val = maxPages;
    if (val > end) val = end;
    if (onUpdate) {
      onUpdate(file.id || file, { splitRange: [val, end] });
    }
  };

  const handleEndChange = (e) => {
    let val = parseInt(e.target.value, 10);
    if (isNaN(val)) val = start;
    if (val < start) val = start;
    if (val > maxPages) val = maxPages;
    if (onUpdate) {
      onUpdate(file.id || file, { splitRange: [start, val] });
    }
  };

  return (
    <div className="flex items-center justify-center gap-1.5 w-full bg-clay-bg p-1.5 rounded-xl border border-slate-200">
      <span className="text-[10px] font-extrabold text-clay-muted uppercase">From</span>
      <input
        type="number"
        min={1}
        max={maxPages}
        value={start}
        onChange={handleStartChange}
        className="w-12 text-center text-xs font-bold text-clay-heading bg-white rounded-lg border border-slate-300 py-1 focus:ring-2 focus:ring-clay-blue outline-none"
        aria-label="Split start page"
      />
      <span className="text-[10px] font-extrabold text-clay-muted uppercase">To</span>
      <input
        type="number"
        min={start}
        max={maxPages}
        value={end}
        onChange={handleEndChange}
        className="w-12 text-center text-xs font-bold text-clay-heading bg-white rounded-lg border border-slate-300 py-1 focus:ring-2 focus:ring-clay-blue outline-none"
        aria-label="Split end page"
      />
    </div>
  );
}
