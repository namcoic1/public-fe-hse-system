import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { getCloneColors } from '../../../../utils/common';
import '../../css/custom-bar.css';

export default function SimpleBarStat({ name, xLabels, values }) {
  // console.log(name, xLabels, values);
  // const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
  // const xLabels = ['Criteria A', 'Criteria B', 'Criteria C', 'Criteria D', 'Criteria E', 'Criteria F', 'Criteria G'];
  const barColors = getCloneColors(values.length);
  return (
    <div className="bar-chart-container">
      <div className="row justify-content-center">
        {barColors.map((color, index) => (
          <div className="col-12 d-flex" key={index}>
            <div style={{ width: '15px', height: '15px', backgroundColor: `${color}` }} className="me-1"></div>
            <div style={{ fontSize: '12px' }}>{xLabels[index]}</div>
          </div>
        ))}
      </div>
      <BarChart
        height={300}
        series={[{ data: values, label: name, id: 'pvId' }]}
        xAxis={[
          {
            data: xLabels,
            scaleType: 'band',
            // tickLabelStyle: {
            //   angle: 10,
            //   dominantBaseline: 'hanging',
            //   textAnchor: 'start',
            // },
            // labelStyle: {
            //   transform: 'translateY(15px)',
            // },
          },
        ]}
        slotProps={{ legend: { hidden: true } }}
      />
      {barColors.map((color, index) => (
        <style key={index}>{`
          .bar-chart-container rect:nth-child(${index + 1}) {
            fill: ${color};
          }
        `}</style>
      ))}
    </div>
  );
}
