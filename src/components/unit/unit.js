const { ipcRenderer } = require("electron");
const $ = require("jquery");

// detailed list of specific unit in a property
$(document).ready(function () {
  getUnitDetails();
});

function clicked() {
  setFormValues(this);
}
// set values of unit specific information
function setUnitInformation(firstRow) {
  $("#Rent").text(firstRow.coldRent);
  $("#Payment").text(firstRow.advPaymentOperatingCosts);
  $("#Rooms").text(firstRow.rooms);
  $("#Meter").text(firstRow.squareMeter);
}

var table = document.getElementById("unitList");
function addRow(obj, no) {
  // array for object keys
  var objKey = ["firstName", "lastName", "phoneNo", "bankDetails", "balance"];
  //insert last
  var row = table.insertRow(-1);
  //event listnener auf
  row.addEventListener("click", clicked);
  //special case for first column
  var cell = row.insertCell(0);
  cell.innerHTML = no;
  //loop für alle columns nach No
  for (let column = 0; column < objKey.length; column++) {
    cell = row.insertCell(column + 1);
    cell.innerHTML = obj[objKey[column]] != null ? obj[objKey[column]] : "No Data";
  }
  // set non visible the tenantNo to fetch later with the click listener
  row.setAttribute("tNo", obj["tenantNo"]);
  row.setAttribute("uNo", obj["unitNo"]);
}
// quality of life function
function setFormValues(selected) {
  $("#firstName").val(selected.cells[1].innerHTML);
  $("#lastName").val(selected.cells[2].innerHTML);
  $("#phoneNo").val(selected.cells[3].innerHTML);
  $("#bankDetails").val(selected.cells[4].innerHTML);
  $("#tenantNo").val(selected.getAttribute("tNo"));
  M.updateTextFields();
}
// add data to rows
function fillRows(object) {
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      $(`#${key}`).text(object[key]);
    }
  }
  $("#calcTable").toggleClass("hide");
  $("#calcBtn").toggleClass("hide");
}
//
// ────────────────────────────────────────────────────── I ──────────
//   :::::: B U T T O N S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────
//
function modifyT() {
  var form = $("#form");
  var args = [];
  for (let index = 0; index < 5; index++) {
    if (!form[0][index].value || null) {
      alert("fehler bei input forms");
      return;
    }
    args[index] = form[0][index].value;
  }
  modifyTenant(args);
}
function addT() {
  var form = $("#form");
  var args = [];
  for (let index = 0; index < 4; index++) {
    if (!form[0][index].value || null) {
      alert("fehler bei input forms");
      return;
    }
    args[index] = form[0][index].value;
  }
  args[4] = $("#unitNumberHeader").text();
  insertTenant(args);
}
function deleteT() {
  var form = $("#form");
  var tenantNo = form[0][4].value;
  deleteTenant(tenantNo);
}
//
// ────────────────────────────────────────────────────────────────── I ──────────
//   :::::: I P C   F U N C T I O N S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────
//
function changeWindow(wndw) {
  console.log("wndw");
  ipcRenderer.send("changeWindow", wndw);
}
function getUnitDetails() {
  ipcRenderer.send("getUnitDetails");
}
//
// ─── MODIFY ─────────────────────────────────────────────────────────────────────
//
function modifyTenant(args) {
  ipcRenderer.send("modifyTenant", args);
}
ipcRenderer.on("modifiedTenant", (event, args) => {
  if (args == -1) {
    console.log("error occured while modifying tenant");
    return;
  }
  alert("Tenant has been successfully modified");
});
//
// ─── INSERT ─────────────────────────────────────────────────────────────────────
//
function insertTenant(args) {
  ipcRenderer.send("insertTenant", args);
}
ipcRenderer.on("insertedTenant", (event, args) => {
  if (args == -1) {
    console.log("error occured while inserting tenant");
    return;
  }
  alert("Tenant has been successfully inserted");
});
//
// ─── DELETE ─────────────────────────────────────────────────────────────────────
//
function deleteTenant(tenantNo) {
  ipcRenderer.send("deleteTenant", tenantNo);
}
ipcRenderer.on("deletedTenant", (event, args) => {
  if (args == -1) {
    console.log("error occured while deleting tenant");
    return;
  }
  alert("Tenant has been successfully deleted");
});
//
// ─── OPERATIONAL COSTS ──────────────────────────────────────────────────────────
//
function calcOperationalCosts() {
  ipcRenderer.send("calcOperationalCosts");
}
ipcRenderer.on("operationalCosts", (event, args) => {
  if (args == -1) {
    console.log("error occured while calculating OP Costs");
    return;
  }
  let str = args.recordset[0][""];
  let obj = JSON.parse(str);
  console.dir(obj);
  // check if return ob is is null
  obj == null ? alert("Keine Daten vorhanden") : fillRows(obj);
});
//
// ─── IPC LISTENER ───────────────────────────────────────────────────────────────
//
ipcRenderer.on("sendUnit", (event, args) => {
  if (args == -1) {
    console.log("error occured");
    return;
  }
  // do return value specific stuff
  setUnitInformation(args.recordset[0]);
  $("#unitNumberHeader").text(args.recordset[0].unitNo);
  for (let index = 0; index < args.recordset.length; index++) {
    addRow(args.recordset[index], index);
  }
});
