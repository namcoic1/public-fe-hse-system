import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import DateField from '../../../components/form-controls/DateField';
import reportApi from '../../../api/reportApi';
import userApi from '../../../api/userApi';
import CriteriaResult from '../components/CriteriaResult';
import Swal from 'sweetalert2';
import { URL_IMG } from '../../../constants/storage_urls';
import LazyLoading from '../../../components/LazyLoading';
import { convertToLocalDate } from '../../../utils/common';

function DetailServiceResult() {
  const navigate = useNavigate();
  const { serId } = useParams();
  const [resultList, setResultList] = useState([]);
  const [showLazyLoading, setShowLazyLoading] = useState(false);
  //   const schema = yup.object({
  //     dateFrom: yup.string().required("Please select date to "),
  //   });
  // console.log(new Date().toLocaleString()); // UTC time

  const form = useForm({
    defaultValues: {
      // dateFrom: new Date().toISOString().split('T')[0],// need
      // dateTo: new Date().toISOString().split('T')[0],
      dateFrom: convertToLocalDate(new Date().toLocaleDateString(), true), // 2023-11-18T17:10:34.751Z
      dateTo: convertToLocalDate(new Date().toLocaleDateString(), true),
    },
    // resolver: yupResolver(schema),
  });

  useEffect(() => {
    (async () => {
      await handleSubmit({
        dateFrom: convertToLocalDate(new Date().toLocaleDateString(), true),
        dateTo: convertToLocalDate(new Date().toLocaleDateString(), true),
      });
    })();
  }, []);

  const handleSubmit = async (values) => {
    // console.log(values);
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
      const actionResult = await reportApi.detailServiceResult(params);
      if (actionResult.success) {
        setResultList(actionResult.data);
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
        const actionResult = await reportApi.detailServiceResult(params);
        if (actionResult.success) {
          setResultList(actionResult.data);
        }
      }
      if (error.response.status === 400) {
        // console.log(error.response);
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'Select valid date to search',
        });
      }
    }
    setShowLazyLoading(false);
  };

  return (
    <div>
      {showLazyLoading && <LazyLoading />}
      <div>
        <h1>Service evaluation results details</h1>
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
            {resultList.criterias?.map((resultDetail, index) => (
              <div key={resultDetail.criId} className="mt-4">
                <CriteriaResult resultDetail={resultDetail} index={index} checkedOption={1} />
              </div>
            ))}
          </div>
        </form>
        <div className="col-3">
          <Card className="d-flex justify-content-between flex-column">
            <CardMedia sx={{ height: 140 }} image={URL_IMG + '' + resultList.icon} title="green iguana" />
            <CardContent>
              <Typography gutterBottom variant="h7" component="div" style={{ fontWeight: 'bold' }}>
                {resultList.serName}
              </Typography>
              {/* <Typography variant="body2" color="text.secondary">
                {resultList.serDesc}
              </Typography> */}
            </CardContent>
            <Button
              type="submit"
              onClick={() => navigate(`/admin/report/overview-results/${serId}`)}
              fullWidth
              variant="contained"
            >
              Back
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default DetailServiceResult;
