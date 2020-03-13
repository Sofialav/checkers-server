const Channel = require("./model");
const express = require("express");
const stream = require("../stream");

const { Router } = express;
const router = Router();

router.post("/channels", async (request, response) => {
  try {
    if (!request.body.name) {
      return response
        .status(400)
        .send({ message: "Please supply a name for the channel" });
    } else {
      const newChannel = await Channel.create(request.body);
      response.json(newChannel);
      // const action = {
      //   type: "ADD_CHANNEL",
      //   payload: newChannel
      // };
      return stream.send(newChannel);
    }
  } catch (error) {
    response.status(400).send({
      message: "This channel name is already in use"
    });
  }
});

module.exports = router;
