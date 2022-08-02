import React from 'react';
import PropTypes from 'prop-types';
import calcValueColors from '../../data/calc-value-colors.json';

import './Legend.scss';

const Legend = ({ entries }) => (
  <div className="legend">
    {entries.map(entry => (
      <div className="legend__entry" key={entry}>
        <span className="legend__color" style={{ backgroundColor: calcValueColors[entry] }} />
        <span className="legend__name">{entry}</span>
      </div>
    ))}
  </div>
);

Legend.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Legend;
