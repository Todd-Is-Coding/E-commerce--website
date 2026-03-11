const express = require("express");
const morgan = require("morgan");
const { connectDatabase } = require("./config/db");
require("dotenv").config();

const categoryRouter = require("./routes/category.router");

//express app
const app = express();

//middlewares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`Mode : ${process.env.NODE_ENV}`);
}
app.use(express.json());
//routes
app.use("/api/v1/categories", categoryRouter);

const PORT = process.env.PORT || 8000;

connectDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`app running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
