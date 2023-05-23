import React, {useState} from "react";

export default function LeftSideResizePDF({size, setSize = () => {}, orientation, setOrientation = () => {}, position, setPosition = () => {}}){
  const resizeSizes = ["A4", "A3", "A5", "Legal", "Letter", "Tabloid"];
  const orientations = ["Portrait", "Landscape"];
  const positions = ["Center","Start", "End"];

  return (
    <div className="w-full mt-2 py-2 tracking-wider border-y-2 border-rose-200">
      Page Settings
      <div className="flex justify-between items-center">
        Size
        <select
          id="resizeSize"
          className="bg-yellow-100 w-1/2 py-2 pl-2 rounded-md"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        >
          {resizeSizes.map((resizeSize, i) => (
            <option key={i} value={resizeSize}>
              {resizeSize}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-between items-center mt-2">
        Orientation
        <select
          id="orientation"
          className="bg-yellow-100 w-1/2 py-2 pl-2 rounded-md"
          value={orientation}
          onChange={(e) => setOrientation(e.target.value)}
        >
          {orientations.map((orientation, i) => (
            <option key={i} value={orientation}>
              {orientation}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-between items-center mt-2">
        Position
        <select
          id="position"
          className="bg-yellow-100 w-1/2 py-2 pl-2 rounded-md"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        >
          {positions.map((position, i) => (
            <option key={i} value={position}>
              {position}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
