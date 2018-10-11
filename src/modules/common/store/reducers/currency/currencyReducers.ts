import { currencyGetAllReducer, currencyGetByIdReducer, currencyGetListReducer } from '@common/store/reducers/currency';

const currencyReducers = {
  commonCurrencyGetAll: currencyGetAllReducer,
  commonCurrencyGetList: currencyGetListReducer,
  commonCurrencyGetById: currencyGetByIdReducer
};

export default currencyReducers;