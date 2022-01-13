import { useLocation } from 'react-router-dom';

import CardsList from '../CardsList/CardsList';
import About from '../About/About';
import Preloader from '../Preloader/Preloader';
import NotFound from '../NotFound/NotFound';

import './Main.css';

const Main = (props) => {
  const { isLoggedIn } = props;
  const location = useLocation();

  return (
    <main className='main'>
      {/* <NotFound /> */}
      {/* <Preloader /> */}
      <CardsList isLoggedIn={isLoggedIn} />
      {location.pathname === '/' && <About />}
    </main>
  );
};

export default Main;
