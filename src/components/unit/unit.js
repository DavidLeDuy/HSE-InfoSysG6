const { ipcRenderer } = require("electron");

function changeWindow(wndw) {
  console.log("wndw");
  ipcRenderer.send("changeWindow", wndw);
}

// detailed list of specific unit in a property
