const express = require("express");

const router = express.Router();

const { getAds } = require("../../controllers/admin/Ads/AdController");
const { getDistributors } = require("../../controllers/admin/distributors");
const { getFarmers } = require("../../controllers/admin/Farmers");

router.get("/ads", getAds);
router.get("/distributors", getDistributors);
router.get("/farmers", getFarmers);

module.exports = router;
