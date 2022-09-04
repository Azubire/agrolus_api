import { Router } from "express";

const router = Router();

import OrderController from "../../controllers/order/OrderController";

router.post("/create/id", OrderController.createOrder);

export default router;
