//sign in
const signin = async (req, res) => {
  try {
    const data = {
      error: false,
      message: "success",
      data: {
        user: {
          usertoken: "token",
          id: 1,
          username: "azubire",
          email: "sjdh@gmail.com",
          img: "dsds.ho",
          isDistributor: 0,
        },
      },
    };
    res.status(200).json({});
  } catch (error) {
    res.status(400).json({ error: true, message: "failed" });
  }
};

const signup = async (req, res) => {
  try {
    res.status(200).json({ error: false, mesage: "succes" });
  } catch (error) {
    res.status(400).json({ error: true, message: "failed" });
  }
};

const resetPassword = async (req, res) => {};

const verifyEmail = async (req, res) => {};

export const AuthController = { signin, signup };
