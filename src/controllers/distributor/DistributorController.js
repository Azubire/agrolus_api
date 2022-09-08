const { Distributor, User } = require("../../../database/models");

// Distributor.sync({ alter: true });
// User.sync({ alter: true });
const index = async (req, res) => {
  //return all distributors
  try {
    const data = await Distributor.findAll({
      attributes: { exclude: ["updatedAt"] },
    });

    res.status(200).json({ error: false, data: data });
  } catch (error) {
    res.status(400).json({ error: true, message: "something went wrong" });
  }
};

const create = async (req, res) => {
  const img = req.file.filename;

  const dis = {
    name: req.body.name,
    email: req.body.email,
    contact: req.body.contact,
    img: img,
    website: req.body.website,
    profile: req.body.profile,
    transactions: 0,
    userId: req.body.userId,
    location: req.body.location,
    ratings: 1,
  };

  try {
    await Distributor.create(dis);

    res.json({ error: false });
  } catch (error) {
    console.log(error);
    res.json({ error: true });
  }
};

const show = async (req, res) => {
  const { id } = req.params;
};

const update = async (req, res) => {
  const { id } = req.params;
};

const destroy = async (req, res) => {
  const { id } = req.params;
};

module.exports.DistributorController = { index, create, show, update, destroy };
