require("dotenv").config();
const Jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../../../database/models");

//sign in
const signin = async (req, res) => {
  //check if user exist
  const user = await User.findOne({ where: { email: req.body.email } });

  if (!user) {
    return res.json({ error: true, message: "email incorrect" });
  }

  const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);

  if (!isPasswordValid) {
    return res.json({ error: true, message: "password incorrect" });
  }

  const email = user.email;
  const secret = process.env.JWT_Secret;

  try {
    const token = Jwt.sign({ email: email }, secret, { expiresIn: "30d" });

    const data = {
      error: false,
      user: {
        userToken: token,
        id: user.id,
        username: user.fullname,
        email: user.email,
        accountBalance: user.accountBalance,
      },
    };
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
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

const resetPassword = async (req, res) => {};

const verifyEmail = async (req, res) => {};

module.exports.AuthController = { signin, signup };
