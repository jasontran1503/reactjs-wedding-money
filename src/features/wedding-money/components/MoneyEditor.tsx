import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, TextField } from '@mui/material';
import { DataResponse } from 'apis/axiosApi';
import moneyApi from 'apis/moneyApi';
import { useToastify } from 'hooks/useToastify';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { moneyActions } from '../moneyActions';
import { useMoney } from '../moneyContext';
import { MoneyRequest } from '../moneyModels';

const MoneyEditor = () => {
  const { state, dispatch } = useMoney();
  const navigate = useNavigate();
  const { moneyId } = useParams();
  const [loading, setLoading] = useState(false);
  const toastify = useToastify;

  const validation = yup.object().shape({
    name: yup.string().required('Tên không được để trống'),
    money: yup
      .string()
      .required('Số tiền không được để trống')
      .matches(/^[0-9,]+$/, 'Số tiền chỉ chứa ký tự số')
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors }
  } = useForm<any>({
    mode: 'onTouched',
    resolver: yupResolver(validation)
  });

  const formatMoney = (value: string) => {
    setValue('money', Number(value.replace(/[^0-9]/g, '')).toLocaleString('en-US'));
  }

  useEffect(() => {
    let isCancelled = false;

    const getMoneyById = async () => {
      try {
        if (!isCancelled) {
          if (moneyId) {
            const { data } = await moneyApi.getMoneyById(moneyId);
            dispatch(moneyActions.getMoneyById());
            setValue('name', data.name);
            setValue('phoneNumber', data.phoneNumber);
            setValue('note', data.note);
            formatMoney(String(data.money));
          }
        }
      } catch (error) {
        toastify('error', (error as DataResponse<null>).message);
      }
    };

    getMoneyById();
    return () => {
      isCancelled = false;
    };
  }, []);

  const handleMoneyInputChange = () => {
    const value = getValues('money');
    formatMoney(value);
  };

  const onSubmit = async (body: MoneyRequest) => {
    const request = { ...body, money: Number(String(body.money).replace(/,/g, '')) };
    try {
      setLoading(true);
      if (!moneyId) {
        const { message, data } = await moneyApi.createMoney(request);
        dispatch(moneyActions.createMoney(data));
        reset();
        toastify('success', message);
      } else {
        const { message } = await moneyApi.updateMoney(request, moneyId);
        dispatch(moneyActions.updateMoney());
        navigate('/home');
        toastify('success', message);
      }
      setLoading(false);
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
        <TextField
          error={errors.name ? true : false}
          label="Tên"
          variant="outlined"
          margin="normal"
          id={errors.name && `outlined-error-helper-text`}
          InputLabelProps={{ shrink: true }}
          helperText={errors.name && errors.name?.message}
          disabled={moneyId ? true : false}
          {...register('name')}
        />
        <TextField
          label="Số điện thoại"
          variant="outlined"
          margin="normal"
          InputLabelProps={{ shrink: true }}
          {...register('phoneNumber')}
        />
        <TextField
          error={errors.money ? true : false}
          label="Số tiền"
          variant="outlined"
          margin="normal"
          id={errors.money && `outlined-error-helper-text`}
          helperText={errors.money && errors.money?.message}
          InputLabelProps={{ shrink: true }}
          {...register('money', {
            onChange: () => handleMoneyInputChange()
          })}
        />
        <TextField
          label="Ghi chú"
          variant="outlined"
          margin="normal"
          {...register('note')}
          InputLabelProps={{ shrink: true }}
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
