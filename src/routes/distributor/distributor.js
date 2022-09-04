const express = require("express");

const router = express.Router();

import { DistributorController } from "../../controllers/distributor/DistributorController";

router.get("/", DistributorController.index);
router.get("/:id", DistributorController.show);
router.post("/register", DistributorController.create);
router.put("/update/:id", DistributorController.update);
router.delete("/delete/:id");

export default router;
