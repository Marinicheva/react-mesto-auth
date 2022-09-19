import { useState } from 'react';

function Login() {

  const [newUserdata, setnewUserData] = useState({email: '', password: ''});

  
  return (
    <div className="login">
      <h2 className="login__title">Вход</h2>
      <form action="#" className="login__form">
        <fieldset className="login__fieldset">
          <input type="email" className="login__input" placeholder="Email"/>
          <input type="password" className="login__input" placeholder="Пароль"/>
        </fieldset>
        <button className="login__btn">Войти</button>
      </form>
    </div>
  );
}

export default Login;
