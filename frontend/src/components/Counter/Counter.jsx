import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import sprite from '../../assets/sprite.svg';
import './Counter.scss';

const Counter = ({ onChange, value }) => {
  const [count, setCount] = useState(value);

  const countUp = () => {
    setCount(val => val + 1);
    onChange(count);
  };

  const countDown = () => {
    setCount(val => (val === 0 ? 0 : val - 1));
    onChange(count);
  };

  /* eslint react-hooks/exhaustive-deps:0 */
  useEffect(() => {
    onChange(count);
  }, [count]);

  useEffect(() => {
    setCount(value);
  }, [value]);

  return (
    <div className="count">
      <div className="count__decrease">
        <button type="button" className="count__btn" onClick={countDown}>
          <svg className="count__icon">
            <use href={`${sprite}#minus`} />
          </svg>
        </button>
      </div>
      <input
        type="number"
        className="count__count"
        value={value}
        onChange={event => setCount(+event.target.value)}
      />
      <div className="count__increase">
        <button type="button" className="count__btn" onClick={countUp}>
          <svg className="count__icon">
            <use href={`${sprite}#plus`} />
          </svg>
        </button>
      </div>
    </div>
  );
};

Counter.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired
};

export default Counter;
