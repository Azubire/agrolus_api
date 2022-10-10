const {
  Order,
  User,
  Distributor,
  Transaction,
} = require("../../../../database/models");

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

const destroyOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Transaction.findOne({ where: { id } });

    await data.destroy();

    res.json({ error: false });
  } catch (error) {
    console.log(error);
    res.json({ error: true });
  }
};

module.exports = { getOrders, destroyOrder };
