import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import '../../css/custom-report.css';
import { getCloneColors } from '../../../../utils/common';

export default function HorizontalBar({ dataModal }) {
  console.log(dataModal);
  const chartSetting = {
    xAxis: [
      {
        label: 'Votes',
      },
    ],
    width: 1200,
    height: 400,
  };

  const dataset = dataModal.data.map((item, index) => {
    return {
      serviceName: item.votes,
      month: item.serviceName,
    };
  });

  const barColors = getCloneColors(dataModal.data.length);

  const valueFormatter = (value) => `${value} votes`;
  return (
    <div className="degree-container">
      <div className="text-center">
        <b>Statistics of votes for services at "{dataModal.label} degree"</b>
      </div>
      <div className="position-relative">
        <div className="position-absolute" style={{ bottom: '50%', fontSize: '15px', transform: 'rotate(-90deg)' }}>
          Services
        </div>
        <BarChart
          dataset={dataset}
          yAxis={[{ scaleType: 'band', dataKey: 'month' }]}
          series={[
            {
              dataKey: 'serviceName',
              label: dataModal.label,
              valueFormatter,
              // color: barColors[5 - dataModal.keyIndex],
            },
          ]}
          layout="horizontal"
          slotProps={{ legend: { hidden: true } }}
          {...chartSetting}
        />
        {barColors.map((color, index) => (
          <style key={index}>{`
          .degree-container rect:nth-child(${index + 1}) {
            fill: ${color};
          }
        `}</style>
        ))}
      </div>
    </div>
  );
}
