import axios from "axios";

const api = axios.create({
  baseURL: "https://tripzz-planner.vercel.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
