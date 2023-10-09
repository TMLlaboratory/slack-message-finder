import React from 'react';

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
};

interface ReplyBarProps {
    message: Message | null;
    children: Message[];
};

const ReplyBar: React.FC<ReplyBarProps> = ({ message, children }) => {
    return (
        <div className="reply-bar">
            {message && (
                <div className="message">
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
                            <img src={message.image_url} alt={message.image_name || 'Image'} />
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
                </div>
            )}
            <div className="children">
            <p>{children.length} 件の返信</p>
                {children.map(child => (
                    <div key={child.id}>
                        {child.user && (
                        <>
                            <strong>User:</strong> {child.user}
                            <br />
                        </>
                    )}
                        {child.text && child.url ? (
                            <>
                                <strong>Text:</strong> <a href={child.url}>{child.text}</a>
                                <br />
                            </>
                        ) : (
                            <>
                                {child.text && (
                                    <>
                                        <strong>Text:</strong> {child.text}
                                        <br />
                                    </>
                                )}
                                {child.url && (
                                    <>
                                        <strong>URL:</strong> <a href={child.url}>{child.url}</a>
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
                                        <strong>Image Name:</strong> {child.image_name}
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
