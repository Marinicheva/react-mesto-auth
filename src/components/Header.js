import logo from "../images/logo.svg";

function Header(props) {
  const content = props.loggedIn ? (
    <div className="header__user">
      <p className="header__email">email@example.com</p>
      <button className="header__btn">Выйти</button>
    </div>
  ) : (
    // props.actualBtn
    <a href="#" className="header__link">Войти</a>
  );

  return (
    <header className="header">
      <a href="#" className="header__link">
        <img src={logo} alt="Логотип сервиса Mesto" className="header__logo" />
      </a>
      {content}
      {/* <a href="#" className="header__link">Войти</a> */}
      {/* <a href="#" className="header__link">Регистрация</a> */}
    </header>
  );
}

export default Header;
