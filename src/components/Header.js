import { Link, useHistory } from "react-router-dom";
import logo from "../images/logo.svg";

function Header(props) {

  const history = useHistory();

  const onSignOutClick = () => {
    localStorage.removeItem('token');
    history.push("/sign-in");

    props.onSignOut(false);
  }


  const userData = (
    <div className="header__user">
      <p className="header__email">{props.currentUserEmail}</p>
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
