import React, { useRef } from "react";
import LeftSideBox from "../LeftSideBox";
import ImagePreviewGrid from "./ImagePreviewGrid";

export default function ImageProcess({
  images,
  setImages,
  sortableImagePreviewGrid = false,
  addFileOptions = { fileType: "image/*", multiple: true },
  downloadHandler,
  LeftSideBoxExtra,
  ImagePreviewExtra,
  isProcessing = false,
}) {
  const inputButtonRef = useRef(null);

  const handleDeleteAll = () => {
    // Revoke any created preview URLs to avoid memory leaks
    images.forEach((img) => {
      if (img.previewUrl) {
        URL.revokeObjectURL(img.previewUrl);
      }
    });
    setImages([]);
  };

  const handleAddFileButtonClick = () => {
    if (inputButtonRef.current) {
      inputButtonRef.current.value = "";
      inputButtonRef.current.click();
    }
  };

  const onFileChange = async (e) => {
    const rawFiles = Array.from(e.target.files || []);
    if (rawFiles.length === 0) return;

    const enriched = await Promise.all(
      rawFiles.map(async (file) => {
        const previewUrl = URL.createObjectURL(file);
        const arrayBuffer = await file.arrayBuffer();
        return {
          id: `${file.name}-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
          file,
          src: arrayBuffer,
          previewUrl,
          name: file.name,
          size: file.size,
          degrees: 0,
        };
      })
    );

    setImages((prev) => [...prev, ...enriched]);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 flex flex-col gap-6">
      <input
        type="file"
        className="hidden"
        accept={addFileOptions.fileType}
        ref={inputButtonRef}
        multiple={addFileOptions.multiple}
        onChange={onFileChange}
      />

      {/* Top Action Ribbon */}
      <div className="clay-card-white p-5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col">
          <span className="text-lg font-black text-clay-heading">Image to PDF Converter</span>
          <span className="text-xs font-bold text-clay-muted">
            {images.length} {images.length === 1 ? "image" : "images"} loaded
          </span>
        </div>

        <button
          type="button"
          disabled={isProcessing || images.length === 0}
          onClick={downloadHandler}
          className="clay-btn clay-btn-green w-full md:w-auto px-8 py-3.5 text-base md:text-lg shadow-clay-btn-green"
        >
          {isProcessing ? "Converting..." : "Convert & Download PDF"}
        </button>
      </div>

      {/* Workspace Area */}
      <div className="flex flex-col lg:flex-row items-start gap-6 w-full">
        <LeftSideBox
          handleAddFileButtonClick={handleAddFileButtonClick}
          handleDeleteFilesClick={handleDeleteAll}
          multiple={addFileOptions.multiple}
          title="Conversion Settings"
        >
          {LeftSideBoxExtra && <LeftSideBoxExtra />}
        </LeftSideBox>

        <div className="clay-card-white p-6 w-full flex-grow min-h-[420px] flex flex-col border-2 border-dashed border-slate-200">
          <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-2">
            <span className="text-xs font-extrabold text-clay-muted uppercase tracking-wider">
              Images ({images.length})
            </span>
            {sortableImagePreviewGrid && images.length > 1 && (
              <span className="text-xs font-bold text-clay-blue">
                Drag to Reorder
              </span>
            )}
          </div>

          <ImagePreviewGrid
            images={images}
            setImages={setImages}
            ImagePreviewExtra={ImagePreviewExtra}
            sortableImagePreviewGrid={sortableImagePreviewGrid}
          />
        </div>
      </div>
    </div>
  );
}
