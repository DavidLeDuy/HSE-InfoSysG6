const { ipcRenderer } = require("electron");
const $ = require("jquery");
const { getPropertyList } = require("../../js/DBFunctions.js");
const { exists } = require("fs");
const { create } = require("domain");
//import { config } from "./config.js";

function changeWindow(wndw) {
  console.log("wndw");
  ipcRenderer.send("changeWindow", wndw);
}

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
      `<a id="scale" class="btn-small scale-transition" onclick="toggleBtn();changeWindow('unitList')" href="#">Go to Overview</a>` +
      "</div>" +
      "</div>" +
      "</div>"
  );
}

// script to input the data for properties
$(document).ready(function () {
  for (let index = 0; index < testJSON.recordset.length; index++) {
    createCard(testJSON.recordset[index]);
  }
  getPropertyList()
    .then((propertylist) => {
      console.dir(propertylist);
      for (let index = 0; index < propertylist.recordset.length; index++) {
        createCard(propertylist.recordset[index]);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

var testJSON = {
  recordsets: [[[Object], [Object]]],
  recordset: [
    {
      propertyNo: 2,
      addressNo: 1000000001,
      houseNo: 32,
      street: "Amselweg",
      postCode: 67890,
      city: "Göppingen",
      firstName: "Sabine",
      lastName: "Müller",
      phoneNo: "01578888",
      numberOfUnits: 12,
      numberOfTenants: 3,
    },
    {
      propertyNo: 111,
      addressNo: 999999999,
      houseNo: 11,
      street: "Landauerstr",
      postCode: 70499,
      city: "Stuttgart-Weilimdorf",
      firstName: "Ekrem",
      phoneNo: "01234567",
      numberOfUnits: 3,
      numberOfTenants: 3,
    },
  ],
  output: {},
  rowsAffected: [2],
};
