const { Transaction, User } = require("../../../database/models");

const getUserDeposits = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ where: { id } });
    const deposits = await user.getTransactions({ order: [["id", "Desc"]] });

    res.send({ error: false, status: "success", data: deposits });
  } catch (error) {
    console.log(error);
    res.send({ error: true, status: "rejected", data: [] });
  }
};

const deposit = async (req, res) => {
  const { id } = req.params;
  const data = {
    name: req.body.name,
    momoNumber: req.body.momoNumber,
    amount: parseInt(req.body.amount),
    trx_code: req.body.trx_code,
    userId: id,
    status: "pending",
  };

  try {
    const deposit = await Transaction.create(data);

    res.send({ error: false, status: "success", data: deposit });
  } catch (error) {
    res.send({ error: true });
  }
};
const getAllTransactions = async (req, res) => {
  try {
    const data = await Transaction.findAll({
      attributes: { exclude: ["updatedAt"] },
    });

    res.send({ error: false, data: data });
    console.log(data);
  } catch (error) {
    console.log(error);
    res.send({ error: true, data: [] });
  }
};

const updateDeposit = async (req, res) => {
  const { id } = req.params;
  let status;
  let val = parseInt(req.body.selected);
  if (val === 1) status = "pending";
  if (val === 2) status = "completed";
  if (val === 3) status = "rejected";

  try {
    const transaction = await Transaction.findOne({ where: { id } });

    const updatedTransaction = await transaction.update({ status: status });
    await updatedTransaction.save();
    if (val === 2) {
      const user = await User.findOne({
        where: { id: updatedTransaction.userId },
      });
      const accountBalance = updatedTransaction.amount + user.accountBalance;
      const updatedUser = await user.update({ accountBalance: accountBalance });
      await updatedUser.save();
    }
    res.send({ error: false });
  } catch (error) {
    res.send({ error: true, err: error });
  }
};

module.exports = {
  deposit,
  updateDeposit,
  getUserDeposits,
  getAllTransactions,
};
