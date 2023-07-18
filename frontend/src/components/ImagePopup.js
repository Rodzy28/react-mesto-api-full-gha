import { usePopupClose } from "../hooks/usePopupClose"

export default function ImagePopup({ card, onClose }) {

  usePopupClose(card.link, onClose);

  return (
    <div className={`popup popup_type_image ${card.link ? "popup_opened" : " "}`}>
      <figure className="popup__image-figure">
        <img className="popup__image-viewing" src={card.link} alt={card.name} />
        <button type="button" className="popup__close-button" onClick={onClose} aria-label="Закрыть окно просмотра фото" />
        <figcaption className="popup__image-title">{card.name}</figcaption>
      </figure>
    </div>
  )
}
