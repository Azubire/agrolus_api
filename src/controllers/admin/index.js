const { User, Distributor, Ad, Order } = require("../../../database/models");

const getMetrics = async (req, res) => {
  try {
    //users
    const user = await User.findAndCountAll({ attributes: ["id"] });
    const distributor = await Distributor.findAndCountAll({
      attributes: ["id"],
    });
    const ad = await Ad.findAndCountAll({ attributes: ["id"] });
    const order = await Order.findAndCountAll({ attributes: ["id"] });

    const data = [
      {
        id: 1,
        title: "Current Users",
        value: user.count,
        to: "/farmers",
      },
      {
        id: 2,
        title: "Number Of Adverts",
        value: ad.count,
        to: "/ads",
      },
      {
        id: 3,
        title: "Number Of Distributors",
        value: distributor.count,
        to: "/distributors",
      },
      {
        id: 4,
        title: "Total Orders",
        value: order.count,
        to: "/orders",
      },
    ];

    res.json({ error: false, message: "success", data });
  } catch (error) {
    res.json({ error: true, message: "failed", data: [] });
  }
};

module.exports = { getMetrics };
