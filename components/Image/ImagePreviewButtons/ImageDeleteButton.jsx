import React from "react";
import { DeleteIcon } from "../../icons.jsx";

export default function ImageDeleteButton({ image, setDeleted }) {
  const deleteImageHandler = () => {
    image.deleted = true;
    setDeleted(true);
  };
  return (
    <button
      className="grid place-items-center text-slate-200 bg-rose-700 py-2 rounded-md w-3/4"
      onClick={deleteImageHandler}
    >
      <DeleteIcon />
    </button>
  );
}
