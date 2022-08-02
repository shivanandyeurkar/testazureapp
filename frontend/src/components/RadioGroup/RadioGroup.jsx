import React from 'react';
import PropTypes from 'prop-types';

import './RadioGroup.scss';

const RadioGroup = ({ options, label, name, onChange, value }) => (
  <div className="radio-group">
    <div className="radio-group__heading">{label}</div>
    <div className="radio-group__options">
      {options.map(option => (
        <div className="radio-group__group" key={option}>
          <input
            id={option}
            type="radio"
            value={option}
            name={name}
            className="radio-group__radio"
            onClick={() => onChange(option)}
            defaultChecked={option === value}
          />

          {/* eslint jsx-a11y/click-events-have-key-events:0 */
          /* eslint jsx-a11y/no-noninteractive-element-interactions:0 */}
          <label
            htmlFor={option}
            className="radio-group__label-box"
            onClick={() => onChange(option)}
          >
            <span className="radio-group__radio-proxy" />
            <span className="radio-group__label">{option}</span>
          </label>
        </div>
      ))}
    </div>
  </div>
);

RadioGroup.defaultProps = {
  value: '',
  onChange: () => {}
};

RadioGroup.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string
};

export default RadioGroup;
