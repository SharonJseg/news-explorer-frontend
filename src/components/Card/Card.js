import { useLocation } from 'react-router-dom';
import './Card.css';

const Card = (props) => {
  const { keyword, image, date, title, text, source } = props;
  const location = useLocation();

  return (
    <>
      <li className='card'>
        <button className='card__button card__button_type_bookmark' />
        {location.pathname === '/' && (
          <span className='card__tooltip'>Sign in to save articles</span>
        )}

        {location.pathname === '/saved-news' && (
          <span className='card__keyword'>{keyword}</span>
        )}
        <img src={image} alt={title} className='card__image' />
        <p className='card__date'>{date}</p>
        <h3 className='card__title'>{title}</h3>
        <div className='card__text'>{text}</div>
        <cite className='card__source'>{source}</cite>
      </li>
    </>
  );
};

export default Card;
