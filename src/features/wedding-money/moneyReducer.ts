import { DELETE_MONEY, MoneyAction, SEARCH_MONEY } from './moneyActions';
import { WeddingMoney } from './moneyModels';

export interface MoneyState {
  moneyList: WeddingMoney[];
}

export const initialState: MoneyState = {
  moneyList: []
};

export const moneyReducer = (state: MoneyState, action: MoneyAction): MoneyState => {
  switch (action.type) {
    case SEARCH_MONEY:
      return {
        ...state,
        moneyList: action.payload
      };
    case DELETE_MONEY:
      const newList = state.moneyList.filter((x) => x._id !== action.payload);
      return {
        ...state,
        moneyList: newList
      };
    default:
      return state;
  }
};
