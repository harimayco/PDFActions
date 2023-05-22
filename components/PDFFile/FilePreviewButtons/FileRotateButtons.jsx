import React from "react";
import { RotateLeft, RotateRight } from "../../icons.jsx";

export default function FileRotateButtons({ file, imageRef }) {
  const rotateFileLeftHandler = () => {
    const degrees = file.degrees - 90 || -90;
    imageRef.current.style.transform = `rotate(${degrees}deg)`;
    file.degrees = degrees;
  };
  const rotateFileRightHandler = () => {
    const degrees = file.degrees + 90 || 90;
    imageRef.current.style.transform = `rotate(${degrees}deg)`;
    file.degrees = degrees;
  };

  return (
    <div className="flex items-center justify-evenly w-full">
      <button
        className="px-4 bg-slate-100 py-2 rounded-md"
        onClick={rotateFileLeftHandler}
      >
        <RotateLeft />
      </button>
      <button
        className="px-4 bg-slate-100 py-2 rounded-md"
        onClick={rotateFileRightHandler}
      >
        <RotateRight />
      </button>
    </div>
  );
}
