const express = require("express")
const router = express.Router();
const clientController = require("../controllers/client");

router.get("/getUsers", clientController.getUsers)
router.delete("/deleteUser/:id", clientController.deleteUser)
router.post("/sendEmail", clientController.sendEmail)
router.post("/sendEstimateEmail", clientController.sendEstimateEmail)

module.exports = router;