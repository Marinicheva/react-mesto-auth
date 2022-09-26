import { useContext } from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import logo from "../images/logo.svg";

function Header(props) {

  const currentUser = useContext(CurrentUserContext);

  const onSignOutClick = () => {
    props.onLogout();
  }

  const userData = (
    <div className="header__user">
      <p className="header__email">{currentUser.email}</p>
      <button className="header__btn" type="buton" onClick={onSignOutClick}>Выйти</button>
    </div>
  );

  return (
    <header className="header">
      <Link to="/" className="header__link">
        <img src={logo} alt="Логотип сервиса Mesto" className="header__logo" />
      </Link>
      {props.loggedIn && userData}
    </header>
  );
}

export default Header;
