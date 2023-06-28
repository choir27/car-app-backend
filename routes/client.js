const express = require("express")
const router = express.Router();
const clientController = require("../controllers/client");

router.get("/getUsers", clientController.getUsers)

module.exports = router;