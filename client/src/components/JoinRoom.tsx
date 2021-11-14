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
            const room1UserList = users.filter(user => user.room === 'room 1')
            setRoom1UserCount(room1UserList.length)
            const room2UserList = users.filter(user => user.room === 'room 2')
            setRoom2UserCount(room2UserList.length)
            const room3UserList = users.filter(user => user.room === 'room 3')
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
            <div className="join-room">
              <h1 className="text-center text-3xl">Chatamus</h1>
                <div className="username text-center">
                  <label>Username:</label>
                  <input type="text" onChange={(e) => {setUserName(e.target.value)}} required></input>
                  <p>{joinMessage}</p>
                </div>
                <div className="rooms">
                  <div className="room-1">
                    <h3>Room 1</h3>
                    <div className="active-users">
                    <svg height="24" version="1.1" width="24" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 -1028.4)"><path d="m8.4062 1041.1c-2.8856 1.3-4.9781 4-5.3437 7.3 0 1.1 0.8329 2 1.9375 2h14c1.105 0 1.938-0.9 1.938-2-0.366-3.3-2.459-6-5.344-7.3-0.649 1.3-2.011 2.3-3.594 2.3s-2.9453-1-3.5938-2.3z" fill="#2c3e50"/><path d="m17 4a5 5 0 1 1 -10 0 5 5 0 1 1 10 0z" fill="#34495e" transform="translate(0 1031.4)"/><path d="m12 11c-1.277 0-2.4943 0.269-3.5938 0.75-2.8856 1.262-4.9781 3.997-5.3437 7.25 0 1.105 0.8329 2 1.9375 2h14c1.105 0 1.938-0.895 1.938-2-0.366-3.253-2.459-5.988-5.344-7.25-1.1-0.481-2.317-0.75-3.594-0.75z" fill="#34495e" transform="translate(0 1028.4)"/></g></svg>
                      <p>{room1UserCount}</p>
                    </div>
                    <button type="button" onClick={() => {joinRoom('room 1')}}>Join</button>
                  </div>

                  <div className="room-2">
                    <h3>Room 2</h3>
                    <div className="active-users">
                    <svg height="24" version="1.1" width="24" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 -1028.4)"><path d="m8.4062 1041.1c-2.8856 1.3-4.9781 4-5.3437 7.3 0 1.1 0.8329 2 1.9375 2h14c1.105 0 1.938-0.9 1.938-2-0.366-3.3-2.459-6-5.344-7.3-0.649 1.3-2.011 2.3-3.594 2.3s-2.9453-1-3.5938-2.3z" fill="#2c3e50"/><path d="m17 4a5 5 0 1 1 -10 0 5 5 0 1 1 10 0z" fill="#34495e" transform="translate(0 1031.4)"/><path d="m12 11c-1.277 0-2.4943 0.269-3.5938 0.75-2.8856 1.262-4.9781 3.997-5.3437 7.25 0 1.105 0.8329 2 1.9375 2h14c1.105 0 1.938-0.895 1.938-2-0.366-3.253-2.459-5.988-5.344-7.25-1.1-0.481-2.317-0.75-3.594-0.75z" fill="#34495e" transform="translate(0 1028.4)"/></g></svg>
                      <p>{room2UserCount}</p>
                    </div>
                    <button type="button" onClick={() => {joinRoom('room 2')}}>Join</button>
                  </div>

                  <div className="room-3">
                    <h3>Room 3</h3>
                    <div className="active-users">
                    <svg height="24" version="1.1" width="24" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 -1028.4)"><path d="m8.4062 1041.1c-2.8856 1.3-4.9781 4-5.3437 7.3 0 1.1 0.8329 2 1.9375 2h14c1.105 0 1.938-0.9 1.938-2-0.366-3.3-2.459-6-5.344-7.3-0.649 1.3-2.011 2.3-3.594 2.3s-2.9453-1-3.5938-2.3z" fill="#2c3e50"/><path d="m17 4a5 5 0 1 1 -10 0 5 5 0 1 1 10 0z" fill="#34495e" transform="translate(0 1031.4)"/><path d="m12 11c-1.277 0-2.4943 0.269-3.5938 0.75-2.8856 1.262-4.9781 3.997-5.3437 7.25 0 1.105 0.8329 2 1.9375 2h14c1.105 0 1.938-0.895 1.938-2-0.366-3.253-2.459-5.988-5.344-7.25-1.1-0.481-2.317-0.75-3.594-0.75z" fill="#34495e" transform="translate(0 1028.4)"/></g></svg>
                      <p>{room3UserCount}</p>
                    </div>
                    <button type="button" onClick={() => {joinRoom('room 3')}}>Join</button>
                  </div>

                </div>
          </div>
        );
}