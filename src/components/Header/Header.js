import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import HeaderNavigation from '../HeaderNavigation/HeaderNavigation';
import MobileNav from '../MobileNav/MobileNav';
import SearchForm from '../SearchForm/SearchForm';
import SavedHeader from '../SavedHeader/SavedHeader';

import './Header.css';

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
    onSearchClick,
    onSavedNewsClick,
    onHomePageClick,
    savedArticles,
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
            onSavedNewsClick={onSavedNewsClick}
            onHomePageClick={onHomePageClick}
          />
        ) : (
          <MobileNav
            isMobileMenuOpen={isMobileMenuOpen}
            isModalOpen={modalIsOpen}
            signIn={onSignInClick}
            toggleMenu={handleOpenMenu}
            isLoggedIn={isLoggedIn}
            onLogout={onLogout}
            onSavedNewsClick={onSavedNewsClick}
            onHomePageClick={onHomePageClick}
          />
        )}
        {location.pathname === '/' && (
          <SearchForm onSearchClick={onSearchClick} />
        )}

        {location.pathname === '/saved-news' && (
          <SavedHeader isloggedIn={isLoggedIn} savedArticles={savedArticles} />
        )}
      </header>
    </>
  );
};

export default Header;
