import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import http from "http";
import { Server } from "socket.io";
import { initMessageSocket } from "./modules/message/message.socket.js";
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

initMessageSocket(io);

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});