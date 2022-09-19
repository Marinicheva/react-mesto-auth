import { useState } from 'react';

function Login() {

  const [loginData, setLoginData] = useState({email: '', password: ''});

  const handleChangeInputs = (evt) => {
    const newLoginData = { [evt.target.type]: evt.target.value };
    setLoginData((userData) => ({ ...loginData, ...newLoginData }));

  }

  
  return (
    <div className="login">
      <h2 className="login__title">Вход</h2>
      <form action="#" className="login__form">
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
