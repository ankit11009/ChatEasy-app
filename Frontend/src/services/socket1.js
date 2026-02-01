// src/services/socket1.js
import { io } from "socket.io-client";

let socket = null;
let listenersAttached = false;

export const connectSocket = (token, onOnlineUsers) => {
  if (socket) return socket;

  socket = io(import.meta.env.VITE_SOCKET_URL, {
    auth: { token },
    withCredentials: true,
    transports: ["websocket"], // IMPORTANT
  });

  if (!listenersAttached && onOnlineUsers) {
    socket.on("getOnlineUsers", onOnlineUsers);
    listenersAttached = true;
  }

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    listenersAttached = false;
  }
};

export const getSocket = () => socket;
