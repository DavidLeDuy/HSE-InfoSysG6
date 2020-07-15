const sql = require("mssql");
const config = require("../connection.config");

sql.on("error", (err) => {
  // ... error handler
  console.log(err);
});

// --- Stored Procedures ---
/**
 * @param  {Number} unitNo
 * @param  {String} firstname
 * @param  {String} lastname
 * @param  {String} phoneNo
 * @param  {Number} bankDetails
 * @returns  Promise to Insert a Tenant
 */
function InsertTenant(unitNo, firstname, lastname, phoneNo, bankDetails) {
  return sql.connect(config).then((pool) => {
    return pool
      .request()
      .input("unitNo", sql.Int, unitNo)
      .input("firstname", sql.VarChar(12), firstname)
      .input("lastname", sql.VarChar(12), lastname)
      .input("phoneNo", sql.VarChar(11), phoneNo)
      .input("bankDetails", sql.VarChar(16), bankDetails)
      .execute("group6_InsertTenant2");
  });
}

// Modify tenants data (without address, balance)
/**
 * @param  {Number} tenantNo
 * @param  {String} firstname
 * @param  {String} lastname
 * @param  {String} phoneNo
 * @param  {String} bankDetails
 * @returns  Promise to Modify a Tenant
 */
function ModifyTenant(tenantNo, firstname, lastname, phoneNo, bankDetails) {
  return sql.connect(config).then((pool) => {
    return pool
      .request()
      .input("tenantNo", sql.Int, tenantNo)
      .input("firstname", sql.VarChar(12), firstname)
      .input("lastname", sql.VarChar(12), lastname)
      .input("phoneNo", sql.VarChar(11), phoneNo)
      .input("bankDetails", sql.VarChar(16), bankDetails)
      .execute("group6_ModifyTenant");
  });
}

// Deletes tenant by tenantNo
/**
 * @param  {Number} tenantNo
 * @returns  Promise to Delete a Tenant
 */
function DeleteTenant(tenantNo) {
  return sql.connect(config).then((pool) => {
    return pool.request().input("tenantNo", sql.Int, tenantNo).execute("group6_DeleteTenant");
  });
}
/**
 * @param  {Date} dateOfTransaction
 * @param  {String} subjectLine
 * @param  {Number} amount
 */
function InsertTransaction(dateOfTransaction, subjectLine, amount) {
  return sql.connect(config, (err) => {
    new sql.Request()
      .input("dateOfTransaction", sql.Date, dateOfTransaction)
      .input("subjectLine", sql.VarChar(50), subjectLine)
      .input("amount", sql.Float, amount)
      .execute("SS20G6_insertTransaction");
  });
}
/**
 * @param  {Number} unitNo
 * @param  {Number} propertyNo
 * @returns Promise
 */
function CalculateOperationalCosts(unitNo, propertyNo) {
  return sql.connect(config).then((pool) => {
    return pool
      .request()
      .input("unitNo", sql.Int, unitNo)
      .input("propertyNo", sql.Int, propertyNo)
      .execute("SS20G6_calculate_operational_costs");
  });
}

// --- Selects on Views/Tables ---
function getPropertyList() {
  return sql.connect(config).then((pool) => {
    // Query
    return pool.request().query("SELECT * FROM group6_ProperyList");
  });
}

function getUnitList(propertyNo) {
  return sql.connect(config).then((pool) => {
    // Query
    return pool.request().query(`SELECT * FROM group6_UnitList WHERE propertyNo = ${propertyNo}`);
  });
}

function getUnitDetails(unitNo) {
  return sql.connect(config).then((pool) => {
    // Query
    return pool.request().query(`SELECT * FROM group6_UnitDetails WHERE unitNo = ${unitNo}`);
  });
}

function getTenantWithNegativeBalance() {
  return sql.connect(config).then((pool) => {
    // Query
    return pool.request().query("SELECT * FROM group6_NegativeBalance");
  });
}

function CalculateOperational() {
  return sql.connect(config).then((pool) => {
    // Query
    return pool.request().query("SELECT * FROM OPERATIONAL_CALCULATE");
  });
}

module.exports.InsertTenant = InsertTenant;
module.exports.ModifyTenant = ModifyTenant;
module.exports.DeleteTenant = DeleteTenant;

module.exports.InsertTransaction = InsertTransaction;
module.exports.CalculateOperationalCosts = CalculateOperationalCosts;

module.exports.getPropertyList = getPropertyList;
module.exports.getUnitList = getUnitList;
module.exports.getUnitDetails = getUnitDetails;

module.exports.getTenantWithNegativeBalance = getTenantWithNegativeBalance;
module.exports.CalculateOperational = CalculateOperational;
