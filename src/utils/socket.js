import { io } from "socket.io-client";

const socket = io(BASE_URL, {
  transports: ["websocket", "polling"],
  withCredentials: true,
});

export default socket;
