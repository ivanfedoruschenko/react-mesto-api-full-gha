import React, { useState } from 'react';
import AuthWindow from './AuthWindow';

export default function Register(props) {
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onRegisterUser({ ...formValue });
  };

  return (
    <AuthWindow
      title={'Регистрация'}
      submit={handleSubmit}
      button={'Зарегистрироватся'}
      name={'register'}
    >
      <input
        className='auth__input'
        placeholder='Email'
        type='email'
        value={formValue.email}
        name='email'
        onChange={handleChange}
        required
      />
      <input
        className='auth__input'
        placeholder='Пароль'
        type='password'
        value={formValue.password}
        name='password'
        onChange={handleChange}
        required
      />
    </AuthWindow>
  );
}
