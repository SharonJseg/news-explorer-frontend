import { NavLink, Link, useLocation } from 'react-router-dom';

import './MobileNav.css';
import mobileMenuIcon from '../../images/mobile_menu_icon.svg';
import mobileMenuDark from '../../images/mobile_menu_icon_dark.svg';
import mobileCloseMenu from '../../images/mobile_menu_close_icon.svg';
import mobileCloseMenuDark from '../../images/mobile_menu_close_icon_dark.svg';

const MobileNav = (props) => {
  const { isModalOpen, isMobileMenuOpen, toggleMenu } = props;
  const location = useLocation();

  return (
    <div className='mobile-nav__container'>
      {isMobileMenuOpen === false ? (
        <nav className='mobile-nav'>
          <Link
            to='/'
            className={
              location.pathname === '/'
                ? 'mobile-nav__title'
                : 'mobile-nav__title mobile-nav__title_black'
            }
          >
            NewsExplorer
          </Link>
          <button
            className='mobile-nav__button'
            aria-label='menu button'
            onClick={toggleMenu}
          >
            {isMobileMenuOpen === false ? (
              <img
                className='mobile-nav__icon'
                src={
                  location.pathname === '/' ? mobileMenuIcon : mobileMenuDark
                }
                alt='logout icon'
              />
            ) : (
              <img
                className='mobile-nav__icon'
                src={
                  location.pathname === '/'
                    ? mobileCloseMenu
                    : mobileCloseMenuDark
                }
                alt='logout icon'
              />
            )}
          </button>
        </nav>
      ) : (
        <nav className='mobile-nav mobile-nav_open'>
          <Link to='/' className='mobile-nav__title'>
            NewsExplorer
          </Link>
          <button
            className='mobile-nav__button'
            aria-label='menu button'
            onClick={toggleMenu}
          >
            {isMobileMenuOpen === false ? (
              <img
                className='mobile-nav__icon'
                src={
                  location.pathname === '/' ? mobileMenuIcon : mobileMenuDark
                }
                alt='logout icon'
              />
            ) : (
              <img
                className='mobile-nav__icon'
                src={mobileCloseMenu}
                alt='logout icon'
              />
            )}
          </button>
          <div
            className={
              isModalOpen
                ? 'mobile-nav__items-container'
                : 'mobile-nav__items-container mobile-nav__items-container_open'
            }
          >
            <ul className='mobile-nav__items'>
              <li className='mobile-nav__item'>
                <NavLink
                  onClick={toggleMenu}
                  to='/'
                  className='mobile-nav__link'
                >
                  Home
                </NavLink>
              </li>
              <li className='mobile-nav__item'>
                <NavLink
                  onClick={toggleMenu}
                  to='/saved-news'
                  className='mobile-nav__link'
                >
                  Saved Articles
                </NavLink>
              </li>
              <li className='mobile-nav__item'>
                <button onClick={props.signIn} className='mobile-nav__signin'>
                  Sign in
                </button>
              </li>
            </ul>
          </div>
        </nav>
      )}
    </div>
  );
};

export default MobileNav;
