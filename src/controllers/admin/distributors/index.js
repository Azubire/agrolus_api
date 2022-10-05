const { Distributor } = require("../../../../database/models");

const getDistributors = async (req, res) => {
  try {
    const data = await Distributor.findAll({
      attributes: {
        exclude: ["updatedAt", "profile", "userId", "ratings", "transactions"],
      },
    });

    res.json({ error: false, message: "success", data });
  } catch (error) {
    res.json({ error: true, message: "failed", data: [] });
  }
};
const destroyDistributor = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Distributor.findOne({ where: { id } });
    await data.destroy();

    res.json({ error: false });
  } catch (error) {
    res.json({ error: true });
  }
};
module.exports = { getDistributors, destroyDistributor };
