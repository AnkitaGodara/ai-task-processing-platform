const { Queue } = require("bullmq");

const connection = require("./redis");

const taskQueue = new Queue("taskQueue", {
  connection,
});

module.exports = taskQueue;