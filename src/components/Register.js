import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import * as auth from "../mestoAuth";

function Register() {
  const history = useHistory();
  const [userData, setUserData] = useState({ email: "", password: "" });

  const handleChangeInput = (evt) => {
    const newData = { [evt.target.type]: evt.target.value };
    setUserData((userData) => ({ ...userData, ...newData }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    auth
      .registration(userData)
      .then(() => setUserData({ email: "", password: "" }))
      .then(() => 
        history.push('/sign-in'));
  };

  return (
    <div className="auth">
      <Link to="sign-in" className="auth__btn">Войти</Link>
      <h2 className="auth__title">Регистрация</h2>
      <form action="#" className="auth__form" onSubmit={handleSubmit}>
        <fieldset className="auth__fieldset">
          <input
            type="email"
            className="auth__input"
            placeholder="Email"
            value={userData.email}
            onChange={handleChangeInput}
          />
          <input
            type="password"
            className="auth__input"
            placeholder="Пароль"
            value={userData.password}
            onChange={handleChangeInput}
          />
        </fieldset>
        <button type="submit" className="auth__submit">
          Зарегистрироваться
        </button>
      </form>
      <Link to="/sign-in" className="auth__link">
        Уже зарегистрированы? Войти
      </Link>
    </div>
  );
}

export default Register;
