import { Switch, Route, Redirect } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './App.css';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Modal from '../Modal/Modal';
import Form from '../Form/Form';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import mainApi from '../../utils/MainApi';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [searchWord, setSearchWord] = useState('');
  const [token, setToken] = useState(localStorage.getItem('jwt'));
  const [registerFailedMessage, setRegisterFailedMessage] = useState(false);
  const [loginFailedMessage, setLoginFailedMessage] = useState(false);
  // I added a logged in state for you to see the styles change from the browser react components tab. will add the functionality in the next part
  const [isLoggedIn, setIsLoggedIn] = useState('');
  const history = useHistory();

  const resetFormErrors = () => {
    setLoginFailedMessage(false);
    setRegisterFailedMessage(false);
  };

  const handleOpenModal = () => {
    setModalIsOpen(true);
    setShowMobileMenu(false);
    setLoginFailedMessage('');
    setRegisterFailedMessage('');
  };

  const handleToggleMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const handleScreenSize = () => {
    setScreenWidth(window.innerWidth);
  };

  const handleSubmitLogin = ({ email, password }) => {
    console.log(email, password);
    mainApi
      .login(email, password)
      .then((res) => {
        setToken(res.token);
        setIsLoggedIn(true);
        handleCloseModal();
      })
      .catch((err) => {
        console.log(err);
        setLoginFailedMessage(true);
      });
  };

  const handleSubmitRegister = ({ email, password, name }) => {
    mainApi
      .register(email, password, name)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        setRegisterFailedMessage(true);
        console.log(err);
      });
  };

  const handleLogOut = () => {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    history.push('/');
  };

  useEffect(() => {
    const closeByEsc = (evt) => {
      if (evt.key === 'Escape') {
        handleCloseModal();
      }
    };

    document.addEventListener('keydown', closeByEsc);
    return () => document.removeEventListener('keydown', closeByEsc);
  }, []);

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          handleScreenResize={handleScreenSize}
          onSignInClick={handleOpenModal}
          screenWidth={screenWidth}
          isLoggedIn={isLoggedIn}
          modalIsOpen={modalIsOpen}
          isMobileMenuOpen={showMobileMenu}
          handleOpenMenu={handleToggleMenu}
          onLogout={handleLogOut}
        />
        <Switch>
          <Route exact path='/'>
            <Main isLoggedIn={isLoggedIn} />
          </Route>
          <ProtectedRoute
            path='/saved-news'
            exact
            component={Main}
            isLoggedIn={isLoggedIn}
          />
          <Route path='/'>
            <Redirect to='/' />
          </Route>
        </Switch>
        <Footer />
        <Modal isOpen={modalIsOpen} onClose={handleCloseModal}>
          <Form
            onClose={handleCloseModal}
            onHandleSubmitLogin={handleSubmitLogin}
            onHandleSubmitRegister={handleSubmitRegister}
            onLoginFail={loginFailedMessage}
            onRegisterFail={registerFailedMessage}
            onToggleForm={resetFormErrors}
          />
        </Modal>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
