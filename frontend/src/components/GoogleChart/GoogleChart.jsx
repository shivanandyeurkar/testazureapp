import React, { Component } from 'react';
import Chart from 'react-google-charts';
import PropTypes from 'prop-types';
import jsonData from '../../data/google-chart.json';

const transformChartData = aggregateAnnualCost => {
  const transformedData = [jsonData.chartHeadings];

  for (let i = 0; i < aggregateAnnualCost.onPrem.length; i += 1) {
    transformedData.push([
      (i + 1).toString(),
      aggregateAnnualCost.onCloud[i],
      aggregateAnnualCost.onPrem[i]
    ]);
  }

  return transformedData;
};
export const options = {
  annotations: {
    textStyle: {
      fontName: '$font-family',
      fontSize: '12px',
      lineHeight: '20px',
      bold: false,
      italic: false,
      color: '#85898C',
      auraColor: '#d799ae'
    },
    tooltip: {
      displayColors: false,
      textStyle: { color: '#FFFFFF' },
      showColorCode: false,
      ignoreBounds: true,
      isHtml: true,
      trigger: 'selection'
    }
  },
  pointSize: 7,
  chartArea: {
    width: '80%', // make sure this is the same for the chart and control so the axes align right
    height: '80%'
  },
  axisTitlesPosition: 'out',
  colors: ['#25C9EF', '#85898C'],
  backgroundColor: '#F5F5F5',
  pointShape: 'circle',
  isStacked: false,
  height: 500,
  legend: {
    alignment: 'center',
    position: 'top',
    maxLines: 3,
    textStyle: {
      color: '#1A1A1A',
      fontName: '$font-family',
      fontSize: '12px',
      lineHeight: '20px',
      fontWeight: 'medium'
    }
  },
  vAxis: {
    baselineColor: 'transparent',
    minValue: 0,
    textPosition: 'none',
    gridlines: { color: 'transparent' }
  },
  hAxis: {
    ticks: [5, 10, 15, 20],
    direction: '1',
    title: 'Years',
    textPosition: 'out',
    titleTextStyle: {
      color: '#85898C',
      italic: false,
      fontName: '$font-family',
      fontSize: '12px',
      lineHeight: '20px',
      fontWeight: 'medium'
    },
    textStyle: { color: '#85898C' }
  }
};
// eslint-disable-next-line react/prefer-stateless-function
class GoogleChart extends Component {
  render() {
    const { chartData } = this.props;

    return (
      <div className="container">
        <Chart
          width="100%"
          height="500px"
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={transformChartData(chartData)}
          options={options}
          rootProps={{ 'data-testid': '1' }}
        />
      </div>
    );
  }
}

GoogleChart.propTypes = {
  chartData: PropTypes.shape({
    onPrem: PropTypes.arrayOf(PropTypes.number),
    onCloud: PropTypes.arrayOf(PropTypes.number)
  }).isRequired
};

export default GoogleChart;
