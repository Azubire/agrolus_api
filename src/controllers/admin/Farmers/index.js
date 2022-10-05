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

module.exports = { getFarmers };
