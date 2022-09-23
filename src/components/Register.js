import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import * as auth from "../mestoAuth";

function Register() {
  const history = useHistory();
  const [userData, setUserData] = useState({ email: "", password: "" });

  const [regError, setRegError] = useState('Что-то пошло не так, попробуйте еще раз.');
  const [isErrorVisible, setIsErrorVisible] = useState(false);

  const handleChangeInput = (evt) => {
    const newData = { [evt.target.type]: evt.target.value };
    setUserData(() => ({ ...userData, ...newData }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    auth
      .registration(userData)
      .then(() => setUserData({ email: "", password: "" })) //Должно быть окно подтверждающее успешную регистрацию
      .then(() => 
        history.push('/sign-in'))
      .catch(err => {
        if (err === 400) {
          setRegError('Некорректно заполнено одно из полей');
        }
        setIsErrorVisible(true);
      });
  };

  const errorClassName = isErrorVisible ? "auth__error auth__error_active" : "auth__error";

  return (
    <div className="auth">
      <Link to="sign-in" className="auth__btn">Войти</Link>
      <h2 className="auth__title">Регистрация</h2>
      <p className={errorClassName}>{regError}</p>
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
