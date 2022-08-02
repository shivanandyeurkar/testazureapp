import React from 'react';
import PropTypes from 'prop-types';

import './Button.scss';

/* eslint react/button-has-type:0 */
const Button = ({ type, label, disabled, onClick, butttonStyle, freeSize }) => {
  let classNames = '';

  /* eslint no-lonely-if:0 */
  if (butttonStyle === 'PRIMARY') {
    if (!disabled) classNames += 'button--primary';
    else classNames += 'button--primary-disabled';
  } else {
    if (!disabled) classNames += 'button--secondary';
    else classNames += 'button--secondary-disabled';
  }

  if (freeSize) classNames += ' button--free-size';
  else classNames += ' button--fixed-size';

  return (
    <button type={type} className={`button ${classNames}`} disabled={disabled} onClick={onClick}>
      {label}
    </button>
  );
};

Button.defaultProps = {
  disabled: false,
  onClick: () => {},
  butttonStyle: 'PRIMARY',
  freeSize: false
};

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'submit']).isRequired,
  butttonStyle: PropTypes.oneOf(['PRIMARY', 'SECONDARY']),
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  freeSize: PropTypes.bool
};

export default Button;
