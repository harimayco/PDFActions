import React from "react";
import { RotateLeft, RotateRight } from "../../icons.jsx";

export default function FileRotateButtons({ file, onRotate }) {
  const currentDegrees = file.degrees || 0;

  const handleRotateLeft = (e) => {
    e.stopPropagation();
    const newDeg = (currentDegrees - 90) % 360;
    if (onRotate) {
      onRotate(file.id || file, newDeg);
    }
  };

  const handleRotateRight = (e) => {
    e.stopPropagation();
    const newDeg = (currentDegrees + 90) % 360;
    if (onRotate) {
      onRotate(file.id || file, newDeg);
    }
  };

  return (
    <div className="flex items-center justify-between gap-2 w-full">
      <button
        type="button"
        title="Rotate Left 90°"
        aria-label="Rotate left 90 degrees"
        className="clay-btn clay-btn-white py-1.5 px-3 text-xs w-1/2 rounded-xl flex items-center justify-center gap-1"
        onClick={handleRotateLeft}
      >
        <RotateLeft />
        <span className="text-[11px] font-bold">Left</span>
      </button>
      <button
        type="button"
        title="Rotate Right 90°"
        aria-label="Rotate right 90 degrees"
        className="clay-btn clay-btn-white py-1.5 px-3 text-xs w-1/2 rounded-xl flex items-center justify-center gap-1"
        onClick={handleRotateRight}
      >
        <RotateRight />
        <span className="text-[11px] font-bold">Right</span>
      </button>
    </div>
  );
}
