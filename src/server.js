const express = require("express");
const cors = require("cors");
const { sequelize } = require("../database/models");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(cors({ origin: "http://localhost:3000" }));

const AuthRouter = require("./routes/auth/auth");
const DistributorRouter = require("./routes/distributor/distributor");
const FarmerRouter = require("./routes/farmer/farmer");
const OrderRouter = require("./routes/order/order");
const AdRouter = require("./routes/ad/ad");

//admin routers imports
const AdminRouter = require("./routes/admin");

const verifyToken = require("./middleware/VerifyToken");

app.get("/", verifyToken, async (req, res) => {
  res.json({ success: true, data: req.body.token });
});
//auth route
app.use("/auth", AuthRouter);

// distributor route
app.use("/distributors", DistributorRouter);

//farmer route
app.use("/farmers", FarmerRouter);

//orders route
app.use("/orders", OrderRouter);

//ad routes
app.use("/ad", AdRouter);

//admin routes

app.use("/admin", AdminRouter);

app.listen(process.env.PORT || 3001, async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database ", error);
  }
  console.log(`sever is running on port 3001 ${process.env.port || 3001}`);
});
