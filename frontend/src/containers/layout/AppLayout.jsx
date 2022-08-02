import * as React from 'react';
import { PropTypes } from 'prop-types';

import Header from '../../components/Header/Header';
import Banner from '../../components/Banner/Banner';

const AppLayout = ({ children }) => (
  <div className="page-wrapper">
    <Header />
    <Banner />
    <div className="page-container">{children}</div>
    <div />
  </div>
);

AppLayout.propTypes = {
  children: PropTypes.element.isRequired
};

export default AppLayout;
