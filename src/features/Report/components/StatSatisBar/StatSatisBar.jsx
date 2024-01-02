import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';
import { getCloneColors } from '../../../../utils/common';

export default function StatSatisBar({ dataSend }) {
  // console.log(dataSend);
  const chartSetting = {
    yAxis: [
      {
        label: 'Percent (%)',
      },
    ],
    //   width: 500,
    height: '500',
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: 'translate(-10px, 0)',
      },
    },
  };

  const legendPlacement = {
    margin: {
      top: 150,
    },
  };

  const dataset = ['Strongly Agree', 'Agree', 'Neutral', 'Disagree', 'Strongly Disagree'].map((item, index) => {
    var tempObj = {};
    dataSend.forEach((item) => {
      tempObj[item.serviceName] = item.percentOfDegree[index];
    });
    return {
      ...tempObj,
      month: item,
    };
  });

  const barColors = getCloneColors(dataSend.length);
  const valueFormatter = (value) => `${value}%`;
  const dataSeries = dataSend.map((item, index) => ({
    dataKey: item.serviceName,
    label: item.serviceName,
    valueFormatter,
    color: barColors[index],
  }));

  return (
    <BarChart
      dataset={dataset}
      xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
      series={dataSeries}
      {...chartSetting}
      {...legendPlacement}
    />
  );
}
