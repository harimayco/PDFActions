import React from "react";
import { SortableKnob } from "react-easy-sort";

export default function ImagePreview({
  image,
  ImagePreviewExtra,
  onRotate,
  onDelete,
  isSortable = false,
}) {
  const previewUrl = image.previewUrl || (typeof image.src === "string" ? image.src : null);

  return (
    <div className="clay-card-white p-4 w-[210px] flex flex-col items-center relative group">
      {/* Top Header: Drag Handle Knob (if sortable) & File Name */}
      <div className="flex items-center justify-between w-full mb-3 gap-1.5">
        {isSortable && (
          <SortableKnob>
            <div
              className="cursor-grab active:cursor-grabbing p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors flex items-center justify-center shrink-0"
              title="Drag to reorder"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="9" cy="6" r="2" />
                <circle cx="15" cy="6" r="2" />
                <circle cx="9" cy="12" r="2" />
                <circle cx="15" cy="12" r="2" />
                <circle cx="9" cy="18" r="2" />
                <circle cx="15" cy="18" r="2" />
              </svg>
            </div>
          </SortableKnob>
        )}

        <div
          className="clay-badge bg-clay-bg text-clay-heading text-xs font-bold flex-grow truncate select-none text-center"
          title={image.name}
        >
          <span className="truncate">{image.name}</span>
        </div>
      </div>

      {/* Image Thumbnail */}
      {isSortable ? (
        <SortableKnob>
          <div className="cursor-grab active:cursor-grabbing">
            <div className="relative w-[150px] h-[190px] rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center border-2 border-slate-200/80 shadow-inner">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt={image.name || "Image preview"}
                  draggable={false}
                  className="w-full h-full object-contain transition-transform duration-200 select-none"
                  style={{
                    transform: `rotate(${image.degrees || 0}deg)`,
                  }}
                />
              ) : (
                <span className="text-xs font-bold text-clay-muted">No Preview</span>
              )}
            </div>
          </div>
        </SortableKnob>
      ) : (
        <div className="relative w-[150px] h-[190px] rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center border-2 border-slate-200/80 shadow-inner">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt={image.name || "Image preview"}
              draggable={false}
              className="w-full h-full object-contain transition-transform duration-200 select-none"
              style={{
                transform: `rotate(${image.degrees || 0}deg)`,
              }}
            />
          ) : (
            <span className="text-xs font-bold text-clay-muted">No Preview</span>
          )}
        </div>
      )}

      {/* Extra Action Buttons */}
      {ImagePreviewExtra && (
        <div className="w-full mt-3">
          <ImagePreviewExtra
            image={image}
            onRotate={onRotate}
            onDelete={onDelete}
          />
        </div>
      )}
    </div>
  );
}
