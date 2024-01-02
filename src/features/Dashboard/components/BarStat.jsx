import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { BarChart } from '@mui/x-charts/BarChart';
import { Card, CardContent } from '@mui/material';
import { getCloneColors } from '../../../utils/common';

export default function BarStat({ dataSend }) {
  const [seriesNb, setSeriesNb] = React.useState(50);
  const [itemNb, setItemNb] = React.useState(4);
  const [skipAnimation, setSkipAnimation] = React.useState(false);
  const [xAxisLabels, setXAxisLabels] = React.useState(['Week 1', 'Week 2', 'Week 3', 'Week 4']);

  const highlightScope = {
    highlighted: 'series',
    faded: 'global',
  };

  const barColors = getCloneColors(dataSend?.data.length);
  const dataUp = [...(dataSend?.data || [])].map((dataItem, index) => ({
    label: dataItem?.serviceName,
    data: dataItem?.numberOfEvaluate,
    color: barColors[index],
  }));

  const series = dataUp.map((s) => ({ ...s, highlightScope }));

  const handleItemNbChange = (event, newValue) => {
    if (typeof newValue !== 'number') {
      return;
    }
    setItemNb(newValue);
  };

  const handleSeriesNbChange = (event, newValue) => {
    if (typeof newValue !== 'number') {
      return;
    }
    setSeriesNb(newValue);
  };

  React.useEffect(() => {
    // Update x-axis labels based on the selected number of items
    setXAxisLabels([...Array(itemNb)].map((_, i) => `Week ${i + 1}`));
  }, [itemNb]);

  const legendPlacement = {
    margin: {
      top: 200,
    },
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="body1" component="div" className="fw-bold">
          Number of surveys per each evaluated service
        </Typography>
        <BarChart
          height={500}
          series={series.slice(0, seriesNb).map((s) => ({ ...s, data: s.data.slice(0, itemNb) }))}
          skipAnimation={skipAnimation}
          xAxis={[{ scaleType: 'band', data: xAxisLabels }]}
          {...legendPlacement}
        />
        {/* <Typography id="input-item-number" style={{ fontSize: '12px' }}>
          Number of weeks
        </Typography>
        <Slider
          value={itemNb}
          onChange={handleItemNbChange}
          valueLabelDisplay="auto"
          min={1}
          max={4}
          aria-labelledby="input-item-number"
        />
        <Typography id="input-series-number" style={{ fontSize: '12px' }}>
          Number of services
        </Typography>
        <Slider
          value={seriesNb}
          onChange={handleSeriesNbChange}
          valueLabelDisplay="auto"
          min={1}
          max={dataUp.length}
          aria-labelledby="input-series-number"
        /> */}
      </CardContent>
    </Card>
  );
}
