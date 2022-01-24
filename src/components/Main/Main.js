import { useLocation } from 'react-router-dom';

import CardsList from '../CardsList/CardsList';
import About from '../About/About';
import Preloader from '../Preloader/Preloader';
import NotFound from '../NotFound/NotFound';

import './Main.css';

const Main = (props) => {
  const {
    isLoggedIn,
    searchIsOpen,
    isLoaderOpen,
    isNotFound,
    articles,
    onSaveCardClick,
    isLoggedInSavedNews,
  } = props;
  const location = useLocation();

  return (
    <main className='main'>
      {isLoaderOpen && <Preloader />}
      {isNotFound && <NotFound />}
      {searchIsOpen && (
        <CardsList
          isLoggedIn={isLoggedIn}
          articles={articles}
          onSaveCardClick={onSaveCardClick}
          isLoggedInSavedNews={isLoggedInSavedNews}
        />
      )}
      {location.pathname === '/' && <About />}
    </main>
  );
};

export default Main;
