import * as React from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { Card, CardContent, Typography } from '@mui/material';
import { getCloneColors } from '../../../utils/common';

export default function PieStat({ dataSend }) {
  //   console.log(dataSend);

  //   const data = [
  //     { label: 'Group A', value: 2400 },
  //     { label: 'Group B', value: 4567 },
  //     { label: 'Group C', value: 1398 },
  //     { label: 'Group D', value: 9800 },
  //     { label: 'Group E', value: 3908 },
  //   ];
  
  // const barColors = getCloneColors(dataSend.length);

  const data = dataSend?.map((dataItem, index) => ({
    label: dataItem.level,
    value: dataItem.numberEvaluated,
    // color: barColors[index],
  }));
  const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);

  const getArcLabel = (params) => {
    const percent = params.value / TOTAL;
    return `${(percent * 100).toFixed(0)}%`;
  };

  const legendPlacement = {
    margin: {
      right: 200,
    },
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="body1" component="div" className="fw-bold">
          Overall satisfaction degree
        </Typography>
        <PieChart
          series={[
            {
              data: data,
              //   cx: 500,
              //   cy: 200,
              innerRadius: 40,
              outerRadius: 90,
              highlightScope: { faded: 'global', highlighted: 'item' },
              faded: { innerRadius: 30, additionalRadius: -10, color: 'gray' },
              arcLabel: getArcLabel,
            },
          ]}
          sx={{
            [`& .${pieArcLabelClasses.root}`]: {
              fill: 'white',
              fontSize: 14,
            },
          }}
          height={210}
          {...legendPlacement}
          // slotProps={{
          //   legend: {  },
          // }}
        />
      </CardContent>
    </Card>
  );
}
