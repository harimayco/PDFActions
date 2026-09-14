import React from "react";
import { RotateLeft, RotateRight } from "../../icons.jsx";

export default function LeftSideBoxRotation({ files, setFiles, onRotateAll }) {
  const rotateAll = (delta) => {
    if (onRotateAll) {
      onRotateAll(delta);
    } else if (setFiles) {
      setFiles((prev) =>
        prev.map((file) => {
          const current = file.degrees || 0;
          return {
            ...file,
            degrees: (current + delta) % 360,
          };
        })
      );
    }
  };

  const resetAll = () => {
    if (setFiles) {
      setFiles((prev) =>
        prev.map((file) => ({
          ...file,
          degrees: 0,
        }))
      );
    }
  };

  return (
    <div className="flex flex-col gap-2 p-3 bg-clay-bg rounded-2xl border border-slate-200">
      <span className="text-xs font-bold text-clay-muted">Batch Rotation</span>
      <div className="flex gap-2">
        <button
          type="button"
          title="Rotate All Left 90°"
          className="clay-btn clay-btn-white w-1/2 py-2 text-xs flex items-center justify-center gap-1.5 text-slate-700 hover:text-clay-blue"
          onClick={() => rotateAll(-90)}
        >
          <RotateLeft className="w-4 h-4 shrink-0 text-clay-blue" />
          <span className="text-[11px] font-bold text-slate-700">Rotate All L</span>
        </button>
        <button
          type="button"
          title="Rotate All Right 90°"
          className="clay-btn clay-btn-white w-1/2 py-2 text-xs flex items-center justify-center gap-1.5 text-slate-700 hover:text-clay-blue"
          onClick={() => rotateAll(90)}
        >
          <RotateRight className="w-4 h-4 shrink-0 text-clay-blue" />
          <span className="text-[11px] font-bold text-slate-700">Rotate All R</span>
        </button>
      </div>

      <button
        type="button"
        className="clay-btn clay-btn-white py-1.5 text-xs text-clay-muted hover:text-clay-heading"
        onClick={resetAll}
      >
        Reset All Rotations
      </button>
    </div>
  );
}
