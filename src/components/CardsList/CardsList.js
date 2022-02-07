import './CardsList.css';
import Card from '../Card/Card';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

const CardsList = (props) => {
  const { isLoggedIn, articles, onSaveCardClick, isLoggedInSavedNews } = props;
  const [articleNum, setArticleNum] = useState(3);
  const [showMoreButton, setShowMoreButton] = useState(true);
  const location = useLocation();

  const handleShowMoreClick = () => {
    if (articleNum < articles.length) {
      setArticleNum(articleNum + 3);
    } else {
      setShowMoreButton(false);
    }
  };

  return (
    <section className='news-cards-list'>
      <div className='news-cards-list__container'>
        {location.pathname === '/' && (
          <h2 className='news-cards-list__title'>Search Results</h2>
        )}
        <ul className='news-cards-list__list'>
          {articles.slice(0, articleNum).map((cardElement, index) => (
            <Card
              key={index}
              card={cardElement}
              isLoggedIn={isLoggedIn}
              onSaveCardClick={onSaveCardClick}
              isLoggedInSavedNews={isLoggedInSavedNews}
            />
          ))}
        </ul>
        <button
          onClick={handleShowMoreClick}
          className={`news-cards-list__button ${
            showMoreButton ? '' : 'news-cards-list__button_hidden'
          }`}
        >
          Show more
        </button>
      </div>
    </section>
  );
};

export default CardsList;
