import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (`place__like-button ${isLiked && 'place__like-button_active'}`);

  function handleCardClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card._id);
  }

  return (
    <li className="place__item">
      <img className="place__picture" onClick={handleCardClick} src={card.link} alt={card.name} />
      {isOwn && <button className="place__trash-button" type="button" onClick={handleDeleteClick} aria-label="Удалить карточку" />}
      <div className="place__content">
        <h2 className="place__text">{card.name}</h2>
        <div className="place__like">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick} aria-label="Лайкнуть карточку" />
          <span className="place__like-counter">{card.likes.length}</span>
        </div>
      </div>
    </li>
  )
}
