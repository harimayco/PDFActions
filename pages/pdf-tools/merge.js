import React, { useState } from "react";
import FileUploader from "../../components/FileUploader.jsx";
import Head from "next/head";
import PDFFilesProcess from "../../components/PDFFile/PDFFilesProcess.jsx";
import mergePDFHandler from "../../methods/mergePDF";
import FileRotateButtons from "../../components/PDFFile/FilePreviewButtons/FileRotateButtons";
import FileDeleteButton from "../../components/PDFFile/FilePreviewButtons/FileDeleteButton";
import LeftSideBoxRotation from "../../components/PDFFile/LeftSideBoxButtons/LeftSideBoxRotation";
import LeftSideResizePDF from "../../components/PDFFile/LeftSideBoxButtons/LeftSideResizePDF";
import { toast } from 'react-toastify';
import { SuccessIcon } from "../../components/icons.jsx";


export default function merge() {
  const [files, setFiles] = useState([]);
  const [compress, setCompress] = useState(true);
  const [filename, setFilename] = useState("merged.pdf");
  const [sameSize, setSameSize] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState("");
  const [done, setIsDone] = useState(false);
  //const [pdfTotalPage, setPdfTotalPage] = useState(0);

  const handleCompressCheckboxChange = (event) => {
    setCompress(event.target.checked);
  };

  const onFileChange = async (e) => {
    setFiles([...e.target.files]);
  };

  const FilePreviewExtra = ({ file, setDeleted, imageRef }) => {
    return (
      <div className="flex flex-col gap-2 items-center justify-center mt-2 mb-2">
        <FileRotateButtons file={file} imageRef={imageRef} />
        <FileDeleteButton file={file} setDeleted={setDeleted} />
      </div>
    );
  };


  const LeftSideBoxExtra = () => {
    return (
      <>

        <p>Resize PDF with Same Size ? <input type="checkbox" id="sameSize" name="sameSize" checked={sameSize} onChange={() => setSameSize(!sameSize)} /></p>
        <LeftSideResizePDF />
        <p>Compress PDF Size ? <input type="checkbox" id="compressPDF" name="compress" checked={compress} onChange={handleCompressCheckboxChange} /></p>
        <LeftSideBoxRotation files={files} />
      </>
    );
  };

  return (
    <div className="overflow-x-hidden">
      <Head>
        <title>PDFActions - Merge PDF</title>
      </Head>

      {/* Banner */}
      <div className="bg-rose-800 border-slate-400 border-t-2 border-dotted flex flex-col items-center justify-center h-[30vh] w-screen">
        <div className="text-slate-200 text-4xl font-medium leading-normal tracking-wide">
          Merge PDF
        </div>
        
        <div className="text-slate-200">Merge Multiple PDF Files Together</div>
      </div>

      
        {files.length === 0 && (

          <FileUploader
            onFileChange={onFileChange}
            fileType=".pdf"
            multiple={true}
          />
        )}
         
        { files.length !== 0 && (
            <PDFFilesProcess
              files={files}
              sortableFilePreviewGrid={true}
              setFiles={setFiles}
              addFileOptions={{
                fileType: ".pdf",
                multiple: true,
              }}
              filename={filename}
              setFilename={setFilename}
              downloadHandler={async () => {
                setIsProcessing(true);
                const toastId = toast.loading('Processing PDF Files...');
                await mergePDFHandler(files, filename, (currentStatus, progress = null) => {
                  setStatus(currentStatus);
                  if(progress !=  null){
                    toast.update(toastId, {  render: 'Processing PDF Files...\n'+ currentStatus, isLoading:true, progress: progress, hideProgressBar: false});
                  }
                }, () => {
                  //setIsDone(true);
                  toast.update(toastId, { render: "PDF Files Merged Successfully", isLoading:false, type: toast.TYPE.SUCCESS, hideProgressBar: false, closeButton:true, autoClose:false });
                });
                
                
              }
              }
              LeftSideBoxExtra={LeftSideBoxExtra}
              FilePreviewExtra={FilePreviewExtra}
            />
          )
        }
    </div>
  );
}
