import React from 'react';
import { URL_IMG } from '../../constants/storage_urls';
import { useSystemData } from '../../app/SystemContext';

function SurveyFooter() {
  const { systemData } = useSystemData();
  return (
    <div style={{ backgroundColor: '#1976d2', color: 'white' }}>
      <div className="container text-center">
        {/* <img src={URL_IMG + systemData?.logo} alt={systemData.sysName} style={{ width: '30px' }} /> */}
        <div className="row py-2">
          <div className="col-lg-4 col-12">Zalo: {systemData?.zalo}</div>
          <div className="col-lg-4 col-12">Hotline: {systemData?.hotline}</div>
          <div className="col-lg-4 col-12">Address: {systemData?.address}</div>
        </div>
      </div>
    </div>
  );
}

export default SurveyFooter;
