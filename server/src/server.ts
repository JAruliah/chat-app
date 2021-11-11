import { createServer } from "http";
import { Server, Socket } from "socket.io";
const PORT = 5001
const server = createServer();

const users :{
  userName:string,
  room: string
}[] = []

// Initialize socket.io
const io = new Server(server, {cors: {origin: "*"}});

// on connection
io.on("connection", (socket: Socket) => {

  // Join users to room, then emit to the room all the active users
  socket.on('join-room', (userData) => {
    socket.join(userData.room)
    users.push({userName:userData.userName, room:userData.room})
    const roomUsers = users.filter(user => user.room === userData.room)
    io.in(userData.room).emit('send-users',roomUsers )
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