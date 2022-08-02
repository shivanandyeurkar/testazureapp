import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import './Input.scss';

const Input = ({ label, type, placeholder, value, onChange, disabled }) => {
  const inputRef = useRef();

  const inputTextHandler = event => {
    const key = String.fromCodePoint(event.charCode ? event.charCode : event.which);
    const regex = /[^\w\- ]/;

    if (key.search(regex) !== -1) {
      event.preventDefault();
    }
  };

  const pasteHandler = event => {
    /* Had to put the code inside a setTimeout as event.target.value returns 
    an empty string until the event-handler function completes */
    setTimeout(() => {
      const regex = /[^\w\- ]/g;
      const pastedString = event.target.value;

      inputRef.current.value = pastedString.replaceAll(regex, '');
    }, 0);
  };

  return (
    <div className="input">
      <label htmlFor={label} className="input__label">
        {label}
      </label>
      <input
        ref={inputRef}
        type={type}
        id={label}
        value={value}
        className="input__input"
        placeholder={placeholder}
        onChange={event => {
          onChange(event.target.value);
        }}
        onPaste={pasteHandler}
        onKeyPress={inputTextHandler}
        disabled={disabled}
        style={{ cursor: disabled ? 'not-allowed' : 'auto' }}
      />
    </div>
  );
};

Input.defaultProps = {
  value: '',
  label: '',
  disabled: false
};

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

export default Input;
