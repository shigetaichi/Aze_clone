import React, { useState } from 'react';
import styles from '../components-style/Hamburger.module.css';
import Toggler from './Toggler';
import {Transition} from 'react-transition-group';

const Hamburger = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [randomBg, setRandomBg] = useState({backgroundColor: '#0097C4',});

  const handleChange = () => {
    setIsOpen(!isOpen);
    switch (Math.floor(Math.random() * 3)){
      case 0:
        setRandomBg({backgroundColor: '#0097C4',});
        break;
      case 1:
        setRandomBg({backgroundColor: '#DF0234',});
        break;
      case 2:
        setRandomBg({backgroundColor: '#03AE66',});
        break;
      default:
        setRandomBg({backgroundColor: 'white',});
    }
  }

  return (
    <React.Fragment>
      <div className={styles.hamburger_wrapper}>
        <a id="hamburger" className={styles.hamburger_letter} onClick={handleChange}>
          {isOpen ? 'CLOSE' : 'MENU'}
        </a>
        <Transition
          in={isOpen}
          timeout={{appear: 0, exit: 500}}
        >
          {state => (
            <div
              className={styles.drawer}
              style={state === 'entered' ? {
                right: 0,
                backdropFilter: 'blur(3px)',
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
              } : {}}>
              <div className={styles.drawer_inner} style={randomBg}>
                {/* <Toggler/> */}
                <p>Under Construction! Coming Soon, This area will be the select color theme box. </p>
                <p>現在開発中です。カラーテーマを選べるようになる予定です。</p>
              </div>
            </div>
          )}
        </Transition>
      </div>
    </React.Fragment>
  )
}

export default Hamburger
