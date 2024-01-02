import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as yup from 'yup';
import InputField from '../../../components/form-controls/InputField';
import { Button, Divider } from '@mui/material';
import '../css/custom-welcome.css';
import surveyApi from '../../../api/surveyApi';
import LazyLoading from '../../../components/LazyLoading';

function Welcome() {
  const [showLazyLoading, setShowLazyLoading] = useState(false);
  const navigate = useNavigate();
  const schema = yup
    .object({
      patientCode: yup.string().required('Please enter the required field.'),
    })
    .required();

  const form = useForm({
    defaultValues: {
      patientCode: '',
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    setShowLazyLoading(true);
    try {
      const actionResult = await surveyApi.verifyPatientCode(values.patientCode);
      // console.log(typeof actionResult.data);
      if (actionResult.success) {
        localStorage.setItem('patientCode', values.patientCode);
        navigate(`/survey/services`);
      } else {
        throw new Error();
      }
    } catch (error) {
      setShowLazyLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'The patient code does not exist.',
      });
    }
  };
  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      {showLazyLoading && <LazyLoading />}
      <div
        style={{
          borderRadius: '1000px',
          background: 'rgba(25, 118, 210, 0.30)',
          width: '1000px',
          height: '1000px',
          position: 'absolute',
          bottom: '-60%',
          left: '-20%',
        }}
      ></div>
      <div
        style={{
          borderRadius: '2000px',
          background: 'rgba(25, 118, 210, 0.30)',
          width: '2000px',
          height: '2000px',
          position: 'absolute',
          top: '5%',
          left: '-35%',
        }}
      ></div>
      <div
        style={{
          borderRadius: '700px',
          background: 'rgba(25, 118, 210, 0.30)',
          width: '700px',
          height: '700px',
          position: 'absolute',
          bottom: '-40%',
          right: '-10%',
        }}
      ></div>
      <div className="text-center d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div>
          <div className="res-wel">
            <h2 className="text-center">Welcome to the Green Hospital Customer Service Survey</h2>
            <div className="text-start my-2 fst-italic">
              <p>
                Please take a few minutes to fill out this survey on the relevance and quality of service you have
                received.
              </p>
              <p>
                Green hospital honors your feedback and the responses will be used to improve our future performance.
              </p>
              <p>Thank you in advance for your participation.</p>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="text-start res-wel">
                <InputField name="patientCode" label="Patient code *" form={form} />
              </div>
              <div className="res-wel">
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Begin survey
                </Button>
              </div>
              <div className="mt-3">
                <Divider variant="middle" />
              </div>
            </form>
          </div>
          <div className="mt-4">
            <h5>Powered by</h5>
            <h1>SEP490_G71</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
