const express = require("express");
const path = require("path");
const multer = require("multer");
const router = express.Router();

const { AdController } = require("../../controllers/ad/AdController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/ads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

router.post("/create", upload.single("adImage"), AdController.createAd);

module.exports = router;
