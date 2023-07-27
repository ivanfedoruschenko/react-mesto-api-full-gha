import React from 'react';
import PopupWithForm from './PopupWithForm';
import { AppContext } from '../contexts/AppContext';

export default function AddPlacePopup(props) {
  const app = React.useContext(AppContext);
  const [placeName, setPlaceName] = React.useState('');
  const [placeLink, setPlaceLink] = React.useState('');

  function handleChangeName(e) {
    setPlaceName(e.target.value);
  }

  function handleChangeLink(e) {
    setPlaceLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onPostNewPlace({
      name: placeName,
      link: placeLink,
    });
  }

  React.useEffect(() => {
    setPlaceName('');
    setPlaceLink('');
  }, [props.isOpen]);

  return (
    // eslint-disable-next-line react/prop-types
    <PopupWithForm
      onClose={app.closeAllPopups}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
      title={'Новое место'}
      name={'create_card'}
      button={props.button}
    >
      <label className='popup__label popup__label_margin_first'>
        <input
          onChange={handleChangeName}
          id='name-add-input'
          type='text'
          placeholder='Название'
          className='popup__input  popup__input_type_title'
          value={placeName || ''}
          name='name'
          minLength='2'
          maxLength='30'
          required
        />
        <span className='name-add-input-error popup__input-error'></span>
      </label>
      <label className='popup__label'>
        <input
          onChange={handleChangeLink}
          id='url-add-input'
          type='url'
          placeholder='Ссылка на картинку'
          className='popup__input popup__input_type_link'
          value={placeLink || ' '}
          name='link'
          required
        />
        <span className='url-add-input-error popup__input-error'></span>
      </label>
    </PopupWithForm>
  );
}
