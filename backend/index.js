const mongoose = require("mongoose");
const config = require("./database/configDB");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const NODE_ENV="production";

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

const path = require("path");

const __DIRNAME = path.resolve();

app.use(express.static(path.join(__DIRNAME, "/frontend/dist")));

const routes = require("./routes");

app.use(routes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__DIRNAME, "../frontend/dist")));

  app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(__DIRNAME, "../frontend", "dist", "index.html"));
  });
}



mongoose
  .connect(config.mongoDb.uri)
  .then(() => {
    console.log("Connection mongoDB Ok");
  })
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
