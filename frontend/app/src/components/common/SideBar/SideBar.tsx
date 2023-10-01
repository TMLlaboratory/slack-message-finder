import React, { FC, useState } from "react";
import s from './SideBar.module.css';

const SideBar: FC = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); 

    const channels = [
        { id: 1, name: 'times-takasuka' },
        { id: 2, name: 'times-iida' },
        { id: 3, name: 'times-wakatsuki' },
    ];

    const toggleDropdown = () => {
        setIsDropdownOpen(prev => !prev);
    }

    const handleChannelClick = (channelName: string) => {
        console.log(`Switched to channel: ${channelName}`);
    }

    return (
        <section className={s.sideBarContainer}>
            <div className={s.sideBarContent}>
                <div className={s.teamNameContent}>
                    <button onClick={toggleDropdown} className={s.teamNameButton}>
                        TMLlab 
                        <img src="lowerTriangle.svg" width={20} height={30} className={s.teamNameImg}/>
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
                        <button key={channel.id} onClick={() => handleChannelClick(channel.name)} className={s.channelButton}>
                            {'# ' +channel.name}
                        </button>
                    ))}
                    </div>
                    
                </div>
            </div>
        </section>
    )
}

export default SideBar;
