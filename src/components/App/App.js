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
  // I added a logged in state for you to see the styles change from the browser react components tab. will add the functionality in the next part
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
          <Main isLoggedIn={isLoggedIn} />
        </Route>
        <Route path='/saved-news'>
          <Main isLoggedIn={isLoggedIn} />
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
