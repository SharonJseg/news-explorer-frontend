import { useLocation } from 'react-router-dom';
import HeaderNavigation from '../HeaderNavigation/HeaderNavigation';
import MobileNav from '../MobileNav/MobileNav';
import SearchForm from '../SearchForm/SearchForm';
import SavedHeader from '../SavedHeader/SavedHeader';

import './Header.css';
import { useEffect } from 'react';

const Header = (props) => {
  const {
    handleScreenResize,
    onSignInClick,
    screenWidth,
    modalIsOpen,
    isMobileMenuOpen,
    handleOpenMenu,
    isLoggedIn,
    onLogout,
  } = props;
  const location = useLocation();

  useEffect(() => {
    window.addEventListener('resize', handleScreenResize);
  });

  return (
    <>
      <header
        className={
          location.pathname === '/' ? 'header' : 'header-saved-articles'
        }
      >
        {screenWidth > 767 ? (
          <HeaderNavigation
            isLoggedIn={isLoggedIn}
            signIn={onSignInClick}
            onLogout={onLogout}
          />
        ) : (
          <MobileNav
            isMobileMenuOpen={isMobileMenuOpen}
            isModalOpen={modalIsOpen}
            signIn={onSignInClick}
            toggleMenu={handleOpenMenu}
            isLoggedIn={isLoggedIn}
            onLogout={onLogout}
          />
        )}
        {location.pathname === '/' && <SearchForm />}

        {location.pathname === '/saved-news' && (
          <SavedHeader isloggedIn={isLoggedIn} />
        )}
      </header>
    </>
  );
};

export default Header;
