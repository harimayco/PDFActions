import {_GSPS2PDF} from "../lib/background.js";

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

const doCompress = (pdfUrl, filename = 'compressed.pdf') => {
    return new Promise((resolve, reject) => {
        return _GSPS2PDF({psDataURL: pdfUrl}, (pdf) => {
            // download  to browser pdf.pdfDataURL
            
                resolve(pdf);
            
        }, (progress) => {
            console.log(progress);
        }, (status) => {
            console.log(status);
        });
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