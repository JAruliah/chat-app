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
    const joinRoom = (e:any) :void => {
        if (userName !== "" && room !== ""){
           socket.emit('join-room', {room:room, userName:userName})
           setLogged(true)
        }
      }
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
                    <p></p>
                    <button type="submit" onClick={(e) => {setRoom('room-1')}}>Join Room</button>
                  </div>

                  <div className="room-2">
                    <h3>Room 2</h3>
                    <p></p>
                    <button type="submit" onClick={(e) => {setRoom('room-2')}}>Join Room</button>
                  </div>

                  <div className="room-3">
                    <h3>Room 3</h3>
                    <p></p>
                    <button type="submit" onClick={(e) => {setRoom('room-3')}}>Join Room</button>
                  </div>

                </div>
                {/* <label>Room 
                <input type="text" onChange={(e) => {setRoom(e.target.value)}}></input>
                </label>
        
                <button>Join A Room</button> */}
                </form>

          </div>
        );
}