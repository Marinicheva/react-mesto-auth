import { useState, createRef } from "react";
import * as auth from "../mestoAuth";

function Register() {
  const [userData, setUserData] = useState({ email: "", password: "" });

  const handleChangeInput = (evt) => {
    const newData = { [evt.target.type]: evt.target.value };
    setUserData((userData) => ({ ...userData, ...newData }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const { email, password } = userData;

    auth
      .registration(email, password)
      .then(() => setUserData({ email: "", password: "" }));
    // .then(Перенаправить на страницу входа);
  };

  return (
    <div className="login">
      <h2 className="login__title">Регистрация</h2>
      <form action="#" className="login__form" onSubmit={handleSubmit}>
        <fieldset className="login__fieldset">
          <input
            type="email"
            className="login__input"
            placeholder="Email"
            value={userData.email}
            onChange={handleChangeInput}
          />
          <input
            type="password"
            className="login__input"
            placeholder="Пароль"
            value={userData.password}
            onChange={handleChangeInput}
          />
        </fieldset>
        <button type="submit" className="login__btn">
          Зарегистрироваться
        </button>
      </form>
      <a href="#" className="login__link">
        Уже зарегистрированы? Войти
      </a>
    </div>
  );
}

export default Register;
