import React, { FC } from 'react';
import s from './Header.module.css';

const Header: FC = () => {
  return (
    <section>
      <header className={s.headerContent}>
        <div className={s.flexContainer}>

            <div className={s.titleContainer}>
                <p  className={s.title}>Slack-message-finder</p>
            </div>
            
            <div className={s.searchInputContainer}>
                <div className={s.inputContainer}>
                    <img src="magnifyingGlass.svg" alt="magnifyingGlass.svg" width={12} height={15} />
                    <input type="text" placeholder="TMLlab内を検索する" className={s.searchInput} />
                </div>
                
            </div>

            <div className={s.buttonContainer}>
                <button className={s.helpButton}>?</button>
            </div>
            
        </div>
        
      </header>
    </section>
  );
};

export default Header;

