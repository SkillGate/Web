import axios from "axios";

const LOCAL_AUTH_BASE_URL = "http://localhost:5000/api/v1";
const PROD_AUTH_BASE_URL = "https://skillgate-auth-api.onrender.com/api/v1";

const LOCAL_JOB_BASE_URL = "http://localhost:5001/api/v1";
const PROD_JOB_BASE_URL = "https://skillgate-job-api.onrender.com/api/v1";

export const publicAuthRequest = axios.create({
  baseURL: PROD_AUTH_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "access-control-allow-origin": "*",
  },
});

export const publicJobRequest = axios.create({
  baseURL: PROD_JOB_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "access-control-allow-origin": "*",
  },
});
