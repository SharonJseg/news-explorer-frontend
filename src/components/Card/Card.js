import { useLocation } from 'react-router-dom';
import './Card.css';

const Card = (props) => {
  const { keyword, image, date, title, text, source, isLoggedIn } = props;
  const location = useLocation();

  console.log(isLoggedIn);

  return (
    <>
      <li className='card'>
        {location.pathname === '/saved-news' && (
          <>
            <button className='card__button card__button_type_delete' />
            <span className='card__tooltip'>Remove from saved</span>
            <span className='card__keyword'>{keyword}</span>
          </>
        )}

        {location.pathname === '/' && !isLoggedIn && (
          <>
            <button className='card__button card__button_type_bookmark' />
            <span className='card__tooltip'>Sign in to save articles</span>
          </>
        )}

        {/* Here I need to add a condition that tests if the card is saved and change the class of the button accordingly from type_bookmark to type_saved */}
        {location.pathname === '/' && isLoggedIn && (
          <>
            <button className='card__button card__button_type_bookmark' />
          </>
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
