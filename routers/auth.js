const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_TOKEN = "bhomiky@d@v";
const fetchuser = require("../middlewares/fetchuser");
const checkuser = require("../middlewares/checkauthForchanges");

router.post(
  "/createuser",
  [
    body("name", "enter a valid name").isLength({ min: 5 }),
    body("username", "enter a valid username").isLength({ min: 5 }),
    body("city", "enter a valid city").isLength({ min: 5 }),
    body("phone", "enter a valid phone")
      .isNumeric()
      .isLength({ min: 10, max: 12 }),
    body("email", "enter a valid email").isEmail(),
    body("password", "enter a valid password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10);
    const secpass = await bcrypt.hash(req.body.password, salt);
    const myuserdata = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      username: req.body.username,
      password: secpass,
      city: req.body.city,
      role: req.body.role,
    };

    try {
      const result = await User.exists({
        $or: [
          { username: req.body.username },
          { phone: req.body.phone },
          { email: req.body.email },
        ],
      });
      if (result) {
        return res.status(401).json({ errors: "invalid entry1" });
      }
      const myUser = await User.create(myuserdata);
      const data = {
        user: {
          id: myUser.id,
        },
      };
      const jwtData = jwt.sign(data, JWT_TOKEN);
      res.json({ token: jwtData });
    } catch (error) {
      console.log(error);
    }
  }
);
router.post(
  "/login",
  [
    body("username", "enter a valid username").isLength({ min: 5 }),
    body("password", "enter a valid password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { username, password } = req.body;
      let user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ errors: "invalid entry" });
      }
      const passcompare = await bcrypt.compare(password, user.password);
      if (!passcompare) {
        return res.status(400).json({ err: "invalid entry" });
      }
      const data = {
        user: {
          id: User.id,
        },
      };

      const jwtData = await jwt.sign(data, JWT_TOKEN);
      res.json({ token: jwtData });
    } catch (error) {
      console.log("error");
    }
  }
);
router.get(
  "/getuser",
  [fetchuser, checkuser],

  async (req, res) => {
    try {
      const userId = req.user.id;

      const data = await User.findOne({ _id: userId }).select("-password");
      res.json(data);
    } catch (error) {
      console.log(error);
    }
  }
);


module.exports = router;
