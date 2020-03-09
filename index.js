const express = require("express");
const cors = require("cors");
const stream = require("./stream");

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

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`app listen on ${port}`);
});
