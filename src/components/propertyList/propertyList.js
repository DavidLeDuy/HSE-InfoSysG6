const { ipcRenderer } = require("electron");
const $ = require("jquery");

function changeWindow(wndw) {
  console.log("wndw");
  ipcRenderer.send("changeWindow", wndw);
}

function toggleBtn() {
  $("#scale").toggleClass("scale-out");
}
// script to input the data for properties
