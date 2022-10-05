const { Order, User, Distributor } = require("../../../../database/models");

const getOrders = async (req, res) => {
  try {
    const data = await Order.findAll({
      attributes: { exclude: ["updatedAt", "userId", "viewed"] },
      include: {
        model: User,
        attributes: ["id"],
        include: {
          model: Distributor,
          attributes: ["name"],
        },
      },
    });

    res.json({ error: false, message: "success", data });
  } catch (error) {
    res.json({ error: true, mesage: "failed", data: [] });
  }
};

module.exports = { getOrders };
