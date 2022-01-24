import { useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import './SavedHeader.css';

const SavedHeader = (props) => {
  const { savedArticles } = props;
  const userContext = useContext(CurrentUserContext);

  const keyWordString = () => {};

  const keyWords = savedArticles.map((data) => data.keyword + ', ');
  const wordList = [...new Set(keyWords)];

  return (
    <section className='saved-news-header'>
      <p className='saved-news-header__title'>Saved articles</p>
      <h2 className='saved-news-header__greet'>
        {userContext.name}, you have {savedArticles.length} saved articles
      </h2>
      <p className='saved-news-header__keyword-list'>
        By keywords:{' '}
        <span className='saved-news-header__keywords'>
          {`${
            wordList.length > 3
              ? `${wordList.slice(0, 2)}  and ${wordList.length - 2} other..`
              : `${wordList.slice(0, 3)}`
          }`}
        </span>
      </p>
    </section>
  );
};

export default SavedHeader;
