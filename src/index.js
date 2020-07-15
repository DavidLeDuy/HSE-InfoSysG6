const { app, BrowserWindow, ipcMain, webContents } = require("electron");
const url = require("url");
const path = require("path");

const {
  getPropertyList,
  getUnitList,
  getUnitDetails,
  ModifyTenant,
  DeleteTenant,
  InsertTenant,
  CalculateOperationalCosts,
} = require("./js/DBFunctions.js");

var mainWindow = null;
var propertyNo = 0;
var unitNo = 0;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1280,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
    },
    icon: path.join(__dirname, "assets/icon.ico"),
  });

  mainWindow.loadFile(path.join(__dirname, "components/propertyList/propertyList.html")).catch((e) => {
    console.log(e);
  });
  mainWindow.setFullScreen(true);
  //mainWindow.webContents.openDevTools();
  mainWindow.removeMenu();
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

//
// ──────────────────────────────────────────────────────────────── I ──────────
//   :::::: I P C   L I S T E N E R : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────
//
function switchWindow(args) {
  mainWindow.loadFile(path.join(__dirname, "components/" + args + "/" + args + ".html"));
}
ipcMain.on("changeWindow", (e, args) => {
  switchWindow(args);
});
ipcMain.on("closeApp", (e, args) => {
  app.quit();
});
//
// ─── PROPERY LIST ───────────────────────────────────────────────────────────────
//

ipcMain.on("getPropertyList", (e, args) => {
  getPropertyList()
    .then((propertyList) => {
      e.reply("sendPropertyList", propertyList);
    })
    .catch((err) => {
      console.log("promise gescheitert " + err);
      e.reply("sendPropertyList", -1);
    });
});

ipcMain.on("switchUnitList", (e, args) => {
  propertyNo = args;
  switchWindow("unitList");
});
//
// ─── UNIT LIST ──────────────────────────────────────────────────────────────────
//
ipcMain.on("getUnitList", (e, args) => {
  if ((propertyNo == 0) | null) e.reply("sendUnitList", -2);
  getUnitList(propertyNo)
    .then((unitList) => {
      e.reply("sendUnitList", unitList);
    })
    .catch((err) => {
      console.log("promise gescheitert " + err);
      e.reply("sendUnitList", -1);
    });
});
//sets unitNo globally
ipcMain.on("switchUnit", (e, args) => {
  unitNo = args;
  switchWindow("unit");
});
//
// ─── UNIT ───────────────────────────────────────────────────────────────────────
//
ipcMain.on("getUnitDetails", (e, args) => {
  if ((unitNo == 0) | null) e.reply("sendUnit", -2);
  getUnitDetails(unitNo)
    .then((unit) => {
      e.reply("sendUnit", unit);
    })
    .catch((err) => {
      console.log("promise gescheitert " + err);
      e.reply("sendUnit", -1);
    });
});
//
// ─── MODIFY TENANT ──────────────────────────────────────────────────────────────
//
ipcMain.on("modifyTenant", (e, args) => {
  ModifyTenant(args[4], args[0], args[1], args[2], args[3])
    .then((status) => {
      e.reply("modifiedTenant", status);
    })
    .catch((err) => {
      console.log("promise gescheitert " + err);
      e.reply("modifiedTenant", -1);
    });
});
//
// ─── INSERT TENANT ──────────────────────────────────────────────────────────────
//
ipcMain.on("insertTenant", (e, args) => {
  InsertTenant(args[4], args[0], args[1], args[2], args[3])
    .then((status) => {
      e.reply("insertedTenant", status);
    })
    .catch((err) => {
      console.log("promise gescheitert " + err);
      e.reply("insertedTenant", -1);
    });
});
//
// ─── DELETE TENANT ──────────────────────────────────────────────────────────────
//
ipcMain.on("deleteTenant", (e, tenantNo) => {
  DeleteTenant(tenantNo)
    .then((status) => {
      e.reply("deletedTenant", status);
    })
    .catch((err) => {
      console.log("promise gescheitert " + err);
      e.reply("deletedTenant", -1);
    });
});
//
// ─── OPERATIONAL COSTS ──────────────────────────────────────────────────────────
//
ipcMain.on("calcOperationalCosts", (e, args) => {
  console.log(unitNo, propertyNo);
  CalculateOperationalCosts(unitNo, propertyNo)
    .then((costs) => {
      e.reply("operationalCosts", costs);
    })
    .catch((err) => {
      console.log("promise gescheitert " + err);
      e.reply("operationalCosts", -1);
    });
});
