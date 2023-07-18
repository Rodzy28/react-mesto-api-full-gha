import { usePopupClose } from "../hooks/usePopupClose";
import signError from '../images/sign/signError.svg';
import signUp  from '../images/sign/signUp.svg';

export default function InfoTooltip({ isOpen, onClose, isSuccess }) {

  usePopupClose(isOpen, onClose);

  return (
    <div className={`popup popup_type_infotooltip ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <img className="popup__infotooltip-img" src={`${isSuccess ? signUp : signError}`} alt="Информация об авторизации" />
        <h2 className="popup__infotooltip-title">{isSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</h2>
        <button type="button" className="popup__close-button" onClick={onClose} />
      </div>
    </div>
  )
}