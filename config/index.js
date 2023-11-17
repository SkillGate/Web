// const dev = process.env.NODE_ENV !== "production";
const dev = "dev" !== "production";

export const server = dev
  ? "http://localhost:3000"
  : "https://jobit-bri.vercel.app/";
