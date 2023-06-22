const express = require("express");
const router = express.Router();
const apptController = require("../controllers/appt");

router.post("/createAppt", apptController.createAppt);

module.exports = router;