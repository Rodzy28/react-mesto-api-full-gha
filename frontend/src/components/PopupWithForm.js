import { usePopupClose } from "../hooks/usePopupClose"

export default function PopupWithForm({ name, title, isOpen, onClose, ariaLabel, onSubmit, children, buttonText }) {

  usePopupClose(isOpen, onClose);

  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <h2 className="popup__header">{title}</h2>
        <button type="button" className="popup__close-button" onClick={onClose} aria-label={ariaLabel} />
        <form className={`popup__form-${name} popup__form`} name={name} onSubmit={onSubmit}>
          {children}
          <button type="submit" className="popup__save-button">{buttonText}</button>
        </form>
      </div>
    </div>
  )
}
