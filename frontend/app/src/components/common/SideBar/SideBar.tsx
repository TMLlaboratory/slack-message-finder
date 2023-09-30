import React, { FC, useState } from "react";
import s from './SideBar.module.css';

const SideBar: FC = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); 

    const toggleDropdown = () => {
        setIsDropdownOpen(prev => !prev);
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

                </div>

                <div className={s.channelNavContent}>

                </div>
            </div>
        </section>
    )
}

export default SideBar;

