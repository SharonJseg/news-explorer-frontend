import './CardsList.css';
import Card from '../Card/Card';
import { useLocation } from 'react-router-dom';

const MOCK_CARDS = [
  {
    id: 'c1',
    keyword: 'Nature',
    image:
      'https://images.unsplash.com/photo-1640387346352-5386d02b18a3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
    date: 'November 4, 2020',
    title: `Everyone Needs a Special 'Sit Spot' in Nature`,
    text: `We all know how good nature can make us feel. We have known it for millennia: the sound of the ocean, the scents of a forest, the way dappled sunlight dances through leaves.`,
    source: 'treehugger',
  },
  {
    id: 'c2',
    keyword: 'Nature',
    image:
      'https://images.unsplash.com/photo-1641676265135-48be29ddd4a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0NHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
    date: 'February 19, 2019',
    title: `Nature makes you better`,
    text: `We all know how good nature can make us feel. We have known it for millennia: the sound of the ocean, the scents of a forest, the way dappled sunlight dances through leaves.`,
    source: 'National Geographic',
  },
  {
    id: 'c3',
    keyword: 'Yellowstone',
    image:
      'https://images.unsplash.com/photo-1641621393945-881745ee9978?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0M3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
    date: 'October 19, 2020',
    title: `Nostalgic Photos of Tourists in U.S. National Parks`,
    text: `Uri Løvevild Golman and Helle Løvevild Golman are National Geographic Explorers and conservation photographers who just completed a project and book they call their love letter to...`,
    source: 'National Geographic',
  },
  {
    id: 'c4',
    keyword: 'Parks',
    image:
      'https://images.unsplash.com/photo-1616193362330-893fe1ec39f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
    date: 'November 4, 2020',
    title: `Grand Teton Renews Historic Crest Trail`,
    text: `“The linking together of the Cascade and Death Canyon trails, at their heads, took place on October 1, 1933, and marked the first step in the realization of a plan whereby the hiker will be...`,
    source: 'National parks traveler',
  },
  {
    id: 'c5 ',
    keyword: 'Photography',
    image:
      'https://images.unsplash.com/photo-1641739905816-98e62fd6fa27?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
    date: 'March 16, 2020',
    title: `Scientists Don't Know Why Polaris Is So Weird`,
    text: `Humans have long relied on the starry sky to push into new frontiers, sail to the very edge of the world and find their way back home again. Even animals look to the stars to guide them.`,
    source: 'treehugger',
  },
];

const CardsList = (props) => {
  const { isLoggedIn } = props;
  const location = useLocation();
  return (
    <section className='news-cards-list'>
      <div className='news-cards-list__container'>
        {location.pathname === '/' && (
          <h2 className='news-cards-list__title'>Search Results</h2>
        )}
        <ul className='news-cards-list__list'>
          {MOCK_CARDS.map((cardElement) => (
            <Card
              key={cardElement.id}
              keyword={cardElement.keyword}
              image={cardElement.image}
              date={cardElement.date}
              title={cardElement.title}
              text={cardElement.text}
              source={cardElement.source}
              isLoggedIn={isLoggedIn}
            />
          ))}
        </ul>
        <button className='news-cards-list__button'>Show more</button>
      </div>
    </section>
  );
};

export default CardsList;
