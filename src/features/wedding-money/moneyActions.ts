import { WeddingMoney } from './moneyModels';

export const SEARCH_MONEY = 'SEARCH_MONEY';
export const DELETE_MONEY = 'DELETE_MONEY';
export const CREATE_MONEY = 'CREATE_MONEY';
export const UPDATE_MONEY = 'UPDATE_MONEY';
export const GET_SINGLE_MONEY = 'GET_SINGLE_MONEY';

export type MoneyAction =
  | { type: typeof SEARCH_MONEY; payload: WeddingMoney[] }
  | { type: typeof DELETE_MONEY; payload: string }
  | { type: typeof CREATE_MONEY; payload: WeddingMoney }
  | { type: typeof UPDATE_MONEY }
  | { type: typeof GET_SINGLE_MONEY };

const searchMoney = (payload: WeddingMoney[]): MoneyAction => ({
  type: SEARCH_MONEY,
  payload
});

const deleteMoney = (payload: string): MoneyAction => ({
  type: DELETE_MONEY,
  payload
});

const createMoney = (payload: WeddingMoney): MoneyAction => ({
  type: CREATE_MONEY,
  payload
});

const updateMoney = (): MoneyAction => ({
  type: UPDATE_MONEY
});

const getMoneyById = (): MoneyAction => ({
  type: GET_SINGLE_MONEY
});

export const moneyActions = {
  searchMoney,
  deleteMoney,
  createMoney,
  getMoneyById,
  updateMoney
};
