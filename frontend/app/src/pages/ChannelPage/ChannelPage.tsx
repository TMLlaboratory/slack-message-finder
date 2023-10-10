import React, { FC, useState, useEffect } from "react";
import SideBar from "@/components/common/SideBar";
import ReplyBar from "@/components/common/ReplyBar";
import MessageBox from "@/components/common/MessageBox";
import s from './ChannelPage.module.css';

interface Channel {
    id: number;
    channel_id: string; 
    name: string;
    creator: string;
    is_private: boolean;
    created_at: string;
    updated_at: string;
};

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

const ChannelPage: FC = () => {
    const [channels, setChannels] = useState<Channel[]>([]);
    const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null); 
    const [messages, setMessages] = useState<Message[]>([]);
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

    useEffect(() => {
        fetch('http://localhost:3000/api/v1/channels')
            .then(response => response.json())
            .then(data => setChannels(data));
    }, []);

    useEffect(() => {
        if (selectedChannel) {
            fetch(`http://localhost:3000/api/v1/messages?channel_id=${selectedChannel.channel_id}`) 
                .then(response => response.json())
                .then(data => setMessages(data));
        }
        setSelectedMessage(null);
    }, [selectedChannel]);

    const handleToggleChildren = (message: Message) => {
        setSelectedMessage(prevMessage => (
            prevMessage && prevMessage.id === message.id ? null : message
        ));
    };

    return (
        <>
            <div className={s.container}>

                <div className={s.sidebar}>
                    <SideBar setSelectedChannel={(channel: Channel) => {  
                        setSelectedChannel(channel);  
                    }} />
                </div>

                <div className={s.box}>
                    <div className={s.messagesBox} style={{ flex: selectedMessage ? 7 : 1 }}>
                        <p>{selectedChannel ? selectedChannel.name : ''}</p>  
                        {messages.map(message => (
                            <MessageBox key={message.id} message={message} onToggleChildren={handleToggleChildren} />
                        ))}
                    </div>

                    <div className={s.replyBar} style={{ flex: selectedMessage ? 3 : 0 }}>
                        {selectedMessage && <ReplyBar message={selectedMessage} children={selectedMessage.children} />}
                    </div>
                </div>

            </div>
        </>
    );
}

export default ChannelPage;
