const User = require("./model");
const bcrypt = require("bcrypt");
const { Router } = require("express");
const router = new Router();

router.post("/user", async (req, res, next) => {
  try {
    if (!req.body.name || !req.body.password) {
      return res.status(400).send("Please supply an email and password");
    } else {
      const user = {
        name: req.body.name,
        password: bcrypt.hashSync(req.body.password, 10)
      };
      const userPost = await User.create(user);
      return res.json(userPost);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
