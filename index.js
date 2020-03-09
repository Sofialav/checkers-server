const express = require("express");
const cors = require("cors");
const user = require("./user/model");

const app = express();
const corsMiddleware = cors();
const bodyParser = express.json();

app.use(corsMiddleware);
app.use(bodyParser);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`app listen on ${port}`);
});
