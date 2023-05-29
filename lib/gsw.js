self.totalPages = 0;
self.fileSize = '';
self.pdfFileName = '';
self.lastMessage = '';
self.currentProgress = 0;

self.onmessage = ({ data }) => {
  //console.log(data);
  pdfFileName = data.pdfFileName;
  pdfQuality = data.quality;
  //self.postMessage({status: 'done', message: 'running', pdfUrl:  data.pdfUrl});
  GSPS2PDF({ psDataURL: data.pdfUrl, quality: pdfQuality  }, (pdf) => {
    // download  to browser pdf.pdfDataURL
    self.postMessage({ status: 'done', message: 'PDF Compressed Succeessfully', pdfUrl: pdf });
  }, (progress) => {
    //self.postMessage({status: 'progress', message: progress});
  },
    (status) => {
      //     console.log("Status : "  +  status);
      //     onStatusUpdate(status);
      // }));

      self.postMessage({ status: 'progress', message: self.renderMessages(status), pdfUrl: '', progress: self.getProgress() });
    },
  )
};



function getHeaderFromHeaders(headers, headerName) {
  for (var i = 0; i < headers.length; ++i) {
    var header = headers[i];
    if (header.name.toLowerCase() === headerName) {
      return header;
    }
  }
}

function loadScript(url, onLoadCallback) {
  // // Adding the script tag to the head as suggested before
  // var head = document.head;
  // var script = document.createElement('script');
  // script.type = 'text/javascript';
  // script.src = url;
  //
  // // Then bind the event to the callback function.
  // // There are several events for cross browser compatibility.
  // //script.onreadystatechange = callback;
  // script.onload = onLoadCallback;
  //
  // // Fire the loading
  // head.appendChild(script);
  import("./gs.js");
  // run();
}

// function getRedirectURL(url) {
//     return chrome.runtime.getURL('viewer.html') + "?url=" + url;
// }
//
// chrome.webRequest.onHeadersReceived.addListener(function (details) {
//         var mime_type = getHeaderFromHeaders(details.responseHeaders, 'content-type');
//         if (mime_type.value == 'application/pdf') {
//             // places like arXiv don't have .ps filenames in their URLs,
//             // so we need to check MIME type for requests as well.
//             return {
//                 redirectUrl: getRedirectURL(details.url)
//             }
//         }
//     },
//     {urls: ["<all_urls>"], types: ["main_frame"]},
//     ["blocking", "responseHeaders"]
// );
//
// chrome.webRequest.onBeforeRequest.addListener(function (info) {
//         var urlObject = new URL(info.url);
//         if (
//             (urlObject.pathname.endsWith('.pdf'))
//             &&
//             (info.initiator == null || info.initiator.indexOf(chrome.runtime.id) == -1) // not ourselves
//         ) {
//             return {
//                 redirectUrl: getRedirectURL(info.url)
//             };
//         }
//     },
//     {urls: ["<all_urls>"], types: ["main_frame"]},
//     ["blocking"]
// );



self.renderMessages = (message) => {
  if (message === 'Loading Ghostscript...') {
    lastMessage = message;
    return message;
  }

  let ret = `Compressing PDF ${pdfFileName} (${fileSize})`;

  // message: Processing pages 1 through 21.
  const re = /Processing pages (\d+) through (\d+)./g;
  const m = re.exec(message);


  if (m) {
    totalPages = m[2];
  }

  const checkCurrentPage = /Page (\d+)/g;
  const currentPage = checkCurrentPage.exec(message);
  if (currentPage) {
    currentProgress = currentPage[1];
    ret = `${ret}\nProcessing Page: ${currentPage[1]} of ${totalPages}`;
    lastMessage = ret;
  }

  return lastMessage;
}

function setCurrentFileSize(fileSizeInBytes = 0) {
  fileSize = fileSizeInBytes;
  // get filesize in KB or MB
  if (fileSizeInBytes > 1024) {
    fileSize = fileSizeInBytes / 1024;
    if (fileSize > 1024) {
      fileSize = fileSize / 1024;
      fileSize = fileSize.toFixed(2) + ' MB';
    } else {
      fileSize = fileSize.toFixed(2) + ' KB';
    }
  } else {
    fileSize = fileSize.toFixed(2) + ' Bytes';
  }
}

self.getProgress = () => {
  if (totalPages === 0) {
    return 0;
  }

  // get 0  to 1  from currentProgress / totalPages
  return currentProgress / totalPages;
}

async function GSPS2PDF(dataStruct, responseCallback, progressCallback, statusUpdateCallback, window) {
  totalPages = 0;
  fileSize = '';
  let Module;
  // first download the ps data
  var xhr = new XMLHttpRequest();
  xhr.open("GET", dataStruct.psDataURL);
  xhr.responseType = "arraybuffer";
  self.requestFileSystemSync = self.webkitRequestFileSystemSync ||
    self.requestFileSystemSync;
  self.FS = self.requestFileSystemSync(TEMPORARY, 1024 * 102400 /*100MB*/);
  xhr.onload = function () {
    // release the URL
    self.URL.revokeObjectURL(dataStruct.psDataURL);
    const q = getQuality(dataStruct.quality);
    //set up EMScripten environment
    Module = {
      preRun: [function () {
        const FS = self.FS;
        var data = FS.writeFile('input.pdf', new Uint8Array(xhr.response));

        const size = FS.stat('input.pdf').size;
        setCurrentFileSize(size);
      }],
      postRun: [function () {
        const FS = self.FS;
        var uarray = FS.readFile('output.pdf', { encoding: 'binary' }); //Uint8Array
        var blob = new Blob([uarray], { type: "application/octet-stream" });
        var pdfDataURL = self.URL.createObjectURL(blob);
        responseCallback({ pdfBlob: blob, pdfDataURL: pdfDataURL, url: dataStruct.url });
      }],
      // datastruct.quality 1=low, 2=medium, 3=high

      arguments: [
        '-sDEVICE=pdfwrite',
        '-dCompatibilityLevel=1.4',
        `-dPDFSETTINGS=${q}`,
        '-DNOPAUSE',
        '-dBATCH',
        '-sOutputFile=output.pdf',
        'input.pdf'
      ],
      print: function (text) {
        statusUpdateCallback(text);
      },
      printErr: function (text) {
        statusUpdateCallback('Error: ' + text);
        console.error(text);
      },
      setStatus: function (text) {
        if (!Module.setStatus.last) Module.setStatus.last = { time: Date.now(), text: '' };
        if (text === Module.setStatus.last.text) return;
        var m = text.match(/([^(]+)\((\d+(\.\d+)?)\/(\d+)\)/);
        var now = Date.now();
        if (m && now - Module.setStatus.last.time < 30) // if this is a progress update, skip it if too soon
          return;
        Module.setStatus.last.time = now;
        Module.setStatus.last.text = text;
        if (m) {
          text = m[1];
          progressCallback(false, parseInt(m[2]) * 100, parseInt(m[4]) * 100);
        } else {
          progressCallback(true, 0, 0);
        }
        statusUpdateCallback(text);
      },
      totalDependencies: 0
    };
    Module.setStatus('Loading Ghostscript...');
    self.Module = Module;
    loadScript('gs.js', null);
  };
  xhr.send();
}

function getQuality(qualityCode){
  switch(qualityCode){
    case '1':
      return '/screen';
    case '2':
      return '/default';
    case '3':
      return '/ebook';
    default:
      return '/default';
  }
}