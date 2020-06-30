const { ipcRenderer } = require("electron");
const { columns } = require("mssql");

var table = document.getElementById("unitList");

function changeWindow(wndw) {
  console.log("wndw");
  ipcRenderer.send("changeWindow", wndw);
}

function addRow(row) {
  // nur testing
  var testArrayObj = ["Unit NR", "cold", "adv", "room", "square", "tenan"];
  //insert last
  var row = table.insertRow(-1);
  //event listnener auf row
  row.addEventListener("click", clicked);
  //loop für alle columns
  for (let column = 0; column < 6; column++) {
    var cell = row.insertCell(column);
    cell.innerHTML = testArrayObj[column];
  }
}
//maybe nach double click weiterleitung
function clicked() {
  console.log(this);
}
// script to insert table rows depending on output
