const { Router } = require("express");
const getTask = require("../middleware/get-task");
const Task = require("../models/task");

const tasksRouter = Router();

tasksRouter.use((req, res, next) => {
  console.log("In tasks service...");
  next();
});

/**
 * Handle GET /
 */
tasksRouter.get("/", async (req, res) => {
  const tasks = await Task.findAll();

  res.json(tasks);
});

/**
 * Handle GET /:id
 */
tasksRouter.get("/:id", getTask, async (req, res) => {
  const { task } = req;

  if (task) {
    res.json(task);
  } else {
    res.sendStatus(404);
  }
});

/**
 * Handle POST /
 */
tasksRouter.post("/", async (req, res) => {
  const description = req.body.description;

  if (description) {
    const task = await Task.create({ description });

    if (task) {
      res.sendStatus(201);
    }
  } else {
    res.sendStatus(400);
  }
});

/**
 * Handle DELETE /:id
 */
tasksRouter.delete("/:id", getTask, async (req, res) => {
  const task = req.task;

  if (task) {
    await task.destroy();
  }

  res.sendStatus(200);
});

/**
 * Handle PUT /:id
 */
tasksRouter.put("/:id", getTask, async (req, res) => {
  const description = req.body.description;
  const task = req.task;

  if (task) {
    await task.update({ description });

    res.sendStatus(200);
  } else {
    const id = Number(req.params.id);

    Task.create({ id, description });

    res.sendStatus(200);
  }
});

/**
 * Handle PATCH /:id
 */
tasksRouter.patch("/:id", async (req, res) => {
  const description = req.body.description;
  const task = req.task;

  if (task) {
    await task.update({ description });

    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

module.exports = tasksRouter;
