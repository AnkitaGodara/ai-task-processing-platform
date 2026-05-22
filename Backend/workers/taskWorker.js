const mongoose = require("mongoose");

require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected in Worker");
  })
  .catch((err) => {
    console.log(err);
  });

const { Worker } = require("bullmq");

const connection = require("../config/redis");

const Task = require("../models/Task");

const worker = new Worker(
  "taskQueue",

  async (job) => {
    const { taskId, inputText, operation } = job.data;

    console.log("Processing task:", taskId);

    // Find task
    const task = await Task.findById(taskId);

    if (!task) {
      throw new Error("Task not found");
    }

    // Update status
    task.status = "running";
    task.logs = "Task processing started";

    await task.save();

    let result = "";

    // Process operation
    switch (operation) {
      case "uppercase":
        result = inputText.toUpperCase();
        break;

      case "lowercase":
        result = inputText.toLowerCase();
        break;

      case "reverse":
        result = inputText.split("").reverse().join("");
        break;

      case "wordcount":
        result = inputText
          .trim()
          .split(/\s+/).length
          .toString();
        break;

      default:
        throw new Error("Invalid operation");
    }

    // Simulate delay
    await new Promise((resolve) =>
      setTimeout(resolve, 3000)
    );

    // Save result
    task.status = "success";
    task.result = result;
    task.logs = "Task completed successfully";

    await task.save();

    console.log("Task completed:", result);
  },

  {
    connection,
  }
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.log(`Job failed: ${err.message}`);
});