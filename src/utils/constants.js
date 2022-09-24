const API_URL = 'https://mesto.nomoreparties.co/v1/cohort-46/';
const TOKEN ='8c85438e-65cc-450c-bee8-2c152a950866';
const initialValues = {email: '', password: ''};

const loginMessages = {
  400: "Не заполнено одно из полей ",
  401: "Пользователь с таким e-mail не найден"
}

const registrationMessages = {
  400: "Некорректно заполнено одно из полей"
}

export {API_URL, TOKEN, initialValues, loginMessages, registrationMessages};