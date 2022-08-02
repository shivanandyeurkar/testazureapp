import React from 'react';
import PropTypes from 'prop-types';
import './Block.scss';

const Block = ({ category, duration, children }) => (
  <div className="card">
    <div className="card__container">
      <div className="card__element">
        <div className="card__text"> {category} </div>
        <div className="card__period">{duration}</div>
        <div>{children}</div>
      </div>
    </div>
  </div>
);

Block.propTypes = {
  category: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};
export default Block;
