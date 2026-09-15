import React, { useState } from "react";
import Head from "next/head";
import FileUploader from "../../components/FileUploader.jsx";
import ImageProcess from "../../components/Image/ImageProcess";
import ToolBanner from "../../components/ToolBanner.jsx";
import { PDFIcon } from "../../components/icons.jsx";
import imagesToPDFHandler from "../../methods/imagesToPDF.js";
import ImageDeleteButton from "../../components/Image/ImagePreviewButtons/ImageDeleteButton";
import ImageRotateButtons from "../../components/Image/ImagePreviewButtons/ImageRotateButtons";
import LeftSideResizeImage from "../../components/Image/LeftSideBoxButtons/LeftSideResizeImage";
import LeftSideMargin from "../../components/Image/LeftSideBoxButtons/LeftSideMargin";
import { toast } from "react-toastify";
import { triggerFireworks } from "../../utils/confetti";

export default function JpgToPdf() {
  const [images, setImages] = useState([]);
  const [marginMillimeter, setMarginMillimeter] = useState([0, 0, 0, 0]);
  const [pageSize, setPageSize] = useState("A4");
  const [pageOrientation, setPageOrientation] = useState("Portrait");
  const [imagePosition, setImagePosition] = useState("Center");
  const [isProcessing, setIsProcessing] = useState(false);

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

  const handleDownloadMerged = async () => {
    setIsProcessing(true);
    try {
      await imagesToPDFHandler(images, marginMillimeter, true, {
        pageSize,
        pageOrientation,
        imagePosition,
      });
      triggerFireworks();
      toast.success("Images converted to PDF downloaded successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to convert images to PDF");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadIndividual = async () => {
    setIsProcessing(true);
    try {
      await imagesToPDFHandler(images, marginMillimeter, false, {
        pageSize,
        pageOrientation,
        imagePosition,
      });
      triggerFireworks();
      toast.success("Images converted to PDFs downloaded successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to convert images to PDF");
    } finally {
      setIsProcessing(false);
    }
  };

  const renderLeftSideExtra = () => (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        disabled={isProcessing}
        onClick={handleDownloadIndividual}
        className="clay-btn clay-btn-white w-full py-2.5 text-xs font-bold"
      >
        Download Individual PDFs
      </button>
      <LeftSideResizeImage
        pageSize={pageSize}
        setPageSize={setPageSize}
        pageOrientation={pageOrientation}
        setPageOrientation={setPageOrientation}
        imagePosition={imagePosition}
        setImagePosition={setImagePosition}
      />
      <LeftSideMargin
        margin={marginMillimeter}
        setMargin={setMarginMillimeter}
      />
    </div>
  );

  const renderImagePreviewExtra = ({ image, onRotate, onDelete }) => (
    <div className="flex flex-col gap-2 w-full mt-2">
      <ImageRotateButtons image={image} onRotate={onRotate} />
      <ImageDeleteButton image={image} onDelete={onDelete} />
    </div>
  );

  return (
    <>
      <Head>
        <title>JPG to PDF Online - Convert Images to PDF | PDFActions</title>
        <meta
          name="description"
          content="Convert JPG, PNG, and photos to PDF online for free. Customize page margins, orientation, and paper sizes with 100% open source client-side privacy."
        />
        <meta
          name="keywords"
          content="jpg to pdf online, convert image to pdf, png to pdf online, Open Source PDF Tools, free image to pdf converter"
        />
        <link rel="canonical" href="https://pdfactions.com/pdf-tools/jpgtopdf" />
        <meta property="og:title" content="JPG to PDF Online - Convert Images to PDF | PDFActions" />
        <meta
          property="og:description"
          content="Convert images to PDF documents online with custom layouts and zero server uploads."
        />
      </Head>

      <ToolBanner
        title="JPG to PDF Converter"
        description="Convert your images and photos into high-resolution PDF pages with custom borders and alignment."
        badge="Converter Tool"
        icon={<PDFIcon width="28" />}
        iconColor="clay-icon-yellow"
      />

      {images.length === 0 ? (
        <FileUploader
          onFileChange={onFileChange}
          fileType="image/*"
          multiple={true}
          title="Choose or Drop Image Files"
          subtitle="Select JPG, PNG, or WEBP images to convert into PDF"
        />
      ) : (
        <ImageProcess
          images={images}
          setImages={setImages}
          sortableImagePreviewGrid={true}
          addFileOptions={{ fileType: "image/*", multiple: true }}
          isProcessing={isProcessing}
          downloadHandler={handleDownloadMerged}
          LeftSideBoxExtra={renderLeftSideExtra}
          ImagePreviewExtra={renderImagePreviewExtra}
        />
      )}
    </>
  );
}
