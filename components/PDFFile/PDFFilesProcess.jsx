import React, { useRef } from "react";
import LeftSideBox from "../LeftSideBox";
import FilePreviewGrid from "./FilePreviewGrid";
import getPDFPageCount from "../../methods/getPDFPageCount";

export default function PDFFilesProcess({
  files,
  setFiles,
  filename,
  setFilename,
  sortableFilePreviewGrid = false,
  addFileOptions = { fileType: ".pdf", multiple: true },
  downloadHandler,
  LeftSideBoxExtra,
  FilePreviewExtra,
  isProcessing = false,
  downloadButtonText = "Process & Download",
}) {
  const inputButtonRef = useRef(null);

  const handleDeleteAllFiles = () => {
    setFiles([]);
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
        let count = 1;
        try {
          count = await getPDFPageCount(file);
        } catch (err) {
          console.warn("Could not get page count for file:", file.name, err);
        }
        return {
          id: `${file.name}-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
          file,
          name: file.name,
          size: file.size,
          pageCount: count,
          degrees: 0,
        };
      })
    );

    setFiles((prev) => [...prev, ...enriched]);
  };

  const onDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const onDropFiles = async (e) => {
    e.preventDefault();
    const rawFiles = Array.from(e.dataTransfer.files || []);
    if (rawFiles.length === 0) return;

    const enriched = await Promise.all(
      rawFiles.map(async (file) => {
        let count = 1;
        try {
          count = await getPDFPageCount(file);
        } catch (err) {
          console.warn("Could not get page count for file:", file.name, err);
        }
        return {
          id: `${file.name}-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
          file,
          name: file.name,
          size: file.size,
          pageCount: count,
          degrees: 0,
        };
      })
    );

    setFiles((prev) => [...prev, ...enriched]);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 flex flex-col gap-6">
      {/* Hidden Input Tag for AddFile Button */}
      <input
        type="file"
        className="hidden"
        accept={addFileOptions.fileType}
        ref={inputButtonRef}
        multiple={addFileOptions.multiple}
        onChange={onFileChange}
      />

      {/* Top Action Ribbon Card */}
      <div className="clay-card-white p-5 flex flex-col md:flex-row items-center justify-between gap-4">
        {setFilename && (
          <div className="flex items-center gap-3 w-full md:w-auto flex-grow max-w-md">
            <label htmlFor="output-filename" className="text-xs font-black text-clay-muted uppercase shrink-0">
              Output Name:
            </label>
            <input
              id="output-filename"
              type="text"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              placeholder="e.g. output.pdf"
              className="clay-input text-sm w-full py-2 font-bold"
            />
          </div>
        )}

        {/* Big Tactile Action Button */}
        <button
          type="button"
          disabled={isProcessing || files.length === 0}
          onClick={downloadHandler}
          className="clay-btn clay-btn-green w-full md:w-auto px-8 py-3.5 text-base md:text-lg shadow-clay-btn-green shrink-0"
        >
          {isProcessing ? "Processing..." : downloadButtonText}
        </button>
      </div>

      {/* Workspace Area: Left Options + Right File Previews */}
      <div className="flex flex-col lg:flex-row items-start gap-6 w-full">
        {/* Left Side Options Panel */}
        <LeftSideBox
          handleAddFileButtonClick={handleAddFileButtonClick}
          handleDeleteFilesClick={handleDeleteAllFiles}
          multiple={addFileOptions.multiple}
        >
          {LeftSideBoxExtra && <LeftSideBoxExtra />}
        </LeftSideBox>

        {/* Right Side File Preview Grid */}
        <div
          onDrop={onDropFiles}
          onDragOver={onDragOver}
          className="clay-card-white p-6 w-full flex-grow min-h-[420px] flex flex-col border-2 border-dashed border-slate-200"
        >
          <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-2">
            <span className="text-xs font-extrabold text-clay-muted uppercase tracking-wider">
              Files ({files.length})
            </span>
            {sortableFilePreviewGrid && files.length > 1 && (
              <span className="text-xs font-bold text-clay-blue">
                Drag to Reorder
              </span>
            )}
          </div>

          <FilePreviewGrid
            files={files}
            setFiles={setFiles}
            FilePreviewExtra={FilePreviewExtra}
            sortableFilePreviewGrid={sortableFilePreviewGrid}
          />
        </div>
      </div>
    </div>
  );
}
