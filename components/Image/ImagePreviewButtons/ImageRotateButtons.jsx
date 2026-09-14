import React from "react";
import { RotateLeft, RotateRight } from "../../icons.jsx";

export default function ImageRotateButtons({ image, onRotate }) {
  const currentDegrees = image.degrees || 0;

  const handleRotateLeft = (e) => {
    e.stopPropagation();
    const newDeg = (currentDegrees - 90) % 360;
    if (onRotate) {
      onRotate(image.id || image, newDeg);
    }
  };

  const handleRotateRight = (e) => {
    e.stopPropagation();
    const newDeg = (currentDegrees + 90) % 360;
    if (onRotate) {
      onRotate(image.id || image, newDeg);
    }
  };

  return (
    <div className="flex items-center justify-between gap-1.5 w-full">
      <button
        type="button"
        title="Rotate Left 90°"
        aria-label="Rotate left 90 degrees"
        className="clay-btn clay-btn-white py-1.5 px-2 text-xs w-1/2 rounded-xl flex items-center justify-center gap-1.5 text-slate-700 hover:text-clay-blue"
        onClick={handleRotateLeft}
      >
        <RotateLeft className="w-3.5 h-3.5 shrink-0 text-clay-blue" />
        <span className="text-[11px] font-bold text-slate-700">Left</span>
      </button>
      <button
        type="button"
        title="Rotate Right 90°"
        aria-label="Rotate right 90 degrees"
        className="clay-btn clay-btn-white py-1.5 px-2 text-xs w-1/2 rounded-xl flex items-center justify-center gap-1.5 text-slate-700 hover:text-clay-blue"
        onClick={handleRotateRight}
      >
        <RotateRight className="w-3.5 h-3.5 shrink-0 text-clay-blue" />
        <span className="text-[11px] font-bold text-slate-700">Right</span>
      </button>
    </div>
  );
}
