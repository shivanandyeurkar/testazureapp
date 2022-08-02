import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import downArrow from '../../assets/down-arrow.svg';

import './DropDown.scss';

const DownArrow = ({ selectProps }) => {
  return (
    <img
      src={downArrow}
      alt="down arrow"
      style={{
        transform: selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0)',
        transition: 'transform 200ms ease-out'
      }}
    />
  );
};

const DropDown = ({ options, label, value, onChange, openDirection }) => {
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      fontSize: '1.6rem',
      lineHeight: '2rem',
      fontWeight: 400,
      fontFamily: 'Noto Sans, sans-serif',
      color: state.isFocused ? 'white' : '#1a1a1a',
      backgroundColor: state.isFocused ? '#25C9EF' : 'transparent',
      transition: 'all 200ms ease-out',
      cursor: 'pointer'
    }),
    placeholder: (provided, state) => ({
      ...provided,
      fontSize: '1.6rem',
      lineHeight: '2rem',
      fontWeight: 400,
      fontFamily: 'Noto Sans, sans-serif',
      color: '#85898c'
    }),
    control: (provided, state) => ({
      ...provided,
      border: 'none',
      boxShadow: 'none',
      outline: 'none',
      borderRadius: '0',
      borderBottom: '1px solid #1a1a1a !important',
      minHeight: '2.4rem',
      cursor: 'pointer'
    }),
    indicatorSeparator: (provided, state) => ({ ...provided, display: 'none' }),
    singleValue: (provided, state) => ({
      ...provided,
      fontSize: '1.6rem',
      lineHeight: '2rem',
      fontWeight: 400,
      fontFamily: 'Noto Sans, sans-serif',
      color: '#1a1a1a',
      marginInline: 0
    }),
    valueContainer: (prodided, state) => ({ ...prodided, paddingInline: 0 }),
    menu: (provided, state) => ({ ...provided, transition: 'all 200ms ease-out' })
  };

  const selectionHanlder = option => {
    onChange(option.value);
  };

  return (
    <div className="drop-down">
      <div className="drop-down__label">{label}</div>
      <div className="drop-down__selector">
        <Select
          menuPlacement={openDirection === 'UP' ? 'top' : 'bottom'}
          options={options}
          styles={customStyles}
          components={{ DropdownIndicator: DownArrow }}
          isSearchable={false}
          onChange={selectionHanlder}
          maxMenuHeight="200px"
          placeholder="Select Option"
          value={value ? { value: value, label: value } : null}
        />
      </div>
    </div>
  );
};

DropDown.defaultProps = {
  value: '',
  onChange: () => {},
  openDirection: 'DOWN'
};

DropDown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ),
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  openDirection: PropTypes.oneOf(['UP', 'DOWN'])
};

export default DropDown;
