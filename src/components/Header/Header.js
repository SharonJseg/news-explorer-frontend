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
  } = props;
  const location = useLocation();

  useEffect(() => {
    window.addEventListener('resize', handleScreenResize);
  });

  return (
    <>
      <header
        className={
          location.pathname === '/' ? 'header__home' : 'header__saved-articles'
        }
      >
        {screenWidth > 767 ? (
          <HeaderNavigation signIn={onSignInClick} />
        ) : (
          <MobileNav
            isMobileMenuOpen={isMobileMenuOpen}
            isModalOpen={modalIsOpen}
            signIn={onSignInClick}
            toggleMenu={handleOpenMenu}
          />
        )}
        {location.pathname === '/' && <SearchForm />}

        {location.pathname === '/saved-news' && <SavedHeader />}
      </header>
    </>
  );
};

export default Header;
