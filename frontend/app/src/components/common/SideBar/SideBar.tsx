import React, { FC, useState, useEffect } from "react";  
import s from './SideBar.module.css';

interface Channel {
    id: number;
    channel_id: string;  
    name: string;
    creator: string;
    is_private: boolean;
    created_at: string;
    updated_at: string;
};

interface SideBarProps {
    setSelectedChannel: (channel: Channel) => void;  
}

const SideBar: FC<SideBarProps> = ({ setSelectedChannel }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [channels, setChannels] = useState<Channel[]>([]);
    const [selectedChannelId, setSelectedChannelId] = useState<number | null>(null);

    useEffect(() => {
        fetch('http://localhost:3000/api/v1/channels')
            .then(response => response.json())
            .then(data => setChannels(data));  
    }, []);

    const toggleDropdown = () => {
        setIsDropdownOpen(prev => !prev);
    }

    const handleChannelClick = (channel: Channel) => {
        console.log(`Switched to channel: ${channel.name}`);
        setSelectedChannel(channel); 
        setSelectedChannelId(channel.id);
    }
    
    return (
        <>
            <div className={s.sideBarContent}>
                <div className={s.teamNameContent}>
                    <button onClick={toggleDropdown} className={s.teamNameButton}>
                        TMLlab 
                        <img src="lowerTriangle.svg" className={s.teamNameImg}/>
                        {isDropdownOpen && (
                            <div className={s.dropdownMenu}>
                                <option>NUTMEG</option>
                                <option>技育展</option>
                            </div>
                        )}
                    </button>
                </div>

                <div className={s.mainNavContent}>
                    <div className={s.mainButtonContent}>
                        <button className={s.mainButton}>
                            {'# ' + 'canvas'}
                        </button>  
                        <button className={s.mainButton}>
                            {'# ' + 'すべてのチャンネル'}
                        </button>   
                        <button className={s.mainButton}>
                            {'# ' + 'ファイル'}
                        </button>   
                        <button className={s.mainButton}>
                            {'# ' + 'メンバーディレクトリ'}
                        </button>   
                        <button className={s.mainButton}>
                            {'# ' + 'その他'}
                        </button>   
                    </div>
                </div>

                <div className={s.channelNavContent}>
                    <div className={s.channelButtonContent}>
                    {channels.map(channel => (
                        <button 
                            key={channel.id} 
                            onClick={() => handleChannelClick(channel)} 
                            className={`${s.channelButton} ${channel.id === selectedChannelId ? s.selectedChannelButton : ''}`}
                        >
                            {'# ' + channel.name}
                        </button>
                    ))}
                    </div> 
                </div>
            </div>
        </>
    )
}

export default SideBar;
