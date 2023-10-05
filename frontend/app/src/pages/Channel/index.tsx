import SideBar from "@/components/common/SideBar";
import React, { FC, useState, useEffect } from "react";

interface Channel {
    id: number;
    channel: string;
    name: string;
    user_id: number;
    created_at: string;
    updated_at: string;
};

interface MessageElement {
    text: string;
    // 他のフィールドもここに追加できます
}

interface Message {
    user_id: number;
    ts: string;
    // 必要に応じて他のフィールドを追加
};

interface MessageWithElements {
    message: Message;
    elements: MessageElement[];
}

const ChannelPage: FC = () => {
    const [channels, setChannels] = useState<Channel[]>([]);
    const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
    const [messagesWithElements, setMessagesWithElements] = useState<MessageWithElements[]>([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/v1/channels')
            .then(response => response.json())
            .then(data => setChannels(data));
    }, []);

    useEffect(() => {
        if (selectedChannel) {
            fetch(`http://localhost:3000/api/v1/channels/${selectedChannel.id}/messages`)
                .then(response => response.json())
                .then(data => setMessagesWithElements(data));
        }
    }, [selectedChannel]);

    return (
        <div className="container" style={{ display: 'flex' }}>
            <div className="sidebar">
                <SideBar setSelectedChannel={(channelId: number) => {
                    const channel = channels.find(ch => ch.id === channelId);
                    setSelectedChannel(channel || null);
                }} />
            </div>
            
            <div className="messages" style={{ flex: 1, marginLeft: '20px' }}>
                {messagesWithElements.map((item, index) => (
                    <div key={index}>
                        <p>Message TS: {item.message.ts}</p>
                        {item.elements.map((element, idx) => (
                            <p key={idx}>Text: {element.text}</p>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ChannelPage;

