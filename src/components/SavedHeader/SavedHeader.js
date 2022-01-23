import { useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import './SavedHeader.css';

const SavedHeader = (props) => {
  const userContext = useContext(CurrentUserContext);

  return (
    <section className='saved-news-header'>
      <p className='saved-news-header__title'>Saved articles</p>
      <h2 className='saved-news-header__greet'>
        {userContext.name}, you have 5 saved articles
      </h2>
      <p className='saved-news-header__keyword-list'>
        By keywords:{' '}
        <span className='saved-news-header__keywords'>
          Nature, Yellowstone, and 2 other
        </span>
      </p>
    </section>
  );
};

export default SavedHeader;
