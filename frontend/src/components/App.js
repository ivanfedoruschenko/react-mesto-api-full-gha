import Header from './Header';
import Main from './Main';
import React from 'react';
import { api } from '../utils/api.js';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import {
  Route,
  Routes,
  Navigate,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import Register from './Register';
import * as auth from '../utils/auth.js';
import Login from './Login';
import ProtectedRouteElement from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import { AppContext } from '../contexts/AppContext';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isStatePopupOpen, setIsStatePopupOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [email, setEmail] = React.useState('');
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [stateImg, setStateImg] = React.useState('');
  const [stateSubtitle, setStateSubtitle] = React.useState('');
  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    selectedCard;
  const [isLoading, setIsLoading] = React.useState(false);
  const buttonSaveText = `${isLoading ? 'Сохранение...' : 'Сохранить'}`;
  const buttonCreateText = `${isLoading ? 'Создание...' : 'Создать'}`;
  const [buttonHeader, setButtonHeader] = React.useState('');
  const [pathHeader, setPathHeader] = React.useState('');
  const [loggedIn, setLoggedIn] = React.useState(false);
  const location = useLocation();

  const navigate = useNavigate();

  const handleSubmit = (request) => {
    setIsLoading(true);
    request()
      .then(closeAllPopups)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  function handleEditAvatar() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsStatePopupOpen(false);
  };

  const successRegister = () => {
    setIsStatePopupOpen(true);
    setStateImg('success');
    setStateSubtitle('Вы успешно зарегистрировались!');
    setTimeout(closeAllPopups, 1500);
  };

  const failedRegister = () => {
    setStateImg('failed');
    setIsStatePopupOpen(true);
    setStateSubtitle('Что-то пошло не так! Попробуйте ещё раз.');
    setTimeout(closeAllPopups, 1500);
  };

  function handleCardDelete(id) {
    api
      .deleteCard(id)
      .then((res) => {
        setCards((cards) => cards.filter((c) => c._id !== id));
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }

  const handleCardLike = (id) => {
    api
      .activateLike(id)
      .then((res) => {
        setCards((state) => state.map((c) => (c._id === id ? res : c)));
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  };

  const handleCardDislike = (id) => {
    api
      .deactivateLike(id)
      .then((res) => {
        setCards((state) => state.map((c) => (c._id === id ? res : c)));
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  };

  const handleUpdateUser = (data) => {
    function makeRequest() {
      return api.patchUserInfo(data).then(setCurrentUser);
    }

    handleSubmit(makeRequest);
  };

  const handleRegisterUser = (data) => {
    const { email, password } = data;
    auth
      .register(email, password)
      .then((response) => {
        if (response) {
          successRegister();
          navigate('/sign-in', { replace: true });
        } else {
          failedRegister();
        }
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
        failedRegister();
      });
  };

  const handleLoginUser = (data) => {
    const { email, password } = data;
    auth
      .login(email, password)
      .then((data) => {
        if (data.token) {
          setEmail(email);
          localStorage.setItem('token', data.token);
          setLoggedIn(true);
          navigate('/main', { replace: true });
        }
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
        failedRegister();
      });
  };

  const handleUpdateAvatar = (data) => {
    function makeRequest() {
      return api.patchAvatar(data).then(setCurrentUser);
    }

    handleSubmit(makeRequest);
  };

  const handlePostNewPlace = (data) => {
    function makeRequest() {
      return api.postNewCard(data).then((res) => setCards([res, ...cards]));
    }

    handleSubmit(makeRequest);
  };

  const tokenCheck = () => {
    const token = localStorage.getItem('token');
    if (token) {
      // проверим токен
      auth
        .authorize(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.data.email);
            navigate('/main', { replace: true });
          }
        })
        .catch((error) => console.log(`Ошибка: ${error}`));
    }
  };

  React.useEffect(() => {
    tokenCheck();
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((error) => console.log(`Ошибка: ${error}`));

    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }, []);

  React.useEffect(() => {
    if (location.pathname === '/main') {
      setButtonHeader('Выйти');
      setPathHeader('/sign-in');
    } else if (location.pathname === '/sign-in') {
      setEmail('');
      setButtonHeader('Регистрация');
      setPathHeader('/sign-up');
    } else if (location.pathname === '/sign-up') {
      setEmail('');
      setButtonHeader('Войти');
      setPathHeader('/sign-in');
    }
  }, [location.pathname]);

  function signOut() {
    localStorage.removeItem('token');
    navigate('/sign-in', { replace: true });
  }

  React.useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }

    if (isOpen) {
      // навешиваем только при открытии
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      };
    }
  }, [isOpen]);

  return (
    <AppContext.Provider value={{ closeAllPopups }}>
      <CurrentUserContext.Provider value={currentUser}>
        <div className='body'>
          <Header
            email={email}
            path={pathHeader}
            link={buttonHeader}
            signOut={signOut}
          />

          <Routes>
            <Route
              path='/'
              element={
                loggedIn ? (
                  <Navigate to='/main' replace />
                ) : (
                  <Navigate to='/sign-up' replace />
                )
              }
            />

            <Route
              path='/main'
              element={
                <ProtectedRouteElement
                  element={Main}
                  path='/main'
                  loggedIn={loggedIn}
                  cards={cards}
                  isOpen={isEditAvatarPopupOpen}
                  onCardLike={handleCardLike}
                  onCardDislike={handleCardDislike}
                  onCardDelete={handleCardDelete}
                  onEditAvatar={handleEditAvatar}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={setSelectedCard}
                />
              }
            />

            <Route
              path='/sign-up'
              element={<Register onRegisterUser={handleRegisterUser} />}
            />

            <Route
              path='/sign-in'
              element={<Login onLoginUser={handleLoginUser} />}
            />
          </Routes>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onUpdateUser={handleUpdateUser}
            button={buttonSaveText}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onPostNewPlace={handlePostNewPlace}
            button={buttonCreateText}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onUpdateAvatar={handleUpdateAvatar}
            button={buttonSaveText}
          />

          <ImagePopup card={selectedCard} />

          <InfoTooltip
            isOpen={isStatePopupOpen}
            img={stateImg}
            subtitle={stateSubtitle}
          />

          {/*   <div className="popup popup_delete-card">
            <div className="popup__container popup__container_width popup__container_remove">
              <h2 className="popup__title">Вы уверены?</h2>
              <form className="popup__submit" noValidate>
                <button type="submit" className="popup__button popup__button_remove" name="popup__button">Да</button>
              </form>
              <button type="button" className="blackout popup__close"></button>
            </div>
          </div>*/}
        </div>
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
