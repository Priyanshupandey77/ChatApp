import { io } from "socket.io-client";

const socket = io("https://chatapp-qjno.onrender.com", {
  transports: ["polling", "websocket"],
  withCredentials: true,
});

export default socket;
