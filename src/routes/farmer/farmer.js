const express = require("express");

const router = express.Router();
const {
  FarmerController,
} = require("../../controllers/farmer/FarmerController");

router.get("/", FarmerController.index);
router.delete("farmer/delete/:id");

module.exports = router;
