import { Switch, Route, Redirect } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';
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
  const [modalType, setModalType] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState('');
  const history = useHistory();

  // const handleOpenModal = () => {
  //   setModalIsOpen(true);
  //   setShowMobileMenu(false);
  //   setLoginFailedMessage(false);
  //   setRegisterFailedMessage(false);
  // };

  const handleToggleMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const handleScreenSize = () => {
    setScreenWidth(window.innerWidth);
  };

  const handleLoginButton = () => {
    setModalType('signin');
    setModalIsOpen(true);
    setShowMobileMenu(false);
    setRegisterFailedMessage(false);
    setLoginFailedMessage(false);
  };
  const handleRegisterButton = () => {
    setModalType('signup');
    setRegisterFailedMessage(false);
    setLoginFailedMessage(false);
  };

  const handleSubmitLogin = ({ email, password }) => {
    mainApi
      .login(email, password)
      .then((res) => {
        setToken(res.token);
        setIsLoggedIn(true);
        handleCloseModal();
        setLoginFailedMessage(false);
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
        setModalType('success');
      })
      .catch((err) => {
        setRegisterFailedMessage(true);
        console.log(err);
      });
  };

  const handleLogOut = () => {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    setShowMobileMenu(false);
    history.push('/');
  };

  useEffect(() => {
    if (token) {
      mainApi
        .getUserInfo(token)
        .then((res) => {
          setIsLoggedIn(true);
          setCurrentUser(res.data);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      setIsLoggedIn(false);
    }
  }, [token]);

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
    <CurrentUserContext.Provider value={currentUser}>
      <>
        <Header
          handleScreenResize={handleScreenSize}
          onSignInClick={handleLoginButton}
          // onSignInClick={handleOpenModal}
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
            modalType={modalType}
            onSignInClick={handleLoginButton}
            onRegisterClick={handleRegisterButton}
          />
        </Modal>
      </>
    </CurrentUserContext.Provider>
  );
}

export default App;
