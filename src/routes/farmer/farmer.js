const express = require("express");
const { deposit } = require("../../controllers/deposits/DepositController");

const router = express.Router();
const {
  FarmerController,
} = require("../../controllers/farmer/FarmerController");

router.get("/", FarmerController.index);
router.delete("farmer/delete/:id");
router.post("/farmer/deposit/:id", deposit);

module.exports = router;
