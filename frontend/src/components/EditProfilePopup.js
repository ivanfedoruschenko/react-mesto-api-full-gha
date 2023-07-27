import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { AppContext } from '../contexts/AppContext';

export default function EditProfilePopup(props) {
  const app = React.useContext(AppContext);
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onUpdateUser({
      name: name,
      about: description,
    });
  };

  return (
    <PopupWithForm
      onClose={app.closeAllPopups}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
      title={'Редактировать профиль'}
      name={'edit_profile'}
      button={props.button}
    >
      <label className='popup__label popup__label_margin_first'>
        <input
          id='name-edit-input'
          value={name || ''}
          type='text'
          placeholder='Введите свое имя'
          onChange={handleChangeName}
          className='popup__input popup__input_type_name'
          name='name'
          minLength='2'
          maxLength='40'
          required
        />
        <span className='name-edit-input-error popup__input-error'></span>
      </label>
      <label className='popup__label'>
        <input
          id='info-edit-input'
          value={description || ''}
          type='text'
          placeholder='Укажите информацию о себе'
          onChange={handleChangeDescription}
          className='popup__input popup__input_type_info'
          name='about'
          minLength='2'
          maxLength='200'
          required
        />
        <span className='info-edit-input-error popup__input-error'></span>
      </label>
    </PopupWithForm>
  );
}
