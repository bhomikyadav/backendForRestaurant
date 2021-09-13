const jwt = require("jsonwebtoken");
const JWT_TOKEN = "bhomiky@d@v";

const fetchuser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send("invalid user1");
  }

  try {
    const data = await jwt.verify(token, JWT_TOKEN);

    req.user = data.user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send("invalid user2");
  }
};

module.exports = fetchuser;
