import React from 'react';
import PropTypes from 'prop-types';
import './Bars.scss';

const Bars = ({ dollar, savings }) => (
  <div className="bars">
    <div className="bars__container">
      <div className="bars__element">
        <div className="bars__text">Total Cloud Savings {dollar}</div>
        <div className="bars__value">{savings}</div>
      </div>
    </div>
  </div>
);

Bars.propTypes = {
  dollar: PropTypes.string.isRequired,
  savings: PropTypes.string.isRequired
};
export default Bars;
