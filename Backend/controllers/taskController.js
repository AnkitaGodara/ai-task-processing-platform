const Task = require("../models/task");
const taskQueue = require("../config/taskQueue");

exports.createTask = async (req, res) => {
  try {
    const { title, inputText, operation } = req.body;

    // Save task in MongoDB
    const task = await Task.create({
      user: req.user.id,
      title,
      inputText,
      operation,
      status: "pending",
    });

    // Add task to Redis queue
    await taskQueue.add("processTask", {
      taskId: task._id.toString(),
      inputText,
      operation,
    });

    res.status(201).json({
      message: "Task added to queue",
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.user.id,
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};