const { Order, OrderDetails, User } = require("../../../database/models");

const createOrder = async (req, res) => {
  const { id } = req.params;
  const totolOrderAmount = req.body.grandTotal;

  const user = await User.findOne({
    where: { id: id },
  });

  if (user.accountBalance < totolOrderAmount) {
    return res.json({
      error: true,
      message: "You dont have enough balance to make this transaction",
    });
  }
  const newBalance = user.accountBalance - totolOrderAmount;
  await user.update({ accountBalance: newBalance });

  const order = await Order.create({
    grandTotal: req.body.grandTotal,
    paymentStatus: "paid",
    paymentType: req.body.paymentType,
    viewed: 0,
    deleviryStatus: "pending",
    orderCode: "ORD" + Date.now() + "-" + Math.round(Math.random() * 1e9),
    userId: id,
  });

  const data = await OrderDetails.bulkCreate(req.body.items);

  const d = await order.addOrderDetails(data);

  console.log(d);
  res.json({ error: false, message: "Payment was successfull" });
};

module.exports.OrderController = { createOrder };
