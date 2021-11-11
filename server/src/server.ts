import { createServer } from "http";
import { Server, Socket } from "socket.io";
const PORT = 5001
const server = createServer();

// Initialize socket.io
const io = new Server(server, {cors: {origin: "*"}});

// on connection
io.on("connection", (socket: Socket) => {
  console.log('client connected')
});

// server is listening
server.listen(PORT, () => {console.log(`Listening on port ${PORT}`)});