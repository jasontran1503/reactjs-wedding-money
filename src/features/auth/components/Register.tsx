import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';

const Register = () => {
  return (
    <form>
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
          Register
        </Typography>
        <TextField label="Email" variant="outlined" margin="normal" />
        <TextField label="Username" variant="outlined" margin="normal" />
        <TextField label="Password" variant="outlined" type={'password'} margin="normal" />
        <TextField label="Confirm password" variant="outlined" type={'password'} margin="normal" />
        <Button variant="contained" style={{ marginTop: '16px' }}>
          Register
        </Button>
        <span style={{ marginTop: '16px', textAlign: 'center' }}>
          <RouterLink to="/auth/register">
            <Link>Have an account?</Link>
          </RouterLink>
        </span>
      </Box>
    </form>
  );
};

export default Register;
