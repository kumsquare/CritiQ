import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Update based on your backend URL
  headers: { "Content-Type": "application/json" },
});

export default API;
