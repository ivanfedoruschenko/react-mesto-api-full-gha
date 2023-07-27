import AuthWindow from './AuthWindow';
import React, { useState } from 'react';

export default function Login(props) {
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
    props.onLoginUser({ ...formValue });
  };

  React.useEffect(() => {
    setFormValue({ email: '', password: '' });
  }, []);

  return (
    <AuthWindow
      title={'Вход'}
      submit={handleSubmit}
      button={'Войти'}
      register={false}
      name={'login'}
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
