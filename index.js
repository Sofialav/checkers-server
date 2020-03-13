const express = require("express");
const cors = require("cors");
const stream = require("./stream");
const Channel = require("./channels/model");

const userRouter = require("./user/router");
const authRouter = require("./auth/router");
const channelRouter = require("./channels/router");

const app = express();
const corsMiddleware = cors();
app.use(corsMiddleware);
const bodyParser = express.json();
app.use(bodyParser);

app.get("/stream", async (req, res) => {
  const db = await Channel.findAll();
  const action = {
    type: "ALL_CHANNELS",
    payload: db
  };
  stream.updateInit(action);
  stream.init(req, res);
});

app.use(userRouter);
app.use(authRouter);
app.use(channelRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`app listen on ${port}`);
});
