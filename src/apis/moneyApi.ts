import { MoneyRequest, SingleMoney, WeddingMoney } from 'features/wedding-money/moneyModels';
import axiosApi, { DataResponse } from './axiosApi';

const searchMoney = async (name = '', phoneNumber = '') => {
  return axiosApi
    .get<DataResponse<WeddingMoney[]>>('wedding-money/search', {
      params: {
        name,
        phoneNumber
      }
    })
    .then((res) => res.data);
};

const deleteMoney = async (id: string) => {
  return axiosApi.delete<DataResponse<WeddingMoney>>(`wedding-money/${id}`).then((res) => res.data);
};

const createMoney = async (body: MoneyRequest) => {
  return axiosApi
    .post<DataResponse<WeddingMoney>>(`wedding-money/create`, body)
    .then((res) => res.data);
};

const updateMoney = async (body: MoneyRequest, id: string) => {
  return axiosApi
    .put<DataResponse<WeddingMoney>>(`wedding-money/create`, body, {
      params: { id }
    })
    .then((res) => res.data);
};

const getMoneyById = async (id: string) => {
  return axiosApi
    .get<DataResponse<SingleMoney>>('wedding-money', {
      params: { id }
    })
    .then((res) => res.data);
};

const moneyApi = {
  searchMoney,
  deleteMoney,
  createMoney,
  getMoneyById,
  updateMoney
};

export default moneyApi;
