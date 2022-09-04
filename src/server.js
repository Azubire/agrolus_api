const { json } = require("express");
const express = require("express");

const app = express();

app.use(json());

import AuthRouter from "./routes/auth/auth";
import DistributorRouter from "./routes/distributor/distributor";
import FarmerRouter from "./routes/farmer/farmer";
import OrderRouter from "./routes/order/order";

app.get("/", async (req, res) => {
  res.json({ success: true });
});

//auth route
app.use("/auth", AuthRouter);

// distributor route
app.use("/distributors", DistributorRouter);

//farmer route
app.use("/famers", FarmerRouter);

//orders route
app.use("/orders", OrderRouter);

app.listen(3001, () => {
  console.log("sever is running on port 3001");
});

// export default app;
