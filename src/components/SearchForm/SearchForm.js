import { useState } from 'react';
import './SearchForm.css';

const SearchForm = (props) => {
  const { onSearchClick } = props;

  const [searchWord, setSearchWord] = useState('');

  const handleSearchClick = (evt) => {
    evt.preventDefault();
    onSearchClick(searchWord);
  };

  return (
    <section className='search-form'>
      <h2 className='search-form__title'>What's going on in the world?</h2>
      <p className='search-form__subtitle'>
        Find the latest news on any topic and save them in your personal
        account.
      </p>
      <form onSubmit={handleSearchClick} className='search-form__form'>
        <input
          type='text'
          className='search-form__input'
          placeholder='Search for an article'
          onChange={(e) => setSearchWord(e.target.value)}
          value={searchWord}
        />
        <button type='submit' className='search-form__button'>
          Search
        </button>
      </form>
    </section>
  );
};

export default SearchForm;
