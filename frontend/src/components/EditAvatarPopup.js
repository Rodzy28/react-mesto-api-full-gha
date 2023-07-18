import PopupWithForm from "./PopupWithForm";
import { useEffect, useRef } from "react";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {

  const avatarRef = useRef();

  useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen])

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      ariaLabel="Закрыть окно редактирования аватарки"
      buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input id="avatar-input" ref={avatarRef} className="popup__input popup__input_type_avatar" type="url" name="avatar"
        placeholder="Ссылка на аватар" required />
      <span className="popup__input-error avatar-input-error"></span>
    </PopupWithForm>
  )
}