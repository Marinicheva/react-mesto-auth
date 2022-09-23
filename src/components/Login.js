import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import * as auth from '../mestoAuth';

function Login(props) {
  const history = useHistory();

  const [loginData, setLoginData] = useState({email: '', password: ''});

  const handleChangeInputs = (evt) => {
    const newLoginData = { [evt.target.type]: evt.target.value };
    setLoginData((userData) => ({ ...loginData, ...newLoginData }));
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();

    auth.authorization(loginData)
      .then((data) => {
        if(data) {
          localStorage.setItem('token', data.token)
        }
      })
      .then(() => {
        props.onSubmitLogin(true);
      })
      .then(() => {
        history.push("/");
      })
      .catch(err => console.log(err));
  }

  
  return (
    <div className="auth">
      <Link to="/sign-up" className="auth__btn">Регистрация</Link>
      <h2 className="auth__title">Вход</h2>
      <form action="#" className="auth__form" onSubmit={handleSubmit}>
        <fieldset className="auth__fieldset">
          <input type="email" className="auth__input" placeholder="Email" value={loginData.email} onChange={handleChangeInputs} />
          <input type="password" className="auth__input" placeholder="Пароль" value={loginData.password} onChange={handleChangeInputs} />
        </fieldset>
        <button className="auth__submit">Войти</button>
      </form>
    </div>
  );
}

export default Login;
