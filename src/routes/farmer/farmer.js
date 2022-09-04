const express = require("express");

const router = express.Router();
import { FarmerController } from "../../controllers/farmer/FarmerController";

router.get("/", FarmerController.index);
router.delete("farmer/delete/:id");

export default router;
