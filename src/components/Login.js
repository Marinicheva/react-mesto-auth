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
    const {email, password} = loginData;

    auth.authorization(email, password)
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
      });
      
  }

  
  return (
    <div className="login">
      <Link to="/sign-up">Регистрация</Link>
      <h2 className="login__title">Вход</h2>
      <form action="#" className="login__form" onSubmit={handleSubmit}>
        <fieldset className="login__fieldset">
          <input type="email" className="login__input" placeholder="Email" value={loginData.email} onChange={handleChangeInputs} />
          <input type="password" className="login__input" placeholder="Пароль" value={loginData.password} onChange={handleChangeInputs} />
        </fieldset>
        <button className="login__btn">Войти</button>
      </form>
    </div>
  );
}

export default Login;
