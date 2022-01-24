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
import SavedArticles from '../SavedArticles/SavedArticles';
import mainApi from '../../utils/MainApi';
import * as newsApi from '../../utils/NewsApi';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [searchIsOpen, setSearchIsOpen] = useState(false);
  const [searchWord, setSearchWord] = useState('');
  const [noArticlesFound, setNoArticlesFound] = useState(false);
  const [loader, setLoader] = useState(false);
  const [articleCards, setArticleCards] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('jwt'));
  const [registerFailedMessage, setRegisterFailedMessage] = useState(false);
  const [loginFailedMessage, setLoginFailedMessage] = useState(false);
  const [modalType, setModalType] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggedInSavedNews, setIsLoggedInSavedNews] = useState(false);
  const history = useHistory();

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
    setIsLoggedInSavedNews(false);
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
    setSearchIsOpen(false);
    history.push('/');
  };

  const handleSearch = (searchWord) => {
    setSearchWord(searchWord);
    setLoader(true);
    setNoArticlesFound(false);
    setSearchIsOpen(false);
    newsApi
      .getArticles(searchWord)
      .then((articleArray) => {
        setLoader(false);
        if (articleArray.articles.length > 0) {
          setArticleCards(articleArray.articles);
          articleArray.articles.map((cardObj) => (cardObj.marked = 'false'));
          setSearchIsOpen(true);
        } else {
          setNoArticlesFound(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
        setSearchIsOpen(false);
      });
  };

  const deleteArticle = (article) => {
    mainApi
      .deleteArticle(article._id, token)
      .then(() => {
        setSavedArticles((articleArray) =>
          articleArray.filter((a) => a._id !== article._id),
        );
        setArticleCards((articleState) =>
          articleState.map((a) =>
            a.title === article.title ? { ...a, marked: 'false' } : a,
          ),
        );
      })
      .catch((err) => console.log(err));
  };

  const handleSaveCard = (card) => {
    if (isLoggedIn) {
      if (card.owner === currentUser._id || card.marked === 'true') {
        if (card.marked === 'true') {
          const foundSavedArticle = savedArticles.find(
            (f) => f.title === card.title,
          );
          deleteArticle(foundSavedArticle);
        } else {
          deleteArticle(card);
        }
      } else {
        mainApi
          .saveArticle(token, card, searchWord)
          .then((newArticle) => {
            setSavedArticles([...savedArticles, newArticle]);
            setArticleCards((state) =>
              state.map((c) =>
                c.title === card.title ? { ...c, marked: 'true' } : c,
              ),
            );
          })
          .catch((err) => console.log(err));
      }
    } else {
      handleLoginButton();
    }
  };

  const handleToggleMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const handleLoggedInSavedNewsClick = () => {
    setIsLoggedInSavedNews(true);
    handleToggleMenu();
  };

  const handleAtHomeClick = () => {
    setIsLoggedInSavedNews(false);
    handleToggleMenu();
  };

  useEffect(() => {
    if (token) {
      mainApi
        .getUserInfo(token)
        .then((res) => {
          setIsLoggedIn(true);
          setCurrentUser(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      setIsLoggedIn(false);
    }
  }, [token, savedArticles]);

  useEffect(() => {
    if (token) {
      mainApi.getUserArticles(token).then((res) => {
        setSavedArticles(res);
      });
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
          screenWidth={screenWidth}
          isLoggedIn={isLoggedIn}
          modalIsOpen={modalIsOpen}
          isMobileMenuOpen={showMobileMenu}
          handleOpenMenu={handleToggleMenu}
          onLogout={handleLogOut}
          onSearchClick={handleSearch}
          onSavedNewsClick={handleLoggedInSavedNewsClick}
          onHomePageClick={handleAtHomeClick}
          savedArticles={savedArticles}
        />
        <Switch>
          <Route exact path='/'>
            <Main
              isLoggedIn={isLoggedIn}
              searchIsOpen={searchIsOpen}
              isLoaderOpen={loader}
              isNotFound={noArticlesFound}
              articles={articleCards}
              onSaveCardClick={handleSaveCard}
              isLoggedInSavedNews={isLoggedInSavedNews}
            />
          </Route>
          <ProtectedRoute exact isLoggedIn={isLoggedIn} path='/saved-news'>
            <SavedArticles
              isLoggedIn={isLoggedIn}
              onSaveCardClick={handleSaveCard}
              savedArticles={savedArticles}
              isLoggedInSavedNews={isLoggedInSavedNews}
            />
          </ProtectedRoute>
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
