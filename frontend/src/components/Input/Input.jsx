import React from 'react';
import PropTypes from 'prop-types';
import './Input.scss';

const Input = ({ type, placeholder, value, onChange }) => {
  const changeHandler = event => {
    onChange(event.target.value);
  };

  return (
    <input
      className="input"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={changeHandler}
    />
  );
};

Input.defaultProps = {
  value: '',
  onChange: () => {}
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func
};

export default Input;
