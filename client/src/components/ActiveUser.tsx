import React from 'react'

interface UserProps {
    userName:string
}

export const ActiveUser: React.FC<UserProps> = ({userName}) => {
        return (
            <div>
                <p>{userName}</p>
            </div>
        );
}