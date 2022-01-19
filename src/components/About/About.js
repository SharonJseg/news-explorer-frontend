import './About.css';

const About = (props) => {
  return (
    <section className='about'>
      <div className='about__image-container'>
        <img
          src='https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
          alt='author'
          className='about__image'
        />
      </div>
      <div className='about__text-container'>
        <h2 className='about__title'>About the Author</h2>
        <p className='about__text'>
          This block describes the project author. Here you should indicate your
          name, what you do, and which development technologies you know.
        </p>
        <p className='about__text'>
          You can also talk about your experience with Practicum, what you
          learned there, and how you can help potential customers.
        </p>
      </div>
    </section>
  );
};

export default About;
