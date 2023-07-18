import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import api from '../utils/Api';
import authApi from '../utils/AuthApi';
import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const handleTokenCheck = () => {
      const token = localStorage.getItem('token');
      if (token) {
        authApi.checkToken(token)
          .then((res) => {
            if (res) {
              setEmail(res.data.email);
              setLoggedIn(true);
              navigate("/", { replace: true });
            }
          })
          .catch(console.error);
      }
    }
    handleTokenCheck();
  }, [navigate])

  // Вариант от Ревьювера "Можно лучше". Как сделать закрытие по Escape.
  // const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard.link
  // useEffect(() => {
  //   function closeByEscape(evt) {
  //     if(evt.key === 'Escape') {
  //       closeAllPopups();
  //     }
  //   }
  //   if(isOpen) { // навешиваем только при открытии
  //     document.addEventListener('keydown', closeByEscape);
  //     return () => {
  //       document.removeEventListener('keydown', closeByEscape);
  //     }
  //   }
  // }, [isOpen]) 

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userData, cards]) => {
          setCurrentUser(userData);
          setCards(cards);
        })
        .catch(console.error);
    }
  }, [loggedIn]);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard({});
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.addLike(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(console.error);
  }

  function handleCardDelete(id) {
    api.deleteCard(id)
      .then(() => {
        setCards((state) => state.filter((card) => card._id !== id));
      })
      .catch(console.error);
  }

  function handleUpdateUser(userData) {
    setIsLoading(true);
    api.setUserInfo(userData)
      .then(userData => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(userAvatar) {
    setIsLoading(true);
    api.setAvatar(userAvatar)
      .then(avatar => {
        setCurrentUser(avatar);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlace(data) {
    setIsLoading(true);
    api.postNewCard(data)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleRegister(data) {
    authApi.registration(data)
      .then(() => {
        setIsSuccess(true);
        navigate("/sign-in", { replace: true })
      })
      .catch((err) => {
        setIsSuccess(false);
        console.log(err);
      })
      .finally(() => {
        setIsInfoTooltipPopupOpen(true);
      });
  }

  function handleLogin(data) {
    authApi.login(data)
      .then((res) => {
        if (res) {
          localStorage.setItem('token', res.token);
          setLoggedIn(true);
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        setIsSuccess(false);
        setIsInfoTooltipPopupOpen(true);
        console.log(err);
      });
  }

  function handleLogOut() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setEmail("");
    navigate("/sign-in", { replace: true });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Header userEmail={email} handleLogOut={handleLogOut} />
          <Routes>
            <Route path="/sign-up" element={<Register handleRegister={handleRegister} />} />
            <Route path="/sign-in" element={<Login handleLogin={handleLogin} />} />
            <Route path="/"
              element={
                <ProtectedRoute
                  loggedIn={loggedIn}
                  element={Main}
                  cards={cards}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
              }
            />
            <Route path="*" element={loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />}
            />
          </Routes>
          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlace}
            isLoading={isLoading}
          />
          {/* Реализовать попап подтверждения удаления карточки */}
          {/* <PopupWithForm
            name="confirm"
            title="Вы уверены?"
            ariaLabel="Закрыть окно подтверждения удаления"
            buttonText="Да"
          /> */}

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          />

          <InfoTooltip
            isOpen={isInfoTooltipPopupOpen}
            onClose={closeAllPopups}
            isSuccess={isSuccess}
          />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}
