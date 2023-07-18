import PopupWithForm from "./PopupWithForm"
import { useContext, useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {

  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  function handleName(e) {
    setName(e.target.value);
  }

  function handleDescription(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
      ariaLabel="Закрыть окно редактирования профиля"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input id="name-input" className="popup__input popup__input_type_name" type="text" name="name"
        placeholder="Введите имя" value={name || ''} onChange={handleName} minLength="2" maxLength="40" required />
      <span className="popup__input-error name-input-error"></span>
      <input id="job-input" className="popup__input popup__input_type_job" type="text" name="job"
        placeholder="Введите профессию" value={description || ''} onChange={handleDescription} minLength="2" maxLength="200" required />
      <span className="popup__input-error job-input-error"></span>
    </PopupWithForm>
  )
}