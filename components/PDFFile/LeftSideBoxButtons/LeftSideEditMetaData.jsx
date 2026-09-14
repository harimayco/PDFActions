import React from "react";

export default function LeftSideEditMetaData({
  metaDataOptions = {},
  setMetaDataOptions = () => {},
}) {
  const handleTextInputChange = (val, fieldId) => {
    let processed = val;
    if (fieldId === "keywords") {
      processed = val.split(",").map((s) => s.trim());
    }
    setMetaDataOptions((prev) => ({
      ...prev,
      [fieldId]: processed,
    }));
  };

  const inputFields = [
    { title: "Title", inputId: "title", type: "text" },
    { title: "Author", inputId: "author", type: "text" },
    { title: "Subject", inputId: "subject", type: "text" },
    { title: "Creator", inputId: "creator", type: "text" },
    { title: "Producer", inputId: "producer", type: "text" },
    { title: "Keywords (comma separated)", inputId: "keywords", type: "text" },
  ];

  return (
    <div className="flex flex-col gap-3 p-4 bg-clay-bg rounded-2xl border border-slate-200">
      <span className="text-sm font-extrabold text-clay-heading">Document Metadata</span>

      <div className="flex flex-col gap-2.5">
        {inputFields.map((field) => {
          const rawVal = metaDataOptions[field.inputId];
          const displayVal = Array.isArray(rawVal) ? rawVal.join(", ") : (rawVal || "");
          return (
            <div key={field.inputId} className="flex flex-col gap-1">
              <label htmlFor={field.inputId} className="text-[11px] font-bold text-clay-muted">
                {field.title}
              </label>
              <input
                id={field.inputId}
                type={field.type}
                value={displayVal}
                placeholder={`Enter ${field.title.toLowerCase()}`}
                onChange={(e) => handleTextInputChange(e.target.value, field.inputId)}
                className="clay-input text-xs py-1.5 px-2.5"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
