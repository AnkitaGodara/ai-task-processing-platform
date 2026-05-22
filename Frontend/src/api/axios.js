import axios from "axios";

const API = axios.create({
  baseURL: "ai-task-processing-platform-production.up.railway.app/api",
});

export default API;