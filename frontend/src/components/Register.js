import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useForm } from "../hooks/useForm";

export default function Register({ handleRegister }) {

  const { values, handleChange, setValues } = useForm({});

  function handleSubmit(e) {
    e.preventDefault();
    handleRegister({email: values.email, password: values.password});
  }

  useEffect(() => {
    setValues({});
  }, [setValues]);

  return (
    <div className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form onSubmit={handleSubmit} className="auth__form">
        <input id="email" className="auth__input" type="email" name="email" placeholder="Email" value={values.email || ''} onChange={handleChange} required />
        <input id="password" className="auth__input" type="password" name="password" placeholder="Пароль" value={values.password || ''} onChange={handleChange} minLength="5" maxLength="15" required />
        <button type="submit" className="auth__button">Зарегистрироваться</button>
      </form>
      <p className="auth__text">Уже зарегистрированны? <Link className="auth__link" to="/sign-in">Войти</Link></p>
    </div>
  )
}