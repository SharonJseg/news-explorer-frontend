import './Preloader.css';

const Preloader = (props) => {
  return (
    <div className='circle-preloader'>
      <i className='circle-preloader__animated'></i>
      <p className='circle-preloader__text'>Searching for news...</p>
    </div>
  );
};

export default Preloader;
