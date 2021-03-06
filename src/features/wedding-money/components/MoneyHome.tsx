import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import { DataResponse } from 'apis/axiosApi';
import moneyApi from 'apis/moneyApi';
import { useToastify } from 'hooks/useToastify';
import Loading from 'layouts/Loading';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { moneyActions } from '../moneyActions';
import { useMoney } from '../moneyContext';

interface Column {
  id: 'name' | 'phoneNumber' | 'money' | 'note';
  label: string;
  minWidth?: number;
  align?: 'center';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Tên', minWidth: 170 },
  { id: 'phoneNumber', label: 'SĐT', minWidth: 100 },
  {
    id: 'money',
    label: 'Số tiền',
    minWidth: 170,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US')
  },
  {
    id: 'note',
    label: 'Ghi chú',
    minWidth: 170,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US')
  }
];

const MoneyHome = () => {
  const { state, dispatch } = useMoney();
  const moneyList = state.moneyList;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const toastify = useToastify;
  const { register, handleSubmit, reset } = useForm<{ name: string; phoneNumber: string }>();

  const searchMoney = async (name = '', phoneNumber = '') => {
    setLoadingPage(true);
    const { data } = await moneyApi.searchMoney(name, phoneNumber);
    dispatch(moneyActions.searchMoney(data));
    setLoadingPage(false);
  };

  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      searchMoney();
    }

    return () => {
      isCancelled = false;
    };
  }, []);

  const onSubmit = async (request: { name: string; phoneNumber: string }) => {
    try {
      setLoading(true);
      searchMoney(request.name, request.phoneNumber);
      setLoading(false);
      reset();
    } catch (error) {
      toastify('error', (error as DataResponse<null>).message);
      setLoading(false);
    }
  };

  const handleDeleteMoney = async (id: string) => {
    try {
      const { message } = await moneyApi.deleteMoney(id);
      dispatch(moneyActions.deleteMoney(id));
      toastify('success', message);
    } catch (error) {
      toastify('error', (error as DataResponse<null>).message);
    }
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      {loadingPage ? (
        <Loading />
      ) : (
        <div style={{ width: '100%' }}>
          <Box
            onSubmit={handleSubmit(onSubmit)}
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' }
            }}
            noValidate
            autoComplete="off"
          >
            <div style={{ textAlign: 'center', marginBottom: '16px', marginTop: '8px' }}>
              <TextField label="Tên" {...register('name')} />
              <TextField label="Số điện thoại" {...register('phoneNumber')} />
              <LoadingButton
                startIcon={<SearchIcon />}
                size="large"
                loading={loading}
                variant="contained"
                style={{ marginTop: '8px', height: '56px' }}
                type="submit"
                color="primary"
                disabled={loading ? true : false}
              >
                Tìm kiếm
              </LoadingButton>
            </div>
          </Box>

          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                    <TableCell align="center" style={{ minWidth: 170 }}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {moneyList.length ? (
                    moneyList
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((item) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={item._id}
                            style={{ cursor: 'pointer' }}
                          >
                            {columns.map((column) => {
                              const value = item[column.id];
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {column.format && typeof value === 'number'
                                    ? column.format(value)
                                    : value}
                                </TableCell>
                              );
                            })}
                            <TableCell align="center">
                              <span onClick={() => navigate(`editor/${item._id}`)}>
                                <EditIcon cursor="pointer" color="primary" />
                              </span>
                              <span onClick={() => handleDeleteMoney(item._id)}>
                                <DeleteIcon cursor="pointer" sx={{ color: 'red' }} />
                              </span>
                            </TableCell>
                          </TableRow>
                        );
                      })
                  ) : (
                    <TableRow>
                      <TableCell>Không có dữ liệu</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15, 20]}
              component="div"
              count={moneyList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              labelRowsPerPage="Hiển thị số lượng"
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      )}
    </>
  );
};

export default MoneyHome;
