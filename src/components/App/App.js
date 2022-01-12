import { Switch, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Modal from '../Modal/Modal';
import Form from '../Form/Form';

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleOpenModal = () => {
    setModalIsOpen(true);
    setShowMobileMenu(false);
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
      <Header
        handleScreenResize={handleScreenSize}
        onSignInClick={handleOpenModal}
        screenWidth={screenWidth}
        isLoggedIn={isLoggedIn}
        modalIsOpen={modalIsOpen}
        isMobileMenuOpen={showMobileMenu}
        handleOpenMenu={handleToggleMenu}
      />
      <Switch>
        <Route exact path='/'>
          <Main />
        </Route>
        <Route path='/saved-news'>
          <Main />
        </Route>
      </Switch>
      <Footer />
      <Modal isOpen={modalIsOpen} onClose={handleCloseModal}>
        <Form onClose={handleCloseModal} />
      </Modal>
    </>
  );
}

export default App;
