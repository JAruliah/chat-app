import { createServer } from "http";
import { Server, Socket } from "socket.io";
const PORT = 5001
const server = createServer();

// Initialize socket.io
const io = new Server(server, {cors: {origin: "*"}});

// on connection
io.on("connection", (socket: Socket) => {
  console.log(`Client connected with ID ${socket.id}`)

  // on join room receive the username and room id
  socket.on('join-room', (room) => {
    socket.join(room)
    console.log(`${socket.id} has joined room ${room}`)
  })

  //on send message emit message data to room with room id
  socket.on("send-message", (messageData) =>{
    socket.to(messageData.room).emit('receive-message', messageData)
  })

  // on disconnect display user id that disconnected
  socket.on('disconnect', ()=>{
    console.log('User disconnected: ', socket.id)
  })

});

// server is listening
server.listen(PORT, () => {console.log(`Listening on port ${PORT}`)});