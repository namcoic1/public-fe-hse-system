import React, { useEffect, useRef, useState } from 'react';
import PieStat from '../components/PieStat';
import BoxStat from '../components/BoxStat';
import LineStat from '../components/LineStat';
import BarStat from '../components/BarStat';
import { useForm } from 'react-hook-form';
import MonthYearField from '../../../components/form-controls/MonthYearField';
import { convertToLocalDate } from '../../../utils/common';
import LazyLoading from '../../../components/LazyLoading';
import dashboardApi from '../../../api/dashboardApi';
import userApi from '../../../api/userApi';
import Swal from 'sweetalert2';
import { Button } from '@mui/material';

function convertDateToMonthYear(dateString) {
  // Parse the input date string
  const [year, month] = dateString.split('-');

  // Convert the month from numeric format to a full month name
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const fullMonthName = monthNames[parseInt(month, 10) - 1];

  // Combine the full month name and year
  const result = `${fullMonthName} ${year}`;

  return result;
}

function Dashboard() {
  const [showLazyLoading, setShowLazyLoading] = useState(false);
  const [dashData, setDashData] = useState({});
  const [selectDate, setSelectDate] = useState(convertToLocalDate(new Date().toLocaleDateString(), false));
  const prefSelectDate = useRef(convertToLocalDate(new Date().toLocaleDateString(), false));

  const form = useForm({
    defaultValues: {
      date: convertToLocalDate(new Date().toLocaleDateString(), false),
    },
  });

  useEffect(() => {
    prefSelectDate.current = selectDate;
  }, [selectDate]);

  useEffect(() => {
    (async () => {
      await handleSubmit({
        date: convertToLocalDate(new Date().toLocaleDateString(), false),
      });
    })();
  }, []);

  const handleSubmit = async (values) => {
    if (values.date === '') {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Select valid month/year to search',
      });
      return;
    }
    setShowLazyLoading(true);
    try {
      const actionResult = await dashboardApi.viewDashboard(values);
      if (actionResult.success) {
        setDashData(actionResult.data);
        setSelectDate(values.date);
      }
    } catch (error) {
      if (error.response.status === 401) {
        await userApi.refreshToken();
        const actionResult = await dashboardApi.viewDashboard(values);
        if (actionResult.success) {
          setDashData(actionResult.data);
        }
      }
      if (error.response.status === 400) {
        setSelectDate(prefSelectDate.current);
        form.setValue('date', prefSelectDate.current);
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: `${convertDateToMonthYear(values.date)} evaluation data not available`,
        });
      }
    }
    setShowLazyLoading(false);
  };
  //   console.log(dashData);
  return (
    <div>
      {showLazyLoading && <LazyLoading />}
      <div className="row">
        {/* Now: {selectDate}, before: {prefSelectDate.current} */}
        <form onSubmit={form.handleSubmit(handleSubmit)} className="mb-3">
          <div className="d-flex justify-content-between">
            <h1>Dashboard</h1>
            <div className="d-flex align-items-end">
              <MonthYearField name="date" label="Select month/year" form={form} />
              <Button type="submit" variant="contained" size="large" className="ms-2 mb-2">
                Search
              </Button>
            </div>
          </div>
        </form>
        <div className="col-3 mb-3" style={{ width: `calc(${(2.5 * 100) / 12}%)` }}>
          <BoxStat
            dataSend={{
              labelHeader: 'Number of surveys',
              dataNumber: dashData?.numberOfEvaluations !== undefined ? dashData.numberOfEvaluations : '...',
              dataPercent: dashData?.percentVsPreMonthOfNumEva,
              labelFooter: 'surveys vs previous month',
            }}
          />
        </div>
        <div className="col-3 mb-3" style={{ width: `calc(${(2.5 * 100) / 12}%)` }}>
          <BoxStat
            dataSend={{
              labelHeader: 'Percentage of patients submitted survey',
              dataNumber:
                (dashData?.percentOfPatientEvaluated !== undefined ? dashData?.percentOfPatientEvaluated : '...') + '%',
              dataPercent: dashData?.percentVsPreMonthOfPatEva,
              labelFooter: 'patients vs previous month',
            }}
          />
        </div>
        <div className="col-3 mb-3" style={{ width: `calc(${(2.5 * 100) / 12}%)` }}>
          <BoxStat
            dataSend={{
              labelHeader: 'Percentage of satisfaction degree',
              dataNumber: (dashData?.percentOfConcurLevel !== undefined ? dashData?.percentOfConcurLevel : '...') + '%',
              dataPercent: dashData?.percentVsPreMonthOfConcurLevel,
              labelFooter: 'satisfaction degree vs previous month',
            }}
          />
        </div>
        <div className="col-3 mb-3" style={{ width: `calc(${(4.5 * 100) / 12}%)` }}>
          <PieStat dataSend={[...(dashData?.overallEvaluativeLevels || [])]} />
        </div>
        <div className="col-12 position-relative mb-3">
          <LineStat dataSend={dashData?.numberOfPatientsOverTimeForServices} />
          <div style={{ position: 'absolute', bottom: '35%', transform: 'rotate(-90deg)' }} className="pb-3">
            Patients
          </div>
        </div>
        <div className="col-12 position-relative">
          <BarStat dataSend={dashData?.summaryOfEvaluatedServices} />
          <div style={{ position: 'absolute', bottom: '35%', transform: 'rotate(-90deg)' }} className="pb-0">
            Surveys
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
