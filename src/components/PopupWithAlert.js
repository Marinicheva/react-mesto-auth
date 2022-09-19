import successIcon from '../images/success-login.svg';
import errorIcon from '../images/error-signin.svg';

function PopupWithAlert() {
  return (
    <div className="popup popup_type_alert popup_opened">
      <div className="popup__container">
        <img src={successIcon} alt="" className="popup__icon" />
        <h2 className="popup__title">Вы успешно зарегистрировались!</h2>
        <button
          className="popup__close"
          type="button"
        ></button>
      </div>
    </div>
  );
}

export default PopupWithAlert;