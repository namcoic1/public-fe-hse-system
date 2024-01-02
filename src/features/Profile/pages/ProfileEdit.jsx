import React from 'react';
import InputField from '../../../components/form-controls/InputField';
import DateField from '../../../components/form-controls/DateField';
import InputImageField from '../../../components/form-controls/InputImageField';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import { URL_IMG } from '../../../constants/storage_urls';
import { useLocation } from 'react-router-dom';
import LazyLoading from '../../../components/LazyLoading';
import { useState } from 'react';
import { updateProfile, changeImage } from '../profileSlice';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import ComboBoxField from '../../../components/form-controls/ComboBoxField';

function ProfileFormEdit() {
  const genderList = [
    {
      label: 'Male',
      genderId: 1,
    },
    {
      label: 'Female',
      genderId: 2,
    },
    {
      label: 'Other',
      genderId: 3,
    },
  ];
  const [showLazyLoading, setShowLazyLoading] = useState(false);
  const location = useLocation();
  const { profile } = location.state;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const schema = yup.object({
    email: yup.string().required('Please enter the required field.'),
    firstName: yup.string().required('Please enter the required field.'),
    lastName: yup.string().required('Please enter the required field.'),
    // dob: yup.string().required('Please enter birth day'),
    phoneNumber: yup
      .string()
      .required('Please enter the required field.')
      .matches('^[0-9\\-\\+]{9,15}$', 'The phone numbers only contain 9 to 15 numbers.'),
    // address: yup.string().required('Please enter address'),
    selectedGender: yup.object().required('Please enter the required field.'),
  });

  const form = useForm({
    defaultValues: {
      image: URL_IMG + profile.image,
      email: profile.email,
      firstName: profile.firstName,
      lastName: profile.lastName,
      dob: profile.dob?.split('T')[0],
      selectedGender: { label: genderList[profile.genderId - 1].label, genderId: profile.genderId },
      phoneNumber: profile.phoneNumber,
      address: profile.address ? profile.address : '',
    },
    resolver: yupResolver(schema),
  });
  const handleSubmit = async (values) => {
    setShowLazyLoading(true);
    try {
      const action = updateProfile(values);
      const actionImage = changeImage(values);
      const resultAction = await dispatch(action);
      const resultActionImage = await dispatch(actionImage);
      // console.log(resultActionImage);
      if (resultAction.error || resultActionImage.error) {
        setShowLazyLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Your server error occurred',
        });
      } else {
        if (resultActionImage.payload.success) {
          setShowLazyLoading(false);
          navigate(-1);
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
          if (values.image instanceof File) {
            setShowLazyLoading(false);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: resultActionImage.payload.message,
            });
          } else {
            setShowLazyLoading(false);
            navigate(-1);
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
          }
        }
      }
    } catch (error) {
      console.log('Failed to signin:', error);
    }
  };

  const handleCloseClick = () => {
    navigate(-1);
  };

  return (
    <div>
      {showLazyLoading && <LazyLoading />}
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <h1>Edit Profile</h1>
        <div className="row">
          <div className="col-4">
            <div className="border border-primary">
              <div className="p-2 text-white" style={{ backgroundColor: '#1976D2' }}>
                Profile Picture
              </div>
              <div>
                <InputImageField name="image" label="Upload" form={form} />
              </div>
            </div>
          </div>
          <div className="col-8 px-4">
            <div className="border border-primary">
              <div className="p-2 text-white" style={{ backgroundColor: '#1976D2' }}>
                Account Details
              </div>
              <div className="row px-4">
                <div className="col-8 mt-3">
                  Email
                  <div className="border border-secondary-subtle rounded py-3 ps-3">{profile.email}</div>
                </div>
                <div className="col-4 mt-3">
                  Role
                  <div className="border border-secondary-subtle rounded py-3 ps-3">{profile.role}</div>
                </div>
                <div className="col-6 mt-3">
                  <InputField name="firstName" label="First name *" form={form} />
                </div>
                <div className="col-6 mt-3">
                  <InputField name="lastName" label="Last name *" form={form} />
                </div>
                <div className="col-8 mt-3">
                  <DateField name="dob" label="Birth day" form={form} />
                  {/* <DateField /> */}
                </div>
                <div className="col-4 mt-3">
                  <ComboBoxField name="selectedGender" label="Gender *" form={form} options={genderList} />
                </div>
                <div className="col-12 mt-3">
                  <InputField name="phoneNumber" label="Phone number *" form={form} />
                </div>
                <div className="col-12 my-3">
                  <InputField name="address" label="Address" form={form} />
                </div>
              </div>
              <div className="d-flex justify-content-between mt-4 mb-3 px-4">
                <Button variant="contained" className="bg-secondary" onClick={() => handleCloseClick()}>
                  Back
                </Button>
                <Button type="submit" variant="contained" className="">
                  Save Change
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ProfileFormEdit;
