import { useState } from 'react';
import * as auth from '../mestoAuth';

function Login() {

  const [loginData, setLoginData] = useState({email: '', password: ''});

  const handleChangeInputs = (evt) => {
    const newLoginData = { [evt.target.type]: evt.target.value };
    setLoginData((userData) => ({ ...loginData, ...newLoginData }));
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const {email, password} = loginData;

    auth.authorization(email, password)
      .then(data => console.log(data));
      //сохранить токен в локалсторэдж
      //Изменить стейт loggedIn
      //Перенаправить на /
  }

  
  return (
    <div className="login">
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
