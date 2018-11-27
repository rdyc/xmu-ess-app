import { currencyGetAllReducer } from './lookupCurrencyGetAllReducer';
import { currencyGetByIdReducer } from './lookupCurrencyGetByIdReducer';
import { currencyGetListReducer } from './lookupCurrencyGetListReducer';
import { lookupCurrencyPostReducer } from './lookupCurrencyPostReducer';
import { lookupCurrencyPutReducer } from './lookupCurrencyPutReducer';

export const lookupCurrencyReducers = {
  lookupCurrencyGetAll: currencyGetAllReducer,
  lookupCurrencyGetList: currencyGetListReducer,
  lookupCurrencyGetById: currencyGetByIdReducer,
  lookupCurrencyPost: lookupCurrencyPostReducer,
  lookupCurrencyPut: lookupCurrencyPutReducer,
};