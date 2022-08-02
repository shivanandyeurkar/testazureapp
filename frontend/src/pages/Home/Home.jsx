import React from 'react';
import Form from '../../components/Form/Form';

import './Home.scss';

const Home = () => (
  <main className="home">
    <div className="home__content-container">
      <div className="home__introduction">
        <h1 className="home__heading-primary">
          <span className="home__heading-top">Cloud Transition</span>
          <span className="home__heading-bottom">ROI Calculator</span>
        </h1>
        <h3 className="home__heading-secondary">
          See how much you can save by transitioning to Neos
        </h3>
      </div>
      <div className="home__form-container">
        <Form />
      </div>
    </div>
  </main>
);

export default Home;
