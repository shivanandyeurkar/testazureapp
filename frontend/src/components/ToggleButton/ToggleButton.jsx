import React from 'react';
import PropTypes from 'prop-types';

import './ToggleButton.scss';

const ToggleButton = ({ label, value, onChange }) => {
  const toggleHandler = event => {
    onChange(!value);
  };

  return (
    <div className="toggle-btn">
      <div className="toggle-btn__label">{label}</div>
      <div className="toggle-btn__box">
        <button className="toggle-btn__btn" type="button" onClick={toggleHandler}>
          <span className="toggle-btn__thumb" style={{ right: value ? 0 : 'calc(100% - 19px)' }} />
        </button>
        <span className="toggle-btn__state">{value ? 'Yes' : 'No'}</span>
      </div>
    </div>
  );
};

ToggleButton.defaultProps = {
  value: false,
  onChange: () => {}
};

ToggleButton.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.bool,
  onChange: PropTypes.func
};

export default ToggleButton;
