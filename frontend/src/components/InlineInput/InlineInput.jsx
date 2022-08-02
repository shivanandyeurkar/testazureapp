import React from 'react';
import PropTypes from 'prop-types';
import './InlineInput.scss';

const InlineInput = ({ label, prefix, value, onChange }) => {
  const inputCheck = event => {
    if (event.key.search(/\d/) !== 0) event.preventDefault();
  };

  return (
    <div className="inline-input">
      <label htmlFor={label} className="inline-input__label">
        {label}
      </label>
      <div className="inline-input__input-container">
        {prefix && <span className="inline-input__prefix">{prefix}</span>}
        <input
          id={label}
          type="text"
          className="inline-input__input"
          value={value.toString()}
          onKeyPress={inputCheck}
          onChange={event => onChange(event.target.value)}
          style={{ padding: prefix ? '0 .8rem 0 1.7rem' : '0 .8rem' }}
        />
      </div>
    </div>
  );
};

InlineInput.propTypes = {
  label: PropTypes.string.isRequired,
  prefix: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  onChange: PropTypes.func.isRequired
};

InlineInput.defaultProps = {
  prefix: ''
};

export default InlineInput;
