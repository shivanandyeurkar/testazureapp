import React, { useLayoutEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './VerticalBar.scss';
import { RECTANGLE_BLUE_COLOR, RECTANGLE_ZETBLACK_COLOR } from '../../constants/index';
import calcValueColors from '../../data/calc-value-colors.json';

const VerticalBar = ({ services, dollar, border, color, blocks, ratio }) => {
  const heightRatioTotal = blocks.reduce(
    (total, currentValue) => total + currentValue.heightRatio,
    0
  );

  const [showCalculationValues, setShowCalculationValues] = useState([false, false, false, false]);
  const valueElementRefs = [useRef(), useRef(), useRef(), useRef()];

  /* eslint no-continue:0 */
  /* eslint react-hooks/exhaustive-deps:0 */
  useLayoutEffect(() => {
    for (let i = 0; i < valueElementRefs.length; i += 1) {
      if (valueElementRefs[i].current === undefined) continue;

      if (valueElementRefs[i].current.scrollHeight >= 45)
        setShowCalculationValues(values => {
          const newValues = [...values];
          newValues[i] = true;
          return newValues;
        });
    }
  }, []);

  return (
    <div
      className="verticalbar"
      style={{ border: border ? '3px dashed #0EA3C6' : '3px solid transparent' }}
    >
      <div className="verticalbar__element">
        <div
          className="verticalbar__text"
          style={{ color: color ? RECTANGLE_BLUE_COLOR : RECTANGLE_ZETBLACK_COLOR }}
        >
          On-{services}{' '}
        </div>
        <div className="verticalbar__amount">Total amount</div>
        <div className="verticalbar__value">{dollar}</div>
      </div>

      <div className="verticalbar__rectangle">
        <div
          className="verticalbar__rectangle-container"
          style={{ minHeight: `${Math.round(ratio * 100)}%` }}
        >
          {blocks.map((block, index) => {
            if (block.heightRatio === 0) return '';

            return (
              <div
                className="verticalbar__rectangle-element"
                style={{
                  backgroundColor: calcValueColors[block.department],
                  color: calcValueColors[block.department],
                  height: `${Math.round((block.heightRatio / heightRatioTotal) * 100)}%`
                }}
                ref={valueElementRefs[index]}
              >
                <div className="verticalbar__rectangle__value">
                  {showCalculationValues[index] && `$${block.amount}`}
                </div>
                <div className="verticalbar__rectangle-hover">${block.amount}</div>

                {/* <div className="verticalbar__rectangle__department">{block.department}</div> */}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

VerticalBar.defaultProps = {
  border: false,
  color: false
};

VerticalBar.propTypes = {
  services: PropTypes.string.isRequired,
  border: PropTypes.bool,
  color: PropTypes.bool,
  dollar: PropTypes.string.isRequired,
  blocks: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string,
      height: PropTypes.string,
      marginTop: PropTypes.string,
      amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      department: PropTypes.string
    })
  ).isRequired,
  ratio: PropTypes.number.isRequired
};
export default VerticalBar;
