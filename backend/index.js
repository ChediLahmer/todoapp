const { Sequelize, DataTypes } = require("sequelize");
const express = require("express");
const cors = require("cors");

const app = express();
const port = 3001;

const sequelize = new Sequelize("tododb", "root", "20638109", {
  host: "localhost",
  dialect: "mysql",
});

const Task = sequelize.define(
  "Task",
  {
    taskID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    task: {
      type: DataTypes.STRING,
    },
    priority: {
      type: DataTypes.STRING,
    },
    progress: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "tasks",
  }
);

Task.sync({ alter: false })
  .then(() => {
    console.log("Table created successfully");
  })
  .catch((error) => {
    console.error("Error creating table: ", error);
  });

sequelize.sync();

app.use(cors());
app.use(express.json());

app.post("/tasks", async (req, res) => {
  try {
    const task = await Task.create(req.body);
    const tasks = await Task.findAll({
      attributes: ["taskID", "task", "progress", "priority"],
    });
    res.status(201).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(400).json({
      error:
        "Invalid request. Make sure to provide task, priority, and progress in the request body.",
    });
  }
});

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.findAll({
      attributes: ["taskID", "task", "progress", "priority"],
    });
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/tasks/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    await Task.update(
      { task: req.body.task, priority: req.body.priority },
      { where: { taskID: taskId } }
    );
    const tasks = await Task.findAll({
      attributes: ["taskID", "task", "progress", "priority"],
    });
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/tasks/:id/progress", async (req, res) => {
  try {
    const taskId = req.params.id;
    await Task.update(
      { progress: req.body.progress },
      { where: { taskID: taskId } }
    );
    const tasks = await Task.findAll({
      attributes: ["taskID", "task", "progress", "priority"],
    });
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    await Task.destroy({ where: { taskID: taskId } });
    const tasks = await Task.findAll({
      attributes: ["taskID", "task", "progress", "priority"],
    });
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
