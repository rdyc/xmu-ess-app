import { currencyGetAllReducer, currencyGetByIdReducer, currencyGetListReducer, lookupCurrencyDeleteReducer, lookupCurrencyPostReducer, lookupCurrencyPutReducer } from '.';

export const lookupCurrencyReducers = {
  currencyGetAll: currencyGetAllReducer,
  currencyGetList: currencyGetListReducer,
  currencyGetById: currencyGetByIdReducer,
  currencyPost: lookupCurrencyPostReducer,
  currencyPut: lookupCurrencyPutReducer,
  currencyDelete: lookupCurrencyDeleteReducer
};