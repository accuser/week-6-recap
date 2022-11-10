const Task = require("../models/task");

const getTask = async (req, res, next) => {
  const pk = Number(req.params.id);

  if (Number.isInteger(pk)) {
    const task = await Task.findByPk(pk);

    if (task) {
      console.log("Got the task");
      req.task = task;
    }
  }

  next();
};

module.exports = getTask;
