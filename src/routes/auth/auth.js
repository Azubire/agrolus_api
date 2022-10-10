const express = require("express");
const path = require("path");
const multer = require("multer");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/users");
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

const { AuthController } = require("../../controllers/auth/AuthController");
const verifyToken = require("../../middleware/VerifyToken");

router.post("/signin", AuthController.signin);
router.post("/signup", AuthController.signup);
router.put("/update/:id", upload.single("profilePhoto"), AuthController.update);
router.post("/verifytoken", verifyToken, AuthController.verifyToken);
router.get("/user/balance/:id", AuthController.getUserBalance);

module.exports = router;
