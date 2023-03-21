import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { useEffect, useState } from 'react';
import { Navigate, Route, redirect } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/api";

import ImagePopup from "./ImagePopup";
import imageLoading from "../images/loading.gif";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import { Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import Login from "./Login";

function App () {
  const [isLoadingCards, setIsLoadingCards] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false);
  const [futureDeletedCard, setFutureDeletedCard] = useState('');
  const [selectedCard, setSelectedCard] = useState({ name: 'загрузка', link: imageLoading });
  const [currentUser, setСurrentUser] = useState({ name: 'загрузка...', about: 'загрузка...', avatar: imageLoading, _id: '' });
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(true);

  function handleEditProfileClick () {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick () {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleCardClick (card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleCardLike (card, value) {
    api.setLike(card._id, value)
      .then((newCard) => {
        setCards((state) => state.map((oldCard) => oldCard._id === card._id ? newCard : oldCard));
      })
      .catch((error) => console.error(error))
  }

  function handleConfirmCardDelete (_id) {
    setFutureDeletedCard(_id);
    setIsConfirmDeletePopupOpen(true)
  }

  function handleCardDelete (_id) {
    setIsLoading(true);
    api.removeCard(_id)
      .then(() => {
        const newArrCards = cards.filter((item) => item._id !== _id);
        setCards(newArrCards);
        closeAllPopups();
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleUpdateUser ({ name, about }) {
    setIsLoading(true);
    api.patchUserInfo(name, about)
      .then(({ name, about, avatar, _id }) => {
        setСurrentUser({ name, about, avatar, _id });
        closeAllPopups();
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setIsLoading(false);
      })
  }
  function handleAddPlaceSubmit ({ title, url }) {
    setIsLoading(true);
    api.addCard(title, url)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar ({ avatar }) {
    setIsLoading(true);
    api.replaceAvatar(avatar)
      .then(({ avatar }) => {
        setСurrentUser({ ...currentUser, avatar });
        closeAllPopups();
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setIsLoading(false);
      })
  }

  function closeAllPopups () {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmDeletePopupOpen(false)
    setSelectedCard({ name: 'загрузка', link: imageLoading });
  }

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCardList()])
      .then(([{ name, about, avatar, _id }, cardsFromServer]) => {
        setСurrentUser({ name, about, avatar, _id });
        setCards(cardsFromServer);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setIsLoadingCards(false));
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header />
        <Routes>
          <Route path="/" element={loggedIn ? <Main
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleConfirmCardDelete}
            onLoading={isLoadingCards}
            loggedIn={loggedIn}
          /> : <Navigate to="/sign-in" replace />} />
          <Route path="/sign-in" element={<Login isLoading={isLoading} />} />
          <Route path="/sign-up" element={<Register isLoading={isLoading} />} />
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
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          isLoading={isLoading}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ConfirmDeletePopup
          isOpen={isConfirmDeletePopupOpen}
          onClose={closeAllPopups}
          isLoading={isLoading}
          onCardDelete={handleCardDelete}
          onFutureDeletedCard={futureDeletedCard}
        />
        <ImagePopup
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
          card={selectedCard}
        />
      </div>
    </CurrentUserContext.Provider>

  );
}

export default App;
