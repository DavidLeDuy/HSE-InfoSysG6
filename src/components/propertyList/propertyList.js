const { ipcRenderer } = require("electron");
const $ = require("jquery");
const config = require("../../js/config.js");
//import { config } from "./config.js";

function changeWindow(wndw) {
  console.log("wndw");
  ipcRenderer.send("changeWindow", wndw);
}

function toggleBtn() {
  $("#scale").toggleClass("scale-out");
}
// script to input the data for properties
$(document).ready(function () {
  getPropertyList();
  console.log("");
});
