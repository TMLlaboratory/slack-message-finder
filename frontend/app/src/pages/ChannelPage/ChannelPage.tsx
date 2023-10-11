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

interface ParentMessage {
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
}

interface ChildMessage {
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
}

interface ThreadMessage {
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
}

interface MessageGroup {
    parent: ParentMessage;
    children: ChildMessage[];
    thread: ThreadMessage[];
}

const ChannelPage: FC = () => {
    const [channels, setChannels] = useState<Channel[]>([]);
    const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null); 
    const [messageGroups, setMessageGroups] = useState<MessageGroup[]>([]);
    const [selectedMessageGroup, setSelectedMessageGroup] = useState<MessageGroup | null>(null);

    useEffect(() => {
        fetch('http://localhost:3000/api/v1/channels')
            .then(response => response.json())
            .then((data: Channel[]) => {  
                setChannels(data);
                const initialChannel = data.sort((a: Channel, b: Channel) => a.id - b.id)[0];  
                setSelectedChannel(initialChannel);
            });
    }, []);
    

    useEffect(() => {
        if (selectedChannel) {
            fetch(`http://localhost:3000/api/v1/channels/${selectedChannel.channel_id}/messages`) 
                .then(response => response.json())
                .then(data => setMessageGroups(data));
        }
        setSelectedMessageGroup(null);
    }, [selectedChannel]);

    const handleToggleChildren = (messageGroup: MessageGroup) => {
        setSelectedMessageGroup(prevMessageGroup => (
            prevMessageGroup && prevMessageGroup.parent.id === messageGroup.parent.id ? null : messageGroup
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

                <div className={s.allbox}>
                    <div className={s.messagesBox} style={{ flex: selectedMessageGroup ? 7 : 1 }}>
                        <div className={s.channeltitle} style={{ width: selectedMessageGroup ? '58%' : '100%' }} >
                            <p>{selectedChannel ? selectedChannel.name : ''}</p>
                        </div>
                        <div className={s.box}>
                            {messageGroups.map(messageGroup => (
                            <MessageBox 
                                key={messageGroup.parent.id} 
                                messageGroup={messageGroup} 
                                onReplyClick={() => handleToggleChildren(messageGroup)} 
                            />
                        ))}
                        </div>
                        
                    </div>

                    <div className={s.replyBar} style={{ flex: selectedMessageGroup ? 3 : 0 }}>
                        <div className={s.threadltitle}>
                            <p>スレッド</p>
                        </div>
                        <div className={s.box}>
                            <div className={s.replybox}>
                                {selectedMessageGroup && <ReplyBar messageGroup={selectedMessageGroup} />}
                            </div>
                            
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default ChannelPage;