import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { authActions } from '../authActions';
import { useAuth } from '../authContext';
import './Style.css';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginRequest } from '../authModel';
import { useForm } from 'react-hook-form';

const Login = () => {
  const { state, dispatch } = useAuth();

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

  const onSubmit = async (data: LoginRequest) => {
    console.log(state);
    dispatch(authActions.login({ email: 'sontx', password: '111111' }));
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
        <Button variant="contained" style={{ marginTop: '16px' }} type="submit">
          Đăng nhập
        </Button>
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
