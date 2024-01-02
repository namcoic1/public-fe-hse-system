import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSystemInformation, updateSystemInformation } from '../systemInformationSlice';
import ModalApp from '../../../components/ModalApp';
import { Button, Switch } from '@mui/material';
import { useState } from 'react';
import Swal from 'sweetalert2';
import LazyLoading from '../../../components/LazyLoading';
import { URL_IMG } from '../../../constants/storage_urls';
import SystemInformationFormEdit from '../components/SystemInformationEdit';

function SystemInformation() {
  const [showLazyLoading, setShowLazyLoading] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);
  const dispatch = useDispatch();
  const systemInformation = useSelector((state) => state.systemInfo.data);
  // console.log(systemInformation);
  const status = useSelector((state) => state.systemInfo.status);
  const error = useSelector((state) => state.systemInfo.error);
  const [selectedSystemInformation, setSelectedSystemInformation] = useState(null);

  useEffect(() => {
    if (status === 'idle') {
      (async () => {
        try {
          const action = getSystemInformation();
          const resultAction = await dispatch(action);
          const systemInformation = resultAction.payload;
          // console.log(systemInformation);
          setSelectedSystemInformation({
            sysName: systemInformation.sysName,
            icon: systemInformation.icon,
            logo: systemInformation.logo,
            zalo: systemInformation.zalo,
            hotline: systemInformation.hotline,
            address: systemInformation.address,
          });
          document.title = systemInformation.sysName;
          document.querySelector('link[rel="icon"]').href = URL_IMG + systemInformation.icon;
        } catch (error) {}
      })();
    }
  }, [dispatch, status]);

  const handleEditSystemInformation = async () => {
    // setShowLazyLoading(true);
    //setSelectedSystemInformation(selectedSystemInformation);
    try {
      const action = getSystemInformation();
      const resultAction = await dispatch(action);
      const systemInformation = resultAction.payload;
      setSelectedSystemInformation({
        sysName: systemInformation.sysName,
        icon: systemInformation.icon,
        logo: systemInformation.logo,
        zalo: systemInformation.zalo,
        hotline: systemInformation.hotline,
        address: systemInformation.address,
      });
      handleOpenEdit();
    } catch (error) {}
  };

  const handleUpdateSystemInformation = async (values) => {
    //console.log(values);
    // Call Api
    setShowLazyLoading(true);
    try {
      const action = updateSystemInformation(values);
      const resultAction = await dispatch(action);
      console.log(resultAction);
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
            title: 'Updated in successfully',
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

  return (
    <div>
      {showLazyLoading && <LazyLoading />}
      <ModalApp
        open={openEdit}
        handleClose={handleCloseEdit}
        content={
          <SystemInformationFormEdit
            onSubmit={handleUpdateSystemInformation}
            handleClose={handleCloseEdit}
            systemInformation={selectedSystemInformation}
          />
        }
        title="Edit System Information"
      />
      <h1>System Information</h1>
      <div style={{ height: '100%', width: '100%' }}>
        <div>
          <div className="row">
            <div className="col-4">
              <div className="p-2 fw-bolder text-left text-white" style={{ backgroundColor: '#1976D2' }}>
                Icon
              </div>
              <div className="border border-secondary">
                <img
                  src={URL_IMG + systemInformation.icon}
                  alt={systemInformation.sysName}
                  style={{ aspectRatio: '6/3', objectFit: 'cover', width: '100%' }}
                />
              </div>
              <div className="mt-4 p-2 fw-bolder text-left text-white" style={{ backgroundColor: '#1976D2' }}>
                Logo
              </div>
              <div className="border border-secondary">
                <img
                  src={URL_IMG + systemInformation.logo}
                  alt={systemInformation.sysName}
                  style={{ aspectRatio: '6/3', objectFit: 'cover', width: '100%' }}
                />
              </div>
            </div>
            <div className="col-7 px-3 d-flex flex-column">
              <div style={{ width: '100%' }}>
                <div className="fw-bolder fs-5">System Details</div>
                <hr className="border border-dark border-1 mt-1"></hr>
                <div className="fw-bolder fs-6 mt-4">System Name</div>
                <div className="text-black-50">{systemInformation.sysName}</div>
                <div className="fw-bolder fs-6 mt-4">Zalo</div>
                <div className="text-black-50">{systemInformation.zalo}</div>
                <div className="fw-bolder fs-6 mt-4">Hotline</div>
                <div className="text-black-50">{systemInformation.hotline}</div>
                <div className="fw-bolder fs-6 mt-4">Address</div>
                <div className="text-black-50">{systemInformation.address}</div>
              </div>

              <div className="d-flex justify-content-end mt-auto">
                <Button variant="contained" className="me-2" onClick={() => handleEditSystemInformation()}>
                  Edit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SystemInformation;
