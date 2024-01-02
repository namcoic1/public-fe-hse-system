import React, { useEffect, useState } from 'react';
import StatSatisBar from '../components/StatSatisBar/StatSatisBar';
import { convertToLocalDate } from '../../../utils/common';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import DateField from '../../../components/form-controls/DateField';
import { Button } from '@mui/material';
import reportApi from '../../../api/reportApi';
import userApi from '../../../api/userApi';
import LazyLoading from '../../../components/LazyLoading';
import Swal from 'sweetalert2';
import ModalApp from '../../../components/ModalApp';
import HorizontalBar from '../components/HorizontalBar/HorizontalBar';

function StatSatisfaction() {
  const [showLazyLoading, setShowLazyLoading] = useState(false);
  const [dataSend, setDataSend] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const [dataModal, setDataModal] = useState(null);
  // const schema = yup.object({
  //   dateFrom: yup.string().required('Please select date'),
  //   dateTo: yup.string().required('Please select date'),
  // });

  const form = useForm({
    defaultValues: {
      dateFrom: convertToLocalDate(new Date().toLocaleDateString(), true), // 2023-11-18T17:10:34.751Z
      dateTo: convertToLocalDate(new Date().toLocaleDateString(), true),
    },
    // resolver: yupResolver(schema),
  });

  useEffect(() => {
    (async () => {
      await handleSubmit({
        dateFrom: convertToLocalDate(new Date().toLocaleDateString(), true),
        dateTo: convertToLocalDate(new Date().toLocaleDateString(), true),
      });
    })();
  }, []);

  const handleSubmit = async (values) => {
    if (values.dateFrom === '' || values.dateTo === '') {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Select valid date to search',
      });
      return;
    }
    setShowLazyLoading(true);
    const params = {
      dateFrom: new Date(values.dateFrom + 'T00:00:00').toISOString(),
      dateTo: new Date(values.dateTo + 'T00:00:00').toISOString(),
    };
    try {
      const actionStat = await reportApi.getStatSatisfaction(params);
      if (actionStat.success) {
        setDataSend(actionStat.data.data);
      }
    } catch (error) {
      if (error.response.status === 401) {
        await userApi.refreshToken();
        const actionStat = await reportApi.getStatSatisfaction(params);
        if (actionStat.success) {
          setDataSend(actionStat.data.data);
        }
      }
      if (error.response.status === 400) {
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'Select valid date to search',
        });
      }
    }
    setShowLazyLoading(false);
  };

  const listDegrees = [
    {
      keyIndex: 5,
      degreeName: 'Strongly Agree degree',
      degreeDesc: "Percentage of votes, including 'strongly agree' that the patient has been evaluated.",
    },
    {
      keyIndex: 4,
      degreeName: 'Agree degree',
      degreeDesc: "Percentage of votes, including 'agree' the patient has been evaluated.",
    },
    {
      keyIndex: 3,
      degreeName: 'Neutral degree',
      degreeDesc: "Percentage of 'neutral' votes that the patient has been evaluated.",
    },
    {
      keyIndex: 2,
      degreeName: 'Disagree degree',
      degreeDesc: "Percentage of votes, including 'disagree' that the patient has been evaluated.",
    },
    {
      keyIndex: 1,
      degreeName: 'Strongly Disagree degree',
      degreeDesc: "Percentage of votes, including 'strongly disagree' that the patient has been evaluated.",
    },
  ];

  const handleShowDegree = async (keyIndex) => {
    const dateFrom = form.getValues('dateFrom');
    const dateTo = form.getValues('dateTo');
    if (dateFrom === '' || dateTo === '') {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Select valid date to search',
      });
      return;
    }
    setShowLazyLoading(true);
    const params = {
      keyIndex: keyIndex,
      dateFrom: new Date(dateFrom + 'T00:00:00').toISOString(),
      dateTo: new Date(dateTo + 'T00:00:00').toISOString(),
    };
    try {
      const actionDegree = await reportApi.getStatSatisfactionByPoint(params);
      if (actionDegree.success) {
        setDataModal({ ...actionDegree.data, keyIndex });
      }
    } catch (error) {
      if (error.response.status === 401) {
        await userApi.refreshToken();
        const actionDegree = await reportApi.getStatSatisfactionByPoint(params);
        if (actionDegree.success) {
          setDataModal({ ...actionDegree.data, keyIndex });
        }
      }
      if (error.response.status === 400) {
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'Select valid date to search',
        });
      }
    }
    setShowLazyLoading(false);
    handleOpenModal();
  };

  return (
    <div>
      {showLazyLoading && <LazyLoading />}
      <h1>Satisfaction statistics</h1>
      <ModalApp
        open={openModal}
        handleClose={handleCloseModal}
        content={<HorizontalBar dataModal={dataModal} />}
        title="Satisfaction statistics details"
      />
      <div>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="row justify-content-center align-items-end">
            <div className="col-3">
              <DateField name="dateFrom" label="From *" form={form} />
            </div>
            <div className="col-3">
              <DateField name="dateTo" label="To *" form={form} />
            </div>
            <div className="col-1 mb-2">
              <Button type="submit" variant="contained" size="large">
                Search
              </Button>
            </div>
          </div>
        </form>
      </div>
      <div className="mt-3">
        <b>Statistics of satisfaction by service</b>
        <StatSatisBar dataSend={dataSend} />
      </div>
      <div className="row">
        {listDegrees.map((item, index) => (
          <div
            key={index}
            className="col-2 mt-3"
            title='Click to view Statistics satisfaction details'
            style={{ width: '20%', cursor: 'pointer' }}
            onClick={() => handleShowDegree(item.keyIndex)}
          >
            <div className="border-bottom">
              <b>{item.degreeName}</b>
            </div>
            <p className="text-muted" style={{ fontSize: '12px' }}>
              {item.degreeDesc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StatSatisfaction;
