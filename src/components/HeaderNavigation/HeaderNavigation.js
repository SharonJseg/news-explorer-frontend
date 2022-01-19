import { NavLink, Link, useLocation } from 'react-router-dom';
import './HeaderNavigation.css';
import logoutIcon from '../../images/logout_white.svg';
import logoutIconBlack from '../../images/logout_black.svg';

const HeaderNavigation = (props) => {
  const { isLoggedIn } = props;
  const location = useLocation();

  return (
    <div className='nav'>
      <nav className='nav__container'>
        <Link
          to='/'
          className={
            location.pathname === '/'
              ? 'nav__title'
              : 'nav__title nav__title_black'
          }
        >
          NewsExplorer
        </Link>
        <ul className='nav__items'>
          <li className='nav__item '>
            <NavLink
              to='/'
              activeClassName={
                location.pathname === '/' ? 'nav__link_active' : ''
              }
              className={
                location.pathname === '/'
                  ? 'nav__link'
                  : 'nav__link nav__link_black'
              }
            >
              Home
            </NavLink>
          </li>
          {isLoggedIn && (
            <li className='nav__item'>
              <NavLink
                to='/saved-news'
                activeClassName={
                  location.pathname === '/'
                    ? 'nav__link_active'
                    : 'nav__link_active_black'
                }
                className={
                  location.pathname === '/'
                    ? 'nav__link'
                    : 'nav__link nav__link_black'
                }
              >
                Saved Articles
              </NavLink>
            </li>
          )}
          {!isLoggedIn && (
            <li className='nav__item'>
              <button
                onClick={props.signIn}
                className={
                  location.pathname === '/'
                    ? 'nav__button'
                    : 'nav__button nav__button_black'
                }
              >
                Sign in
              </button>
            </li>
          )}
          {isLoggedIn && (
            <li className='nav__item'>
              <button
                className={
                  location.pathname === '/'
                    ? 'nav__signout-button'
                    : 'nav__signout-button nav__signout-button_black'
                }
              >
                Sharon
                <img
                  className='nav__signout-icon'
                  src={location.pathname === '/' ? logoutIcon : logoutIconBlack}
                  alt='logout icon'
                />
              </button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default HeaderNavigation;
