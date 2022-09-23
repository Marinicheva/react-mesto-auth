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
    <div className="login">
      <Link to="sign-in">Войти</Link>
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
      <Link to="/sign-in" className="login__link">
        Уже зарегистрированы? Войти
      </Link>
    </div>
  );
}

export default Register;
