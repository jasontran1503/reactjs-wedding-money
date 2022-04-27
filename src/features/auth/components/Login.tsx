import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import authApi from 'apis/authApi';
import { DataResponse } from 'apis/axiosApi';
import { useToastify } from 'hooks/useToastify';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { authActions } from '../authActions';
import { useAuth } from '../authContext';
import { LoginRequest } from '../authModels';
import './Style.css';

const Login = () => {
  const { state, dispatch } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const toastify = useToastify;

  const validation = yup.object().shape({
    email: yup.string().required('Email không được để trống').email('Email không đúng định dạng'),
    password: yup
      .string()
      .required('Mật khẩu không được để trống')
      .min(6, 'Mật khẩu dài từ 6 đến 20 ký tự')
      .max(20, 'Mật khẩu dài từ 6 đến 20 ký tự')
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<LoginRequest>({
    mode: 'onTouched',
    resolver: yupResolver(validation)
  });

  const onSubmit = async (request: LoginRequest) => {
    try {
      setLoading(true);
      await authApi.login(request);
      dispatch(authActions.login());
      reset();
      navigate('/home');
    } catch (error) {
      toastify('error', (error as DataResponse<null>).message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          '& .MuiTextField-root': {
            width: {
              xs: '25ch',
              sm: '50ch',
              md: '60ch',
              lg: '70ch',
              xl: '80ch'
            }
          }
        }}
      >
        <Typography
          style={{ textAlign: 'center' }}
          variant="h4"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          Đăng nhập
        </Typography>
        <TextField
          error={errors.email ? true : false}
          label="Email"
          variant="outlined"
          margin="normal"
          id={errors.email && `outlined-error-helper-text`}
          helperText={errors.email && errors.email?.message}
          {...register('email')}
        />
        <TextField
          error={errors.password ? true : false}
          label="Mật khẩu"
          variant="outlined"
          type={'password'}
          margin="normal"
          id={errors.password && `outlined-error-helper-text`}
          helperText={errors.password && errors.password?.message}
          {...register('password')}
        />
        <LoadingButton
          size="medium"
          loading={loading}
          variant="contained"
          style={{ marginTop: '16px' }}
          type="submit"
          color="primary"
          disabled={loading ? true : false}
        >
          Đăng nhập
        </LoadingButton>
        <span style={{ marginTop: '16px', textAlign: 'center' }}>
          <Link to="/auth/register" className="text-navigate">
            Tạo tài khoản?
          </Link>
        </span>
      </Box>
    </form>
  );
};

export default Login;
