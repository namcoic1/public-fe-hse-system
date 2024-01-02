import React, { useEffect, useState } from 'react';
import SurveyHeader from '../../../components/SurveyHeader';
import { Button, TextField, Typography } from '@mui/material';
import Criteria from '../components/Criteria';
import { useNavigate, useParams } from 'react-router-dom';
import surveyApi from '../../../api/surveyApi';
import LazyLoading from '../../../components/LazyLoading';
import SurveyFooter from '../../../components/SurveyFooter';

function ViewEvaluationResult() {
  const { feedback, evaluationData } = JSON.parse(localStorage.getItem('evaluation_result'));
  const { serId, serName, serDesc } = useParams();
  const [criteriaList, setCriteriaList] = useState([]);
  const navigate = useNavigate();
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

  return (
    <div>
      {showLazyLoading && <LazyLoading />}
      <SurveyHeader />
      <div className="container">
        <div className="text-center my-4">
          <Typography variant="h4">Thank you for your feedback!</Typography>
        </div>
        <div className="text-center">
          <Button type="submit" variant="contained" onClick={() => navigate(`/survey/services`)}>
            Take other survey
          </Button>
        </div>
        <div className="row pb-5">
          <div className="col-12">
            <h1 className="text-center mt-3" style={{ color: '#1976d2' }}>
              {serName}
            </h1>
            <p className="text-center my-3">{serDesc}</p>
            {criteriaList.map((criteria, index) => (
              <div key={criteria.criId}>
                <Criteria criteria={criteria} index={index} checkedOption={evaluationData[index].point} />
              </div>
            ))}
            <div>
              <div>
                <Typography variant="h6">{evaluationData.length + 1}. Others opinions</Typography>
                <TextField multiline rows={4} variant="outlined" fullWidth disabled value={feedback} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <SurveyFooter />
    </div>
  );
}

export default ViewEvaluationResult;
