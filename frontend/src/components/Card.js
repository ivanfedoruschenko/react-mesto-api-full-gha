import { CurrentUserContext } from '../contexts/CurrentUserContext';
import React from 'react';

export default function Card(props) {
  const handleCardClick = () => {
    props.onCardClick(props.card);
  };

  const handleDeleteClick = () => {
    props.onCardDelete(props.card._id);
  };

  const handleLikeClick = () => {
    props.onCardLike(props.card._id);
  };

  const handleDislikeClick = () => {
    props.onCardDislike(props.card._id);
  };

  const currentUser = React.useContext(CurrentUserContext);

  const isOwner = props.card.owner === currentUser._id;
  const isLiked = props.card.likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = `element__like ${
    isLiked && 'element__like_active'
  }`;
  const cardLikeNumberClassName = `${
    props.card.likes.length !== 0
      ? 'element__like-number'
      : 'element__like-number_inactive'
  }`;

  return (
    <div className='element'>
      {isOwner && (
        <button
          type='button'
          className='element__trash'
          onClick={handleDeleteClick}
        ></button>
      )}
      <img
        onClick={handleCardClick}
        className='element__img'
        src={props.card.link}
        alt={props.card.name}
      />
      <div className={'element__name-like'}>
        <h2 className='element__name'>{props.card.name}</h2>
        <div className='element__container'>
          <button
            type='button'
            className={cardLikeButtonClassName}
            onClick={isLiked ? handleDislikeClick : handleLikeClick}
          ></button>
          <span className={cardLikeNumberClassName}>
            {props.card.likes.length}
          </span>
        </div>
      </div>
    </div>
  );
}
