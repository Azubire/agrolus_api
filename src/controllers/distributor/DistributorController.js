const index = async (req, res) => {
  //return all distributors
  try {
    res.status(200).json({ error: false, message: success, data });
  } catch (error) {
    res.status(400).json({ error: true, message: "something went wrong" });
  }
};

const create = async (req, res) => {};

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
