const express = require("express");
const router = express.Router();

const { OrderController } = require("../../controllers/order/OrderController");

router.post("/create/id", OrderController.createOrder);

module.exports = router;
