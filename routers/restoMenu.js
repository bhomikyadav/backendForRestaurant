const router = require("express").Router();
const Menu = require("../models/restaurant");
const fetchuser = require("../middlewares/fetchuser");
const checkuser = require("../middlewares/checkauthForchanges");

router.post("/addmenu", [fetchuser, checkuser], async (req, res) => {
  const menuData = {
    restoId: req.user.id,
    foodname: req.body.foodname,
    price: req.body.price,
    offer: req.body.offer,
  };
  try {
    const menuresult = await Menu.create(menuData);
    res.json(menuresult);
  } catch (error) {
    console.log(error);
  }
});
router.put("/updatemenu/:id", [fetchuser, checkuser], async (req, res) => {
  const { price, foodname, offer } = req.body;

  const updateMenu = {};
  if (price) {
    updateMenu.price = price;
  }
  if (foodname) {
    updateMenu.foodname = foodname;
  }
  if (offer) {
    updateMenu.offer = offer;
  }
  try {
    let menu = await Menu.findById(req.params.id);
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
router.delete("/delete/:id", fetchuser, async (req, res) => {
  try {
    //check if that note is present or not
    let menu = await Menu.findById(req.params.id);
    if (!menu) {
      return res.status(404).send("not allowed");
    }
    //check if that note is update by the same user or not
    if (menu.restoId.toString() !== req.user.id) {
      return res.status(400).send("not allowed");
    }

    menu = await Menu.findByIdAndDelete(req.params.id);
    menu.save();
    res.json(menu);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
