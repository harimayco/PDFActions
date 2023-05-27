import React, { useRef, useState } from "react";
import { PDFIcon } from "./icons";

export default function FileUploader({ onFileChange, multiple, fileType }) {
  const inputRef = useRef(null);
  const [uploaderClass, setUploaderClass] = useState("bg-white");

  const handleClick = () => inputRef.current.click();
  const onDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setUploaderClass("bg-sky-100");
  }
  const onDragLeave = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setUploaderClass("bg-white");
  }
  
  const onDropFiles = (e) =>{
    e.preventDefault();
    const files = e.dataTransfer.files;
    const s = {
      target: {
        files : files
      }
    }
    onFileChange(s);
  }

  return (
    <div className="flex items-center justify-center w-screen h-[90vh]">
      <input
        type="file"
        className="hidden"
        accept={fileType}
        ref={inputRef}
        multiple={multiple}
        onChange={(e) => onFileChange(e)}
      />
      <div
        id="uploader-box" onDrop={onDropFiles} onDragOver={onDragOver} onDragLeave={onDragLeave} className={`${uploaderClass} w-[80vw] h-[80vh] border-2 border-rose-400 border-dashed rounded-xl flex items-center justify-center flex-col cursor-pointer`}
        onClick={handleClick}
      >
        <div className="flex w-48 items-center text-slate-200 justify-evenly mb-4 bg-rose-700 p-4 rounded-xl">
          <PDFIcon />
          Choose File(s)
        </div>

        <div className="text-slate-400">Or Drop File(s) Here</div>
      </div>
    </div>
  );
}
