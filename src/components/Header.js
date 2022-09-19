import logo from "../images/logo.svg";

function Header(props) {
  const userData = (
    <div className="header__user">
            <p className="header__email">email@example.com</p>
            <button className="header__btn">Выйти</button>
          </div>
  );

  return (
    <header className="header">
      <a href="#" className="header__link">
        <img src={logo} alt="Логотип сервиса Mesto" className="header__logo" />
      </a>
      {
        props.loggedIn && userData
      }
    </header>
  );
}

export default Header;
