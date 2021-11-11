import React, {useState, useEffect} from 'react'
import {Message} from '../interfaces'
import { ChatMessage } from './ChatMessage'

// Interface for props
export interface ChatProps {
    userName: string,
    room: string,
    socket:any,
    roomUsers:{
        userName:string,
        room:string
    }[]
}

export const Chat: React.FC<ChatProps> = ({userName, room, socket, roomUsers}) => {
    const [currentMessage, setCurrentMessage] = useState<string>("")
    const [messageList, setMessageList] = useState<Message[]>([]) 

    // on sending a message emit the message data to the server and add message to message list
    const sendMessage = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (currentMessage !== ""){
            const messageData : Message= {
                room:room,
                author: userName,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + 11 % 12 + 1 + ":" + new Date(Date.now()).getMinutes() + (new Date(Date.now()).getHours() >= 12 ? "pm":"am")
            }
            await socket.emit("send-message", messageData)
            setMessageList([...messageList, messageData])
        }
    }
    // Whenever a recieve message event add the message data to the message list
    useEffect(() => {
        socket.on("receive-message", (messageData:Message) :void =>{
        setMessageList([...messageList, messageData])
        })
    }, [socket, messageList])

        return (
            <div>
                <form onSubmit={sendMessage}>
                    <div className="chat-header">
                        <p>Live Chat</p>
                    </div>
                    <div className="chat-body">
                        {messageList.map((message, index) => { return <ChatMessage key={index} messageData={message}/> })}
                    </div>
                    <div className="chat-footer">
                        <label>Type here
                        <input type="text" onChange={(e) => {setCurrentMessage(e.target.value)}}/>
                        </label>
                        <button>Send</button>
                    </div>
                </form>
                <div>
                    {roomUsers.map(item=>{return <p>{item.userName}</p>})}
                </div>
            </div>
        );
}