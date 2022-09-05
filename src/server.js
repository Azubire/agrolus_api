const { json } = require("express");
const express = require("express");
const { sequelize } = require("../database/models");
require("dotenv").config();

const app = express();

app.use(json());

const AuthRouter = require("./routes/auth/auth");
const DistributorRouter = require("./routes/distributor/distributor");
const FarmerRouter = require("./routes/farmer/farmer");
const OrderRouter = require("./routes/order/order");

const verifyToken = require("./middleware/VerifyToken");

app.get("/", verifyToken, async (req, res) => {
  res.json({ success: true, data: req.body.token });
});

//auth route
app.use("/auth", AuthRouter);

// distributor route
app.use("/distributors", DistributorRouter);

//farmer route
app.use("/famers", FarmerRouter);

//orders route
app.use("/orders", OrderRouter);

app.listen(3001, async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database: ", error);
  }
  console.log("sever is running on port 3001");
});

// export default app;
