// const dev = process.env.NODE_ENV !== "production";
const dev = "dev" !== "production";

export const authServer = "http://localhost:5000";

export const server = dev
  ? "http://localhost:3000"
  : "https://jobit-bri.vercel.app/";

const serverUrls = new Map([
  ["dev", "http://localhost:3000"],
  ["auth", "http://localhost:5000"],
  ["job", "http://localhost:5001"],
]);
