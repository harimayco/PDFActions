import React from "react";
import SortableList, { SortableItem } from "react-easy-sort";
import arrayMove from "array-move";
import FilePreview from "./FilePreview";

export default function FilePreviewGrid({
  files,
  setFiles,
  FilePreviewExtra,
  sortableFilePreviewGrid = false,
  onRotate,
  onDelete,
  onUpdate,
}) {
  const onSortEnd = (oldIndex, newIndex) => {
    setFiles((prev) => arrayMove(prev, oldIndex, newIndex));
  };

  const handleRotate = (fileId, degrees) => {
    if (onRotate) {
      onRotate(fileId, degrees);
    } else {
      setFiles((prev) =>
        prev.map((f) =>
          (f.id === fileId || f === fileId) ? { ...f, degrees } : f
        )
      );
    }
  };

  const handleDelete = (fileId) => {
    if (onDelete) {
      onDelete(fileId);
    } else {
      setFiles((prev) => prev.filter((f) => f.id !== fileId && f !== fileId));
    }
  };

  const handleUpdate = (fileId, updates) => {
    if (onUpdate) {
      onUpdate(fileId, updates);
    } else {
      setFiles((prev) =>
        prev.map((f) =>
          (f.id === fileId || f === fileId) ? { ...f, ...updates } : f
        )
      );
    }
  };

  if (sortableFilePreviewGrid) {
    return (
      <SortableList
        onSortEnd={onSortEnd}
        className="flex flex-wrap items-start justify-center gap-6"
        draggedItemClassName="z-[9999] opacity-90 scale-105 shadow-2xl pointer-events-none transition-none"
      >
        {files.map((file) => {
          const key = file.id || file.name;
          return (
            <SortableItem key={key}>
              <div className="select-none">
                <FilePreview
                  file={file}
                  FilePreviewExtra={FilePreviewExtra}
                  onRotate={handleRotate}
                  onDelete={handleDelete}
                  onUpdate={handleUpdate}
                  isSortable={true}
                />
              </div>
            </SortableItem>
          );
        })}
      </SortableList>
    );
  }

  return (
    <div className="flex flex-wrap items-start justify-center gap-6">
      {files.map((file) => {
        const key = file.id || file.name;
        return (
          <FilePreview
            key={key}
            file={file}
            FilePreviewExtra={FilePreviewExtra}
            onRotate={handleRotate}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        );
      })}
    </div>
  );
}
