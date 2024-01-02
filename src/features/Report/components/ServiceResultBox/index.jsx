import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { URL_IMG } from '../../../../constants/storage_urls';

export default function ServiceResultBox({ service }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/admin/report/overview-results/${service.serId}`);
  };
  return (
    <Card className="d-flex h-100 justify-content-between flex-column">
      <CardMedia sx={{ height: 140 }} image={URL_IMG + '' + service.icon} title="green iguana" />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" style={{ height: '80px' }}>
          {service.serName}
        </Typography>
        <Typography gutterBottom variant="h7" component="div">
          Number of evaluated:
          {service.numberOfEvaluated}
        </Typography>
      </CardContent>
      <CardActions>
        <Button type="submit" onClick={handleClick} fullWidth variant="contained">
          View report
        </Button>
      </CardActions>
    </Card>
  );
}
