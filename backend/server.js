const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
}

// const uri = process.env.ATLAS_URI;
mongoose.connect(
  process.env.ATLAS_URI ||
    "mongodb://user:kNqU7VV@F!QqY53@ds049945.mlab.com:49945/heroku_n7nbj9v5",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }
);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");

app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter);

// I did this when it wasn't working but I tried again to diagnose and it worked...
// app.use(app.router);
// exercisesRouter.initialize(app);
// usersRouter.initialize(app);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
