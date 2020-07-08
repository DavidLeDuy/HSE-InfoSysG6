const { app, BrowserWindow, ipcMain, webContents } = require("electron");
const url = require("url");
const path = require("path");

const { getPropertyList } = require("./js/DBFunctions.js");
var mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1280,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
    },
  });
  mainWindow.loadFile("components/propertyList/propertyList.html").catch((e) => {
    console.log(e);
  });
  //mainWindow.removeMenu();
}
app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on("changeWindow", (e, args) => {
  mainWindow
    .loadFile("components/" + args + "/" + args + ".html")
    .then((e) => {
      console.log(e);
    })
    .catch((e) => {
      console.log(e);
    });
});
