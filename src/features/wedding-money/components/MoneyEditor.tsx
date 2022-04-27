import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, TextField } from '@mui/material';
import { useAuth } from 'features/auth/authContext';
import { useToastify } from 'hooks/useToastify';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

const MoneyEditor = () => {
  const { state, dispatch } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const toastify = useToastify;

  const validation = yup.object().shape({
    name: yup
      .string()
      .required('Tên không được để trống')
      .matches(/^[a-zA-Z0-9]*$/, 'Tên chỉ chứa ký tự số và chữ'),
    phoneNumber: yup
      .string()
      .required('Mật khẩu không được để trống')
      .min(4, 'Mật khẩu dài từ 4 đến 20 ký tự')
      .max(20, 'Mật khẩu dài từ 4 đến 20 ký tự'),
    money: yup.string().oneOf([yup.ref('password'), null], 'Mật khẩu không trùng khớp'),
    note: yup.string().oneOf([yup.ref('password'), null], 'Mật khẩu không trùng khớp')
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<any>({
    mode: 'onTouched',
    resolver: yupResolver(validation)
  });

  const onSubmit = async (data: any) => {
    // try {
    //   setLoading(true);
    //   const { message } = await authApi.register(data);
    //   dispatch(authActions.register());
    //   reset();
    //   toastify('success', message);
    //   navigate('/auth/login');
    // } catch (error) {
    //   toastify('error', (error as DataResponse<null>).message);
    //   setLoading(false);
    // }
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
        <TextField
          label="Tên"
          variant="outlined"
          margin="normal"
          id={errors.name && `outlined-error-helper-text`}
          helperText={errors.name && errors.name?.message}
          {...register('name')}
        />
        <TextField
          error={errors.phoneNumber ? true : false}
          label="Số điện thoại"
          variant="outlined"
          margin="normal"
          id={errors.phoneNumber && `outlined-error-helper-text`}
          helperText={errors.phoneNumber && errors.phoneNumber?.message}
          {...register('phoneNumber')}
        />
        <TextField
          error={errors.money ? true : false}
          label="Số tiền"
          variant="outlined"
          margin="normal"
          id={errors.money && `outlined-error-helper-text`}
          helperText={errors.money && errors.money?.message}
          {...register('money')}
        />
        <TextField
          error={errors.note ? true : false}
          label="Ghi chú"
          variant="outlined"
          margin="normal"
          id={errors.password && `outlined-error-helper-text`}
          helperText={errors.note && errors.note?.message}
          {...register('note')}
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
          Lưu
        </LoadingButton>
      </Box>
    </form>
  );
};

export default MoneyEditor;
