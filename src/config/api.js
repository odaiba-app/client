import axios from "axios";

// server rails
export const serverOneAPI = axios.create({
  baseURL: "http://localhost:3000",
});

// server node
// export const socket_url = `https://socket-odaiba.herokuapp.com`;
export const serverTwoAPI = axios.create({
  // baseURL: "http://localhost:3001",
  baseURL: `https://socket-odaiba.herokuapp.com`,
});

// export const socketUrl = "http://localhost:3001";
export const socketUrl = `https://socket-odaiba.herokuapp.com`;
