import React, {useEffect, useState} from 'react'

// interface for props
interface JoinRoomProps {
   userName:string,
   setUserName: React.Dispatch<React.SetStateAction<string>> ,
   room: string,
   setRoom:  React.Dispatch<React.SetStateAction<string>>,
   socket: any,
   logged:boolean,
   setLogged:React.Dispatch<React.SetStateAction<boolean>>,
   roomUsers:{
    userName: string;
    room: string;
    id: string;
}[]
}

export const JoinRoom: React.FC<JoinRoomProps> = ({userName, setUserName, room, setRoom, socket, logged, setLogged, roomUsers}) => {
  const [room1UserCount, setRoom1UserCount] = useState<number>(0)
  const [room2UserCount, setRoom2UserCount] = useState<number>(0)
  const [room3UserCount, setRoom3UserCount] = useState<number>(0)
  // Join a room if username and room is entered
    const joinRoom = (e:any) :void => {
        if (userName !== "" && room !== ""){
           socket.emit('join-room', {room:room, userName:userName})
           setLogged(true)
        }
      }

      useEffect(() => {
        socket.on('connect', () =>{

          socket.on('send-all-users', (users:{userName:string,room:string,id:string}[]) => {
              const room1UserList = users.filter(user => user.room === 'room-1')
              setRoom1UserCount(room1UserList.length)
              const room2UserList = users.filter(user => user.room === 'room-2')
              setRoom2UserCount(room2UserList.length)
              const room3UserList = users.filter(user => user.room === 'room-3')
              setRoom3UserCount(room3UserList.length)
          })
     
        })
      },[socket])

        return (
            <div>
              <form onSubmit={(e) => joinRoom(e)}>
                <h3>Join Chat</h3>
                <label>Name:
                <input type="text" onChange={(e) => {setUserName(e.target.value)}} required></input>
                </label>
                <div className="rooms">
                  <div className="room-1">
                    <h3>Room 1</h3>
                      <p>{room1UserCount}</p>
                    <button type="submit" onClick={(e) => {setRoom('room-1')}}>Join Room</button>
                  </div>

                  <div className="room-2">
                    <h3>Room 2</h3>
                    <p>{room2UserCount}</p>
                    <button type="submit" onClick={(e) => {setRoom('room-2')}}>Join Room</button>
                  </div>

                  <div className="room-3">
                    <h3>Room 3</h3>
                    <p>{room3UserCount}</p>
                    <button type="submit" onClick={(e) => {setRoom('room-3')}}>Join Room</button>
                  </div>

                </div>
                </form>

          </div>
        );
}