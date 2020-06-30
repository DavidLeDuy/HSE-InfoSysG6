const { ipcRenderer } = require("electron");

var unit = document.getElementById("unit");
unit.addEventListener("click", changeWindow());
function changeWindow() {
  console.log("ok");
  ipcRenderer.send("changeWindow", "to whatever is clicked");
}
