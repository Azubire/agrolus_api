const {
  Order,
  OrderDetails,
  User,
  Ad,
  Category,
} = require("../../../database/models");

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
    deliveryStatus: "pending",
    orderCode: "ORD" + Date.now() + "-" + Math.round(Math.random() * 1e9),
    userId: id,
  });

  const data = await OrderDetails.bulkCreate(req.body.items);

  const d = await order.addOrderDetails(data);

  console.log(d);
  res.json({ error: false, message: "Payment was successfull" });
};

const getOrders = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({
      where: { id: id },
    });

    const orders = await user.getOrders({
      include: {
        model: OrderDetails,
        attributes: {
          exclude: [
            "createdAt",
            "updatedAt",
            "distributorId",
            "userId",
            "orderId",
          ],
        },
        include: {
          model: Ad,
          attributes: {
            exclude: [
              "description",
              "userId",
              "categoryId",
              "createdAt",
              "updatedAt",
            ],
          },
          include: [
            {
              model: User,
              attributes: ["fullname"],
            },
            {
              model: Category,
              attributes: ["name"],
            },
          ],
        },
      },
      attributes: { exclude: ["updatedAt"] },
    });
    res.json({ error: false, message: "success", data: orders });
  } catch (error) {
    res.json({ error: true, message: "failed", data: [] });
  }
};

module.exports.OrderController = { createOrder, getOrders };
