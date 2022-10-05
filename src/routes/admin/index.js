const express = require("express");

const router = express.Router();

const { getAds } = require("../../controllers/admin/Ads/AdController");
const { getDistributors } = require("../../controllers/admin/distributors");
const { getFarmers } = require("../../controllers/admin/Farmers");
const { getOrders } = require("../../controllers/admin/orders");
const { getMetrics } = require("../../controllers/admin");

router.get("/ads", getAds);
router.get("/distributors", getDistributors);
router.get("/farmers", getFarmers);
router.get("/orders", getOrders);
router.get("/metrics", getMetrics);

module.exports = router;
