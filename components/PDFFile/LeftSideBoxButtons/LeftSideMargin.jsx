import React, { useState } from "react";

export default function LeftSideMargin({ margin = [0, 0, 0, 0], setMargin = () => {} }) {
  const [unit, setUnit] = useState("Millimeters");
  const marginSides = [
    { label: "Left", index: 0, textInputId: "marginLeftValue" },
    { label: "Top", index: 1, textInputId: "marginTopValue" },
    { label: "Right", index: 2, textInputId: "marginRightValue" },
    { label: "Bottom", index: 3, textInputId: "marginBottomValue" },
  ];

  const toMillimeter = (val, currentUnit) => {
    const num = parseFloat(val) || 0;
    if (currentUnit === "Inches") return Math.round(num * 25.4 * 100) / 100;
    if (currentUnit === "Centimeters") return Math.round(num * 10 * 100) / 100;
    return num;
  };

  const fromMillimeter = (mm, currentUnit) => {
    if (currentUnit === "Inches") return Math.round((mm / 25.4) * 100) / 100;
    if (currentUnit === "Centimeters") return Math.round((mm / 10) * 100) / 100;
    return mm;
  };

  const handleValueChange = (index, rawValue) => {
    const mmValue = toMillimeter(rawValue, unit);
    const updated = [...margin];
    updated[index] = mmValue;
    setMargin(updated);
  };

  return (
    <div className="flex flex-col gap-3 p-4 bg-clay-bg rounded-2xl border border-slate-200">
      <div className="flex items-center justify-between">
        <span className="text-sm font-extrabold text-clay-heading">Margin Settings</span>
        <select
          id="marginUnit"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className="text-xs font-bold text-clay-heading bg-white rounded-lg border border-slate-300 py-1 px-2 focus:ring-2 focus:ring-clay-blue outline-none"
        >
          <option value="Millimeters">mm</option>
          <option value="Centimeters">cm</option>
          <option value="Inches">in</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {marginSides.map(({ label, index, textInputId }) => {
          const displayVal = fromMillimeter(margin[index] || 0, unit);
          return (
            <div key={label} className="flex flex-col gap-1">
              <label htmlFor={textInputId} className="text-[11px] font-bold text-clay-muted">
                {label} ({unit === "Inches" ? "in" : unit === "Centimeters" ? "cm" : "mm"})
              </label>
              <input
                id={textInputId}
                type="number"
                step={unit === "Inches" ? "0.1" : "1"}
                min="0"
                value={displayVal}
                onChange={(e) => handleValueChange(index, e.target.value)}
                className="clay-input text-xs py-1.5 px-2 text-center"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
