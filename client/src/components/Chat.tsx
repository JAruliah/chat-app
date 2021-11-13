import React, {useState} from 'react'
import {Message} from '../interfaces'
import { ChatMessage } from './ChatMessage'
import { User } from './User'

// Interface for props
export interface ChatProps {
    userName: string,
    room: string,
    socket:any,
    setRoomUsers:React.Dispatch<React.SetStateAction<{
        userName: string;
        room: string;
        id: string;
    }[]>>
    roomUsers:{
        userName:string,
        room:string,
        id:string
    }[]
}

export const Chat: React.FC<ChatProps> = ({userName, room, socket, roomUsers, setRoomUsers}) => {
    const [currentMessage, setCurrentMessage] = useState<string>("")
    const [messageList, setMessageList] = useState<Message[]>([]) 

    // when sending a message emit the message data to the server and add message to message list
    const sendMessage = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let time = new Date(Date.now()).getHours() % 12 + ":" + new Date(Date.now()).getMinutes() 
        if (parseInt(time) > 12){
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

    // When a user disconnects recieve the user's info and update the room list
    socket.on('user-left', (disconnectedUser:any) =>{
        const newUserList = roomUsers.filter(user => user.id !== disconnectedUser[0].id)
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
                    {roomUsers.map((item, index)=>{return <User key={index} userName={item.userName}/>})}
                </div>
                <div className="leave">
                    <button type="button" onClick={(e) => {window.location.reload()}}>Leave</button>
                </div>
            </div>
        );
}