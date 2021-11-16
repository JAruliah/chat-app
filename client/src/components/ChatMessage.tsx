import React, {useState, useEffect} from 'react'
import {Message} from '../interfaces'

interface ChatMessageProps {
    messageData: Message
}

export const ChatMessage: React.FC<ChatMessageProps> = ({messageData}) => {
    const [backgroundColor, setBackgroundColor] = useState("")

    useEffect(()=>{
        if (messageData.author === "You"){
            setBackgroundColor("#e1ffdb")
        }
    },[messageData])
        return (
            <div className="message" style={{backgroundColor: backgroundColor}}>
                {messageData.message === "connected" || messageData.message === "disconnected" ? (
                <div>
                <div className="status-message">
                    <p>{messageData.author} {messageData.message} {messageData.time}</p>
                </div>
                </div>)
                : ( 
                    <div>
                        <div className="message-content">
                        <p>{messageData.message}</p>
                    </div>
                    <div className="message-meta">
                        <p className="message-author">{messageData.author}</p>
                        <p className="message-time">{messageData.time}</p>
                    </div>
                    </div>
                )}
            </div>
        );
}