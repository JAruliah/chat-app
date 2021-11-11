import React from 'react'
import {Message} from '../interfaces'

interface ChatMessageProps {
    messageData: Message
}

export const ChatMessage: React.FC<ChatMessageProps> = ({messageData}) => {
        return (
            <div className="message">
                    <div className="message-content">
                        <p>{messageData.message}</p>
                    </div>
                    <div className="message-meta">
                        <p>{messageData.author}</p>
                        <p>{messageData.time}</p>
                    </div>
                    </div>
        );
}