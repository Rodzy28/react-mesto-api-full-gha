import PopupWithForm from "./PopupWithForm"
import { useEffect } from "react";
import { useForm } from "../hooks/useForm";

export default function AddPlacePopup({ onAddPlace, isOpen, onClose, isLoading }) {

  const { values, handleChange, setValues } = useForm({});

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({ name: values.place, link: values.url });
  }

  useEffect(() => {
    setValues({});
  }, [isOpen, setValues]);

  return (
    <PopupWithForm
      name="card"
      title="Новое место"
      buttonText={isLoading ? 'Сохранение...' : 'Создать'}
      ariaLabel="Закрыть окно редактирования карточки"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input id="place-input" className="popup__input popup__input_type_place" value={values.place || ''} onChange={handleChange} type="text" name="place"
        placeholder="Название" minLength="2" maxLength="30" required />
      <span className="popup__input-error place-input-error"></span>
      <input id="src-input" className="popup__input popup__input_type_src" value={values.url || ''} onChange={handleChange} type="url" name="url"
        placeholder="Ссылка на картинку" required />
      <span className="popup__input-error src-input-error"></span>
    </PopupWithForm>
  )
}