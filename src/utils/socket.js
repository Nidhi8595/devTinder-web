import { io } from "socket.io-client";

const socket = io("http://localhost:7777", {
  transports: ["websocket", "polling"],
  withCredentials: true,
});

export default socket;
