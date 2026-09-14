import React from "react";
import { DeleteIcon } from "../../icons.jsx";

export default function ImageDeleteButton({ image, onDelete }) {
  const handleDelete = (e) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(image.id || image);
    }
  };

  return (
    <button
      type="button"
      aria-label={`Delete ${image.name}`}
      className="clay-btn clay-btn-coral py-2 px-4 text-xs w-full rounded-xl flex items-center justify-center gap-2"
      onClick={handleDelete}
    >
      <DeleteIcon />
      <span>Remove</span>
    </button>
  );
}
