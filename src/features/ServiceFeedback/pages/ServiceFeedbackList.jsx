import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Switch } from '@mui/material';
import Swal from 'sweetalert2';
import LazyLoading from '../../../components/LazyLoading';
import { convertToLocalDate, formatDateTime } from '../../../utils/common';
import DateField from '../../../components/form-controls/DateField';
import { useForm } from 'react-hook-form';
import serviceFeedbackApi from '../../../api/serviceFeedbackApi';
import userApi from '../../../api/userApi';

function ServiceFeedbackList() {
  const [showLazyLoading, setShowLazyLoading] = useState(false);
  const [serviceFeedback, setServiceFeedback] = useState([]);
  const columns = [
    { field: 'id', headerName: '#', width: 50 },
    { field: 'serName', headerName: 'Service Name', width: 400 },
    { field: 'feedback', headerName: 'Feedback', width: 400 },
    {
      field: 'createdOn',
      headerName: 'Submitted On',
      width: 200,
      valueGetter: (params) => {
        return formatDateTime(params.row.createdOn);
      },
    },
  ];
  const form = useForm({
    defaultValues: {
      dateFrom: convertToLocalDate(new Date().toLocaleDateString(), true), // 2023-11-18T17:10:34.751Z
      dateTo: convertToLocalDate(new Date().toLocaleDateString(), true),
    },
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
    if (values.dateFrom === '' || values.dateTo === '') {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Select valid date to search',
      });
      return;
    }
    setShowLazyLoading(true);
    const params = {
      dateFrom: new Date(values.dateFrom + 'T00:00:00').toISOString(),
      dateTo: new Date(values.dateTo + 'T00:00:00').toISOString(),
    };
    try {
      const actionResult = await serviceFeedbackApi.getAll(params);
      if (actionResult.success) {
        setServiceFeedback(actionResult.data);
      }
    } catch (error) {
      if (error.response.status === 401) {
        await userApi.refreshToken();
        const actionResult = await serviceFeedbackApi.getAll(params);
        if (actionResult.success) {
          setServiceFeedback(actionResult.data);
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
    setShowLazyLoading(false);
  };

  return (
    <div>
      {showLazyLoading && <LazyLoading />}
      <div>
        <h1>List of patient's opinions in hospital</h1>
      </div>
      <div className="row mb-3">
        {/* <div className="col-6"></div> */}
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
          </div>
        </form>
      </div>
      <div>
        {serviceFeedback?.length > 0 ? (
          <DataGrid
            style={{ overflow: 'hidden' }}
            localeText={{ noRowsLabel: 'List is empty.' }}
            rows={serviceFeedback.map((item, index) => {
              return { id: index + 1, ...item };
            })}
            getRowId={(row) => row.fbId}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[10, 20, 50, 100]}
            // checkboxSelection
          />
        ) : (
          <div className="alert alert-warning  alert-dismissible fade show mt-4" role="alert">
            <h4 className="alert-heading">System</h4>
            <p>There is no data available for this period!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ServiceFeedbackList;
