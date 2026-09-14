import React, { useRef, useState } from "react";
import { PDFIcon } from "./icons";

export default function FileUploader({
  onFileChange,
  multiple = true,
  fileType = ".pdf",
  title = "Choose or Drop PDF Files Here",
  subtitle = "Fast, private, and sculpted directly in your browser",
}) {
  const inputRef = useRef(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.click();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  const onDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsDragOver(true);
  };

  const onDragLeave = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsDragOver(false);
  };

  const onDropFiles = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      onFileChange({
        target: {
          files: files,
        },
      });
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 md:py-12 flex flex-col items-center">
      <input
        type="file"
        className="hidden"
        accept={fileType}
        ref={inputRef}
        multiple={multiple}
        onChange={onFileChange}
      />

      <div
        id="uploader-box"
        role="button"
        tabIndex={0}
        aria-label="Upload PDF files dropzone"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onDrop={onDropFiles}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        className={`w-full min-h-[320px] rounded-3xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 border-3 border-dashed select-none ${
          isDragOver
            ? "bg-clay-bg-blue border-clay-blue scale-[1.01] shadow-clay-card-blue"
            : "bg-white border-clay-muted/30 shadow-clay-card hover:border-clay-blue/60 hover:scale-[1.005]"
        }`}
      >
        <div className="pointer-events-none flex flex-col items-center text-center">
          {/* Top Clay Icon Box */}
          <div className="clay-icon-box clay-icon-coral mb-6 scale-110">
            <PDFIcon width="32" />
          </div>

          <h3 className="text-2xl md:text-3xl font-black text-clay-heading mb-2">
            {title}
          </h3>
          <p className="text-sm md:text-base font-semibold text-clay-muted mb-6 max-w-md">
            {subtitle}
          </p>

          {/* Signature Primary Clay Button */}
          <div className="clay-btn clay-btn-blue text-base md:text-lg px-8 py-3.5 shadow-clay-btn-blue">
            <PDFIcon width="20" />
            <span>Select {multiple ? "Files" : "File"}</span>
          </div>

          <span className="text-xs font-bold text-clay-muted mt-4 uppercase tracking-wider">
            or drag and drop here
          </span>
        </div>
      </div>
    </div>
  );
}
