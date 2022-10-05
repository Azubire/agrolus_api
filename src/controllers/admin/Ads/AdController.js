const { Ad, User, Category } = require("../../../../database/models");

const getAds = async (req, res) => {
  try {
    const data = await Ad.findAll({
      attributes: {
        exclude: ["updatedAt", "description", "userId", "categoryId"],
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
    });

    res.json({ error: false, message: "success", data: data });
  } catch (error) {
    res.json({ error: true, message: "failed", data: [] });
  }
};

const destroy = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Ad.findOne({ where: { id: id } });

    await data.destroy();

    res.json({ error: false });
  } catch (error) {
    res.json({ error: true });
  }
};

module.exports = { getAds, destroy };
