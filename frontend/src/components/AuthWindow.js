import React from 'react';
import { Link } from 'react-router-dom';

export default function AuthWindow(props) {
  return (
    <section className='auth'>
      <h2 className='auth__title'>{props.title}</h2>
      <form className='auth__form' onSubmit={props.submit} name={props.name}>
        {props.children}
        <button type='submit' className='blackout auth__button'>
          {props.button}
        </button>
      </form>
      <p
        className={
          props.name === 'register'
            ? 'auth__paragraph'
            : 'auth__paragraph_disabled'
        }
      >
        Уже зарегистрированы?
        <Link className='auth__link' to='/sign-in'>
          Войти
        </Link>
      </p>
    </section>
  );
}
