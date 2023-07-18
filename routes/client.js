const express = require("express")
const router = express.Router();
const clientController = require("../controllers/client");

router.get("/getUsers", clientController.getUsers)
router.delete("/deleteUser/:id", clientController.deleteUser)
router.get("/setCookie", clientController.setCookie)

module.exports = router;