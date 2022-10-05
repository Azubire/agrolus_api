const express = require("express")

const router = express.Router()

const {index} = require("../../../controllers/admin/Ads/AdController")

router.get("/ads",index)


module.exports = router