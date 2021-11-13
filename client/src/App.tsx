import React, {useEffect, useState } from 'react';
import io from 'socket.io-client'
import { Chat } from './components/Chat';
import { JoinRoom } from './components/JoinRoom';
import { User } from './interfaces';

// connect socket.io client to backend
const socket = io(`${process.env.REACT_APP_BASE_URL}`)

const App = () => {
  const [userName, setUserName] = useState<string>("")
  const [room, setRoom] = useState<string>("")
  const [logged, setLogged] = useState<boolean>(false)
  const [roomUsers, setRoomUsers] = useState<User[]>([])
  const [allUsers, setAllUsers] = useState<User[]>([])

  // On user connection, get all connected users
  useEffect(() => {
      socket.on('send-users', (users: User[]) => {
        setRoomUsers(users)
      })
      socket.on('send-all-users', (users: User[]) => {
        setAllUsers(users)
      })
  },[])

  // If the user has chosen a username and a room, display the chat 
  return (
    <div className="container mx-auto">
      {logged ? <Chat roomUsers={roomUsers} userName={userName} room={room} socket={socket} setRoomUsers={setRoomUsers} />:<JoinRoom allUsers={allUsers} userName={userName} setUserName={setUserName} setRoom={setRoom} socket={socket} setLogged={setLogged}/>}

    </div>
  );
}

export default App;
