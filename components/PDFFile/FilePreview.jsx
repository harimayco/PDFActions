import React from "react";
import { SortableKnob } from "react-easy-sort";
import PDFThumbnail from "./PDFThumbnail";

export default function FilePreview({
  file,
  FilePreviewExtra,
  onRotate,
  onDelete,
  onUpdate,
  isSortable = false,
}) {
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
          title={file.name}
        >
          <span className="truncate">{file.name}</span>
        </div>
      </div>

      {/* PDF Thumbnail (also wrapped in SortableKnob if sortable for easy grabbing) */}
      {isSortable ? (
        <SortableKnob>
          <div className="cursor-grab active:cursor-grabbing">
            <PDFThumbnail file={file} degrees={file.degrees || 0} />
          </div>
        </SortableKnob>
      ) : (
        <PDFThumbnail file={file} degrees={file.degrees || 0} />
      )}

      {/* Page Count Badge */}
      {file.pageCount && (
        <span className="text-[11px] font-bold text-clay-muted mt-2">
          {file.pageCount} {file.pageCount === 1 ? "page" : "pages"}
        </span>
      )}

      {/* Extra Action Buttons (Rotate, Range, Delete) */}
      {FilePreviewExtra && (
        <div className="w-full mt-2">
          <FilePreviewExtra
            file={file}
            onRotate={onRotate}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        </div>
      )}
    </div>
  );
}
