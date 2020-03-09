var socket;
var printJob;

const ipcRenderer = window.electron.ipcRenderer;

const datetime = require('silly-datetime');

var axios = require('axios');

var todaysFloder;
var pdfNames = [];

const printControl = (state,sendbackMsg) => {
    
    let updateState = (msg)=>{
        sendbackMsg(msg);
    }

    if (state.flag===0) {
        if (!socket || socket.readyState !== WebSocket.OPEN) {
            updateState("socket not connected");
        }
        socket.close(1000, "");
    }else{

        socket = new WebSocket(state.server + "?sid=" + state.identity);
        socket.onopen = function (event) {
            updateState("Opened.");
            console.log("opened.");
        };
        socket.onclose = function (event) {
            updateState("Closed.");
            console.log("closed.");
        };
        socket.onerror = function (event) {
            updateState("Error.");
            console.log("error.");
        };
        socket.onmessage = function (event) {
            console.log(event.data);//TODO

            if (event.data.search("PrintJobID") !== -1) {
                printJob = JSON.parse(event.data);
                updateState("A new Print job is coming...");
                callWebApi(printJob, state.tempfolder);
            }
        };
    }
}

function callWebApi(printJob,tempFolder){
    console.log("start getting labels...");

        todaysFloder = tempFolder + datetime.format(new Date(), 'YYYYMMDD') + "\\";

        ipcRenderer.send('toMainMkdirSync', todaysFloder);

        let pdfRemotePaths = [];

        printJob.Labels.forEach((label) => {
            pdfRemotePaths.push(label.Address.replace("https://test.parcelport.co.nz/",""));//TODO:both of proxy and here need to be modified.
            // pdfRemotePaths.push("Consignment/DownloadPDF?ConsignmentSel=7ITYrprAQ8g=");
            pdfNames.push(label.Identifier);
        });

        var requests = [];
        pdfRemotePaths.forEach(
            (path) => {
                requests.push(
                    axios.get(path, {
                        method: 'GET',
                        responseType: 'blob',
                        header:{
                            'Conten-Type':'text/plain',
                            "Access-Control-Allow-Origin":'*'
                        }
                    }))
            });


        axios.all(requests)
            .then(axios.spread(function (...responses) {
                // All requests are now complete
                var i = 0;
                responses.forEach((response) => {
                    let blob = new Blob([response.data], {
                        type: 'application/pdf'
                    });
                    
                    savePdf(todaysFloder + pdfNames[i] + ".pdf", blob,i);
                    ++i;
                    console.log(blob);
                });

                setTimeout(function () {
                    //combinePdfs(todaysFloder);
                    ipcRenderer.send('toMainCombinePdfs', 
                    {
                        floder: todaysFloder,
                        names: pdfNames
                    });
                }, 3000);
            }));
}

const savePdf = (pdfPath, blob,i) => {
    var reader = new FileReader()
    reader.onload = function () {
        var buffer = new Buffer.from(reader.result);
        ipcRenderer.send('toMainSavePdf', 
        {
            path:todaysFloder + pdfNames[i] + ".pdf",
            buf:buffer
        });
    }
    reader.readAsArrayBuffer(blob); //blob已定义,且为pdf
}

export {
    printControl
};