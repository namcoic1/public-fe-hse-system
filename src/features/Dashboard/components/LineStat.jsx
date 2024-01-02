import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Card, CardContent, Typography } from '@mui/material';
import { getCloneColors } from '../../../utils/common';

export default function LineStat({ dataSend }) {
  //   const uData = [4000, 3000, 2000, 2780, 1890];
  //   const pData = [2400, 1398, 9800, 3908, 4800];
  // const xLabels = ['Page A', 'Page B', 'Page C', 'Page D', 'Page E', 'Page F', 'Page G'];
  // const xLabels = [...(dataSend?.labels || [])];
  const xLabels = ['Week 0', 'Week 1', 'Week 2', 'Week 3', 'Week 4'];

  //   series={[
  //     { data: pData, label: 'pv' },
  //     { data: uData, label: 'uv' },
  //   ]}
  const barColors = getCloneColors(dataSend?.data.length);
  const dataUp = [...(dataSend?.data || [])].map((dataItem, index) => ({
    data: dataItem?.numberOfEvaluate,
    label: dataItem?.serviceName,
    curve: 'linear',
    color: barColors[index],
  }));

  const legendPlacement = {
    margin: {
      top: 200,
    },
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="body1" component="div" className="fw-bold">
          Number of patients taking survey per each service
        </Typography>
        <LineChart
          sx={{ width: '100%' }}
          height={600}
          series={dataUp}
          xAxis={[{ scaleType: 'point', data: xLabels }]}
          {...legendPlacement}
        />
      </CardContent>
    </Card>
  );
}
