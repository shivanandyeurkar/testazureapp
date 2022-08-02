import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import './Slider.scss';

const Slider = ({ label, min, max, step, prefix, onChange, value }) => {
  const correctedValue = value === -1 ? Math.round(min + (max - min) / 2) : value;

  /* eslint react-hooks/exhaustive-deps:0 */
  useEffect(() => {
    onChange(correctedValue);
  }, []);

  const sliderValueHandler = event => {
    onChange(+event.target.value);
  };

  const positionPercentage = () => ((correctedValue - min) / (max - min)) * 100;

  return (
    <div className="slider">
      <div className="slider__top-section">
        <label htmlFor={label} className="slider__label">
          {label}
        </label>

        <input
          id={label}
          type="text"
          className="slider__input"
          value={prefix + correctedValue.toString()}
          readOnly
        />
      </div>
      <div className="slider__bottom-section">
        <div className="slider__slider-box">
          <input
            type="range"
            min={min}
            max={max}
            className="slider__slider"
            onChange={sliderValueHandler}
            value={correctedValue}
            step={step}
            style={{
              backgroundImage: `linear-gradient(to right, #1A1A1A ${positionPercentage()}%, #85898C ${positionPercentage()}%)`
            }}
          />
        </div>
        <div className="slider__range-box">
          <span className="slider__from">
            {prefix}
            {min}
          </span>
          <span className="slider__to">
            {prefix}
            {max}
          </span>
        </div>
      </div>
    </div>
  );
};

Slider.defaultProps = {
  min: 0,
  step: 0,
  prefix: '',
  value: 0,
  onChange: () => {}
};

Slider.propTypes = {
  label: PropTypes.string.isRequired,
  min: PropTypes.number,
  max: PropTypes.number.isRequired,
  step: PropTypes.number,
  prefix: PropTypes.string,
  value: PropTypes.number,
  onChange: PropTypes.func
};

export default Slider;
