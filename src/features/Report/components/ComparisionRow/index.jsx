import React from 'react';

function ComparisionRow({ label, sValue, tValue, isPercent }) {
  return (
    <>
      {sValue === 0 ? (
        <div className="col-5">
          <div className="progress mb-2 justify-content-end" style={{ height: '30px' }}>
            <div
              className="progress-bar text-end pe-3"
              role="progressbar"
              style={{ width: `20%`, backgroundColor: '#e9ecef', color: 'black' }}
              aria-valuenow="0"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {isPercent ? sValue + '%' : sValue}
            </div>
          </div>
        </div>
      ) : (
        <div className="col-5">
          <div className="progress mb-2 justify-content-end" style={{ height: '30px' }}>
            <div
              className="progress-bar text-end pe-3"
              role="progressbar"
              style={{ width: `${isPercent ? sValue + '%' : '100%'}`, backgroundColor: '#33A1C9' }}
              aria-valuenow={isPercent ? sValue : '100'}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {isPercent ? sValue + '%' : sValue}
            </div>
          </div>
        </div>
      )}
      <div className="col-2 text-center">{label}</div>
      {tValue === 0 ? (
        <div className="col-5">
          <div className="progress mb-2" style={{ height: '30px' }}>
            <div
              className="progress-bar text-start ps-3"
              role="progressbar"
              style={{ width: `20%`, backgroundColor: '#e9ecef', color: 'black' }}
              aria-valuenow="0"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {isPercent ? tValue + '%' : tValue}
            </div>
          </div>
        </div>
      ) : (
        <div className="col-5">
          <div className="progress mb-2" style={{ height: '30px' }}>
            <div
              className="progress-bar text-start ps-3"
              role="progressbar"
              style={{ width: `${isPercent ? tValue + '%' : '100%'}`, backgroundColor: '#194787' }}
              aria-valuenow={isPercent ? tValue : '100'}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {isPercent ? tValue + '%' : tValue}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ComparisionRow;
