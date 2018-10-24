import { currencyGetAllReducer, currencyGetByIdReducer, currencyGetListReducer } from '@common/store/reducers/currency';

const currencyReducers = {
  commonCurrencyAll: currencyGetAllReducer,
  commonCurrencyList: currencyGetListReducer,
  commonCurrencyDetail: currencyGetByIdReducer
};

export default currencyReducers;