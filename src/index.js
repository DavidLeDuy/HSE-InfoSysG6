const { app, BrowserWindow, ipcMain } = require("electron");
const url = require("url");
const path = require("path");
const sql = require("mssql");
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

/*
ipcMain.on("changeWindow", (e, args) => {
  console.log("changeW");
  mainWindow.loadFile("components/unit/unit.html").catch((e) => {
    console.log(e);
  });
});
*/
/*
const config = {
  user: "wkb6",
  password: "wkb6",
  server: "134.108.190.89", // You can use 'localhost\\instance' to connect to named instance
  database: "Infosys",
};

sql.on("error", (err) => {
  // ... error handler
});

sql
  .connect(config)
  .then((pool) => {
    // Query
    return pool.request().query("select * from position");
  })
  .then((result) => {
    console.dir(result);
  })
  .catch((err) => {
    console.log(err);
  });
*/
