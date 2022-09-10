const express = require("express");
const router = express.Router();

const { OrderController } = require("../../controllers/order/OrderController");

router.post("/create/:id", OrderController.createOrder);
router.get("/user/orders/:id", OrderController.getOrders);

module.exports = router;
