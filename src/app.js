require("dotenv").config();

const express = require("express");
const app = express();
const { Sequelize } = require('sequelize');

const PORT = process.env.PORT || 3000;
const env = process.env.NODE_ENV || "development";
const sequelizeConfig = require("./config/sequelize")[env];

const router = require("./router");

const {
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ConflictError,
  CaptchaError,
} = require("./utils/custom-errors");


require("./middleware-wrapper");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

const sequelize = new Sequelize(sequelizeConfig);

app.use((err, req, res, next) => {
  if (err instanceof ValidationError || err instanceof CaptchaError) {
    res.status(400).json({ error: err.message, code: err.code });
  } else if (err instanceof AuthorizationError) {
    res.status(401).json({ error: err.message, code: err.code });
  } else if (err instanceof AuthenticationError) {
    res.status(403).json({ error: err.message, code: err.code });
  } else if (err instanceof NotFoundError) {
    res.status(404).json({ error: err.message, code: err.code });
  } else if (err instanceof ConflictError) {
    res.status(409).json({ error: err.message, code: err.code });
  } else {
    console.error(err, "err");
    res.status(500).json({
      error: "Internal Server Error",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully");

    app.listen(PORT, (err) => {
      if (err) {
          return console.log('Something bad happened', err);
      }
      console.log(`Server is listening on ${PORT}`);
    });
  }).catch(e => {
    console.error("Unable to connect to the database, ", err);
  });