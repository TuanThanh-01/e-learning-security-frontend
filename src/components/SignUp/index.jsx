import logoPtit from '../../assets/logo.png';
import background from '../../assets/background.svg';
import './SignUp.css';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button, Spin, message } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';

const SignUp = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSpin, setIsSpin] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  const sendDataSignup = async (data) => {
    try {
      const response = await axios.post(
        'http://localhost:8082/api/v1/auth/register',
        data
      );
      setIsSpin(false);
      message.success(
        'Xác minh email bằng liên kết được gửi trên địa chỉ email của bạn',
        3
      );
      reset();
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (values) => {
    setIsSpin(true);
    sendDataSignup(values);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

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
                Đăng ký tài khoản
              </p>
              <hr
                style={{ border: '2px solid red', width: '10rem' }}
                className='mb-5'
              />
              <div className='d-flex justify-content-center mt-3'>
                <form
                  className='p-4'
                  style={{
                    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                    borderRadius: '10px',
                    width: '28rem',
                  }}
                >
                  <div className='form-row'>
                    <div className='form-group col-md-6'>
                      <label htmlFor='lastname'>Họ</label>
                      <input
                        type='text'
                        className='form-control'
                        id='lastname'
                        {...register('lastname', {
                          required: 'Hãy điền họ của bạn',
                        })}
                      />
                      <small style={{ color: '#ED2B2A' }}>
                        {errors.lastname?.message}
                      </small>
                    </div>
                    <div className='form-group col-md-6'>
                      <label htmlFor='firstname'>Tên</label>
                      <input
                        type='text'
                        className='form-control'
                        id='firstname'
                        {...register('firstname', {
                          required: 'Hãy điền tên của bạn',
                        })}
                      />
                    </div>
                    <small style={{ color: '#ED2B2A' }}>
                      {errors.firstname?.message}
                    </small>
                  </div>
                  <div className='form-group'>
                    <label htmlFor='emailSignUp'>Email</label>
                    <input
                      type='email'
                      className='form-control'
                      id='emailSignUp'
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
                    <label htmlFor='password'>Mật khẩu</label>
                    <input
                      type='password'
                      className='form-control'
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
                  <div className='form-group'>
                    <label htmlFor='retypePassword'>Nhập lại mật khẩu</label>
                    <input
                      type='password'
                      className='form-control'
                      id='retypePassword'
                      {...register('confirm_password', {
                        required: 'Hãy nhập lại mật khẩu',
                        validate: (val) => {
                          if (watch('password') != val) {
                            return 'Mật khẩu nhập lại không trùng khớp';
                          }
                        },
                      })}
                    />
                    <small style={{ color: '#ED2B2A' }}>
                      {errors.confirm_password?.message}
                    </small>
                  </div>

                  <Button
                    type='primary'
                    danger
                    style={{ width: '10rem' }}
                    onClick={handleSubmit(onSubmit)}
                  >
                    Đăng ký
                  </Button>
                  <Link
                    to='/login'
                    className='float-right pt-2 login'
                    style={{ color: '#ED2B2A' }}
                  >
                    Đã có tài khoản ?
                  </Link>
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
};

export default SignUp;
