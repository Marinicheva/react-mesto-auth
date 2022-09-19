import successIcon from '../images/success-login.svg';
import errorIcon from '../images/error-login.svg';

function InfoTooltip() {
  return (
    <div className="popup popup_type_alert">
      <div className="popup__container">
        <img src={successIcon} alt="" className="popup__icon" />
        <h2 className="popup__title popup__title_align_center">Вы успешно зарегистрировались!</h2>
        <button
          className="popup__close"
          type="button"
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltip;