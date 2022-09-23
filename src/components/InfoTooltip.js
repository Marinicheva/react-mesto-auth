import successIcon from '../images/success-login.svg';
import errorIcon from '../images/error-login.svg';

function InfoTooltip(props) {
  const tipText = props.sucsess ? "Вы успешно зарегистрировались!" :  "Что-то пошло не так! Попробуйте ещё раз.";
  const tipIcon = props.sucsess ? successIcon : errorIcon;

  return (
    <div className="popup popup_type_alert">
      <div className="popup__container">
        <img src={tipIcon} alt="" className="popup__icon" />
        <h2 className="popup__title popup__title_align_center">{tipText}</h2>
        <button
          className="popup__close"
          type="button"
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltip;