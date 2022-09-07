const { Ad } = require("../../../database/models");

const index = async (req, res) => {
  try {
    const data = await Ad.findAll({
      limit: 50,
      attributes: { exclude: ["updatedAt"] },
    });
    const dataTwo = await Ad.findAll({
      limit: 20,
      order: [["createdAt", "Desc"]],
      attributes: { exclude: ["updatedAt"] },
    });

    const newData = {
      farmer: data,
      newProduce: dataTwo,
    };

    res.json({ error: false, data: newData });
  } catch (error) {
    console.log(error);
    res.json({ error: true, error });
  }
};

const destroy = async (req, res) => {
  const { id } = req.params;
};

module.exports.FarmerController = { index, destroy };
