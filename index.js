const express = require("express");
const cors = require("cors");
const stream = require("./stream");
const Channel = require("./channels/model");

const userRouter = require("./user/router");
const authRouter = require("./auth/router");
const channelRouter = require("./channels/router");

const app = express();
const corsMiddleware = cors();
const bodyParser = express.json();

app.use(corsMiddleware);
app.use(bodyParser);
app.use(userRouter);
app.use(authRouter);
app.use(channelRouter);

app.get("/stream", async (req, res) => {
  stream.init(req, res);
  const data = await Channel.findAll();
  // const channels = {
  //   type: "ALL_CHANNELS",
  //   payload: data
  // };
  console.log("LOGGIN!", data);
  stream.updateInit(data);
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`app listen on ${port}`);
});
