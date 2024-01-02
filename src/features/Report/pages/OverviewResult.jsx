import React, { useEffect, useState } from 'react';
import SimpleBarStat from '../components/SimpleBarStat';
import DateField from '../../../components/form-controls/DateField';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { convertToLocalDate } from '../../../utils/common';
import { URL_IMG } from '../../../constants/storage_urls';
import serviceApi from '../../../api/serviceApi';
import userApi from '../../../api/userApi';
import Swal from 'sweetalert2';
import reportApi from '../../../api/reportApi';
import LazyLoading from '../../../components/LazyLoading';

function OverviewResult() {
  const navigate = useNavigate();
  const { serId } = useParams();
  const [points, setPoints] = useState([]);
  const [criterias, setCriterias] = useState([]);
  const [options, setOptions] = useState([]);
  const [votes, setVotes] = useState([]);
  const [service, setService] = useState({});
  const [showLazyLoading, setShowLazyLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      dateFrom: convertToLocalDate(new Date().toLocaleDateString(), true), // 2023-11-18T17:10:34.751Z
      dateTo: convertToLocalDate(new Date().toLocaleDateString(), true),
    },
  });

  useEffect(() => {
    (async () => {
      try {
        const actionResult = await serviceApi.read(serId);
        if (actionResult.success) {
          setService(actionResult.data);
        }
      } catch (error) {
        if (error.response.status === 401) {
          await userApi.refreshToken();
          const actionResult = await serviceApi.read(serId);
          if (actionResult.success) {
            setService(actionResult.data);
          }
        }
      }
      await handleSubmit({
        dateFrom: convertToLocalDate(new Date().toLocaleDateString(), true),
        dateTo: convertToLocalDate(new Date().toLocaleDateString(), true),
      });
    })();
  }, []);

  const handleSubmit = async (values) => {
    if (values.dateFrom === '' || values.dateTo === '') {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Select valid date to search',
      });
      return;
    }
    setShowLazyLoading(true);
    try {
      const params = {
        serId,
        dateFrom: new Date(values.dateFrom + 'T00:00:00').toISOString(),
        dateTo: new Date(values.dateTo + 'T00:00:00').toISOString(),
        // ...values,
      };
      const actionResult = await reportApi.overviewScore(params);
      if (actionResult.success) {
        setPoints(actionResult.data.points);
        setCriterias(actionResult.data.criterias);
      }
    } catch (error) {
      if (error.response.status === 401) {
        await userApi.refreshToken();
        const params = {
          serId,
          dateFrom: new Date(values.dateFrom + 'T00:00:00').toISOString(),
          dateTo: new Date(values.dateTo + 'T00:00:00').toISOString(),
          // ...values,
        };
        const actionResult = await reportApi.overviewScore(params);
        if (actionResult.success) {
          setPoints(actionResult.data.points);
        }
      }
      if (error.response.status === 400) {
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'Select valid date to search',
        });
      }
    }
    try {
      const params = {
        serId,
        dateFrom: new Date(values.dateFrom + 'T00:00:00').toISOString(),
        dateTo: new Date(values.dateTo + 'T00:00:00').toISOString(),
        // ...values,
      };
      const actionResult = await reportApi.overviewVote(params);
      if (actionResult.success) {
        setOptions(actionResult.data.options);
        setVotes(actionResult.data.votes);
      }
    } catch (error) {
      if (error.response.status === 401) {
        await userApi.refreshToken();
        const params = {
          serId,
          dateFrom: new Date(values.dateFrom + 'T00:00:00').toISOString(),
          dateTo: new Date(values.dateTo + 'T00:00:00').toISOString(),
          // ...values,
        };
        const actionResult = await reportApi.overviewVote(params);
        if (actionResult.success) {
          setOptions(actionResult.data.options);
          setVotes(actionResult.data.votes);
        }
      }
    }
    setShowLazyLoading(false);
  };

  return (
    <div>
      {showLazyLoading && <LazyLoading />}
      <div>
        <h1>Service evaluation results</h1>
      </div>
      <div className="row">
        <form onSubmit={form.handleSubmit(handleSubmit)} className="col-9">
          <div className="row align-items-center">
            <div className="col-4">
              <DateField name="dateFrom" label="From" form={form} />
            </div>
            <div className="col-4">
              <DateField name="dateTo" label="To" form={form} />
            </div>
            <div className="col-1" style={{ paddingTop: '30px' }}>
              <Button type="submit" variant="contained" size="large">
                Search
              </Button>
            </div>
            {votes.length > 0 && (
              <div className="mt-3 bar-vote position-relative">
                <div className="mb-3">
                  <b>Number of votes by satisfaction degree for this service</b>
                </div>
                <SimpleBarStat name={'vote'} xLabels={options} values={votes} />
                <div style={{ position: 'absolute', bottom: '35%', transform: 'rotate(-90deg)' }} className="pb-3">
                  Votes
                </div>
              </div>
            )}
            {points.length > 0 && (
              <div className="mt-3 bar-point position-relative">
                <div className="mb-3">
                  <b>Score by criteria for this service</b>
                </div>
                <SimpleBarStat name={'point'} xLabels={criterias} values={points} />
                <div style={{ position: 'absolute', bottom: '30%', transform: 'rotate(-90deg)' }} className="pb-3">
                  Points
                </div>
                <div style={{ textAlign: 'center', marginTop: '-35px' }}>Criterias</div>
              </div>
            )}
          </div>
        </form>
        <div className="col-3">
          <Card className="d-flex justify-content-between flex-column">
            <CardMedia sx={{ height: 140 }} image={URL_IMG + '' + service.icon} title="green iguana" />
            <CardContent>
              <Typography gutterBottom variant="h7" component="div" style={{ fontWeight: 'bold' }}>
                {service.serName}
              </Typography>
              {/* <Typography variant="body2" color="text.secondary">
                {service.serDesc}
              </Typography> */}
            </CardContent>
            <CardActions>
              <Button
                type="submit"
                onClick={() => navigate(`/admin/report/overview-results`)}
                fullWidth
                variant="contained"
              >
                Back
              </Button>
              <Button
                type="submit"
                onClick={() => navigate(`/admin/report/overview-results/${service.serId}/detail`)}
                fullWidth
                variant="contained"
              >
                View details
              </Button>
            </CardActions>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default OverviewResult;
