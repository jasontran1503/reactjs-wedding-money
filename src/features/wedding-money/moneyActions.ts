import { WeddingMoney } from './moneyModels';

export const SEARCH_MONEY = 'SEARCH_MONEY';
export const DELETE_MONEY = 'DELETE_MONEY';

export type MoneyAction =
  | { type: typeof SEARCH_MONEY; payload: WeddingMoney[] }
  | { type: typeof DELETE_MONEY; payload: string };

const searchMoney = (payload: WeddingMoney[]): MoneyAction => ({
  type: SEARCH_MONEY,
  payload
});

const deleteMoney = (payload: string): MoneyAction => ({
  type: DELETE_MONEY,
  payload
});

export const moneyActions = {
  searchMoney,
  deleteMoney
};
