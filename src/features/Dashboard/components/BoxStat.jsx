import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { GridArrowDownwardIcon, GridArrowUpwardIcon } from '@mui/x-data-grid';
import { SvgIcon } from '@mui/material';

export default function BoxStat({ dataSend }) {
  //   console.log(dataSend);
  const { labelHeader, dataNumber, dataPercent, labelFooter } = dataSend;
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="body1" component="div" className="fw-bold" style={{ height: '40px' }}>
          {labelHeader}
        </Typography>
        <div className="mt-5">
          <Typography variant="h3" component="div" className="text-center mt-3">
            {dataNumber}
          </Typography>
          <div className="d-flex justify-content-center mb-2">
            <SvgIcon fontSize="small" style={{ color: dataPercent > 0 ? '#63EA51' : '#d32f2f' }}>
              {dataPercent > 0 ? <GridArrowUpwardIcon /> : <GridArrowDownwardIcon />}
            </SvgIcon>
            <Typography color={dataPercent > 0 ? '#63EA51' : '#d32f2f'} variant="body2">
              {dataPercent !== undefined ? dataPercent : '...'}%
            </Typography>
          </div>
          <Typography variant="body2" className="text-center">
            {labelFooter}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}
