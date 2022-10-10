const { User } = require("../../../../database/models");

const getFarmers = async (req, res) => {
  try {
    const data = await User.findAll({
      attributes: { exclude: ["updatedAt", "password", "contact", "location"] },
    });

    res.json({ error: false, message: "success", data });
  } catch (error) {
    res.json({ error: true, mesage: "failed", data: [] });
  }
};

const destroyFarmer = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await User.findOne({ where: { id } });
    await data.destroy();
    res.json({ error: false });
  } catch (error) {
    res.json({ error: true });
  }
};

module.exports = { getFarmers, destroyFarmer };
