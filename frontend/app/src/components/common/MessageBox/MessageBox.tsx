import React, { FC } from 'react';

interface Message {
    id: number;
    user: string;
    ts: string;
    thread_ts: string | null;
    text: string;
    image_name: string | null;
    image_url: string | null;
    url: string | null;
    channel: string;
    is_bot: boolean;
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
                {message.user && (
                    <>
                        <strong>User:</strong> {message.user}
                        <br />
                    </>
                )}
                {message.text && message.url ? (
                    <>
                        <strong>Text:</strong> <a href={message.url}>{message.text}</a>
                        <br />
                    </>
                ) : (
                    <>
                        {message.text && (
                            <>
                                <strong>Text:</strong> {message.text}
                                <br />
                            </>
                        )}
                        {message.url && (
                            <>
                                <strong>URL:</strong> <a href={message.url}>{message.url}</a>
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
                                <strong>Image Name:</strong> {message.image_name}
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