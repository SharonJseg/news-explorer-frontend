import { useLocation } from 'react-router-dom';
import { convertDate } from '../../utils/utilFunctions';
import './Card.css';

const Card = (props) => {
  const { card, isLoggedIn, onSaveCardClick, isLoggedInSavedNews } = props;
  const location = useLocation();

  const handleSaveCardClick = () => {
    onSaveCardClick(card);
  };

  return (
    <li className='card'>
      {location.pathname === '/saved-news' && (
        <>
          <button
            onClick={handleSaveCardClick}
            className='card__button card__button_type_delete'
          />
          <span className='card__tooltip'>Remove from saved</span>
          <span className='card__keyword'>{card.keyword}</span>
        </>
      )}

      {location.pathname === '/' && !isLoggedIn && (
        <>
          <button
            onClick={handleSaveCardClick}
            className='card__button card__button_type_bookmark'
          />
          <span className='card__tooltip'>Sign in to save articles</span>
        </>
      )}

      {location.pathname === '/' && isLoggedIn && (
        <>
          <button
            onClick={handleSaveCardClick}
            className={`card__button ${
              card.marked === 'true'
                ? 'card__button_type_saved'
                : 'card__button_type_bookmark'
            } `}
          />
        </>
      )}
      <a
        className='card__description'
        href={isLoggedInSavedNews === false ? card.url : card.link}
        target='_blank'
        rel='noopener noreferrer'
      >
        <img
          src={isLoggedInSavedNews === false ? card.urlToImage : card.image}
          alt={card.title}
          className='card__image'
        />
        <p className='card__date'>
          {isLoggedInSavedNews === false
            ? convertDate(card.publishedAt)
            : convertDate(card.date)}
        </p>
        <h3 className='card__title'>{card.title}</h3>
        <div className='card__text'>
          {isLoggedInSavedNews === false ? card.description : card.text}
        </div>
        <cite className='card__source'>
          {isLoggedInSavedNews === false ? card.source.name : card.source}
        </cite>
      </a>
    </li>
  );
};

export default Card;
