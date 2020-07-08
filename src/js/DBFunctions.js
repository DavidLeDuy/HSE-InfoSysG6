const sql = require("mssql");
const config = require("../connection.config");

sql.on("error", (err) => {
  // ... error handler
});

exports.getPropertyList = () => {
  var res;
  console.log("starting sql ding");
  sql
    .connect(config)
    .then((pool) => {
      // Query
      return pool.request().query("SELECT * FROM group6_ProperyList");
    })
    .then((result) => {
      console.log("okay erfolgreich");
      res = result;
    })
    .catch((err) => {
      console.log(err);
    });
  console.log("returning");
  return res;
};

/*
function InsertTenant(unitNo, firstname, lastname, phoneNo, bankDetails) {
  sql.connect(config, (err) => {
    new sql.Request()
      .input("unitNo", sql.Int, unitNo)
      .input("firstname", sql.VarChar(12), firstname)
      .input("lastname", sql.VarChar(12), lastname)
      .input("phoneNo", sql.VarChar(11), phoneNo)
      .input("bankDetails", sql.VarChar(16), bankDetails)
      .execute("group6_InsertTenant2", (err, result) => {
        // ... error checks

        console.dir(result);
        console.log(result);
      });
  });

  sql.on("error", (err) => {
    // ... error handler
  });
}

//ModifyTenant(100000010, 'Jensi', 'Spahni', '0000000', '-5555555')

// Modify tenants data (without address, balance)
function ModifyTenant(tenantNo, firstname, lastname, phoneNo, bankDetails) {
  sql.connect(config, (err) => {
    new sql.Request()
      .input("tenantNo", sql.Int, tenantNo)
      .input("firstname", sql.VarChar(12), firstname)
      .input("lastname", sql.VarChar(12), lastname)
      .input("phoneNo", sql.VarChar(11), phoneNo)
      .input("bankDetails", sql.VarChar(16), bankDetails)
      .execute("group6_ModifyTenant", (err, result) => {
        // ... error checks

        console.dir(result);
        console.log(result);
      });
  });

  sql.on("error", (err) => {
    // ... error handler
  });
}

//DeleteTenant(100000010)

// Deletes tenant by tenantNo
function DeleteTenant(tenantNo) {
  sql.connect(config, (err) => {
    new sql.Request().input("tenantNo", sql.Int, tenantNo).execute("group6_DeleteTenant", (err, result) => {
      // ... error checks

      console.dir(result);
      console.log(result);
    });
  });

  sql.on("error", (err) => {
    // ... error handler
  });
}

getPropertyList();

function getPropertyList() {
  sql
    .connect(config)
    .then((pool) => {
      // Query
      return pool.request().query("SELECT * FROM group6_ProperyList");
    })
    .then((result) => {
      console.dir(result);
      console.log("PropertyList\n" + result);
    })
    .catch((err) => {
      console.log(err);
    });
}

getUnitList();

function getUnitList() {
  sql
    .connect(config)
    .then((pool) => {
      // Query
      return pool.request().query("SELECT * FROM group6_UnitList");
    })
    .then((result) => {
      console.dir(result);
      console.log("UnitList\n" + result);
    })
    .catch((err) => {
      console.log(err);
    });
}

getUnitDetails();

function getUnitDetails() {
  sql
    .connect(config)
    .then((pool) => {
      // Query
      return pool.request().query("SELECT * FROM group6_UnitDetails");
    })
    .then((result) => {
      console.dir(result);
      console.log("UnitDetails" + result);
    })
    .catch((err) => {
      console.log(err);
    });
}

getTenantWithNegativeBalance();

function getTenantWithNegativeBalance() {
  sql
    .connect(config)
    .then((pool) => {
      // Query
      return pool.request().query("SELECT * FROM group6_NegativeBalance");
    })
    .then((result) => {
      console.dir(result);
      console.log("TenantWithNegativeBalance" + result);
    })
    .catch((err) => {
      console.log(err);
    });
}
*/
