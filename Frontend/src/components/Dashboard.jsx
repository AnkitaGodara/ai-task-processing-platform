import { useEffect, useState } from "react";

import API from "../api/axios";

function Dashboard() {
  const [tasks, setTasks] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    inputText: "",
    operation: "uppercase",
  });

  const fetchTasks = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const res = await API.get("/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();

    const interval = setInterval(() => {
      fetchTasks();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token =
        localStorage.getItem("token");

      await API.post("/tasks", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Task Created");

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-purple-600">
        Dashboard
      </h2>

      <form
        onSubmit={handleSubmit}
        className="mb-8"
      >
        <input
          className="w-full border p-3 rounded mb-4"
          type="text"
          name="title"
          placeholder="Task Title"
          onChange={handleChange}
        />

        <textarea
          className="w-full border p-3 rounded mb-4"
          name="inputText"
          placeholder="Enter text"
          onChange={handleChange}
        />

        <select
          className="w-full border p-3 rounded mb-4"
          name="operation"
          onChange={handleChange}
        >
          <option value="uppercase">
            Uppercase
          </option>

          <option value="lowercase">
            Lowercase
          </option>

          <option value="reverse">
            Reverse
          </option>

          <option value="wordcount">
            Word Count
          </option>
        </select>

        <button
          className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded"
          type="submit"
        >
          Create Task
        </button>
      </form>

      <h2 className="text-2xl font-bold mb-4">
        Tasks
      </h2>

      <div className="grid gap-4">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="border rounded-xl p-5 bg-gray-50"
          >
            <h3 className="text-xl font-bold mb-2">
              {task.title}
            </h3>

            <p>
              <b>Status:</b>{" "}
              <span
                className={
                  task.status === "success"
                    ? "text-green-600 font-bold"
                    : "text-yellow-600 font-bold"
                }
              >
                {task.status}
              </span>
            </p>

            <p>
              <b>Operation:</b>{" "}
              {task.operation}
            </p>

            <p>
              <b>Input:</b>{" "}
              {task.inputText}
            </p>

            <p>
              <b>Result:</b>{" "}
              {task.result || "Processing..."}
            </p>

            <p>
              <b>Logs:</b>{" "}
              {task.logs || "Waiting..."}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;