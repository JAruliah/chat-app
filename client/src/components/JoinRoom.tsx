import React from 'react'

// interface for props
interface JoinRoomProps {
   userName:string,
   setUserName: React.Dispatch<React.SetStateAction<string>> ,
   room: string,
   setRoom:  React.Dispatch<React.SetStateAction<string>>,
   socket: any,
   logged:boolean,
   setLogged:React.Dispatch<React.SetStateAction<boolean>>
}

export const JoinRoom: React.FC<JoinRoomProps> = ({userName, setUserName, room, setRoom, socket, logged, setLogged}) => {
  // Join a room if username and room is entered
    const joinRoom = (e:React.FormEvent<HTMLFormElement>) :void => {
      e.preventDefault()
        if (userName !== "" && room !== ""){
           socket.emit('join-room', {room:room, userName:userName})
           setLogged(true)
        }
      }
        return (
            <div>
              <form onSubmit={joinRoom}>
                <h3>Join Chat</h3>
                <label>Name:
                <input type="text" onChange={(e) => {setUserName(e.target.value)}}></input>
                </label>
        
                <label>Room Name:
                <input type="text" onChange={(e) => {setRoom(e.target.value)}}></input>
                </label>
        
                <button>Join A Room</button>
            </form>
          </div>
        );
}