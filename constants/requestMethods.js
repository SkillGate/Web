import axios from "axios";

const AUTH_BASE_URL = "http://localhost:5000/api/v1";

export const publicRequest = axios.create({
  baseURL: AUTH_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "access-control-allow-origin": "*",
  },
});

