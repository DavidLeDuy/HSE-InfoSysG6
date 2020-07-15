const { ipcRenderer } = require("electron");
const $ = require("jquery");

var table = document.getElementById("unitList");

function addRow(obj) {
  //insert last
  var row = table.insertRow(-1);
  //event listnener auf row
  row.addEventListener("click", clicked);
  //loop für alle columns
  var column = 0;
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      // remove propertyNo from array
      if (key != "propertyNo") {
        //console.log(key + " -- " + obj[key] + " -- " + column);
        let cell = row.insertCell(column - 1);
        cell.innerHTML = obj[key];
      }
    }
    column++;
  }
}
//maybe nach double click weiterleitung
function clicked() {
  switchUnit(this.cells[0].innerHTML);
}
// script to insert table rows depending on output
$(document).ready(function () {
  getUL();
});
//
// ────────────────────────────────────────────────────────────────── I ──────────
//   :::::: I P C   F U N C T I O N S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────
//
function changeWindow(wndw) {
  console.log("wndw");
  ipcRenderer.send("changeWindow", wndw);
}
// ────────────────────────────────────────────────────────────────────────────────
function getUL() {
  ipcRenderer.send("getUnitList");
}
//
// ─── SWITCH TO UNIT AND SET UNITNO ──────────────────────────────────────
//
function switchUnit(unitNo) {
  ipcRenderer.send("switchUnit", unitNo);
}
//
// ─── IPC LISTENER ───────────────────────────────────────────────────────────────
//
ipcRenderer.on("sendUnitList", (event, args) => {
  if (args == -1) {
    console.log("error occured");
    return;
  }
  for (let index = 0; index < args.recordset.length; index++) {
    addRow(args.recordset[index]);
  }
});
// ────────────────────────────────────────────────────────────────────────────────
