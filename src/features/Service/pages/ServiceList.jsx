import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeServiceStatus, createService, fetchAllServices, readService, updateService } from '../serviceSlice';
import { DataGrid } from '@mui/x-data-grid';
import ModalApp from '../../../components/ModalApp';
import { Button, Switch } from '@mui/material';
import { useState } from 'react';
import Swal from 'sweetalert2';
import LazyLoading from '../../../components/LazyLoading';
import ServiceFormAdd from '../components/ServiceFormAdd';
import ServiceFormEdit from '../components/ServiceFormEdit';
import { formatDateTime, getRole } from '../../../utils/common';
import { URL_IMG } from '../../../constants/storage_urls';
import ServiceDetails from '../components/ServiceDetails';

// {
//   "serId": 10,
//   "serName": "Service10",
//   "serDesc": "This is service 10",
//   "icon": "Icon20231102231426.png",
//   "createdOn": "2023-11-01T20:57:52.2892463",
//   "createdBy": 5,
//   "modifiedOn": "2023-11-01T20:57:52.2893222",
//   "modifiedBy": 5,
//   "status": true
// }
function ServiceList() {
  const roleStr = getRole().role;
  const columns = [
    { field: 'id', headerName: '#', width: 50 },
    // { field: 'serId', headerName: 'Service ID', width: 200 },
    { field: 'serName', headerName: 'Service Name', width: 200 },
    { field: 'serDesc', headerName: 'Service Description', width: 200 },
    // {
    //   field: 'icon',
    //   headerName: 'Icon',
    //   width: 200,
    //   renderCell: (params) => {
    //     return <img src={URL_IMG + params.row.icon} alt={params.row.serName} />;
    //   },
    // },
    {
      field: 'createdOn',
      headerName: 'Created On',
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
        <Switch checked={params.row.status} onChange={() => handleChangeStatus(params.row.serId)} />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 200,
      renderCell: (params) => (
        <div>
          {(roleStr.includes('Service7') || roleStr.includes('Service15')) && (
            <Button variant="contained" className="me-2" onClick={() => handleServiceById(params.row.serId, 'edit')}>
              Edit
            </Button>
          )}
          <Button variant="contained" onClick={() => handleServiceById(params.row.serId, 'details')}>
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
  const services = useSelector((state) => state.service.data);
  const status = useSelector((state) => state.service.status);
  const error = useSelector((state) => state.service.error);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllServices());
    }
  }, [dispatch, status]);

  const handleChangeStatus = async (serId) => {
    try {
      Swal.fire({
        icon: 'warning',
        title: 'Warning...',
        text: 'Are you sure to change status of this service?',
        showCancelButton: true,
        confirmButtonText: 'OK',
      }).then(async (result) => {
        if (result.isConfirmed) {
          const action = changeServiceStatus(serId);
          const resultAction = await dispatch(action);
          if (resultAction.error) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Your server error occurred',
            });
          } else {
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
            Toast.fire({
              icon: 'success',
              title: 'The service is updated successfully.',
            });
          }
        }
      });
    } catch (error) {}
  };

  const handleServiceById = async (serId, keyAction) => {
    // setShowLazyLoading(true);
    setSelectedService(null);
    try {
      const action = readService(serId);
      const resultAction = await dispatch(action);
      const service = resultAction.payload.data;
      setSelectedService({
        serId: service.serId,
        serName: service.serName,
        serDesc: service.serDesc,
        icon: service.icon,
        status: service.status,
        createdOn: formatDateTime(service.createdOn),
        createdBy: services.find((item) => item.serId === service.serId).createdBy,
        modifiedOn: formatDateTime(service.modifiedOn),
        modifiedBy: services.find((item) => item.serId === service.serId).modifiedBy,
      });
      if (keyAction === 'edit') {
        handleOpenEdit();
      }
      if (keyAction === 'details') {
        handleOpenDetail();
      }
    } catch (error) {}
  };

  const handleUpdateService = async (values) => {
    // Call Api
    setShowLazyLoading(true);
    // console.log('Form submit: ', values);
    try {
      const action = updateService(values);
      const resultAction = await dispatch(action);
      // console.log(resultAction);
      if (resultAction.error) {
        setShowLazyLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Your server error occurred',
        });
      } else {
        if (resultAction.payload.success) {
          setShowLazyLoading(false);
          handleCloseEdit();
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
          Toast.fire({
            icon: 'success',
            title: 'The service is updated successfully.',
          });
        } else {
          setShowLazyLoading(false);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: resultAction.payload.message,
          });
        }
      }
    } catch (error) {
      console.log('Failed to signin:', error);
    }
  };

  const handleCreateService = async (values) => {
    // Call Api
    setShowLazyLoading(true);
    // console.log('Form submit: ', values);
    try {
      const action = createService(values);
      const resultAction = await dispatch(action);
      // console.log(resultAction);
      if (resultAction.error) {
        setShowLazyLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Your server error occurred',
        });
      } else {
        if (resultAction.payload.success) {
          setShowLazyLoading(false);
          handleCloseAdd();
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
          Toast.fire({
            icon: 'success',
            title: 'New service is added successfully.',
          });
        } else {
          setShowLazyLoading(false);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: resultAction.payload.message,
          });
        }
      }
    } catch (error) {
      console.log('Failed to signin:', error);
    }
  };

  var columnsHash = [];
  if (roleStr.includes('Service15')) {
    columnsHash = columns;
  } else {
    columnsHash = columns.filter((column) => column.field !== 'status');
  }

  return (
    <div>
      {showLazyLoading && <LazyLoading />}
      <div>
        <h1>List of services in hospital</h1>
      </div>
      <div className="text-end mb-3">
        {(roleStr.includes('Service7') || roleStr.includes('Service15')) && (
          <Button onClick={handleOpenAdd} variant="contained">
            Add new Sevice
          </Button>
        )}
      </div>
      <ModalApp
        open={openAdd}
        handleClose={handleCloseAdd}
        content={<ServiceFormAdd onSubmit={handleCreateService} handleClose={handleCloseAdd} />}
        title="Add Service"
      />
      <ModalApp
        open={openEdit}
        handleClose={handleCloseEdit}
        content={
          <ServiceFormEdit onSubmit={handleUpdateService} handleClose={handleCloseEdit} service={selectedService} />
        }
        title="Edit Service"
      />
      <ModalApp
        open={openDetail}
        handleClose={handleCloseDetail}
        content={<ServiceDetails handleClose={handleCloseDetail} service={selectedService} />}
        title="Service Details"
      />
      <div>
        {services?.length > 0 ? (
          <DataGrid
            style={{ overflow: 'hidden' }}
            rows={services.map((service, index) => {
              return { id: index + 1, ...service };
            })}
            getRowId={(row) => row.serId}
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

export default ServiceList;
