const { Ad } = require("../../../database/models");

const createAd = async (req, res) => {
  const file = req.file;
  console.log(file);
  console.log(req.body);
  const img = file.filename;

  const newFormData = {
    title: req.body.title,
    categoryId: parseInt(req.body.category),
    userId: req.body.userId,
    price: parseInt(req.body.price),
    description: req.body.description,
    img: img,
  };

  try {
    await Ad.create(newFormData);
    res.json({ error: false, message: "success" });
  } catch (error) {
    console.log(error);
    res.json({ error: true, message: "failed" });
  }
};

module.exports.AdController = { createAd };
