import React, {useState } from 'react';
import io from 'socket.io-client'
import { Chat } from './components/Chat';
import { JoinRoom } from './components/JoinRoom';

// connect socket.io client to backend
const socket = io('http://localhost:5001')

const App = () => {
  const [userName, setUserName] = useState<string>("")
  const [room, setRoom] = useState<string>("")
  const [logged, setLogged] = useState<boolean>(false)

  // If the user has chosen a username and a room, display the chat 
  return (
    <div>
      {logged ? <Chat userName={userName} room={room} socket={socket} />:<JoinRoom userName={userName} setUserName={setUserName} room={room} setRoom={setRoom} socket={socket} logged={logged} setLogged={setLogged}/>}

    </div>
  );
}

export default App;
