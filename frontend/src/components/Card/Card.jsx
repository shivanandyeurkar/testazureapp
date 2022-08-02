import React from 'react';
import './Card.scss';
import PropTypes from 'prop-types';

const Card = ({ children, style, size }) => {
  let cardWidthClass = '';

  if (size === 'WIDE') cardWidthClass = 'card--wide';
  else if (size === 'NARROW') cardWidthClass = 'card--narrow';

  return (
    <div className={`card ${cardWidthClass}`} style={style}>
      {children}
    </div>
  );
};

Card.defaultProps = {
  style: {},
  size: 'NORMAL'
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(['NORMAL', 'WIDE', 'NARROW']),
  /* eslint react/forbid-prop-types: 0 */
  style: PropTypes.object
};

export default Card;
