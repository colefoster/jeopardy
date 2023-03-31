const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the records.
recordRoutes.route("/record").get(function (req, res) {
  
});

// This section will help you get a single record by id
recordRoutes.route("/record/:id").get(function (req, res) {
 
});

// This section will help you create a new record.
recordRoutes.route("/record/add").post(function (req, response) {

});

// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req, response) {
  
});

// This section will help you delete a record
recordRoutes.route("/:id").delete((req, response) => {
  
});

module.exports = recordRoutes;
