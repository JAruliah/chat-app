import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { User } from "./interfaces";
const PORT = 5001
const server = createServer();

let users :User[] = []

// Initialize socket.io
const io = new Server(server, {cors: {origin: "*"}});

// on connection
io.on("connection", (socket: Socket) => {
  try {

    io.emit('send-all-users',users )
    // Join users to room, then emit to the room all the active users
    socket.on('join-room', (userData) => {
      socket.join(userData.room)
      users.push({userName:userData.userName, room:userData.room, id:socket.id})
      io.emit('send-all-users',users )
      const roomUsers:User[]= users.filter(user => user.room === userData.room)
      io.in(userData.room).emit('send-users',roomUsers )
      io.in(userData.room).emit('user-join',{userName:userData.userName} )
    })

    //on send message emit message data to room with room id
    socket.on("send-message", (messageData) =>{
      socket.to(messageData.room).emit('receive-message', messageData)
    })

    // on disconnect send disconnected user to the client 
    socket.on('disconnect', ()=>{
      const disconnectedUser :User[] = users.filter(user => user.id === socket.id)
      const remainingUsers :User[]= users.filter(user => user.id !== socket.id)
      users = remainingUsers
      if (disconnectedUser[0] === undefined){
      }
      else{
        socket.to(disconnectedUser[0]['room']).emit('user-left',disconnectedUser)
      }
  })
    
  } catch (err) {
    console.log(err)
  }
  
  

});

// server is listening
server.listen(PORT, () => {console.log(`Listening on port ${PORT}`)});