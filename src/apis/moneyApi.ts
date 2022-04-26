import { WeddingMoney } from 'features/wedding-money/moneyModels';
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

const moneyApi = {
  searchMoney,
  deleteMoney
};

export default moneyApi;
