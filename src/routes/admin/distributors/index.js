const express = require("express");

const router = express.Router();
const { index } = require("../../../controllers/admin/distributors");

router.get("/distributors", index);

module.exports = router;
