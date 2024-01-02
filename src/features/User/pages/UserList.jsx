import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeUserStatus,
  createUser,
  fetchAllUsers,
  readUser,
  updateUser,
  updateRole,
  readRole,
  fetchAllRoles,
} from '../manageUserSlice';
import { DataGrid } from '@mui/x-data-grid';
import ModalApp from '../../../components/ModalApp';
import { Button, Switch } from '@mui/material';
import { useState } from 'react';
import Swal from 'sweetalert2';
import LazyLoading from '../../../components/LazyLoading';
import { formatDateTime, getRole } from '../../../utils/common';
import UserDetails from '../components/UserDetails';
import RoleFormEdit from '../components/RoleFormEdit';
import UserFormAdd from '../components/UserFormAdd';
import UserFormEdit from '../components/UserFormEdit';

function UserList() {
  const roleStr = getRole().role;
  const columns = [
    { field: 'id', headerName: '#', width: 50 },
    // { field: 'userId', headerName: 'User ID', width: 100 },
    // { field: 'firstName', headerName: 'First Name', width: 100 },
    // { field: 'lastName', headerName: 'Last Name', width: 100 },
    { field: 'email', headerName: 'User Email', width: 250 },
    {
      field: 'firstName',
      headerName: 'Full Name',
      width: 150,
      valueGetter: (params) => {
        return params.row.firstName + ' ' + params.row.lastName;
      },
    },
    // {
    //   field: 'dob',
    //   headerName: 'Date Of Birth',
    //   width: 200,
    //   valueGetter: (params) => {
    //     return params.row.dob ? formatDateTime(params.row.dob) : 'None';
    //   },
    // },
    // {
    //   field: 'genderId',
    //   headerName: 'Gender',
    //   width: 100,
    //   valueGetter: (params) => {
    //     return params.row.genderId === 2 ? 'Female' : params.row.genderId === 1 ? 'Male' : 'Other';
    //   },
    // },
    // {
    //   field: 'phoneNumber',
    //   headerName: 'Phone',
    //   width: 150,
    //   valueGetter: (params) => {
    //     return params.row.phoneNumber ? params.row.phoneNumber : 'None';
    //   },
    // },
    // {
    //   field: 'address',
    //   headerName: 'Address',
    //   width: 250,
    //   valueGetter: (params) => {
    //     return params.row.address ? params.row.address : 'None';
    //   },
    // },
    { field: 'role', headerName: 'Role', width: 100 },
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
      headerName: 'Block',
      width: 70,
      renderCell: (params) => (
        <Switch
          checked={params.row.status === 'Active' ? false : true}
          onChange={() => handleChangeStatus(params.row.userId)}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 300,
      renderCell: (params) => (
        <div>
          {(roleStr.includes('User7') || roleStr.includes('User15')) && (
            <Button variant="contained" className="me-2" onClick={() => handleUserById(params.row.userId, 'edit')}>
              Edit
            </Button>
          )}
          {roleStr.includes('User15') && (
            <Button variant="contained" className="me-2" onClick={() => handleRoleById(params.row.userId, 'edit role')}>
              Edit role
            </Button>
          )}
          <Button variant="contained" onClick={() => handleUserById(params.row.userId, 'details')}>
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
  const users = useSelector((state) => state.manageUser.data);
  const status = useSelector((state) => state.manageUser.status);
  const error = useSelector((state) => state.manageUser.error);
  const [selectedUser, setSelectedUser] = useState(null);
  // state to store two lists: genders and roles
  const [genders, setGenders] = useState([]);
  const [roles, setRoles] = useState([]);
  const [openRoleEdit, setOpenRoleEdit] = useState(false);
  const handleOpenRoleEdit = () => setOpenRoleEdit(true);
  const handleCloseRoleEdit = () => setOpenRoleEdit(false);
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllUsers());
    }
  }, [dispatch, status]);

  const handleChangeStatus = async (userId) => {
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
        text: 'Are you sure to change status of this user?',
        showCancelButton: true,
        confirmButtonText: 'OK',
      }).then(async (result) => {
        if (result.isConfirmed) {
          const action = changeUserStatus(userId);
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
              title: 'Changed in successfully',
            });
          }
        }
      });
    } catch (error) {}
  };

  const handleLoadGendersAndRoles = async () => {
    // call API to get list genders and roles
    // same example below:
    // const actionService = fetchAllServices();
    // const resultActionService = await dispatch(actionService);
    // const services = resultActionService.payload;
    // setServices(services.map((item) => ({ label: item.serName, serId: item.serId })));
    handleOpenAdd();
  };

  const handleUserById = async (userId, keyAction) => {
    // setShowLazyLoading(true);
    setSelectedUser(null);
    try {
      const action = readUser(userId);
      const resultAction = await dispatch(action);
      const user = resultAction.payload.data;

      //   "data": {
      //     "userId": 2,
      //     "email": "thanhpnhe151285@fpt.edu.vn",
      //     "firstName": "Thanh",
      //     "lastName": "Pham Nhat",
      //     "fullname": "Thanh Pham Nhat",
      //     "image": "Image20231210035027.png",
      //     "role": "QAO",
      //     "genderId": 1,
      //     "dob": "2023-12-06T00:00:00",
      //     "phoneNumber": "0485827715",
      //     "address": "None",
      //     "createdOn": "2023-09-27T17:00:00",
      //     "modifiedOn": "2023-12-11T15:06:17.5640751",
      //     "status": "Active"
      // }
      setSelectedUser({
        userId: user.userId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        fullname: user.fullname,
        role: user.role,
        dob: user.dob,
        createdOn: user.createdOn,
        modifiedOn: user.modifiedOn,
        status: user.status,
        genderId: user.genderId,
        phoneNumber: user.phoneNumber ? user.phoneNumber : 'None',
        address: user.address,
        image: user.image,
      });
      if (keyAction === 'edit') {
        handleOpenEdit();
      }
      if (keyAction === 'details') {
        handleOpenDetail();
      }
    } catch (error) {}
  };

  const handleUpdateUser = async (values) => {
    // console.log(values);
    setShowLazyLoading(true);
    try {
      const action = updateUser(values);
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
            title: 'The user is updated successfully.',
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

  const handleCreateUser = async (values) => {
    // console.log(values);
    setShowLazyLoading(true);
    try {
      const action = createUser(values);
      const resultAction = await dispatch(action);
      // console.log(resultAction);
      if (resultAction.error) {
        setShowLazyLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Your server error occurred.',
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
            title: 'The new user is added successfully.',
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

  const handleRoleById = async (userId, keyAction) => {
    // setShowLazyLoading(true);
    setSelectedRole(null);
    try {
      const actionRole = fetchAllRoles();
      const resultActionRole = await dispatch(actionRole);
      var roles = resultActionRole.payload;
      roles = roles.map((item, index) => ({ label: item, roleId: index + 1 }));

      const action = readRole(userId);
      const resultAction = await dispatch(action);
      const roleResponse = resultAction.payload.data;
      const role = roleResponse.mAdmin
        ? { label: 'Admin', roleId: 1 }
        : roleResponse.mqao
        ? { label: 'QAO', roleId: 2 }
        : roleResponse.mbom
        ? { label: 'BOM', roleId: 3 }
        : { label: 'None', roleId: 0 };

      setSelectedRole({
        userId: roleResponse.userId,
        mAdmin: roleResponse.mAdmin,
        mqao: roleResponse.mqao,
        mbom: roleResponse.mbom,
        mSystem: roleResponse.mSystem,
        mUser: roleResponse.mUser,
        mService: roleResponse.mService,
        mCriteria: roleResponse.mCriteria,
        role: role,
        roles: roles,
      });
      handleOpenRoleEdit();
    } catch (error) {}
  };

  const handleUpdateRole = async (values) => {
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
        userId: values.userId,
        mAdmin: values.selectedRole.label === 'Admin' ? true : false,
        mqao: values.selectedRole.label === 'QAO' ? true : false,
        mbom: values.selectedRole.label === 'BOM' ? true : false,
        mCriteria: values.mCriteria,
        mService: values.mService,
        mSystem: values.mSystem,
        mUser: values.mUser,
      };
      const action = updateRole(params);
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
        handleCloseRoleEdit();
        Toast.fire({
          icon: 'error',
          title: 'Updated role in failure',
        });
      } else {
        setShowLazyLoading(false);
        handleCloseRoleEdit();
        Toast.fire({
          icon: 'success',
          title: 'Updated role in successfully',
        });
      }
    } catch (error) {}
  };

  var columnsHash = [];
  if (roleStr.includes('User15')) {
    columnsHash = columns;
  } else {
    columnsHash = columns.filter((column) => column.field !== 'status');
  }

  return (
    <div>
      {showLazyLoading && <LazyLoading />}
      <div>
        <h1>List of users in hospital</h1>
      </div>
      <div className="text-end mb-3">
        {(roleStr.includes('User7') || roleStr.includes('User15')) && (
          <Button onClick={handleLoadGendersAndRoles} variant="contained">
            Add new user
          </Button>
        )}
      </div>
      <ModalApp
        open={openAdd}
        handleClose={handleCloseAdd}
        content={
          // fill data in genders and roles to transfer data
          <UserFormAdd onSubmit={handleCreateUser} handleClose={handleCloseAdd} genders={null} roles={null} />
        }
        title="Add User"
      />
      <ModalApp
        open={openEdit}
        handleClose={handleCloseEdit}
        content={
          // fill data in genders and roles to transfer data
          <UserFormEdit
            onSubmit={handleUpdateUser}
            handleClose={handleCloseEdit}
            user={selectedUser}
            genders={null}
            roles={null}
          />
        }
        title="Edit User"
      />
      <ModalApp
        open={openRoleEdit}
        handleClose={handleCloseRoleEdit}
        content={<RoleFormEdit onSubmit={handleUpdateRole} handleClose={handleCloseRoleEdit} role={selectedRole} />}
        title="Edit Role"
      />
      <ModalApp
        open={openDetail}
        handleClose={handleCloseDetail}
        content={<UserDetails handleClose={handleCloseDetail} user={selectedUser} />}
        title="User Details"
      />
      <div>
        {users?.length > 0 ? (
          <DataGrid
            style={{ overflow: 'hidden' }}
            rows={users.map((item, index) => {
              return { id: index + 1, ...item };
            })}
            getRowId={(row) => row.userId}
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

export default UserList;
