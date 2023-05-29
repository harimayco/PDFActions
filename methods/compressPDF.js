// import {GSPS2PDF} from "../lib/gs.worker.js";
// import { wrap, proxy } from "comlink";
// const GSWORKER = wrap(GSPS2PDF());
import { toast } from 'react-toastify';
import { zipToBlob } from "pdf-actions";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const loadPDFData = (response, filename) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", response.pdfDataURL);
        xhr.responseType = "arraybuffer";
        xhr.onload = function () {
            window.URL.revokeObjectURL(response.pdfDataURL);
            const blob = new Blob([xhr.response], { type: "application/pdf" });
            const pdfURL = window.URL.createObjectURL(blob);
            resolve({ pdfURL })
        };
        xhr.send();
    })

}

const doCompress = async ({ pdfUrl, pdfFileName, quality }, onStatusUpdate = () => { }) => {

    const worker = (typeof window !== "undefined" && window.Worker) ? new Worker(new URL('../lib/gsw.js', import.meta.url)) : null;
    return new Promise((resolve, reject) => {
        // return GSWORKER.run(proxy({psDataURL: pdfUrl}, (pdf) => {
        //     // download  to browser pdf.pdfDataURL

        //         resolve(pdf);

        // }, (progress) => {
        //     console.log("Progress:" + progress);
        // }, (status) => {
        //     console.log("Status : "  +  status);
        //     onStatusUpdate(status);
        // }));
        worker.postMessage({
            pdfUrl,
            pdfFileName,
            quality
        });

        worker.onmessage = ({ data: { status, message, pdfUrl, progress } }) => {
            if (status == 'done') {
                return resolve(pdfUrl);
            }

            onStatusUpdate(message, progress);


            //console.log(message);
        };
    });
}

const compressPDFHandler = async (files, quality, asZip = true, onSucess) => {
    let zip;
    if (asZip) {
        zip = new JSZip();
    }
    let promises = [];
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.deleted) {
            continue;
        }

        const pdfFileName = file.name;

        //get url from file 
        const pdfUrl = URL.createObjectURL(file);
        //convert to pdf
        let toastId = toast.loading('Processing PDF Files...');
        const promise = new  Promise((resolve, reject) => {
            doCompress({ pdfUrl, pdfFileName, quality }, (currentStatus, progress = null) => {
                //console.log(toastId, currentStatus, progress)
                if (toastId !== null) {
                    toast.update(toastId, { render: `${currentStatus}`, progress: progress, hideProgressBar: false });
                }
            }).then((pdfResult) => {
                const pdfBlob = pdfResult.pdfBlob;
                if (!asZip) {
                    saveAs(pdfBlob, pdfFileName);
                } else {
                    zip.file(`compressed-${pdfFileName}`, pdfBlob);
                }
                toast.success(`${pdfFileName} Compressed Successfully`, { delay: 500 });
                toastId = null;
                resolve();
            });
        });
        promises.push(promise);
    }
    if (asZip) {
        try {
            await Promise.all(promises);
            const compressedFileName = "compressedPDFFiles.zip";
            saveAs(await zipToBlob(zip), compressedFileName);
            toast.success(`${compressedFileName} Downloaded Successfully`, { delay: 500 });
        } catch (error) {
            console.log(error);
            toast.error(`There are some errors while compressing PDF Files`, { delay: 500 });
        }
        
    }
}


//export default doCompress;
export { compressPDFHandler, doCompress };