const express = require("express");
const app = express();

const tasks = [{ id: 1, description: "Learn REST" }];

app.use(express.json());

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.get("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  const task = tasks.find((task) => task.id === id);

  if (task) {
    res.json(task);
  } else {
    res.sendStatus(404);
  }
});

app.post("/tasks", (req, res) => {
  const description = req.body.description;

  if (description) {
    const task = { id: tasks.length, description };

    tasks.push(task);

    if (task) {
      res.sendStatus(201);
    }
  } else {
    res.sendStatus(400);
  }
});

app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = tasks.findIndex((task) => task.id === id);

  if (index > -1) {
    tasks.splice(index, 1);
  }

  res.sendStatus(200);
});

app.put("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const description = req.body.description;

  const index = tasks.findIndex((task) => task.id === id);

  if (index > -1) {
    tasks.splice(index, 1, { id, description });

    res.sendStatus(200);
  } else {
    tasks.push({ id, description });

    res.sendStatus(200);
  }
});

app.patch("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const description = req.body.description;

  const index = tasks.findIndex((task) => task.id === id);

  if (index > -1) {
    tasks[index].description = description;

    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

module.exports = app;
