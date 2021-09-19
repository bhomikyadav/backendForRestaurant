const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_TOKEN = "bhomiky@d@v";
const fetchuser = require("../middlewares/fetchuser");
const checkuser = require("../middlewares/checkauthForchanges");
router.put("/updatepass/:id", [fetchuser, checkuser], async (req, res) => {
   const {passward}=req.body;

  
    try {
      let menu = await Menu.findById(req.user.id);
      if (!menu) {
        return res.status(404).send("not found");
      }
      //check if that note is update by the same user or not
  
      // if(note.user.toString() !==req.user.id){return res.status(404).send("not found")};
      if (menu.restoId.toString() !== req.user.id) {
        return res.status(400).send("not allowed");
      }
  
      menu = await Menu.findByIdAndUpdate(
        req.params.id,
        { $set: updateMenu },
        { new: true }
      );
      menu.save();
      res.json(menu);
    } catch (error) {
      console.log(error);
    }
  });





module.exports = router;
