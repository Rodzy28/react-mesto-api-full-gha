import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Header({ userEmail, handleLogOut }) {

  const location = useLocation();

  return (
    <header className="header">
      <Link className="header__logo" to="#" title="Ссылка" />
      {location.pathname === "/sign-in" && <Link to="/sign-up" className="header__link">Регистрация</Link>}
      {location.pathname === "/sign-up" && <Link to="/sign-in" className="header__link">Вход</Link>}
      {location.pathname === "/" &&
        <div className="header__menu">
          <p className="header__menu-text">{userEmail}</p>
          <Link to="#" className="header__menu-link" onClick={handleLogOut}>Выйти</Link>
        </div>}

    </header>
  )
}
