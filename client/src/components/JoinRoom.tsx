import React, {useEffect, useState} from 'react'
import { Socket } from 'socket.io-client'
import {User} from '../interfaces'

// interface for props
interface JoinRoomProps {
   userName:string,
   setUserName: React.Dispatch<React.SetStateAction<string>> ,
   setRoom:  React.Dispatch<React.SetStateAction<string>>,
   socket: Socket,
   setLogged:React.Dispatch<React.SetStateAction<boolean>>,
   allUsers: User[]
}

export const JoinRoom: React.FC<JoinRoomProps> = ({userName, setUserName, setRoom, socket, setLogged, allUsers}) => {
  const [room1UserCount, setRoom1UserCount] = useState<number>(0)
  const [room2UserCount, setRoom2UserCount] = useState<number>(0)
  const [room3UserCount, setRoom3UserCount] = useState<number>(0)
  const [joinMessage, setJoinMessage] = useState<string>("")

  //  Updates the chat room user count when a user leaves or connects
  useEffect(() : ()=> void => {
    let unMounted = false
        socket.on('send-all-users', (users:User[]) => {
          if(!unMounted){
            const room1UserList = users.filter(user => user.room === 'room-1')
            setRoom1UserCount(room1UserList.length)
            const room2UserList = users.filter(user => user.room === 'room-2')
            setRoom2UserCount(room2UserList.length)
            const room3UserList = users.filter(user => user.room === 'room-3')
            setRoom3UserCount(room3UserList.length)
          }
        })
    return () => unMounted = true
  },[socket])

  // Join a room if username and room is entered
    const joinRoom = (room:string) :void => {
        if (userName !== "" && room !== ""){
          const userSearch = allUsers.filter(user => user.userName === userName)
          if(userSearch.length === 0){
            setRoom(room)
            socket.emit('join-room', {room:room, userName:userName})
            setLogged(true)
          }
          else{
            setJoinMessage("This username is taken")
          }
        }
        else{
          setJoinMessage("Please enter a username")
        }
      }
        return (
            <div>
              <h3>Join Chat</h3>
                <label>Name:
                <input type="text" onChange={(e) => {setUserName(e.target.value)}} required></input>
                </label>
                <p>{joinMessage}</p>
                <div className="rooms">
                  <div className="room-1">
                    <h3>Room 1</h3>
                      <p>{room1UserCount}</p>
                    <button type="button" onClick={() => {joinRoom('room 1')}}>Join Room</button>
                  </div>

                  <div className="room-2">
                    <h3>Room 2</h3>
                    <p>{room2UserCount}</p>
                    <button type="button" onClick={() => {joinRoom('room 2')}}>Join Room</button>
                  </div>

                  <div className="room-3">
                    <h3>Room 3</h3>
                    <p>{room3UserCount}</p>
                    <button type="button" onClick={() => {joinRoom('room 3')}}>Join Room</button>
                  </div>

                </div>
          </div>
        );
}