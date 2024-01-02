import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllEvaluationResult, readEvaluationResult } from '../evaluationResultSlice';
import { DataGrid } from '@mui/x-data-grid';
import ModalApp from '../../../components/ModalApp';
import { Button, Switch } from '@mui/material';
import { useState } from 'react';
import Swal from 'sweetalert2';
import LazyLoading from '../../../components/LazyLoading';
import { convertToLocalDate, formatDateTime } from '../../../utils/common';
import EvaluationResultDetails from '../components/EvaluationResultDetails';
import evaluationResultApi from '../../../api/evaluationResultApi';
import DateField from '../../../components/form-controls/DateField';
import { useForm } from 'react-hook-form';
import userApi from '../../../api/userApi';

function EvaluationResultList() {
  const columns = [
    { field: 'id', headerName: '#', width: 50 },
    // { field: 'evaDataId', headerName: 'Evaluation Result ID', width: 200 },
    { field: 'serName', headerName: 'Service Name', width: 200 },
    { field: 'criDesc', headerName: 'Criteria Name', width: 200 },
    // { field: 'point', headerName: 'Mark', width: 100 },
    { field: 'option', headerName: 'Survey Answer', width: 200 },
    { field: 'patientName', headerName: 'Patient Name', width: 200 },
    {
      field: 'createdOn',
      headerName: 'Submitted On',
      width: 200,
      valueGetter: (params) => {
        return formatDateTime(params.row.createdOn);
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 200,
      renderCell: (params) => (
        <div>
          <Button variant="contained" onClick={() => handleEvaluationResultById(params.row.evaDataId, 'details')}>
            Details
          </Button>
        </div>
      ),
    },
  ];
  const [showLazyLoading, setShowLazyLoading] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const handleOpenDetail = () => setOpenDetail(true);
  const handleCloseDetail = () => setOpenDetail(false);
  const dispatch = useDispatch();
  // const evaluationResult = useSelector((state) => state.evaluationResult.data);
  // const status = useSelector((state) => state.evaluationResult.status);
  // const error = useSelector((state) => state.evaluationResult.error);
  const [selectedEvaluationResult, setSelectedEvaluationResult] = useState(null);
  const [evaluationResult, setEvaluationResult] = useState([]);

  // useEffect(() => {
  //   if (status === 'idle') {
  //     dispatch(fetchAllEvaluationResult());
  //   }
  // }, [dispatch, status]);

  //   const handleChangeStatus = async (evaDataId) => {
  //     try {
  //       const Toast = Swal.mixin({
  //         toast: true,
  //         position: 'top-end',
  //         showConfirmButton: false,
  //         timer: 3000,
  //         timerProgressBar: true,
  //         didOpen: (toast) => {
  //           toast.onmouseenter = Swal.stopTimer;
  //           toast.onmouseleave = Swal.resumeTimer;
  //         },
  //       });
  //       Swal.fire({
  //         icon: 'warning',
  //         title: 'Warning...',
  //         text: 'Are you sure to change status of this evaluation result?',
  //         showCancelButton: true,
  //         confirmButtonText: 'OK',
  //       }).then(async (result) => {
  //         if (result.isConfirmed) {
  //           const action = changeEvaluationResultStatus(evaDataId);
  //           const resultAction = await dispatch(action);
  //           if (resultAction.error) {
  //             Swal.fire({
  //               icon: 'error',
  //               title: 'Oops...',
  //               text: 'Your server error occurred',
  //             });
  //           } else if (!resultAction.payload.success) {
  //             Toast.fire({
  //               icon: 'error',
  //               title: 'Updated in failure',
  //             });
  //           } else {
  //             Toast.fire({
  //               icon: 'success',
  //               title: 'Updated in successfully',
  //             });
  //           }
  //         }
  //       });
  //     } catch (error) {}
  //   };

  const handleEvaluationResultById = async (evaDataId, keyAction) => {
    // setShowLazyLoading(true);
    setSelectedEvaluationResult(null);
    try {
      const action = readEvaluationResult(evaDataId);
      const resultAction = await dispatch(action);
      const evaluationResult = resultAction.payload.data;
      setSelectedEvaluationResult({
        evaDataId: evaluationResult.evaDataId,
        criId: evaluationResult.criId,
        serId: evaluationResult.serId,
        patientId: evaluationResult.patientId,
        serFbId: evaluationResult.serFbId,
        criDesc: evaluationResult.criDesc,
        serName: evaluationResult.serName,
        patientName: evaluationResult.patientName,
        serFb: evaluationResult.serFb,
        option: evaluationResult.option,
        createOn: evaluationResult.createdOn,
        status: evaluationResult.status,
      });
      if (keyAction === 'details') {
        handleOpenDetail();
      }
    } catch (error) {}
  };

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
      const actionResult = await evaluationResultApi.getAll(params);
      if (actionResult.success) {
        setEvaluationResult(actionResult.data);
      }
    } catch (error) {
      if (error.response.status === 401) {
        await userApi.refreshToken();
        const actionResult = await evaluationResultApi.getAll(params);
        if (actionResult.success) {
          setEvaluationResult(actionResult.data);
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
        <h1>List evaluation answers in hospital</h1>
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
      <ModalApp
        open={openDetail}
        handleClose={handleCloseDetail}
        content={
          <EvaluationResultDetails handleClose={handleCloseDetail} evaluationResult={selectedEvaluationResult} />
        }
        title="Evaluation Answer Details"
      />
      <div>
        {evaluationResult?.length > 0 ? (
          <DataGrid
            style={{ overflow: 'hidden' }}
            rows={evaluationResult.map((item, index) => {
              return { id: index + 1, ...item };
            })}
            getRowId={(row) => row.evaDataId}
            sx={{ overflow: 'scroll' }}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[10, 20, 50, 100]}
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

export default EvaluationResultList;
