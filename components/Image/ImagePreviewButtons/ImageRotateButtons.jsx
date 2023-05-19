import React from "react";
import { RotateLeft, RotateRight } from "../../icons.jsx";

export default function ImageRotateButton({ image, imageRef }) {
  const rotateImageLeftHandler = () => {
    const degrees = image.degrees - 90;
    imageRef.current.style.transform = `rotate(${degrees}deg)`;
    image.degrees = degrees;
  };
  const rotateImageRightHandler = () => {
    const degrees = image.degrees + 90;
    imageRef.current.style.transform = `rotate(${degrees}deg)`;
    image.degrees = degrees;
  };

  return (
    <div className="flex items-center justify-evenly w-full">
      <button
        className="px-4 py-2 text-slate-200 rounded-md bg-rose-400"
        onClick={rotateImageLeftHandler}
      >
        <RotateLeft />
      </button>
      <button
        className="px-4 py-2 text-slate-200 rounded-md bg-rose-400"
        onClick={rotateImageRightHandler}
      >
        <RotateRight />
      </button>
    </div>
  );
}
