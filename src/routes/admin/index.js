const express = require("express");

const router = express.Router();

const { getAds, destroy } = require("../../controllers/admin/Ads/AdController");
const {
  getDistributors,
  destroyDistributor,
} = require("../../controllers/admin/distributors");
const {
  getFarmers,
  destroyFarmer,
} = require("../../controllers/admin/Farmers");
const { getOrders, destroyOrder } = require("../../controllers/admin/orders");
const { getMetrics } = require("../../controllers/admin");
const {
  updateDeposit,
} = require("../../controllers/deposits/DepositController");

router.get("/ads", getAds);
router.delete("/ad/delete/:id", destroy);
router.get("/distributors", getDistributors);
router.delete("distributor/delete/:id", destroyDistributor);
router.get("/farmers", getFarmers);
router.delete("farmer/delete/:id", destroyFarmer);
router.get("/orders", getOrders);
router.delete("/order/delete/:id", destroyOrder);
router.get("/metrics", getMetrics);
router.put("/deposit/update/:id", updateDeposit);

module.exports = router;
