import React from 'react';

export default function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_${props.name} ${
        props.isOpen ? 'popup_opened' : ' '
      }`}
    >
      <div className='popup__container popup__container_width'>
        <button
          type='button'
          className='blackout popup__close'
          onClick={props.onClose}
        ></button>
        <h2 className='popup__title'>{props.title}</h2>
        <form
          className='popup__form'
          name={props.name}
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button
            type='submit'
            className='popup__button popup__button_create'
            name='popup__button'
          >
            {props.button}
          </button>
        </form>
      </div>
    </div>
  );
}
