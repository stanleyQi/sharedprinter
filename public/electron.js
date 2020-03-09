const electron = require("electron");
const app = electron.app;
const ipcMain = electron.ipcMain;
const Menu = electron.Menu;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const isDev = require("electron-is-dev");

const fs = require('fs');
const ptp = require('pdf-to-printer');

let mainWindow;
function createWindow() {
    mainWindow = new BrowserWindow({ 
        width: 800, 
        height: 600,
        icon: "",
        webPreferences: {
            nodeIntegration: true
        }
    });
     
    //mainWindow.webContents.openDevTools()
    //mainWindow.setMenuBarVisibility(false); 
    //Menu.setApplicationMenu(null);
    
    mainWindow.loadURL(
        isDev
        ? "http://localhost:3000"
        : `file://${path.join(__dirname, "../build/index.html")}`
        
            // `file://${path.join(__dirname, "../build/index.html")}`
    );
    mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createWindow);
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
    app.quit();
    }
});

app.on("activate", () => {
    if (mainWindow === null) {
    createWindow();
    }
});

ipcMain.on("toMainMkdirSync", (event, args) => {
            console.log(args);
    if (!fs.existsSync(args)) {
        fs.mkdirSync(args);
    }
});

ipcMain.on("toMainSavePdf", (event, arg) => {
    console.log(arg);
    //temp文件夹应已存在
    fs.writeFile(arg.path, arg.buf, {}, (err, res) => {
        if (err) {console.error(err);return;}
        console.log(arg.buf);
        // mainWindow.webContents.send("fromMain", responseObj);
    });
});

ipcMain.on("toMainCombinePdfs", (event, arg) => {
    combinePdfs(arg);

});

let combinePdfs = (arg) => {
    const merge = require('easy-pdf-merge');
    let loalPdfPaths = [];
    combinedPdfPath = arg.floder + Date.parse(new Date()) + ".pdf";
    arg.names.forEach((pdfName) => {
        console.log(arg.floder + pdfName);
        loalPdfPaths.push(arg.floder + pdfName + ".pdf");
    });
    merge(loalPdfPaths, combinedPdfPath, function (err) {
        if (err) {
            return console.log(err)
        }
        console.log('Combined successfully.');
        print(combinedPdfPath);
    });
}

let print = (combinedPdfPath) => {
    const options = { //TODO:printJob
        printer: "Microsoft Print to PDF",
        win32: ['-print-settings "fit,paper=letter"'
            // '-print-dialog',
            // '-exit-when-done'
            //,'-print-to "Microsoft Print to PDF"'
        ],
        unix: [ //"-d myUnixLikePrinter",
            "-o fit-to-page",
            "-o media=letter",
            "-o media=letter"
        ]
    };
    ptp
        .print(combinedPdfPath, options)
        .then(
            console.log("Printted successfully.")
        )
        .then(console.log("==================end===================="))
        .catch(console.error);
}
