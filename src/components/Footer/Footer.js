import { Link } from 'react-router-dom';
import './Footer.css';
import githubIcon from '../../images/github.svg';
import facebookIcon from '../../images/facebook.svg';

const Footer = (props) => {
  return (
    <footer className='footer'>
      <p className='footer__copyright'>© 2020 Supersite, Powered by News API</p>
      <nav className='footer__nav'>
        <div className='footer__nav-links'>
          <Link to='/' className='footer__link'>
            Home
          </Link>
          <a
            href='https://practicum.yandex.com'
            target='_blank'
            rel='noreferrer'
            className='footer__link'
          >
            Practicum by Yandex
          </a>
        </div>
        <div className='footer__nav-icons-container'>
          <a
            href='https://www.github.com'
            className='footer__link footer__link-container'
            target='_blank'
            rel='noreferrer'
          >
            <img src={githubIcon} alt='github' />
          </a>
          <a
            href='https://www.facebook.com'
            className='footer__link footer__link-container'
            target='_blank'
            rel='noreferrer'
          >
            <img src={facebookIcon} alt='facebook' />
          </a>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
