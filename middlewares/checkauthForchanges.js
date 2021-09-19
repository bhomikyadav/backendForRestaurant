const jwt = require("jsonwebtoken");
const JWT_TOKEN = "bhomiky@d@v";
const User = require("../models/user");

const checkauthForchanges = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user.id });

    if (user.role.toString() !== "owner") {
      return res.status(404).json({ error: "unauthorized user" });
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = checkauthForchanges;
