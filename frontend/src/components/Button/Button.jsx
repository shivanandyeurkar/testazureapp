import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({ label, type, onClick, buttonStyle, disabled }) => {
  let buttonStyleClass = '';

  /* eslint no-lonely-if:0 */
  if (disabled) {
    if (buttonStyle === 'PRIMARY') buttonStyleClass = 'btn--primary-disabled';
    else buttonStyleClass = 'btn--secondary-disabled';
  } else {
    if (buttonStyle === 'PRIMARY') buttonStyleClass = 'btn--primary';
    else buttonStyleClass = 'btn--secondary';
  }

  return (
    <button
      className={`btn ${buttonStyleClass}`}
      onClick={onClick}
      type={type === 'button' ? 'button' : 'submit'}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

Button.defaultProps = {
  onClick: () => {},
  disabled: false
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['button', 'submit']).isRequired,
  onClick: PropTypes.func,
  buttonStyle: PropTypes.oneOf(['PRIMARY', 'SECONDARY']).isRequired,
  disabled: PropTypes.bool
};

export default Button;
