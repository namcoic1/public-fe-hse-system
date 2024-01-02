import React, { useEffect, useState } from 'react';
import ServiceResultBox from '../components/ServiceResultBox';
import reportApi from '../../../api/reportApi';
import { useNavigate } from 'react-router-dom';
import userApi from '../../../api/userApi';
import LazyLoading from '../../../components/LazyLoading';

function ListServiceResult() {
  const [serviceList, setServiceList] = useState([]);
  const navigate = useNavigate();
  const [showLazyLoading, setShowLazyLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setShowLazyLoading(true);
      try {
        const actionResult = await reportApi.listServiceResult();
        if (actionResult.success) {
          setServiceList(actionResult.data);
        } else {
          throw new Error();
        }
      } catch (error) {
        if (error.response.status === 401) {
          await userApi.refreshToken();
          const actionResult = await reportApi.listServiceResult();
          if (actionResult.success) {
            setServiceList(actionResult.data);
          }
        }
        // console.log(error);
      }
      setShowLazyLoading(false);
    })();
  }, []);

  return (
    <div>
      {showLazyLoading && <LazyLoading />}
      <div>
        <h1>Overview of service evaluation results</h1>
      </div>
      <h5 className="text-center mt-3 mb-4">Select service to view result</h5>
      <div className="container">
        <div className="row">
          {serviceList.map((service) => (
            <div key={service.serId} className="col-sm-12 col-md-6 col-lg-4 mb-3">
              <ServiceResultBox service={service} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ListServiceResult;
