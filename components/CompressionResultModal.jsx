import React, { useEffect } from "react";
import { saveAs } from "file-saver";
import { triggerFireworks, triggerConfettiBurst } from "../utils/confetti";

function formatBytes(bytes, decimals = 2) {
  if (!bytes || bytes <= 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

export default function CompressionResultModal({
  isOpen,
  onClose,
  data,
}) {
  useEffect(() => {
    if (isOpen) {
      triggerFireworks(2800);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !data) return null;

  const {
    originalSize = 0,
    outputSize = 0,
    filename = "processed.pdf",
    blob = null,
    title = "Processing Complete!",
  } = data;

  const originalFormatted = formatBytes(originalSize);
  const outputFormatted = formatBytes(outputSize);

  const diff = originalSize - outputSize;
  const percentSaved =
    originalSize > 0 && diff > 0
      ? Math.round((diff / originalSize) * 100)
      : 0;

  const handleDownloadAgain = () => {
    if (blob) {
      saveAs(blob, filename);
      triggerConfettiBurst();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="result-modal-title"
    >
      <div
        className="clay-card-white p-6 md:p-8 max-w-lg w-full relative flex flex-col items-center text-center animate-scale-up border-2 border-white/80"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Floating Badge */}
        <div className="clay-icon-box clay-icon-green mb-4 -mt-12 scale-125 shadow-clay-card-green">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h3
          id="result-modal-title"
          className="text-2xl md:text-3xl font-black text-clay-heading mb-1"
        >
          {title}
        </h3>
        <p className="text-xs md:text-sm font-semibold text-clay-muted mb-6">
          Your document has been generated and downloaded.
        </p>

        {/* File Name Pill */}
        <div className="clay-badge bg-clay-bg text-clay-heading text-xs md:text-sm font-extrabold px-4 py-1.5 mb-6 max-w-full truncate border border-slate-200">
          📄 {filename}
        </div>

        {/* Before / After Stats Card */}
        <div className="w-full bg-slate-50/80 rounded-2xl p-5 border-2 border-slate-100 shadow-inner mb-6 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4 items-center">
            {/* Before */}
            <div className="flex flex-col items-center p-3 rounded-xl bg-white shadow-sm border border-slate-100">
              <span className="text-[11px] font-black tracking-wider uppercase text-clay-muted mb-1">
                Original Size
              </span>
              <span className="text-base md:text-lg font-black text-slate-700">
                {originalFormatted}
              </span>
            </div>

            {/* After */}
            <div className="flex flex-col items-center p-3 rounded-xl bg-emerald-50 shadow-sm border border-emerald-200/60">
              <span className="text-[11px] font-black tracking-wider uppercase text-emerald-700 mb-1">
                Final Size
              </span>
              <span className="text-base md:text-lg font-black text-emerald-600">
                {outputFormatted}
              </span>
            </div>
          </div>

          {/* Savings Ribbon */}
          {diff > 0 ? (
            <div className="clay-badge bg-emerald-500 text-white font-extrabold text-xs md:text-sm py-2 px-4 shadow-sm">
              ✨ Reduced by {formatBytes(diff)} ({percentSaved}% smaller)
            </div>
          ) : (
            <div className="clay-badge bg-slate-200 text-slate-700 font-bold text-xs py-1.5 px-3">
              Optimized & merged successfully
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
          {blob && (
            <button
              type="button"
              onClick={handleDownloadAgain}
              className="clay-btn clay-btn-blue text-sm md:text-base py-3 w-full shadow-clay-btn-blue font-black"
            >
              📥 Download Again
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="clay-btn clay-btn-secondary text-sm md:text-base py-3 w-full font-black border border-slate-300"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
