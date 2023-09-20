import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from "./Card";

function Main ({onEditProfile, onAddPlace, onEditAvatar, cards, onCardClick, onLikeClick, onCardDelete}) {
  const сurrentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile root__section">
        <div className="profile__base">
          <div type="button" className="profile__overlay-container" onClick={onEditAvatar}>
            <img src={сurrentUser.avatar} alt={сurrentUser.name} className="profile__avatar"/>
          </div>
          <div className="profile__info">
            <div className="profile__extra-info">
              <h1 className="profile__title">{сurrentUser.name}</h1>
              <button type="button" onClick={onEditProfile} aria-label="Кнопка редактирования профиля" className="profile__edit-button"></button>
            </div>
            <p className="profile__subtitle">{сurrentUser.about}</p>
          </div>
        </div>
        <button type="button" onClick={onAddPlace} aria-label="Кнопка добавления нового поста" className="profile__add-button"></button>
      </section>
      <section aria-label="Посты в профиле" className="elements root__section">
        {cards.map(item => (
          <Card key={item._id} onCardClick={onCardClick} onLikeClick={onLikeClick} onCardDelete={onCardDelete} {...item}/>
        ))}
      </section>
    </main>
  );
}

export default Main;