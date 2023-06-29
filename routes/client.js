const express = require("express")
const router = express.Router();
const clientController = require("../controllers/client");

router.get("/getUsers", clientController.getUsers)
router.get("/deleteUser/:id", clientController.deleteUser)

module.exports = router;