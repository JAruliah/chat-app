import React, {useState} from 'react'
import {Message} from '../interfaces'
import { ChatMessage } from './ChatMessage'
import { ActiveUser } from './ActiveUser'
import {User} from '../interfaces'
import { Socket } from 'socket.io-client'

// Interface for props
export interface ChatProps {
    userName: string,
    room: string,
    socket:Socket,
    setRoomUsers:React.Dispatch<React.SetStateAction<User[]>>
    roomUsers:User[]
}

export const Chat: React.FC<ChatProps> = ({userName, room, socket, roomUsers, setRoomUsers}) => {
    const [currentMessage, setCurrentMessage] = useState<string>("")
    const [messageList, setMessageList] = useState<Message[]>([]) 

    // when sending a message emit the message data to the server and add message to message list
    const sendMessage = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let time = new Date(Date.now()).getHours() % 12 + ":" + new Date(Date.now()).getMinutes() 
        if (parseInt(time) < 12){
            time += "am"
        }else{
            time += "pm"
        }
        if (currentMessage !== ""){
            const messageData : Message= {
                room:room,
                author: userName,
                message: currentMessage,
                time: time
            }
            await socket.emit("send-message", messageData)
            // Set the author to 'You' when the author is the user 
            if (messageData.author === userName){
                messageData.author = "You"
            }
            setMessageList([...messageList, messageData])
            setCurrentMessage("")
        }
    }
    // when recieve-message event add the message data to the message list
    socket.on("receive-message", (messageData:Message) :void =>{
        setMessageList([...messageList, messageData])
        })

    // when a user joins the chat room, display conencted message to the room
    socket.on('user-join', (joinedUser:{userName:string}) =>{
        let time = new Date(Date.now()).getHours() % 12 + ":" + new Date(Date.now()).getMinutes() 
        if (parseInt(time) > 12){
            time += "am"
        }else{
            time += "pm"
        }
        const messageData : Message= {
            author: joinedUser.userName,
            message: "connected",
            time: time
        }
        // set use to 'You' if the username is equal to the user's username
        if (messageData.author === userName){
            messageData.author = "You"
        }
        setMessageList([...messageList, messageData])
    })

    // When a user disconnects recieve the user's info and update the room list
    socket.on('user-left', (disconnectedUser:User[]) =>{
        const newUserList = roomUsers.filter(user => user.id !== disconnectedUser[0].id)
        let time = new Date(Date.now()).getHours() % 12 + ":" + new Date(Date.now()).getMinutes() 
        if (parseInt(time) > 12){
            time += "am"
        }else{
            time += "pm"
        }
        const messageData : Message = {author:disconnectedUser[0].userName,message:"disconnected", time:time}
        setMessageList([...messageList, messageData ])
        setRoomUsers(newUserList)
    })

        return (
            <div>
                <form onSubmit={sendMessage}>
                    <div className="chat-header">
                        <h2>Hello {userName}</h2>
                        <h3>Room: {room}</h3>
                        <h4>Live Chat</h4>
                    </div>
                    <div className="chat-body">
                        {messageList.map((message, index) => { return <ChatMessage key={index} messageData={message}/> })}
                    </div>
                    <div className="chat-footer">
                        <label>Type here
                        <input type="text" value={currentMessage} onChange={(e) => {setCurrentMessage(e.target.value)}}/>
                        </label>
                        <button>Send</button>
                    </div>
                </form>
                <div className="active-users">
                    <h3>Active Users</h3>
                    {roomUsers.map((item, index)=>{return <ActiveUser key={index} userName={item.userName}/>})}
                </div>
                <div className="leave">
                    <button type="button" onClick={(e) => {window.location.reload()}}>Leave</button>
                </div>
            </div>
        );
}