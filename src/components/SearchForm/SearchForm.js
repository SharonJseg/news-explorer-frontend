import './SearchForm.css';

const SearchForm = (props) => {
  return (
    <section className='search-form'>
      <h2 className='search-form__title'>What's going on in the world?</h2>
      <p className='search-form__subtitle'>
        Find the latest news on any topic and save them in your personal
        account.
      </p>
      <form className='search-form__form'>
        <input
          type='text'
          className='search-form__input'
          placeholder='Search for an article'
        />
        <button className='search-form__button'>Search</button>
      </form>
    </section>
  );
};

export default SearchForm;
