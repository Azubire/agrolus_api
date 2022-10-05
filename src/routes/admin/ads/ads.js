const express = require("express");

const router = express.Router();

const {
  getAds,
  destroy,
} = require("../../../controllers/admin/Ads/AdController");

router.get("/ads", getAds);
router.delete("/ad/:id", destroy);

module.exports = router;
