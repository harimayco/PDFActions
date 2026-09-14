import React from "react";
import FileRotateButtons from "./FilePreviewButtons/FileRotateButtons";
import FileDeleteButton from "./FilePreviewButtons/FileDeleteButton";
import FileRangeInput from "./FilePreviewButtons/FileRangeInput";

export function RotateAndDeleteExtra({ file, onRotate, onDelete }) {
  return (
    <div className="flex flex-col gap-2 w-full mt-2">
      <FileRotateButtons file={file} onRotate={onRotate} />
      <FileDeleteButton file={file} onDelete={onDelete} />
    </div>
  );
}

export function SplitFilePreviewExtra({ file, onRotate, onDelete, onUpdate }) {
  return (
    <div className="flex flex-col gap-2 w-full mt-2">
      <FileRotateButtons file={file} onRotate={onRotate} />
      <FileRangeInput file={file} onUpdate={onUpdate} />
      <FileDeleteButton file={file} onDelete={onDelete} />
    </div>
  );
}

export function DeleteOnlyExtra({ file, onDelete }) {
  return (
    <div className="flex flex-col gap-2 w-full mt-2">
      <FileDeleteButton file={file} onDelete={onDelete} />
    </div>
  );
}

export function RotateOnlyExtra({ file, onRotate }) {
  return (
    <div className="flex flex-col gap-2 w-full mt-2">
      <FileRotateButtons file={file} onRotate={onRotate} />
    </div>
  );
}
