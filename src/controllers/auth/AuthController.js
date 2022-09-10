require("dotenv").config();
const Jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  User,
  Distributor,
  Order,
  Sequelize,
} = require("../../../database/models");

//sign in
const signin = async (req, res) => {
  //check if user exist
  const user = await User.findOne({
    where: { email: req.body.email },
    include: {
      model: Distributor,
      attributes: { exclude: ["updatedAt", "userId"] },
    },
  });

  if (!user) {
    return res.json({ error: true, message: "email incorrect" });
  }

  const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);

  if (!isPasswordValid) {
    return res.json({ error: true, message: "password incorrect" });
  }

  const orderCount = await user.getOrders({
    attributes: {
      include: [[Sequelize.fn("COUNT", Sequelize.col("id")), "id"]],
    },
  });

  const email = user.email;
  const secret = process.env.JWT_Secret;

  try {
    const token = Jwt.sign({ email: email }, secret, { expiresIn: "30d" });

    const data = {
      error: false,
      user: {
        userToken: token,
        userId: user.id,
        username: user.fullname,
        email: user.email,
        img: user.img,
        accountBalance: user.accountBalance,
        totalSales: orderCount[0].id,
      },
      isDistributor: user.Distributor,
    };
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: true, message: "something went wrong" });
  }
};

const verifyToken = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.token.decodedToken.email },
      include: {
        model: Distributor,
        attributes: { exclude: ["updatedAt", "userId"] },
      },
    });
    const orderCount = await user.getOrders({
      attributes: {
        include: [[Sequelize.fn("COUNT", Sequelize.col("id")), "id"]],
      },
    });

    const data = {
      error: false,
      user: {
        userToken: req.body.token.token,
        userId: user.id,
        username: user.fullname,
        email: user.email,
        img: user.img,
        accountBalance: user.accountBalance,
        totalSales: orderCount[0].id,
      },
      isDistributor: user.Distributor,
    };
    res.status(200).json(data);
  } catch (error) {
    // console.log(error);
    res.status(400).json({ error: true, message: "something went wrong" });
  }
};

const signup = async (req, res) => {
  const { body } = req;
  //check if user exist in db
  const emailExist = await User.findOne({ where: { email: body.email } });

  if (emailExist) {
    return res.json({ error: true, message: "user already exist, login" });
  }

  const salt = await bcrypt.genSalt(10);
  const newPass = bcrypt.hashSync(body.password, salt);

  const fullname = `${body.lastname.trim()} ${body.firstname.trim()}`;
  const newData = {
    fullname: fullname,
    email: body.email,
    password: newPass,
  };

  try {
    const user = await User.create(newData);

    res.json({ error: false, data: user });
  } catch (error) {
    res.json({ error: true, message: "something went wrong" });
  }

  try {
    res.status(200).json({ error: false, mesage: "succes" });
  } catch (error) {
    res.status(400).json({ error: true, message: "failed" });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  try {
    const user = await User.findOne({ where: { id: id } });
    const updatedUser = await user.update({ img: req.file.filename });
    user;
    // console.log();
    res.json({ error: false, img: updatedUser.img });
  } catch (error) {
    // console.log("error", error);
    res.json({ error: true, img: "" });
  }
};

const resetPassword = async (req, res) => {};

const verifyEmail = async (req, res) => {};

module.exports.AuthController = { signin, signup, verifyToken, update };
