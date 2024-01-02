import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Card, Grid, Stack, Typography } from '@mui/material';
import { default as React } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import * as yup from 'yup';
import { useNavigate } from 'react-router';
import InputField from '../../../../components/form-controls/InputField';
import { useForm } from 'react-hook-form';
import { createUser } from '../../manageUserSlice';
import ComboBoxField from '../../../../components/form-controls/ComboBoxField';
import PasswordField from '../../../../components/form-controls/PasswordField';
import DateField from '../../../../components/form-controls/DateField';
import InputFileField from '../../../../components/form-controls/InputFileField';
import { convertToLocalDate } from '../../../../utils/common';
import SwitchField from '../../../../components/form-controls/SwitchField';

const UserFormAdd = (props) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // List Gender
  const listGender = [
    { label: 'Male', genderId: 1 },
    { label: 'Female', genderId: 2 },
    { label: 'Other', genderId: 3 },
  ];

  // List Role
  const listRole = [
    { label: 'Admin', roleId: 1 },
    { label: 'QAO', roleId: 2 },
    { label: 'BOM', roleId: 3 },
  ];

  // Validation Form
  const schema = yup.object({
    email: yup
      .string()
      .required('Please enter the required field.')
      .email('The email is in the wrong format.')
      .max(256, 'The email exceeds 255 characters'),
    password: yup
      .string()
      .required('Please enter the required field.')
      .min(8, 'The password is between 8 and 20 characters.')
      .max(20, 'The password is between 8 and 20 characters.')
      .matches(
        '(?=^.{8,20}$)(?=.*\\d)(?![.\\n])(?=.*[a-z|A-Z]).*$',
        'The password must contain at least 1 letter and 1 number.',
      ),
    selectedRole: yup.object().required('Please enter the required field.'),
    selectedGender: yup.object().required('Please enter the required field.'),
    phoneNumber: yup
      .string()
      .required('Please enter the required field.')
      .matches('^[0-9\\-\\+]{9,15}$', 'The phone numbers only contain 9 to 15 numbers.'),
    firstName: yup.string().required('Please enter the required field.'),
    lastName: yup.string().required('Please enter the required field.'),
  });

  // Initial Form
  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      selectedGender: listGender[0],
      password: '',
      selectedRole: listRole[0],
      phoneNumber: '',
      email: '',
      dob: convertToLocalDate(new Date().toLocaleDateString(), true),
      address: '',
      image: null,
      status: false,
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      onSubmit(values);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <div className="row">
        <div className="col-12">
          <InputFileField name="image" label="Choose an image (PNG or JPG < 5MB)" form={form} />
        </div>
        <div className="col-6">
          <InputField name="email" label="Email *" form={form} />
        </div>
        <div className="col-6">
          <ComboBoxField name="selectedRole" label="Select role *" form={form} options={listRole} />
        </div>
        <div className="col-6">
          <InputField name="firstName" label="First name *" form={form} />
        </div>
        <div className="col-6">
          <InputField name="lastName" label="Last name *" form={form} />
        </div>
        <div className="col-6">
          <InputField name="phoneNumber" label="Phone number *" form={form} />
        </div>
        <div className="col-6">
          <PasswordField name="password" label="Password *" form={form} />
        </div>
        <div className="col-6">
          <DateField name="dob" label="Birthday" form={form} />
        </div>
        <div className="col-6">
          <ComboBoxField name="selectedGender" label="Select gender *" form={form} options={listGender} />
        </div>
        <div className="col-6">
          <InputField name="address" label="Address" form={form} />
        </div>
        <SwitchField name="status" label="Block" form={form} />
      </div>
      <div className="text-end">
        <Button variant="contained" className="bg-secondary" sx={{ mt: 3, mb: 2, mr: 1 }} onClick={props.handleClose}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Add
        </Button>
      </div>
    </form>
    // <Stack>
    //   <div style={{ marginBottom: '30px' }}>
    //     <h1>Add New User</h1>
    //   </div>
    //   <Card variant="outlined" sx={{ px: 4, py: 8 }}>
    //     <form onSubmit={form.handleSubmit(handleSubmit)}>
    //       <Grid container spacing={16} rowSpacing={1}>
    //         <Grid item md={6} xs={12}>
    //           <Stack>
    //             <Box mb={2}>
    //               <Typography sx={{ color: '#141E37', fontSize: '14px' }}>Email</Typography>
    //               <InputField name="email" form={form} />
    //             </Box>
    //             <Box mb={2}>
    //               <Typography sx={{ color: '#141E37', fontSize: '14px' }}>First Name</Typography>
    //               <InputField name="firstName" form={form} />
    //             </Box>
    //             <Box mb={2}>
    //               <Typography sx={{ color: '#141E37', fontSize: '14px' }}>Address</Typography>
    //               {/* <SelectField name="address" form={form} listSelect={listAddress}></SelectField> */}
    //               <ComboBoxField name="selectedAddress" label="Select address *" form={form} options={listAddress} />
    //             </Box>
    //             <Box mb={2}>
    //               <Typography sx={{ color: '#141E37', fontSize: '14px' }}>Phone Number</Typography>
    //               <InputField name="phoneNumber" form={form} />
    //             </Box>
    //             <Box mb={2}>
    //               <Typography sx={{ color: '#141E37', fontSize: '14px' }}>Gender</Typography>
    //               {/* <SelectField name="genderId" form={form} listSelect={listGender}></SelectField> */}
    //               <ComboBoxField name="selectedGender" label="Select gender *" form={form} options={listGender} />
    //             </Box>
    //           </Stack>
    //         </Grid>
    //         <Grid item md={6} xs={12} pt={{ xs: '0px' }}>
    //           <Stack>
    //             <Box mb={2}>
    //               <Typography sx={{ color: '#141E37', fontSize: '14px' }}>Role</Typography>
    //               {/* <SelectField name="role" form={form} listSelect={listRole}></SelectField> */}
    //               <ComboBoxField name="selectedRole" label="Select role *" form={form} options={listRole} />
    //             </Box>
    //             <Box mb={2}>
    //               <Typography sx={{ color: '#141E37', fontSize: '14px' }}>Last Name</Typography>
    //               <InputField name="lastName" form={form} />
    //             </Box>
    //             <Box mb={2}>
    //               <Typography sx={{ color: '#141E37', fontSize: '14px' }}>Password</Typography>
    //               <InputField name="password" form={form} />
    //             </Box>
    //             <Box mb={2}>
    //               <Typography sx={{ color: '#141E37', fontSize: '14px' }}>Date Of Birth</Typography>
    //               {/* <DatePickerField name="dob" form={form}></DatePickerField> */}
    //               <DateField name="dob" label="Enter Birth Day*" form={form} />
    //             </Box>
    //           </Stack>
    //         </Grid>
    //       </Grid>
    //       <div className="text-end">
    //         <Button variant="contained" sx={{ mt: 3, mb: 2, mr: 1 }} onClick={props.handleClose}>
    //           Cancel
    //         </Button>
    //         <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
    //           Add
    //         </Button>
    //       </div>
    //     </form>
    //   </Card>
    // </Stack>
  );
};

export default UserFormAdd;
