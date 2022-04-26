import CustomizedSnackbars from 'layouts/CustomizedSnackbars';

export const useSnackbar = () => {
  return <CustomizedSnackbars isOpen={true} message="abc" severity="success"></CustomizedSnackbars>;
};
