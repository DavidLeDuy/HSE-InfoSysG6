const { ipcRenderer } = require("electron");
const $ = require("jquery");

function toggleBtn() {
  $("#scale").toggleClass("scale-out");
}

function createCard(property) {
  $("#cardContainer").append(
    '<div class="col s12 m6 l3">' +
      '<div class="card blue-grey darken-1 hoverable">' +
      '<div class="card-content white-text">' +
      `<span class="card-title">Property No.${property.propertyNo} ${property.city}</span>` +
      '<ul class="collection">' +
      `<li class="collection-item">Adress: <span class="right">${property.postCode} ${property.street} ${property.houseNo}</span></li>` +
      `<li class="collection-item">Owner: <span class="right">${property.firstName} ${property.lastName}</span></li>` +
      `<li class="collection-item">Units: <span class="right">${property.numberOfUnits}</span></li>` +
      `<li class="collection-item">Tenants: <span class="right">${property.numberOfTenants}</span></li>` +
      "</ul>" +
      "</div>" +
      '<div class="card-action">' +
      `<a id="scale" class="btn-small scale-transition" onclick="toggleBtn();switchUnitList(${property.propertyNo})" href="#">Go to Overview</a>` +
      "</div>" +
      "</div>" +
      "</div>"
  );
}

// loads data after DOM objects have been initalized
$(document).ready(function () {
  getPL();
});

//
// ────────────────────────────────────────────────────────────────── I ──────────
//   :::::: I P C   F U N C T I O N S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────
//
function closeApp() {
  console.log("closeApp");
  ipcRenderer.send("closeApp");
}
//
// ─── GENERIC CHANGE WINDOW ──────────────────────────────────────────────────────
//

function changeWindow(wndw) {
  console.log("wndw");
  ipcRenderer.send("changeWindow", wndw);
}
//
// ─── SWITCH TO UNITLIST AND SET PROPERTYNO ──────────────────────────────────────
//
function switchUnitList(propertyNo) {
  ipcRenderer.send("switchUnitList", propertyNo);
}
//
// ─── GET PROPERTY LIST ──────────────────────────────────────────────────────────
//

function getPL() {
  ipcRenderer.send("getPropertyList");
}
ipcRenderer.on("sendPropertyList", (event, args) => {
  // check if error occured
  if (args == -1) {
    console.log("err");
    $("#infoText").text("Database connection failed, check if you are connected to the VPN. Trying again...");
    return;
  }
  $("#loading").toggleClass("hide");
  $(".disabled-nav").toggleClass("disabled-nav");
  for (let index = 0; index < args.recordset.length; index++) {
    createCard(args.recordset[index]);
  }
});
