import { createContext, useContext, useReducer } from 'react';
import { MoneyAction } from './moneyActions';
import { initialState, moneyReducer, MoneyState } from './moneyReducer';

interface MoneyContextProps {
  state: MoneyState;
  dispatch: React.Dispatch<MoneyAction>;
}

const MoneyContext = createContext<MoneyContextProps>({
  state: initialState,
  dispatch: () => initialState
});

export const MoneyProvider = (props: React.PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(moneyReducer, initialState);

  return (
    <MoneyContext.Provider value={{ state, dispatch }} {...props}>
      {props.children}
    </MoneyContext.Provider>
  );
};

export const useMoney = () => {
  return useContext(MoneyContext);
};
