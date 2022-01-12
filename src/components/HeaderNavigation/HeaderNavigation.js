import { NavLink, Link, useLocation } from 'react-router-dom';
import './HeaderNavigation.css';
import logoutIcon from '../../images/logout_white.svg';
import logoutIconBlack from '../../images/logout_black.svg';

const HeaderNavigation = (props) => {
  const location = useLocation();

  return (
    <div className='header-nav__container'>
      <nav className='header-nav'>
        <Link
          to='/'
          className={
            location.pathname === '/'
              ? 'header-nav__title'
              : 'header-nav__title header-nav__title_black'
          }
        >
          NewsExplorer
        </Link>
        <ul className='header-nav__items'>
          <li className='header-nav__item '>
            <NavLink
              to='/'
              activeClassName={
                location.pathname === '/' ? 'header-nav__link_active' : ''
              }
              className={
                location.pathname === '/'
                  ? 'header-nav__link'
                  : 'header-nav__link header-nav__link_black'
              }
            >
              Home
            </NavLink>
          </li>
          <li className='header-nav__item'>
            <NavLink
              to='/saved-news'
              activeClassName={
                location.pathname === '/'
                  ? 'header-nav__link_active'
                  : 'header-nav__link_active_black'
              }
              className={
                location.pathname === '/'
                  ? 'header-nav__link'
                  : 'header-nav__link header-nav__link_black'
              }
            >
              Saved Articles
            </NavLink>
          </li>
          <li className='header-nav__item'>
            <button
              onClick={props.signIn}
              className={
                location.pathname === '/'
                  ? 'header-nav__button'
                  : 'header-nav__button header-nav__button_black'
              }
            >
              Sign in
            </button>
          </li>
          {/* <li className='header-nav__item'>
            <button
              className={
                location.pathname === '/'
                  ? 'header-nav__signout-button'
                  : 'header-nav__signout-button header-nav__signout-button_black'
              }
            >
              Sharon
              <img
                className='header-nav__signout-icon'
                src={location.pathname === '/' ? logoutIcon : logoutIconBlack}
                alt='logout icon'
              />
            </button>
          </li> */}
        </ul>
      </nav>
    </div>
  );
};

export default HeaderNavigation;
