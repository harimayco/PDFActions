self.totalPages = 0;
self.fileSize = '';
self.pdfFileName = '';
self.lastMessage = '';
self.currentProgress = 0;

self.onmessage = ({ data }) => {
  pdfFileName = data.pdfFileName;
  pdfQuality = data.quality;
  const pdfResolution = data.resolution;
  GSPS2PDF({ psDataURL: data.pdfUrl, quality: pdfQuality, resolution: pdfResolution }, (pdf) => {
    self.postMessage({ status: 'done', message: 'PDF Compressed Successfully', pdfUrl: pdf });
  }, (progress) => {
    // Progress callback
  },
    (status) => {
      self.postMessage({ status: 'progress', message: self.renderMessages(status), pdfUrl: '', progress: self.getProgress() });
    },
  );
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
  self.requestFileSystemSync = self.webkitRequestFileSystemSync || self.requestFileSystemSync;
  if (typeof self.requestFileSystemSync === "function") {
    try {
      self.FS = self.requestFileSystemSync(TEMPORARY, 1024 * 102400 /*100MB*/);
    } catch (e) {
      console.warn("requestFileSystemSync error:", e);
    }
  }
  xhr.onload = function () {
    // release the URL
    self.URL.revokeObjectURL(dataStruct.psDataURL);
    const qualityConfig = getQualitySettings(dataStruct.quality, dataStruct.resolution);
    //set up EMScripten environment
    Module = {
      preRun: [function () {
        const FS = self.FS || Module.FS || self.Module?.FS;
        if (FS) {
          FS.writeFile('input.pdf', new Uint8Array(xhr.response));
          const size = FS.stat('input.pdf').size;
          setCurrentFileSize(size);
        }
      }],
      postRun: [function () {
        const FS = self.FS || Module.FS || self.Module?.FS;
        if (FS) {
          var uarray = FS.readFile('output.pdf', { encoding: 'binary' }); //Uint8Array
          var blob = new Blob([uarray], { type: "application/octet-stream" });
          var pdfDataURL = self.URL.createObjectURL(blob);
          responseCallback({ pdfBlob: blob, pdfDataURL: pdfDataURL, url: dataStruct.url });
        }
      }],
      // Enhanced Ghostscript pdfwrite arguments
      arguments: [
        '-sDEVICE=pdfwrite',
        '-dCompatibilityLevel=1.5',
        `-dPDFSETTINGS=${qualityConfig.pdfSettings}`,

        // 1. Color space conversion (sRGB saves ~25-40% on CMYK/uncalibrated scans without perceptual loss)
        '-sColorConversionStrategy=sRGB',
        '-dConvertCMYKImagesToRGB=true',

        // 2. Color image downsampling & compression
        '-dDownsampleColorImages=true',
        `-dColorImageResolution=${qualityConfig.resolution}`,
        '-dColorImageDownsampleThreshold=1.0',
        '-dAutoFilterColorImages=true',
        '-dColorImageDownsampleType=/Bicubic',

        // 3. Grayscale image downsampling & compression
        '-dDownsampleGrayImages=true',
        `-dGrayImageResolution=${qualityConfig.resolution}`,
        '-dGrayImageDownsampleThreshold=1.0',
        '-dAutoFilterGrayImages=true',
        '-dGrayImageDownsampleType=/Bicubic',

        // 4. Monochrome image downsampling & CCITT Group 4 compression (scanned text & contracts)
        '-dDownsampleMonoImages=true',
        `-dMonoImageResolution=${qualityConfig.resolution}`,
        '-dMonoImageDownsampleThreshold=1.0',
        '-dMonoImageFilter=/CCITTFaxEncode',
        '-dMonoImageDownsampleType=/Subsample',

        // 5. Font optimization & subsetting
        '-dCompressFonts=true',
        '-dEmbedAllFonts=true',
        '-dSubsetFonts=true',

        // 6. Page content & stream compression
        '-dCompressPages=true',
        '-dUseFlateCompression=true',
        '-dASCIIHexEncodePages=false',

        // 7. Cleanup & deduplication
        '-dDetectDuplicateImages=true',
        '-dDoThumbnails=false',
        '-dCreateJobTicket=false',
        '-dPreserveEPSInfo=false',
        '-dPreserveOPIComments=false',
        '-dPreserveOverprintSettings=false',
        '-dFastWebView=true',

        // 8. Execution control
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

function getQualitySettings(qualityCode, customResolution) {
  let targetResolution = null;
  let pdfSettings = '/ebook';

  // 1. Check if customResolution is explicitly provided
  if (customResolution !== undefined && customResolution !== null && !isNaN(customResolution) && Number(customResolution) > 0) {
    targetResolution = Math.round(Number(customResolution));
  }
  // 2. Or if qualityCode itself is numeric custom DPI (e.g. "120", 120, 96, 200)
  else if (!isNaN(Number(qualityCode)) && Number(qualityCode) > 10) {
    targetResolution = Math.round(Number(qualityCode));
  }
  // 3. Or standard presets: "1" (72 DPI), "2" (150 DPI), "3" (300 DPI)
  else {
    switch (String(qualityCode)) {
      case '1':
        return {
          pdfSettings: '/screen',
          resolution: '72',
        };
      case '3':
        return {
          pdfSettings: '/printer',
          resolution: '300',
        };
      case '2':
      default:
        return {
          pdfSettings: '/ebook',
          resolution: '150',
        };
    }
  }

  // Determine Ghostscript base macro based on target DPI
  if (targetResolution <= 100) {
    pdfSettings = '/screen';
  } else if (targetResolution <= 200) {
    pdfSettings = '/ebook';
  } else if (targetResolution <= 300) {
    pdfSettings = '/printer';
  } else {
    pdfSettings = '/prepress';
  }

  return {
    pdfSettings,
    resolution: String(targetResolution),
  };
}