const liveHost = "https://test.com";
const localHost = "http://localhost:5001/mealstogo-ec645/us-central1";

export const isDevelopment = process.env.NODE_ENV === "development";
export const host = isDevelopment ? localHost : liveHost;
