const express = require("express");
const stream = require("../stream");

const { Router } = express;
const router = Router();

router.post("/channels", (request, response, next) => {
  response.send(request.body.name);

  // const action = {
  //   type: "ADD_CHANNEL",
  //   payload: name
  // };

  // stream.send(action);
});

module.exports = router;
