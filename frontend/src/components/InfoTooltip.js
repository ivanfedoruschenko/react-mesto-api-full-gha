import React from 'react';
import successImg from '../images/popup__success.png';
import failedImg from '../images/popup__failed.png';
import { AppContext } from '../contexts/AppContext';

export default function InfoTooltip(props) {
  const app = React.useContext(AppContext);

  return (
    <div className={`popup popup__info ${props.isOpen && 'popup_opened'}`}>
      <div className='popup__container'>
        <img
          className='popup__img-state'
          src={props.img === 'success' ? successImg : failedImg}
          alt={props.img}
        />
        <button
          type='button'
          className='blackout popup__close'
          onClick={app.closeAllPopups}
        ></button>
        <p className='popup__subtitle'>{props.subtitle}</p>
      </div>
    </div>
  );
}
