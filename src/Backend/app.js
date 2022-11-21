const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const tagsRouter = require("./routers/tagsRouter");
const usersRouter = require("./routers/usersRouter");
////////////////////////////////////////////////////////////////////////

const app = express();

// middlewares
app.use(express.json()); // parses request body
app.use(cors());
if (process.env.NODE_ENV == "development") app.use(morgan("dev")); // http requests logger

// routers
app.use("/api/tags", tagsRouter);
app.use("/api/users", usersRouter);

module.exports = app;
