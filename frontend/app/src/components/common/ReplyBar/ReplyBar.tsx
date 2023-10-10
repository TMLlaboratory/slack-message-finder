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

interface ReplyBarProps {
    message: Message; 
    children: Message[];
};

const ReplyBar: FC<ReplyBarProps> = ({ message, children }) => {
    return (
        <div className="reply-bar">
            {message && (
                <div className="message">
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
                            <img src={message.image_url} alt={message.image_name || 'Image'} />
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
                </div>
            )}
            <div className="children">
            <p>{children.length} 件の返信</p>
                {children.map(child => (
                    <div key={child.id}>
                        {child.user_id && (
                        <>
                            <p>User:</p> {child.user_id} 
                            <br />
                        </>
                    )}
                        {child.text && child.url ? (
                            <>
                                <p>Text:</p> <a href={child.url}>{child.text}</a>  
                                <br />
                            </>
                        ) : (
                            <>
                                {child.text && (
                                    <>
                                        <p>Text:</p> {child.text}  
                                        <br />
                                    </>
                                )}
                                {child.url && (
                                    <>
                                        <p>URL:</p> <a href={child.url}>{child.url}</a>  
                                        <br />
                                    </>
                                )}
                            </>
                        )}
                        {child.image_url ? (
                            <>
                                <img src={child.image_url} alt={child.image_name || 'Image'} />
                                <br />
                            </>
                        ) : (
                            <>
                                {child.image_name && (
                                    <>
                                        <p>Image Name:</p> {child.image_name}  
                                        <br />
                                    </>
                                )}
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReplyBar;
