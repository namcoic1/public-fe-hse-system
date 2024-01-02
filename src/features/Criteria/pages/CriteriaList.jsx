import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeCriteriaStatus, createCriteria, fetchAllCriteria, readCriteria, updateCriteria } from '../criteriaSlice';
import { DataGrid } from '@mui/x-data-grid';
import ModalApp from '../../../components/ModalApp';
import { Button, Switch } from '@mui/material';
import { useState } from 'react';
import Swal from 'sweetalert2';
import LazyLoading from '../../../components/LazyLoading';
import { formatDateTime, getRole } from '../../../utils/common';
import CriteriaDetails from '../components/CriteriaDetails';
import CriteriaFormEdit from '../components/CriteriaFormEdit';
import CriteriaFormAdd from '../components/CriteriaFormAdd';
import { fetchAllServices } from '../../Service/serviceSlice';
import serviceApi from '../../../api/serviceApi';
import userApi from '../../../api/userApi';

function CriteriaList() {
  const roleStr = getRole().role;
  const columns = [
    { field: 'id', headerName: '#', width: 50 },
    // { field: 'criId', headerName: 'Criteria ID', width: 200 },
    {
      field: 'serId',
      headerName: 'Service Name',
      width: 200,
      valueGetter: (params) => {
        return params.row.service.serName;
      },
    },
    { field: 'criDesc', headerName: 'Criteria Name', width: 200 },
    {
      field: 'createdOn',
      headerName: 'Create On',
      width: 200,
      valueGetter: (params) => {
        return params.row.createdOn ? formatDateTime(params.row.createdOn) : 'Not yet';
      },
    },
    {
      field: 'modifiedOn',
      headerName: 'Modified On',
      width: 200,
      valueGetter: (params) => {
        return params.row.modifiedOn ? formatDateTime(params.row.modifiedOn) : 'Not yet';
      },
    },
    {
      field: 'status',
      headerName: 'Display',
      width: 70,
      renderCell: (params) => (
        <Switch checked={params.row.status} onChange={() => handleChangeStatus(params.row.criId)} />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 200,
      renderCell: (params) => (
        <div>
          {(roleStr.includes('Criteria7') || roleStr.includes('Criteria15')) && (
            <Button variant="contained" className="me-2" onClick={() => handleCriteriaById(params.row.criId, 'edit')}>
              Edit
            </Button>
          )}
          <Button variant="contained" onClick={() => handleCriteriaById(params.row.criId, 'details')}>
            Details
          </Button>
        </div>
      ),
    },
  ];
  const [showLazyLoading, setShowLazyLoading] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);
  const [openDetail, setOpenDetail] = useState(false);
  const handleOpenDetail = () => setOpenDetail(true);
  const handleCloseDetail = () => setOpenDetail(false);
  const dispatch = useDispatch();
  const criteria = useSelector((state) => state.criteria.data);
  const status = useSelector((state) => state.criteria.status);
  const error = useSelector((state) => state.criteria.error);
  const [selectedCriteria, setSelectedCriteria] = useState(null);
  const [services, setServices] = useState();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllCriteria());
    }
  }, [dispatch, status]);

  const handleChangeStatus = async (criId) => {
    try {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Swal.fire({
        icon: 'warning',
        title: 'Warning...',
        text: 'Are you sure to change status of this criteria?',
        showCancelButton: true,
        confirmButtonText: 'OK',
      }).then(async (result) => {
        if (result.isConfirmed) {
          const action = changeCriteriaStatus(criId);
          const resultAction = await dispatch(action);
          if (resultAction.error) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Your server error occurred',
            });
          } else if (!resultAction.payload.success) {
            Toast.fire({
              icon: 'error',
              title: 'Changed in failure',
            });
          } else {
            Toast.fire({
              icon: 'success',
              title: 'Current evaluation criteria is updated successfully.',
            });
          }
        }
      });
    } catch (error) {}
  };

  const handleLoadServices = async () => {
    try {
      const actionService = await serviceApi.getServiceForCompare();
      if (actionService.success) {
        setServices(actionService.data.map((item) => ({ label: item.serName, serId: item.serId })));
        handleOpenAdd();
      }
    } catch (error) {
      if (error.response.status === 401) {
        await userApi.refreshToken();
        const actionService = await serviceApi.getServiceForCompare();
        if (actionService.success) {
          setServices(actionService.data.map((item) => ({ label: item.serName, serId: item.serId })));
          handleOpenAdd();
        }
      }
    }
  };

  const handleCriteriaById = async (criId, keyAction) => {
    // setShowLazyLoading(true);
    setSelectedCriteria(null);
    try {
      const action = readCriteria(criId);
      const resultAction = await dispatch(action);
      const criteria = resultAction.payload.data;
      var createdUser = 'No body';
      var modifiedUser = 'No body';
      criteria.users.map((data, index) => {
        if (data.userId === criteria.createdBy) {
          createdUser = data.firstName + ' ' + data.lastName;
        }
        if (data.userId === criteria.modifiedBy) {
          modifiedUser = data.firstName + ' ' + data.lastName;
        }
      });

      try {
        const actionService = await serviceApi.getServiceForCompare();
        if (actionService.success) {
          setServices(actionService.data.map((item) => ({ label: item.serName, serId: item.serId })));
        }
      } catch (error) {
        if (error.response.status === 401) {
          await userApi.refreshToken();
          const actionService = await serviceApi.getServiceForCompare();
          if (actionService.success) {
            setServices(actionService.data.map((item) => ({ label: item.serName, serId: item.serId })));
          }
        }
      }

      setSelectedCriteria({
        criId: criteria.criId,
        criDesc: criteria.criDesc,
        note: criteria.note ? criteria.note : 'Not yet',
        createdOn: criteria.createdOn ? formatDateTime(criteria.createdOn) : 'Not yet',
        createdBy: createdUser,
        modifiedOn: criteria.modifiedOn ? formatDateTime(criteria.modifiedOn) : 'Not yet',
        modifiedBy: modifiedUser,
        serId: criteria.serId,
        serName: criteria.service.serName,
        status: criteria.status,
        // services: services.map((item) => ({ label: item.serName, serId: item.serId })),
      });
      if (keyAction === 'edit') {
        handleOpenEdit();
      }
      if (keyAction === 'details') {
        handleOpenDetail();
      }
    } catch (error) {}
  };

  const handleUpdateCriteria = async (values) => {
    // Call Api
    setShowLazyLoading(true);
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    try {
      const params = {
        criId: values.criId,
        criDesc: values.criDesc,
        note: values.note,
        serId: values.selectedService.serId,
      };
      const action = updateCriteria(params);
      const resultAction = await dispatch(action);
      if (resultAction.error) {
        setShowLazyLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Your server error occurred',
        });
      } else if (!resultAction.payload.success) {
        setShowLazyLoading(false);
        handleCloseEdit();
        Toast.fire({
          icon: 'error',
          title: 'Current evaluation criteria is updated failure.',
        });
      } else {
        setShowLazyLoading(false);
        handleCloseEdit();
        Toast.fire({
          icon: 'success',
          title: 'Current evaluation criteria is updated successfully.',
        });
      }
    } catch (error) {}
  };

  const handleCreateCriteria = async (values) => {
    // Call Api
    setShowLazyLoading(true);
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    try {
      const params = {
        criDesc: values.criDesc,
        note: values.note,
        status: values.status,
        serId: values.selectedService.serId,
      };
      const action = createCriteria(params);
      const resultAction = await dispatch(action);
      if (resultAction.error) {
        setShowLazyLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Your server error occurred',
        });
      } else if (!resultAction.payload.success) {
        setShowLazyLoading(false);
        handleCloseAdd();
        Toast.fire({
          icon: 'error',
          title: 'New evaluation criteria are added to failure.',
        });
      } else {
        setShowLazyLoading(false);
        handleCloseAdd();
        Toast.fire({
          icon: 'success',
          title: 'New evaluation criteria are added successfully.',
        });
      }
    } catch (error) {}
  };

  var columnsHash = [];
  if (roleStr.includes('Criteria15')) {
    columnsHash = columns;
  } else {
    columnsHash = columns.filter((column) => column.field !== 'status');
  }

  return (
    <div>
      {showLazyLoading && <LazyLoading />}
      <div>
        <h1>List of criteria in hospital</h1>
      </div>
      <div className="text-end mb-3">
        {(roleStr.includes('Criteria7') || roleStr.includes('Criteria15')) && (
          <Button onClick={handleLoadServices} variant="contained">
            Add new criteria
          </Button>
        )}
      </div>
      <ModalApp
        open={openAdd}
        handleClose={handleCloseAdd}
        content={<CriteriaFormAdd onSubmit={handleCreateCriteria} handleClose={handleCloseAdd} services={services} />}
        title="Add Criteria"
      />
      <ModalApp
        open={openEdit}
        handleClose={handleCloseEdit}
        content={
          <CriteriaFormEdit
            onSubmit={handleUpdateCriteria}
            handleClose={handleCloseEdit}
            criteria={selectedCriteria}
            services={services}
          />
        }
        title="Edit Criteria"
      />
      <ModalApp
        open={openDetail}
        handleClose={handleCloseDetail}
        content={<CriteriaDetails handleClose={handleCloseDetail} criteria={selectedCriteria} />}
        title="Criteria Details"
      />
      <div>
        {criteria?.length > 0 ? (
          <DataGrid
            style={{ overflow: 'hidden' }}
            rows={criteria.map((item, index) => {
              return { id: index + 1, ...item };
            })}
            getRowId={(row) => row.criId}
            columns={columnsHash}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[10, 20, 50, 100]}
            // checkboxSelection
          />
        ) : (
          <LazyLoading />
        )}
      </div>
    </div>
  );
}

export default CriteriaList;
