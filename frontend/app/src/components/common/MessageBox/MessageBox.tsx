import React, { FC } from 'react';

interface Message {
    id: number;
    user_id: string; 
    ts: string;
    thread_ts: string | null;
    text: string;
    image_name: string | null;
    image_url: string | null;
    url: string | null;
    channel_id: string;  
    created_at: string;
    updated_at: string;
    children: Message[]; 
};

interface MessageBoxProps {
    message: Message;
    onToggleChildren: (message: Message) => void;
}

const MessageBox: FC<MessageBoxProps> = ({ message, onToggleChildren }) => {
    return (
        <div key={message.id}>
            <div>
                {message.user_id && (
                    <>
                        <p>User:</p> {message.user_id} 
                        <br />
                    </>
                )}
                {message.text && message.url ? (
                    <>
                        <p>Text:</p> <a href={message.url}>{message.text}</a> 
                        <br />
                    </>
                ) : (
                    <>
                        {message.text && (
                            <>
                                <p>Text:</p> {message.text} 
                                <br />
                            </>
                        )}
                        {message.url && (
                            <>
                                <p>URL:</p> <a href={message.url}>{message.url}</a>  
                                <br />
                            </>
                        )}
                    </>
                )}
                {message.image_url ? (
                    <>
                        <img src={message.image_url} alt={message.image_name || 'image'} />
                        <br />
                    </>
                ) : (
                    <>
                        {message.image_name && (
                            <>
                                <p>Image Name:</p> {message.image_name} 
                                <br />
                            </>
                        )}
                    </>
                )}
                {message.children.length > 0 && (
                    <button onClick={() => onToggleChildren(message)}>{message.children.length} 件の返信</button>
                )}
            </div>
        </div>
    );
};

export default MessageBox;
