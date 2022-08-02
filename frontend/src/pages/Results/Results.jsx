import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import GoogleChart from '../../components/GoogleChart/GoogleChart';

import './Results.scss';
import Cards from '../../components/Cards/Cards';
import Bars from '../../components/Bars/Bars';
import Button from '../../components/Button/Button';
import Block from '../../components/Block/Block';
import VerticalBar from '../../components/VerticalBar/VerticalBar';
import jsonData from '../../data/results.json';
import Legend from '../../components/Legend/Legend';

const getSmallest = (...numbers) => {
  let smallest = numbers[0];

  for (const num of numbers) {
    if (num !== 0 && num < smallest) smallest = num;
  }

  return smallest;
};

const Results = () => {
  const storedResponse = useSelector(state => state.responseData);
  const navigate = useNavigate();

  const modifyInputHandler = event => {
    navigate('/');
  };

  const onCloudtotal =
    storedResponse.aggregateCategoryCost.onCloud.ITAdmin +
    storedResponse.aggregateCategoryCost.onCloud.needles +
    storedResponse.aggregateCategoryCost.onCloud.infrastructure +
    storedResponse.aggregateCategoryCost.onCloud.implementation;
  const onPremtotal =
    storedResponse.aggregateCategoryCost.onPrem.ITAdmin +
    storedResponse.aggregateCategoryCost.onPrem.needles +
    storedResponse.aggregateCategoryCost.onPrem.infrastructure +
    storedResponse.aggregateCategoryCost.onPrem.implementation;
  const savings = onPremtotal - onCloudtotal;
  const savingsPercentage = Math.round((savings / onCloudtotal) * 100);
  const onCloudToOnPremRatio =
    onCloudtotal > onPremtotal ? onPremtotal / onCloudtotal : onCloudtotal / onPremtotal;
  // console.log(onCloudToOnPremRatio);
  const smallestCloudValue = getSmallest(
    storedResponse.aggregateCategoryCost.onCloud.ITAdmin,
    storedResponse.aggregateCategoryCost.onCloud.needles,
    storedResponse.aggregateCategoryCost.onCloud.infrastructure,
    storedResponse.aggregateCategoryCost.onCloud.implementation
  );
  const smallestPremValue = getSmallest(
    storedResponse.aggregateCategoryCost.onPrem.ITAdmin,
    storedResponse.aggregateCategoryCost.onPrem.needles,
    storedResponse.aggregateCategoryCost.onPrem.infrastructure,
    storedResponse.aggregateCategoryCost.onPrem.implementation
  );
  const onPremBlockHeightRatios = {
    ITAdmin: Math.round(
      (storedResponse.aggregateCategoryCost.onPrem.ITAdmin / smallestPremValue) * 10
    ),
    needles: Math.round(
      (storedResponse.aggregateCategoryCost.onPrem.needles / smallestPremValue) * 10
    ),
    implementation: Math.round(
      (storedResponse.aggregateCategoryCost.onPrem.implementation / smallestPremValue) * 10
    ),
    infrastructure: Math.round(
      (storedResponse.aggregateCategoryCost.onPrem.infrastructure / smallestPremValue) * 10
    )
  };
  const onCloudBlockHeightRatios = {
    ITAdmin: Math.round(
      (storedResponse.aggregateCategoryCost.onCloud.ITAdmin / smallestCloudValue) * 10
    ),
    needles: Math.round(
      (storedResponse.aggregateCategoryCost.onCloud.needles / smallestCloudValue) * 10
    ),
    implementation: Math.round(
      (storedResponse.aggregateCategoryCost.onCloud.implementation / smallestCloudValue) * 10
    ),
    infrastructure: Math.round(
      (storedResponse.aggregateCategoryCost.onCloud.infrastructure / smallestCloudValue) * 10
    )
  };

  // console.log('smallestCloudValue: ', smallestCloudValue);
  // console.log('smallestPremValue: ', smallestPremValue);
  // console.log('onPremBlockHeightRatios: ', onPremBlockHeightRatios);
  // console.log('onCloudBlockHeightRatios: ', onCloudBlockHeightRatios);

  return (
    <div className="results">
      <div className="results__layout">
        <div className="results__container">
          <div className="results__outer__container">
            <div className="results__text">
              <div className="results__section">
                <h6>{storedResponse.firmName}</h6>
                <h2>{jsonData.heading}</h2>
              </div>

              <div className="results__button">
                <Button
                  type="button"
                  label="Modify Input"
                  butttonStyle="SECONDARY"
                  onClick={modifyInputHandler}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="results__content">
          <div className="results__bar__container">
            <Bars dollar="$" savings={`$${savings.toLocaleString('en-US')}`} />
            <Block category={jsonData.cardOneTitle} duration={jsonData.cardOneSubtitle}>
              <div className="results__container__fluid">
                <VerticalBar
                  services="Cloud"
                  dollar={`$${onCloudtotal.toLocaleString('en-US')}`}
                  ratio={onCloudtotal < onPremtotal ? onCloudToOnPremRatio : 1}
                  border
                  color
                  marginRight
                  padding
                  blocks={[
                    {
                      heightRatio: onCloudBlockHeightRatios.ITAdmin,
                      amount:
                        storedResponse.aggregateCategoryCost.onCloud.ITAdmin.toLocaleString(
                          'en-US'
                        ),
                      department: 'IT Admin'
                    },
                    {
                      heightRatio: onCloudBlockHeightRatios.needles,
                      amount:
                        storedResponse.aggregateCategoryCost.onCloud.needles.toLocaleString(
                          'en-US'
                        ),
                      department: 'needles'
                    },
                    {
                      heightRatio: onCloudBlockHeightRatios.implementation,
                      amount:
                        storedResponse.aggregateCategoryCost.onCloud.implementation.toLocaleString(
                          'en-US'
                        ),
                      department: 'implementation'
                    },
                    {
                      heightRatio: onCloudBlockHeightRatios.infrastructure,
                      amount:
                        storedResponse.aggregateCategoryCost.onCloud.infrastructure.toLocaleString(
                          'en-US'
                        ),
                      department: 'infrastructure'
                    }
                  ]}
                />

                <VerticalBar
                  services="Premises"
                  dollar={`$${onPremtotal.toLocaleString('en-US')}`}
                  ratio={onCloudtotal > onPremtotal ? onCloudToOnPremRatio : 1}
                  blocks={[
                    {
                      heightRatio: onPremBlockHeightRatios.ITAdmin,
                      amount:
                        storedResponse.aggregateCategoryCost.onPrem.ITAdmin.toLocaleString('en-US'),
                      department: 'IT Admin'
                    },
                    {
                      heightRatio: onPremBlockHeightRatios.needles,
                      amount:
                        storedResponse.aggregateCategoryCost.onPrem.needles.toLocaleString('en-US'),
                      department: 'needles'
                    },
                    {
                      heightRatio: onPremBlockHeightRatios.implementation,
                      amount:
                        storedResponse.aggregateCategoryCost.onPrem.implementation.toLocaleString(
                          'en-US'
                        ),
                      department: 'implementation'
                    },
                    {
                      heightRatio: onPremBlockHeightRatios.infrastructure,
                      amount:
                        storedResponse.aggregateCategoryCost.onPrem.infrastructure.toLocaleString(
                          'en-US'
                        ),
                      department: 'infrastructure'
                    }
                  ]}
                />
              </div>
              <div className="results__legend-container">
                <Legend entries={['needles', 'IT Admin', 'implementation', 'infrastructure']} />
              </div>
            </Block>
          </div>
          <div className="results__bar__container">
            <Bars dollar="%" savings={`${savingsPercentage}%`} />
            <Block category={jsonData.cardTwoTitle} duration={jsonData.cardTwoSubtitle}>
              <div className="results__chart">
                <GoogleChart chartData={storedResponse.aggregateAnnualCost} />
              </div>
            </Block>
          </div>
        </div>
      </div>
      <Cards />
    </div>
  );
};

export default Results;
