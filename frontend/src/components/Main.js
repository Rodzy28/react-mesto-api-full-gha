import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';


export default function Main({ cards, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__list">
          <div className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }}>
            <div className="profile__avatar-edit" onClick={onEditAvatar}></div>
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__edit-button" onClick={onEditProfile} type="button" aria-label="Открыть окно редактирования профиля" />
            <p className="profile__job">{currentUser.about}</p>
          </div>
          <button className="profile__add-button" onClick={onAddPlace} type="button" aria-label="Добавить фотографию" />
        </div>
      </section>

      <section className="place">
        <ul className="place__list">
          {cards.map((card) => (
            <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />
          ))}
        </ul>
      </section>
    </main>
  )
}
