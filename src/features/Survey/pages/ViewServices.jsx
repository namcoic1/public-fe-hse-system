import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SurveyHeader from '../../../components/SurveyHeader';
import ServiceBox from '../components/ServiceBox';
import surveyApi from '../../../api/surveyApi';
import LazyLoading from '../../../components/LazyLoading';
import SurveyFooter from '../../../components/SurveyFooter';
import { useSystemData } from '../../../app/SystemContext';

function ViewServices() {
  const [serviceList, setServiceList] = useState([]);
  const navigate = useNavigate();
  const [showLazyLoading, setShowLazyLoading] = useState(false);
  const { systemData } = useSystemData();

  useEffect(() => {
    (async () => {
      setShowLazyLoading(true);
      try {
        const isValidPatient = await surveyApi.verifyPatientCode(localStorage.getItem('patientCode'));
        if (isValidPatient.success) {
          const actionResult = await surveyApi.viewServices();
          setServiceList(actionResult.data);
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
      <SurveyHeader/>
      <h5 className="text-center mt-3 mb-4" style={{ color: '#1976d2' }}>
        Select the service that you want to evaluate
      </h5>
      <div className="container">
        <div className="row">
          {serviceList.map((service) => (
            <div key={service.serId} className="col-sm-12 col-md-6 col-lg-4 mb-3">
              <ServiceBox service={service} />
            </div>
          ))}
        </div>
      </div>
      <SurveyFooter />
    </div>
  );
}

export default ViewServices;
