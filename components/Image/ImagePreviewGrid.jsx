import React from "react";
import SortableList, { SortableItem } from "react-easy-sort";
import arrayMove from "array-move";
import ImagePreview from "./ImagePreview";

export default function ImagePreviewGrid({
  images,
  setImages,
  ImagePreviewExtra,
  sortableImagePreviewGrid = false,
  onRotate,
  onDelete,
}) {
  const onSortEnd = (oldIndex, newIndex) => {
    setImages((prev) => arrayMove(prev, oldIndex, newIndex));
  };

  const handleRotate = (imageId, degrees) => {
    if (onRotate) {
      onRotate(imageId, degrees);
    } else {
      setImages((prev) =>
        prev.map((img) =>
          (img.id === imageId || img === imageId) ? { ...img, degrees } : img
        )
      );
    }
  };

  const handleDelete = (imageId) => {
    if (onDelete) {
      onDelete(imageId);
    } else {
      setImages((prev) => prev.filter((img) => img.id !== imageId && img !== imageId));
    }
  };

  if (sortableImagePreviewGrid) {
    return (
      <SortableList
        onSortEnd={onSortEnd}
        className="flex flex-wrap items-start justify-center gap-6"
        draggedItemClassName="z-[9999] opacity-90 scale-105 shadow-2xl pointer-events-none transition-none"
      >
        {images.map((image) => {
          const key = image.id || image.name;
          return (
            <SortableItem key={key}>
              <div className="select-none">
                <ImagePreview
                  image={image}
                  ImagePreviewExtra={ImagePreviewExtra}
                  onRotate={handleRotate}
                  onDelete={handleDelete}
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
      {images.map((image) => {
        const key = image.id || image.name;
        return (
          <ImagePreview
            key={key}
            image={image}
            ImagePreviewExtra={ImagePreviewExtra}
            onRotate={handleRotate}
            onDelete={handleDelete}
          />
        );
      })}
    </div>
  );
}
