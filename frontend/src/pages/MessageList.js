import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MessageList = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        axios.get('/api/messages')
            .then(response => {
                setMessages(response.data);
            })
            .catch(error => {
                console.error('Error fetching messages:', error);
            });
    }, []);

    return (
        <div>
            <h1>Messages</h1>
            <ul>
                {messages.map(message => (
                    <li key={message.message_id}>
                        <p>{message.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MessageList;