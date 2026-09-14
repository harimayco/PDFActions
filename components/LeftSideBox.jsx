import React from "react";

export default function LeftSideBox({
  children,
  handleAddFileButtonClick,
  handleDeleteFilesClick,
  multiple = true,
  title = "Tool Options",
}) {
  return (
    <aside className="clay-card-white p-6 w-full lg:w-[340px] shrink-0 flex flex-col gap-5">
      <div className="flex items-center justify-between border-b-2 border-slate-100 pb-3">
        <h4 className="text-lg font-black text-clay-heading">{title}</h4>
      </div>

      {multiple && handleAddFileButtonClick && (
        <button
          type="button"
          className="clay-btn clay-btn-blue w-full py-3 text-sm font-bold"
          onClick={handleAddFileButtonClick}
        >
          + Add More Files
        </button>
      )}

      {children && <div className="flex flex-col gap-4">{children}</div>}

      {multiple && handleDeleteFilesClick && (
        <button
          type="button"
          className="clay-btn clay-btn-coral w-full py-2.5 text-xs font-bold mt-2"
          onClick={handleDeleteFilesClick}
        >
          Clear All Files
        </button>
      )}
    </aside>
  );
}
