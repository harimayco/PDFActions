import React from "react";
import { DeleteIcon } from "../../icons.jsx";

export default function FileDeleteButton({ file, onDelete }) {
  const handleDelete = (e) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(file.id || file);
    }
  };

  return (
    <button
      type="button"
      aria-label={`Delete ${file.name}`}
      className="clay-btn clay-btn-coral py-2 px-4 text-xs w-full rounded-xl flex items-center justify-center gap-2"
      onClick={handleDelete}
    >
      <DeleteIcon />
      <span>Remove</span>
    </button>
  );
}
