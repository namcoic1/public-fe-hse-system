import React, { useEffect, useState } from 'react';
import SigninForm from '../components/SigninForm';
import { useDispatch } from 'react-redux';
import { signin } from '../userSlice';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import LazyLoading from '../../../components/LazyLoading';

function Signin() {
  const [showLazyLoading, setShowLazyLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const messAgain = localStorage.getItem('messAgain');
    if (messAgain) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: 'success',
        title: messAgain,
      });
      localStorage.removeItem('messAgain');
    }
  }, []);

  const handleSubmit = async (values) => {
    setShowLazyLoading(true);
    console.log('Form submit: ', values);
    try {
      const action = signin(values);
      const resultAction = await dispatch(action);
      // console.log(resultAction);
      if (resultAction.error) {
        setShowLazyLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Email or password is incorrect.',
        });
      } else {
        navigate('/admin/welcome');
      }
    } catch (error) {
      console.log('Failed to signin:', error);
    }
  };

  return (
    <div className="row m-0">
      {showLazyLoading && <LazyLoading />}
      <div className="col-xxl-7 p-0 d-xxl-block d-none">
        <div style={{ height: '100vh', overflow: 'hidden', position: 'relative' }}>
          <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '100%' }} viewBox="0 0 1466 1457" fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M488.667 0L651.556 60.7083C814.444 121.417 1140.22 242.833 1194.52 364.25C1248.81 485.667 1031.63 607.083 1031.63 728.5C1031.63 849.917 1248.81 971.333 1357.41 1092.75C1466 1214.17 1466 1335.58 1466 1396.29V1457H-0.00012207V1396.29C-0.00012207 1335.58 -0.00012207 1214.17 -0.00012207 1092.75C-0.00012207 971.333 -0.00012207 849.917 -0.00012207 728.5C-0.00012207 607.083 -0.00012207 485.667 -0.00012207 364.25C-0.00012207 242.833 -0.00012207 121.417 -0.00012207 60.7083V0L488.667 0Z"
              fill="#1976D2"
            />
          </svg>
          <div style={{ position: 'absolute', top: '40%', left: '10%', color: 'white' }}>
            <h1 style={{ fontSize: '80px' }}>WELCOME !</h1>
            <p style={{ fontSize: '25px' }}>Enter your Email and Password to continue</p>
          </div>
        </div>
      </div>
      <div className="col-xxl-5 col-12 p-0">
        <SigninForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}

export default Signin;
