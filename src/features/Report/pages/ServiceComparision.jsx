import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { convertToLocalDate } from '../../../utils/common';
import DateField from '../../../components/form-controls/DateField';
import ComboBoxField from '../../../components/form-controls/ComboBoxField';
import serviceApi from '../../../api/serviceApi';
import userApi from '../../../api/userApi';
import { Button } from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ComparisionRow from '../components/ComparisionRow';
import reportApi from '../../../api/reportApi';
import Swal from 'sweetalert2';
import LazyLoading from '../../../components/LazyLoading';

function ServiceComparision() {
  const [showLazyLoading, setShowLazyLoading] = useState(false);
  const [services, setServices] = useState([]);
  const [sourceName, setSourceName] = useState('Service 1');
  const [targetName, setTargetName] = useState('Service 2');
  const [typeComps, setTypeComps] = useState([
    {
      typeName: 'Satisfaction degree',
      typeDescription: "Percentage of 'strongly agree' and 'agree’ votes, which the patient has been evaluated.",
      service1Result: 0,
      service2Result: 0,
    },
    {
      typeName: 'Neutral degree',
      typeDescription: "Percentage of 'neutral' votes that the patient has been evaluated.",
      service1Result: 0,
      service2Result: 0,
    },
    {
      typeName: 'Dissatisfaction degree',
      typeDescription: "Percentage of 'strongly disagree' and 'disagree' votes, which the patient has been evaluated.",
      service1Result: 0,
      service2Result: 0,
    },
    {
      typeName: 'Point',
      typeDescription: 'Total points calculated from patients surveys',
      service1Result: 0,
      service2Result: 0,
    },
    {
      typeName: 'Number of survey',
      typeDescription: 'Total number of surveys.',
      service1Result: 0,
      service2Result: 0,
    },
  ]);
  const schema = yup.object({
    dateFrom: yup.string().required('Please select date'),
    dateTo: yup.string().required('Please select date'),
    sourceService: yup.object().required('Please select service to compare'),
    targetService: yup.object().required('Please select service to compare'),
  });

  const form = useForm({
    defaultValues: {
      dateFrom: convertToLocalDate(new Date().toLocaleDateString(), true), // 2023-11-18T17:10:34.751Z
      dateTo: convertToLocalDate(new Date().toLocaleDateString(), true),
      sourceService: null,
      targetService: null,
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    (async () => {
      setShowLazyLoading(true);
      try {
        const actionService = await serviceApi.getServiceForCompare();
        if (actionService.success) {
          setServices(actionService.data.map((item) => ({ label: item.serName, serId: item.serId })));
        }
      } catch (error) {
        if (error.response.status === 401) {
          await userApi.refreshToken();
          const actionService = await serviceApi.getServiceForCompare();
          if (actionService.success) {
            setServices(actionService.data.map((item) => ({ label: item.serName, serId: item.serId })));
          }
        }
      }
      setShowLazyLoading(false);
    })();
  }, []);
  const handleSubmit = async (values) => {
    setShowLazyLoading(true);
    console.log(values);
    const params = {
      ...values,
      dateFrom: new Date(values.dateFrom + 'T00:00:00').toISOString(),
      dateTo: new Date(values.dateTo + 'T00:00:00').toISOString(),
    };
    try {
      const actionCompare = await reportApi.serviceComparision(params);
      if (actionCompare.success) {
        setTypeComps(actionCompare.data.typeComparisons);
        setSourceName(actionCompare.data.service1Name);
        setTargetName(actionCompare.data.service2Name);
      }
    } catch (error) {
      if (error.response.status === 401) {
        await userApi.refreshToken();
        const actionCompare = await reportApi.serviceComparision(params);
        if (actionCompare.success) {
          setTypeComps(actionCompare.data.typeComparisons);
          setSourceName(actionCompare.data.service1Name);
          setTargetName(actionCompare.data.service2Name);
        }
      }
      if (error.response.status === 400) {
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'Select valid date to compare',
        });
      }
    }
    setShowLazyLoading(false);
  };

  return (
    <div>
      {showLazyLoading && <LazyLoading />}
      <h1>Service Comparison</h1>
      <div>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="row justify-content-center">
            <div className="col-4">
              <h3>Select service *</h3>
              <ComboBoxField name="sourceService" label="" form={form} options={services} />
            </div>
            <div className="col-4">
              <h3>Select service *</h3>
              <ComboBoxField name="targetService" label="" form={form} options={services} />
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-3">
              <DateField name="dateFrom" label="From *" form={form} />
            </div>
            <div className="col-3">
              <DateField name="dateTo" label="To *" form={form} />
            </div>
          </div>
          <div className="text-center mt-3">
            <Button type="submit" variant="contained" size="large">
              Compare services
            </Button>
          </div>
        </form>
      </div>
      <div className="mt-3">
        {typeComps.length > 0 && (
          <>
            <div className="row justify-content-center align-items-center">
              <div className="col-5">
                <h1 style={{ color: '#33A1C9', fontSize: '30px' }} className="text-end">
                  {sourceName}
                </h1>
              </div>
              <div className="col-2">
                <h3 className="text-center">VS</h3>
              </div>
              <div className="col-5">
                <h1 style={{ color: '#194787', fontSize: '30px' }} className="text-start">
                  {targetName}
                </h1>
              </div>
              {typeComps.map((item, index) => (
                <ComparisionRow
                  key={index}
                  label={item.typeName}
                  sValue={item.service1Result}
                  tValue={item.service2Result}
                  isPercent={index !== 3 && index !== 4}
                />
              ))}
            </div>
            <div className="row">
              {typeComps.map((item, index) => (
                <div className="col-2 mt-3" style={{ width: '20%' }} key={index}>
                  <div className="border-bottom">
                    <b>{item.typeName}</b>
                  </div>
                  <p className="text-muted" style={{ fontSize: '12px' }}>
                    {item.typeDescription}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ServiceComparision;
