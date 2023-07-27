import profileEditBtn from '../images/profile__edit.png';
import profileAddBtn from '../images/profile__plus.png';
import Card from './Card';
import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Footer from './Footer';

export default function Main({
  cards,
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardDelete,
  onCardLike,
  onCardDislike,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className='main'>
      <section className='profile'>
        <div className='profile__two-columns'>
          <div className='profile__container'>
            <div className='profile__avatar-container' onClick={onEditAvatar}>
              <img
                src={currentUser.avatar}
                alt='Аватар'
                className='profile__avatar'
              />
            </div>
            <div className='profile__name-info'>
              <h1 className='profile__name'>{currentUser.name}</h1>
              <p className='profile__info'>{currentUser.about}</p>
            </div>
          </div>
          <button
            type='button'
            className='blackout profile__edit-button'
            onClick={onEditProfile}
          >
            <img
              src={profileEditBtn}
              className='profile__edit-pencil'
              alt='Карандаш'
            />
          </button>
        </div>
        <button
          type='button'
          className='blackout profile__add-button'
          onClick={onAddPlace}
        >
          <img
            src={profileAddBtn}
            className='profile__plus-button'
            alt='Плюс'
          />
        </button>
      </section>
      <section className='elements'>
        {cards.map((card) => {
          return (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardDelete={onCardDelete}
              onCardLike={onCardLike}
              onCardDislike={onCardDislike}
            />
          );
        })}
      </section>
      <Footer />
    </main>
  );
}
