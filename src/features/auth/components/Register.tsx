import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import './Style.css';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterRequest } from '../authModel';

const Register = () => {
  const validation = yup.object().shape({
    email: yup.string().required('Email không được để trống').email('Email không đúng định dạng'),
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

  const onSubmit = (data: RegisterRequest) => {
    console.log(data);
    // dispatch(authActions.login({ email: 'sontx', password: '111111' }));
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
          Đăng kí
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
        <Button variant="contained" style={{ marginTop: '16px' }} type="submit">
          Đăng kí
        </Button>
        <span style={{ marginTop: '16px', textAlign: 'center' }}>
          <Link to="/auth/login" className="text-navigate">
            Đăng nhập ngay?
          </Link>
        </span>
      </Box>
    </form>
  );
};

export default Register;
