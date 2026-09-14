import React, { useState, useEffect } from "react";
import imageDataURLfromFile from "../../methods/imageDataURLfromFile";
import { PDFIcon } from "../icons";

const PDFThumbnail = React.memo(function PDFThumbnail({ file, degrees = 0 }) {
  const [thumbnail, setThumbnail] = useState(file?.thumbnail || null);
  const [loading, setLoading] = useState(!file?.thumbnail);

  const fileKey = file?.id || file?.name || file;

  useEffect(() => {
    let isMounted = true;
    if (file?.thumbnail) {
      setThumbnail(file.thumbnail);
      setLoading(false);
      return;
    }

    setLoading(true);
    const rawBlob = file instanceof Blob ? file : (file?.file || file);
    imageDataURLfromFile(rawBlob, 1)
      .then((data) => {
        if (isMounted) {
          if (file && typeof file === "object") {
            file.thumbnail = data;
          }
          setThumbnail(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Failed to generate PDF thumbnail:", err);
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileKey]);

  return (
    <div className="relative w-[150px] h-[200px] rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center border-2 border-slate-200/80 shadow-inner">
      {loading ? (
        <div className="flex flex-col items-center gap-2 text-clay-muted animate-pulse">
          <div className="w-8 h-8 rounded-full border-3 border-clay-blue border-t-transparent animate-spin" />
          <span className="text-xs font-bold">Rendering...</span>
        </div>
      ) : thumbnail ? (
        <img
          src={thumbnail}
          alt={file.name || "PDF preview"}
          draggable={false}
          className="w-full h-full object-contain transition-transform duration-200 select-none"
          style={{
            transform: `rotate(${degrees}deg)`,
          }}
        />
      ) : (
        <div className="flex flex-col items-center gap-2 text-clay-muted">
          <PDFIcon width="36" />
          <span className="text-xs font-semibold">PDF File</span>
        </div>
      )}
    </div>
  );
});

export default PDFThumbnail;
