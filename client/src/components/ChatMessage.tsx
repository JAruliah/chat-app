import React from 'react'
import {Message} from '../interfaces'

interface ChatMessageProps {
    messageData: Message
}

export const ChatMessage: React.FC<ChatMessageProps> = ({messageData}) => {
        return (
            <div className="message">
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