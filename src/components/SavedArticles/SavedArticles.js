import { useContext } from 'react';
import Card from '../Card/Card';
import CurrentUserContext from '../../contexts/CurrentUserContext';

const SavedArticles = (props) => {
  const { savedArticles, isLoggedIn, onSaveCardClick } = props;
  const currentUser = useContext(CurrentUserContext);

  return (
    <section className='news-cards-list'>
      <div className='news-cards-list__container'>
        <ul className='news-cards-list__list'>
          {savedArticles.map(
            (cardElement) =>
              cardElement.owner === currentUser._id && (
                <Card
                  key={cardElement._id}
                  card={cardElement}
                  isLoggedIn={isLoggedIn}
                  onSaveCardClick={onSaveCardClick}
                />
              ),
          )}
        </ul>
      </div>
    </section>
  );
};

export default SavedArticles;
