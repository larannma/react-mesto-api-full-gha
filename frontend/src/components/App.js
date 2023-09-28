import React from "react";
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import logo from "../images/header__logo.svg";
import Header from "./Header"
import Footer from "./Footer";
import Main from "./Main";
import EditProfilePopup from "./EditProfilePopup";
import ImagePopup from "./ImagePopup";
import api from "../utils/api"
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login"
import Register from "./Register"
import InfoTooltip from "./InfoTooltip.js"
import sucessImage from "../images/Success.png"
import failImage from "../images/Fail.png"
import ProtectedRouteElement from "./ProtectedRoute.js"
import * as Auth from '../utils/Auth.js';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isRegisterPopupOpen, setRegisterPopupOpen] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState({});
  const [registerStatusImage, setRegisterStatusImage] = React.useState(sucessImage);
  const [registerStatusText, setRegisterStatusText] = React.useState("");

  const avatarPhotoRef = React.useRef();

  const navigate = useNavigate();

  React.useEffect(() => {
    tokenCheck();
  }, [loggedIn])

  const tokenCheck = () => {
    const token = localStorage.getItem('token');
    if (token){
          Auth.getContent(token).then((res) => {
          if (res){
            setUserData({
              email: res.email
            });
            api.getUserInfo(localStorage.getItem('token')).then((res) => {
              setCurrentUser(res);
            }).catch((err => {
              console.log(err)
            }));
            setLoggedIn(true);
            navigate("/my-profile", {replace: true})
          }
        }).catch(error => console.log(error));
    }
  } 

  React.useEffect(() => {
    api.getUserInfo(localStorage.getItem('token')).then((res) => {
      setCurrentUser(res);
    }).catch((err => {
      console.log(err)
    }));
  }, []);

  React.useEffect(() => {
    api.getCards(localStorage.getItem('token')).then((res) => {
      setCards(res);
    }).catch((err => {
      console.log(err)
    }));
  }, []);

  function handleCardClick(cardInfo) {
    setImagePopupOpen(true);
    setSelectedCard(cardInfo);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setAddPlacePopupOpen(false);
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setImagePopupOpen(false);
    setRegisterPopupOpen(false);
    setSelectedCard({});
  }

  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isImagePopupOpen

  React.useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if(isOpen) { // навешиваем только при открытии
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen]) 


  function handleCardLike(card) {
      const isLiked = card.likes.some(i => (
        i === currentUser._id
      ));
      
      if (!isLiked) {
        api.putLike(currentUser, card._id, getToken()).then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        }).catch((err => {
          console.log(err)
        }));
      } else {
        api.deleteLike(currentUser, card._id, getToken()).then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        }).catch((err => {
          console.log(err)
        }));
      }
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id, getToken()).then(() => {
      setCards((state) => state.filter(c => c._id !== card._id));
    }).catch((err => {
      console.log(err)
    }));
  }

  const getToken = () => {
    return (localStorage.getItem('token'))
  }

  const handleUpdateUser = (data) => {
    api.editUserInfo(data.name, data.description, getToken()).then((res) => {
      console.log(res)
      setCurrentUser(res);
      closeAllPopups();
    }).catch((err => {
      console.log(err)
    }));
  }

  const handleUpdateAvatar = (data) => {
    api.editUserPhoto(data.avatar, getToken()).then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    }).catch((err => {
      console.log(err)
    }));
  }

  const onAddPlace = (data) => {
    api.postCard(data.placeName, data.placeLink, getToken()).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    }).catch((err => {
      console.log(err)
    }));
  }

  const handleLogin = () => {
    setLoggedIn(true);
  }

  const handleExit = () => {
    setLoggedIn(false);
  }

  const handleRegistration = (imageStatus) => {
    if (imageStatus === "success"){
      setRegisterStatusImage(sucessImage);
      setRegisterStatusText("Вы успешно зарегистрировались!")
    }else{
      setRegisterStatusImage(failImage);
      setRegisterStatusText("Что-то пошло не так! Попробуйте ещё раз.")
    }
    setRegisterPopupOpen(true);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App root">
        <div className="root__page">
          <Header logo={logo} userEmail={userData.email} loggedIn={loggedIn} handleExit={handleExit}/>
          <Routes>
            <Route path="/" element={loggedIn ? <Navigate to="/my-profile" replace /> : <Navigate to="/sign-in" replace />} /> 
            <Route path="/sign-up" element={<Register handleRegistration={handleRegistration}/>} />
            <Route path="/sign-in" element={<Login handleLogin={handleLogin}/>} />
            <Route path="/my-profile" element={<ProtectedRouteElement element={
              Main} loggedIn={loggedIn} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick} cards={cards} onCardClick={handleCardClick}
              onLikeClick={handleCardLike} onCardDelete={handleCardDelete}/>}/>
          </Routes>
          <Footer />
          <InfoTooltip onClose={closeAllPopups} isOpen={isRegisterPopupOpen} image={registerStatusImage} text={registerStatusText}/>
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdate={handleUpdateUser} buttonText={"Сохранить"}/>
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onSubmit={onAddPlace} buttonText={"Создать"}/>
          <ImagePopup onClose={closeAllPopups} isOpen={isImagePopupOpen} card={selectedCard}/>
          <EditAvatarPopup avatarPhotoRef={avatarPhotoRef} onSubmit={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} buttonText={"Сохранить"}/>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
