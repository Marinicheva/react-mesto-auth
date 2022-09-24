import { useState, useEffect } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";
import * as auth from "../mestoAuth";

import ProtectedRoute from "./ProtectedRoute";
import Header from "./Header";
import Login from "./Login";
import Register from "./Register";
import Main from "./Main";
import Footer from "./Footer";
import InfoTooltip from "./InfoTooltip";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import ImagePopup from "./ImagePopup";

import successIcon from "../images/success-signup.svg";
import errorIcon from "../images/error-login.svg";
import { loginMessages, registrationMessages } from "../utils/constants";

function App() {
  const history = useHistory();

  //Стейты
  const [loggedIn, setLoggedIn] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [currentUserEmail, setCurrentUserEmail] = useState("");

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const [infoContent, setInfoContent] = useState({ icon: null, text: null });
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [deletedCard, setDeletedCard] = useState("");

  const [isRenderLoading, setIsRenderLoading] = useState(false);

  useEffect(() => {
    Promise.all([api.getCardList(), api.getUserInfo()])
      .then(([cardsData, userData]) => {
        setCards(cardsData);
        setCurrentUser(userData);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
  
      if (!token) return;
  
      auth
        .getContent(token)
        .then((res) => {
          setCurrentUserEmail(res.data.email);
          setLoggedIn(true);
        })
        .then(() => {
          history.push("/");
        });
    };

    checkToken();
  }, [history]);

  //Открытие попапов
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleDeleteCardClick = (card) => {
    setIsDeleteCardPopupOpen(true);
    setDeletedCard(card);
  };

  //Закрытие попапов
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setSelectedCard(null);
    setDeletedCard(null);
    setIsInfoOpen(false);
  };

  //Рендер загрузки
  const renderLoading = () => {
    setIsRenderLoading((isRenderLoading) => !isRenderLoading);
  };

  //Действия с карточками (просмотр, лайк, удаление, добавление)
  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((item) => item._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((card) => (card._id === newCard._id ? newCard : card))
        );
      })
      .catch((err) => console.error(err));
  };

  const handleCardDelete = () => {
    api
      .deleteCard(deletedCard._id)
      .then(() => {
        setCards((state) =>
          state.filter((item) => item._id !== deletedCard._id)
        );
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log(err))
      .finally(() => renderLoading());
  };

  const handleAddPlaceSubmit = (cardData) => {
    api
      .addNewCard(cardData)
      .then((data) => setCards([data, ...cards]))
      .then(() => closeAllPopups())
      .catch((err) => console.error(err))
      .finally(() => renderLoading());
  };

  //Изменение данных пользователя (данные, аватар)
  const handleUpdateUser = (data) => {
    api
      .setUserInfo(data)
      .then((newData) => setCurrentUser(newData))
      .then(() => closeAllPopups())
      .catch((err) => console.log(err))
      .finally(() => renderLoading());
  };

  const handleUpdateAvatar = (avatarData) => {
    api
      .setUserAvatar(avatarData)
      .then((newData) => setCurrentUser(newData))
      .then(() => closeAllPopups())
      .catch((err) => console.log(err))
      .finally(() => renderLoading());
  };

  //Регистрация, авторизация, выход из приложения
  const handleRegister = (userData) => {
    return auth
      .registration(userData)
      .then(() =>
        setInfoContent({
          icon: successIcon,
          text: "Вы успешно зарегистрировались!",
        })
      )
      .then(() => setIsInfoOpen(true))
      .then(() => {
        setTimeout(() => {
          history.push("/");
          setIsInfoOpen(false);
        }, 2000);
      })
      .catch((resCode) => {
        const registrationMessage = registrationMessages[resCode]
          ? registrationMessages[resCode]
          : "Что-то пошло не так! Попробуйте ещё раз.";

        setInfoContent({ icon: errorIcon, text: registrationMessage });
        setIsInfoOpen(true);
      });
  };

  const handleLogin = (loginData) => {
    return auth
      .authorization(loginData)
      .then((data) => {
        if (data) {
          localStorage.setItem("token", data.token);
        }
      })
      .then(() => {
        setLoggedIn(true);
      })
      .then(() => {
        history.push("/");
      })
      .catch((errorCode) => {
        const errorMessage = loginMessages[errorCode]
          ? loginMessages[errorCode]
          : "Что-то пошло не так! Попробуйте ещё раз.";

        setInfoContent({ icon: errorIcon, text: errorMessage });
        setIsInfoOpen(true);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    history.push("/sign-in");
  };

  //Проверка наличия токена у пользователя

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header
        loggedIn={loggedIn}
        currentUserEmail={currentUserEmail}
        onLogout={handleLogout}
      />

      <Switch>
        <Route path="/sign-up">
          {<Register onRegister={handleRegister} />}
        </Route>

        <Route path="/sign-in">{<Login onLogin={handleLogin} />}</Route>

        <ProtectedRoute path="/" loggedIn={loggedIn}>
          <Main
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleDeleteCardClick}
          />
        </ProtectedRoute>

        <Route path="*">
          {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
        </Route>
      </Switch>

      <Footer />

      <InfoTooltip
        icon={infoContent.icon}
        text={infoContent.text}
        isOpen={isInfoOpen}
        onClose={closeAllPopups}
      />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        isRenderLoading={isRenderLoading}
        renderLoading={renderLoading}
        renderLoadingButtonText={"Сохранение..."}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        isRenderLoading={isRenderLoading}
        renderLoading={renderLoading}
        renderLoadingButtonText={"Обновление..."}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddNewCard={handleAddPlaceSubmit}
        isRenderLoading={isRenderLoading}
        renderLoading={renderLoading}
        renderLoadingButtonText={"Добавление..."}
      />

      <DeleteCardPopup
        isOpen={isDeleteCardPopupOpen}
        onClose={closeAllPopups}
        isRenderLoading={isRenderLoading}
        renderLoading={renderLoading}
        onDeleteCard={handleCardDelete}
      />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  );
}

export default App;
