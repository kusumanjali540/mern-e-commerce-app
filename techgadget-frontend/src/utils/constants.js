const isLocalhost = window.location.hostname === "localhost";

export const ROOT_SERVER_URL = isLocalhost
  ? "http://localhost:8080"
  : "https://mern-e-commerce-app-api.vercel.app";

export const STORE_EMAIL = "khaqt268@gmail.com"