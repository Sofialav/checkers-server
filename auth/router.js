const { Router } = require("express");
const bcrypt = require("bcrypt");
const { toJWT } = require("./jwt");
const User = require("../user/model");
const auth = require("./middleware");

const router = new Router();
// creating and sending user a token
router.post("/login", async (req, res) => {
  try {
    if (!req.body.name || !req.body.password) {
      res.status(400).send({
        message: "Please supply a valid name and password"
      });
    } else {
      const entity = await User.findOne({ where: { name: req.body.name } });
      if (!entity) {
        res.status(400).send({
          message: "User with that name does not exist"
        });
      }
      // 2. use bcrypt.compareSync to check the password against the stored hash
      else if (bcrypt.compareSync(req.body.password, entity.password)) {
        // 3. if the password is correct, return a JWT with the userId of the user (user.id)
        res.send({
          jwt: toJWT({ userId: entity.id })
        });
      } else {
        res.status(400).send({
          message: "Password was incorrect"
        });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Something went wrong"
    });
  }
});
// secret endpoint
// router.get("/secret-endpoint", auth, (req, res) => {
//   res.send({
//     message: `Thanks for visiting the secret endpoint ${req.user.name}.`
//   });
// });

module.exports = router;
