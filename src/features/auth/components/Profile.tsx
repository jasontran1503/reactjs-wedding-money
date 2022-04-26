import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, TextField, Typography } from '@mui/material';
import authApi from 'apis/authApi';
import { DataResponse } from 'apis/axiosApi';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { authActions } from '../authActions';
import { useAuth } from '../authContext';
import { RegisterRequest } from '../authModels';

const Profile = () => {
  const { state, dispatch } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const validation = yup.object().shape({
    username: yup
      .string()
      .required('Tên không được để trống')
      .matches(/^[a-zA-Z0-9]*$/, 'Tên chỉ chứa ký tự số và chữ'),
    password: yup
      .string()
      .required('Mật khẩu không được để trống')
      .min(4, 'Mật khẩu dài từ 4 đến 20 ký tự')
      .max(20, 'Mật khẩu dài từ 4 đến 20 ký tự'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Mật khẩu không trùng khớp')
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<RegisterRequest>({
    mode: 'onTouched',
    resolver: yupResolver(validation)
  });

  const onSubmit = async (data: RegisterRequest) => {
    try {
      setLoading(true);
      await authApi.register(data);
      dispatch(authActions.register());
      reset();
      navigate('/auth/login');
    } catch (error) {
      alert((error as DataResponse<null>).message);
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
          Thông tin
        </Typography>
        <TextField
          error={errors.username ? true : false}
          label="Tên"
          variant="outlined"
          margin="normal"
          id={errors.username && `outlined-error-helper-text`}
          helperText={errors.username && errors.username?.message}
          {...register('username')}
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
        <TextField
          error={errors.confirmPassword ? true : false}
          label="Nhập lại mật khẩu"
          variant="outlined"
          type={'password'}
          margin="normal"
          id={errors.password && `outlined-error-helper-text`}
          helperText={errors.confirmPassword && errors.confirmPassword?.message}
          {...register('confirmPassword')}
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
          Cập nhật
        </LoadingButton>
      </Box>
    </form>
  );
};

export default Profile;
