import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, TextField, Typography } from '@mui/material';
import authApi from 'apis/authApi';
import { DataResponse } from 'apis/axiosApi';
import { useToastify } from 'hooks/useToastify';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { authActions } from '../authActions';
import { useAuth } from '../authContext';
import { ProfileRequest } from '../authModels';

const Profile = () => {
  const { state, dispatch } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const toastify = useToastify;

  const validation = yup.object().shape({
    username: yup
      .string()
      .required('Tên không được để trống')
      .matches(/^[a-zA-Z0-9]*$/, 'Tên chỉ chứa ký tự số và chữ'),
    oldPassword: yup
      .string()
      .required('Mật khẩu cũ không được để trống')
      .min(4, 'Mật khẩu dài từ 4 đến 20 ký tự')
      .max(20, 'Mật khẩu dài từ 4 đến 20 ký tự'),
    newPassword: yup
      .string()
      .required('Mật khẩu mới không được để trống')
      .min(4, 'Mật khẩu dài từ 4 đến 20 ký tự')
      .max(20, 'Mật khẩu dài từ 4 đến 20 ký tự'),
    confirmNewPassword: yup
      .string()
      .oneOf([yup.ref('newPassword'), null], 'Mật khẩu mới không trùng khớp')
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<ProfileRequest>({
    mode: 'onTouched',
    resolver: yupResolver(validation)
  });

  useEffect(() => {
    if (state.user) {
      const { username } = state.user;
      setValue('username', username);
    }
  }, []);

  const onSubmit = async (body: ProfileRequest) => {
    try {
      setLoading(true);
      const { data } = await authApi.updateProfile(body);
      dispatch(authActions.updateProfile(data));
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
          Thông tin
        </Typography>
        <TextField
          error={errors.username ? true : false}
          label="Tên"
          variant="outlined"
          margin="normal"
          id={errors.username && `outlined-error-helper-text`}
          helperText={errors.username && errors.username?.message}
          InputLabelProps={{ shrink: true }}
          {...register('username')}
        />
        <TextField
          error={errors.oldPassword ? true : false}
          label="Mật khẩu"
          variant="outlined"
          type={'password'}
          margin="normal"
          id={errors.oldPassword && `outlined-error-helper-text`}
          helperText={errors.oldPassword && errors.oldPassword?.message}
          InputLabelProps={{ shrink: true }}
          {...register('oldPassword')}
        />
        <TextField
          error={errors.newPassword ? true : false}
          label="Mật khẩu"
          variant="outlined"
          type={'password'}
          margin="normal"
          id={errors.newPassword && `outlined-error-helper-text`}
          helperText={errors.newPassword && errors.newPassword?.message}
          InputLabelProps={{ shrink: true }}
          {...register('newPassword')}
        />
        <TextField
          error={errors.confirmNewPassword ? true : false}
          label="Nhập lại mật khẩu"
          variant="outlined"
          type={'password'}
          margin="normal"
          id={errors.confirmNewPassword && `outlined-error-helper-text`}
          helperText={errors.confirmNewPassword && errors.confirmNewPassword?.message}
          InputLabelProps={{ shrink: true }}
          {...register('confirmNewPassword')}
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
