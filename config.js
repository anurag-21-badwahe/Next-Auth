const BASE_URL_PROD = "https://being-dev.onrender.com/";
const BASE_URL_DEV = "http://localhost:3000";

export const BASE_URL =
  process.env.DOMAIN === "development" ? BASE_URL_PROD : BASE_URL_DEV;
