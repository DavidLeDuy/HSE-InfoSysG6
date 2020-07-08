const { ipcRenderer } = require("electron");
const $ = require("jquery");
const { getPropertyList } = require("../../js/DBFunctions.js");
//import { config } from "./config.js";

function changeWindow(wndw) {
  console.log("wndw");
  ipcRenderer.send("changeWindow", wndw);
}

function toggleBtn() {
  $("#scale").toggleClass("scale-out");
}

function createCard() {
  var propertyNr = "";
  var adress = "tesing ";
  var owner = "some";
  var units = "stuff";
  var tenants = "";
  $("#cardContainer").append(
    '<div class="col s12 m6 l3">' +
      '<div class="card blue-grey darken-1">' +
      '<div class="card-content white-text">' +
      '<span class="card-title">Property Number: 55</span>' +
      '<ul class="collection">' +
      `<li class="collection-item">Adress: <span class="right">${adress}</span></li>` +
      `<li class="collection-item">Owner: <span class="right">${owner}</span></li>` +
      `<li class="collection-item">Units: <span class="right">${units}</span></li>` +
      `<li class="collection-item">Tenants: <span class="right"${tenants}</span></li>` +
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
  getPropertyList()
    .then((propertylist) => {
      propertylist.recordset.forEach((element) => {});
    })
    .catch((err) => {
      console.log(err);
    });
  for (let index = 0; index < 3; index++) {
    createCard();
  }
});

/*
{
  recordsets: [ [ [Object], [Object] ] ],
  recordset: [
    {
      propertyNo: 2,
      addressNo: 1000000001,
      houseNo: 32,
      street: 'Amselweg',
      postCode: 67890,
      city: 'Gﾃｶppingen',
      firstName: 'Sabine',
      lastName: 'Mﾃｼller',
      phoneNo: '01578888',
      numberOfUnits: 12,
      numberOfTenants: 3
    },
    {
      propertyNo: 111,
      addressNo: 999999999,
      houseNo: 11,
      street: 'Landauerstr',
      postCode: 70499,
      city: 'Stuttgart-Weilimdorf',
      firstName: 'Ekrem',
      phoneNo: '01234567',
      numberOfUnits: 3,
      numberOfTenants: 3
    }
  ],
  output: {},
  rowsAffected: [ 2 ]
}
*/
