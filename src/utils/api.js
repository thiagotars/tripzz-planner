import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://tripzz-planner.vercel.app",
  headers: {
    "Content-Type": "application/json",
  },
});

// const api = axios.create({
//   baseURL: "https://tripzz-planner.vercel.app/",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

export default api;
