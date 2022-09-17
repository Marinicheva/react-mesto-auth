function Login() {
  return (
    <div className="login">
      <h2 className="login__title">Регистрация</h2>
      <form action="#" className="login__form">
        <fieldset className="login__fieldset">
          <input type="email" className="login__input" placeholder="Email"/>
          <input type="password" className="login__input" placeholder="Пароль"/>
        </fieldset>
        <button className="login__btn">Зарегистрироваться</button>
      </form>
      <a href="#" className="login__link">Уже зарегистрированы? Войти</a>
    </div>
  );
}

export default Login;
