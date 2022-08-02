import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import sprite from '../../assets/sprite.svg';

import './DropDown.scss';

const DropDown = ({
  title,
  options,
  placeholder,
  isOpen,
  onToggle,
  onChange,
  value: val,
  disabled
}) => {
  const [value, setValue] = useState(val);
  const optionContainerRef = useRef();

  const toggleHandler = event => {
    if (!disabled) onToggle();
  };

  const selectionHandler = (option, event) => {
    setValue(option);
    onChange(option);
    onToggle();
  };

  useEffect(() => {
    if (!val) {
      setValue(null);
    }
  }, [options, val]);

  return (
    <div className="drop-down">
      <h3 className="drop-down__title">{title}</h3>

      <div className="drop-down__container">
        <div
          className="drop-down__selection-container"
          onClick={toggleHandler}
          onKeyUp={() => {}}
          role="menu"
          tabIndex={0}
          data-id={title}
          style={{ cursor: options.length === 0 || disabled ? 'not-allowed' : 'pointer' }}
        >
          <span className="drop-down__selection" style={{ color: value ? '#333333' : '#828282' }}>
            {value !== null ? value.toLowerCase() : placeholder}
          </span>
          <span
            className="drop-down__icon-box"
            style={{ transform: options.length !== 0 && isOpen ? 'rotate(180deg)' : 'rotate(0)' }}
          >
            <svg className="drop-down__icon">
              <use href={`${sprite}#down-arrow`} />
            </svg>
          </span>
        </div>

        <div
          className="drop-down__option-container"
          ref={optionContainerRef}
          style={{ height: isOpen ? optionContainerRef.current.scrollHeight : '0px' }}
        >
          {options.map(option => (
            <div className="drop-down__option" key={option}>
              <input type="radio" className="drop-down__input" id={option} name={title} />
              <label
                htmlFor={option}
                className="drop-down__label"
                onClick={selectionHandler.bind(null, option)}
                onKeyUp={() => {}}
              >
                {option.toLowerCase()}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

DropDown.defaultProps = {
  title: '',
  val: '',
  disabled: false
};

DropDown.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  placeholder: PropTypes.string.isRequired,
  title: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onToggle: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  val: PropTypes.string,
  disabled: PropTypes.bool
};

export default DropDown;
