const express = require("express");

const router = express.Router();

import { AuthController } from "../../controllers/auth/AuthController";

router.post("/auth/signin", AuthController.signin);
router.post("/auth/signup", AuthController.signup);

export default router;
