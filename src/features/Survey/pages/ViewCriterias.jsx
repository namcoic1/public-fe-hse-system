import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import surveyApi from '../../../api/surveyApi';
import SurveyHeader from '../../../components/SurveyHeader';
import Criteria from '../components/Criteria';
import { Button, TextField, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import LazyLoading from '../../../components/LazyLoading';
import SurveyFooter from '../../../components/SurveyFooter';

function ViewCriterias() {
  const { serId, serName, serDesc } = useParams();
  const [criteriaList, setCriteriaList] = useState([]);
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [showLazyLoading, setShowLazyLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setShowLazyLoading(true);
      localStorage.removeItem('surveyResults');
      try {
        const isValidPatient = await surveyApi.verifyPatientCode(localStorage.getItem('patientCode'));
        if (isValidPatient.data) {
          const actionResult = await surveyApi.viewCriterias(serId);
          setCriteriaList(actionResult.data.results);
        } else {
          throw new Error();
        }
      } catch (error) {
        navigate('/survey');
      }
      setShowLazyLoading(false);
    })();
  }, []);

  const handleOptionSelect = (criId, point) => {
    // Check if the criteriaId already exists in results
    const existingIndex = results.findIndex((result) => result.criId === criId);
    // If it exists, update the existing entry; otherwise, add a new entry
    if (existingIndex !== -1) {
      const updatedResults = [...results];
      updatedResults[existingIndex] = { criId, point };
      setResults(updatedResults);
      localStorage.setItem('surveyResults', JSON.stringify(updatedResults));
    } else {
      const updatedResults = [...results, { criId, point }];
      setResults(updatedResults);
      localStorage.setItem('surveyResults', JSON.stringify(updatedResults));
    }
    console.log(`Selected option for criteria ${criId}: ${point}`);
  };

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };

  const handleSubmit = async () => {
    try {
      if (recaptchaValue !== null) {
        const jsonBody = localStorage.getItem('surveyResults');
        if (jsonBody !== null) {
          const listChecked = JSON.parse(jsonBody);
          if (listChecked.length !== criteriaList.length) {
            Swal.fire({
              icon: 'warning',
              title: 'Oops...',
              text: 'Please select all evaluation criterias!',
            });
          } else {
            Swal.fire({
              // icon: 'warning',
              // title: 'Warning...',
              text: 'Are you sure to submit survey?',
              confirmButtonText: 'Submit',
              showCancelButton: true,
            }).then(async (result) => {
              if (result.isConfirmed) {
                setShowLazyLoading(true);
                const dataSend = {
                  patientId: localStorage.getItem('patientCode'),
                  feedback: feedback,
                  serId: serId,
                  evaluationData: listChecked,
                };
                // console.log(dataSend);
                const actionResult = await surveyApi.submitEvaluationResult(dataSend);
                if (actionResult.success) {
                  setShowLazyLoading(false);
                  localStorage.setItem('evaluation_result', JSON.stringify(dataSend));
                  navigate(`/survey/services/${serId}/${serName}/${serDesc}/view-evaluation-result`);
                }
              }
            });
          }
        } else {
          setShowLazyLoading(false);
          Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Please select all evaluation criterias!',
          });
        }
      }
    } catch (error) {
      setShowLazyLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Server error!',
      });
    }
    // Reset the reCAPTCHA value after submission
    // setRecaptchaValue(null);
  };

  return (
    <div>
      {showLazyLoading && <LazyLoading />}
      <SurveyHeader />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h4 style={{ textAlign: 'center', fontSize: '16px' }} className="mt-3">
              In order to help the hospital continuously improve and serve patients better, please let us know how you
              feel during your stay at the hospital by answering the questions below.
            </h4>
            <h1 className="text-center mt-3" style={{ color: '#1976d2' }}>
              {serName}
            </h1>
            <p className="text-center my-3">{serDesc}</p>
            {criteriaList.map((criteria, index) => (
              <div key={criteria.criId}>
                <Criteria criteria={criteria} index={index} onSelect={handleOptionSelect} checkedOption={null} />
              </div>
            ))}
            <div>
              <div className="pb-5">
                <Typography variant="h6">{criteriaList.length + 1}. Others opinions</Typography>
                <TextField
                  label="Others opinions"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setFeedback(e.target.value)}
                />
              </div>
              <div className="my-2">
                <ReCAPTCHA sitekey="6Lf4rA8pAAAAAGxRtfHYc2rVA-Vz3gJt5Sy1CfjL" onChange={handleRecaptchaChange} />
              </div>
              <div className="mb-5">
                <Button onClick={() => navigate(`/survey/services`)} variant="contained" className="me-2 bg-secondary">
                  Back
                </Button>
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  variant="contained"
                  disabled={recaptchaValue === null ? true : false}
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SurveyFooter />
    </div>
  );
}

export default ViewCriterias;
