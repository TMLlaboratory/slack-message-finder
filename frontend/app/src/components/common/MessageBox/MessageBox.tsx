import React, { FC, useState, useEffect } from 'react';
import s from '@/components/common/MessageBox/MessageBox.module.css'


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

interface MessageBoxProps {
    messageGroup: MessageGroup;
    onReplyClick: (messageGroup: MessageGroup) => void;
}

interface User {
    display_name: string;
    image: string;
}

interface UserMap {
    [key: string]: User; 
}

const MessageBox: FC<MessageBoxProps> = ({ messageGroup, onReplyClick }) => {
    const { parent, children, thread } = messageGroup;
    const SLACK_ENTERPRISE_TOKEN =process.env.NEXT_PUBLIC_SLACK_ENTERPRISE_TOKEN;
    
    const [userMap, setUserMap] = useState<UserMap>({}); 

    useEffect(() => {
        const userIds = [parent.user_id, ...children.map(child => child.user_id)];
        const uniqueUserIds = Array.from(new Set(userIds));
        Promise.all(uniqueUserIds.map(userId => 
            fetch(`http://localhost:3000/api/v1/users/${userId}`)
                .then(response => response.json())
                .then(data => ({ userId, data }))
        ))
        .then(results => {
            const newUserMap: UserMap = {};  
            results.forEach(result => {
                newUserMap[result.userId] = result.data;
            });
            setUserMap(newUserMap);
        });
    }, [parent.user_id, children]);

    const formatDateTime = (isoString: string) => {
        const dateObj = new Date(isoString);
        const formattedDate = dateObj.toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' });
        const formattedTime = dateObj.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit', hour12: false });
        return `${formattedDate} - ${formattedTime}`;
    };

    const renderContent = (text: string | null, url: string | null, imageUrl: string | null) => {
        if (text && url && imageUrl){
            return <><p className={s.p}><a href={url} target="_blank" rel="noopener noreferrer">{text}</a></p><p className={s.p}><img src={imageUrl + '?t=' +SLACK_ENTERPRISE_TOKEN} alt="Image"/></p></>;
        }
        if (text && url) {
            return <p className={s.p}><a href={url} target="_blank" rel="noopener noreferrer">{text}</a></p>;
        }
        if (text && imageUrl){
            return <><p className={s.p}>{text}</p><p className={s.p}><img src={imageUrl +'?t=' +SLACK_ENTERPRISE_TOKEN} alt="Image"/></p></>;
        }
        if (url && imageUrl){
            return <><p className={s.p}><a href={url} target="_blank" rel="noopener noreferrer">{url}</a></p><p className={s.p}><img src={imageUrl + '?t=' +SLACK_ENTERPRISE_TOKEN} alt="Image"/></p></>;
        }
        if (text) {
            return <p className={s.p}>{text}</p>;
        }
        if (url) {
            return <p className={s.p}><a href={url} target="_blank" rel="noopener noreferrer">{url}</a></p>;
        }
        if (imageUrl) {
            return <p className={s.p}><img src={imageUrl + '?t=' +SLACK_ENTERPRISE_TOKEN} alt="Image"/></p>;
        }
        return null;
    };

    return (
        <div key={parent.id}>
            <div className={s.onebox}>
                <div className={s.imgbox}>
                    <img className={s.img} src="Group 10.svg" />
                </div>
                <div>

                    <div className={s.messageBox}>
                        <div>
                            <div className={s.nameTimeBox}>
                                {userMap[parent.user_id] && <p className={s.p}>{userMap[parent.user_id]?.display_name || 'Loading...'}</p>}
                                {parent.created_at && <p className={s.ptime}>{formatDateTime(parent.created_at)}</p>}
                            </div>
                            <div>
                                {renderContent(parent.text, parent.url, parent.image_url)}
                            </div>
                        </div>

                        <div>
                            {children.map((child: ChildMessage) => (
                                <div key={child.id}>
                                    {renderContent(child.text, child.url, child.image_url)}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        {thread.length > 0 && (
                            <div className={s.buttonBox}>
                                <img className={s.replyimg} src="Group 10.svg" />
                                <button className={s.replybutton} onClick={() => onReplyClick(messageGroup)}>
                                    {thread.length} 件の返信
                                </button>
                            </div>
                            
                        )}
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default MessageBox;