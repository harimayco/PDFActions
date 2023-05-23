// import {GSPS2PDF} from "../lib/gs.worker.js";
// import { wrap, proxy } from "comlink";
// const GSWORKER = wrap(GSPS2PDF());



const loadPDFData = (response, filename) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", response.pdfDataURL);
        xhr.responseType = "arraybuffer";
        xhr.onload = function () {
            window.URL.revokeObjectURL(response.pdfDataURL);
            const blob = new Blob([xhr.response], {type: "application/pdf"});
            const pdfURL = window.URL.createObjectURL(blob);
            resolve({pdfURL})
        };
        xhr.send();
    })

}

const doCompress = async (pdfUrl, onStatusUpdate = () => {} ) => {
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
            pdfUrl
          });

        worker.onmessage = ({ data: { status, message, pdfUrl } }) => {
            if(status  == 'done'){
                return resolve(pdfUrl);
            }

            onStatusUpdate(message);
        };
    });
}

const compressPDFHandler = async (files) => {
    for(let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.deleted) {
            continue;
        }

        //get url from file 
        const pdfUrl = URL.createObjectURL(file);
        //convert to pdf
        const pdf = await doCompress(pdfUrl);
    }
}
    

export default doCompress;