const express = require("express");
const tasksRouter = require("./routes/tasks");
const db = require("./db/sequelize");
const logger = require("./middleware/logger");

const app = express();

app.use(express.json());
app.use(logger)
app.use("/tasks", tasksRouter);

const HOST = process.env["HOST"] || "localhost";
const PORT = process.env["PORT"] || 5001;

app.listen(PORT, HOST, () => {
  db.sync();
  console.log(`app listening on http://${HOST}:${PORT}`);
});
