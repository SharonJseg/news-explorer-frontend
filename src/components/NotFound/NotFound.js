import './NotFound.css';
import notFoundIcon from '../../images/not_found.svg';

const NotFound = (props) => {
  return (
    <section className='not-found'>
      <img
        src={notFoundIcon}
        alt='not found icon'
        className='not-found__image'
      />
      <h2 className='not-found__title'>Nothing found</h2>
      <p className='not-found__text'>
        Sorry, but nothing matched your search terms.
      </p>
    </section>
  );
};

export default NotFound;
