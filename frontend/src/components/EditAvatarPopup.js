import React from 'react';
import PopupWithForm from './PopupWithForm';
import { AppContext } from '../contexts/AppContext';

export default function EditAvatarPopup(props) {
  const [avatar, setAvatar] = React.useState('');

  const app = React.useContext(AppContext);

  function handleChangeAvatar(e) {
    setAvatar(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatar,
    });
  }

  React.useEffect(() => {
    setAvatar('');
  }, [props.isOpen]);

  return (
    <PopupWithForm
      onClose={app.closeAllPopups}
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      title={'Обновить аватар'}
      name={'patch_avatar'}
      button={props.button}
    >
      <label className='popup__label'>
        <input
          id='url-patch-input'
          onChange={handleChangeAvatar}
          value={avatar || ''}
          type='url'
          placeholder='Ссылка на картинку'
          className='popup__input popup__input_type_link'
          name='link'
          required
        />
        <span className='url-patch-input-error popup__input-error'></span>
      </label>
    </PopupWithForm>
  );
}
