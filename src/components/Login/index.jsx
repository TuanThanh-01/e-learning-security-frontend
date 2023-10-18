import logoPtit from '../../assets/logo.png';
import background from '../../assets/background.svg';
import './loginStyle.css';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Button, Spin, message } from 'antd';

function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSpin, setIsSpin] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const sendDataLogin = async (data) => {
    try {
      const response = await axios.post(
        'http://localhost:8082/api/v1/auth/authenticate',
        data
      );
      setIsSpin(false);
      message.success('Đăng nhập thành công', 3);
      console.log(response.data);
      reset();
      setTimeout(() => {
        navigate('/home');
      }, 3000);
    } catch (error) {
      setIsSpin(false);
      message.error('Sai tài khoản hoặc mật khẩu', 3);
    }
  };

  const onSubmit = (values) => {
    setIsSpin(true);
    sendDataLogin(values);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);
  return (
    <div
      style={{
        padding: 0,
        margin: 0,
        height: '100%',
        width: '100%',
        backgroundImage: `url(${background})`,
      }}
    >
      {isLoading ? (
        <Spin
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
          }}
          size='large'
        />
      ) : (
        <Spin spinning={isSpin} size='large'>
          <div className='container'>
            <div className='d-flex justify-content-center mt-5'>
              <img
                src={logoPtit}
                className='mr-3'
                style={{ height: '3.25rem' }}
              ></img>
              <h1 className='text-center'>PTIT Learning InfoSec</h1>
            </div>
            <div className='mt-4'>
              <p
                className='text-center'
                style={{
                  fontSize: '1.5rem',
                  color: '#ED2B2A',
                  fontWeight: '600',
                }}
              >
                Đăng nhập
              </p>
              <hr
                style={{ border: '2px solid red', width: '10rem' }}
                className='mb-5'
              />
              <div className='d-flex justify-content-center mt-3'>
                <form
                  className='p-4 mt-3'
                  style={{
                    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                    borderRadius: '10px',
                    width: '20rem',
                  }}
                >
                  <div className='form-group'>
                    <label htmlFor='emailAddress'>Địa chỉ email</label>
                    <input
                      type='email'
                      className='form-control form-control-lg'
                      style={{ fontSize: '1rem' }}
                      id='emailLogins'
                      aria-describedby='emailHelp'
                      {...register('email', {
                        required: 'Email không được bỏ trống',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Email không hợp lệ',
                        },
                      })}
                    />
                    <small style={{ color: '#ED2B2A' }}>
                      {errors.email?.message}
                    </small>
                  </div>
                  <div className='form-group'>
                    <label htmlFor='passworrd'>Mật khẩu</label>
                    <input
                      type='password'
                      className='form-control form-control-lg'
                      style={{ fontSize: '1rem' }}
                      id='password'
                      {...register('password', {
                        required: 'Mật khẩu không được bỏ trống',
                        minLength: {
                          value: 6,
                          message: 'Mật khẩu ít nhất 6 kí tự',
                        },
                      })}
                    />
                    <small style={{ color: '#ED2B2A' }}>
                      {errors.password?.message}
                    </small>
                  </div>

                  <div className='mt-4'>
                    <Link
                      to='/signup'
                      className='register'
                      style={{ color: '#ED2B2A' }}
                    >
                      Đăng ký tài khoản
                    </Link>
                    <div className='d-flex justify-content-center mt-3'>
                      <Button
                        type='primary'
                        danger
                        style={{ width: '100%' }}
                        onClick={handleSubmit(onSubmit)}
                      >
                        Đăng nhập
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className='footer'>
            <p className='text-center font-weight-light mb-1'>
              Học Viện Công Nghệ Bưu Chính Viễn Thông
            </p>
            <p className='text-center font-weight-light'>
              &copy; 2023 Produced by PTIT
            </p>
          </div>
        </Spin>
      )}
    </div>
  );
}

export default LoginPage;
