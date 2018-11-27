import { lookupCurrencyGetAllReducer } from './lookupCurrencyGetAllReducer';
import { lookupCurrencyGetByIdReducer } from './lookupCurrencyGetByIdReducer';
import { lookupCurrencyGetListReducer } from './lookupCurrencyGetListReducer';
import { lookupCurrencyPostReducer } from './lookupCurrencyPostReducer';
import { lookupCurrencyPutReducer } from './lookupCurrencyPutReducer';

export const lookupCurrencyReducers = {
  lookupCurrencyGetAll: lookupCurrencyGetAllReducer,
  lookupCurrencyGetList: lookupCurrencyGetListReducer,
  lookupCurrencyGetById: lookupCurrencyGetByIdReducer,
  lookupCurrencyPost: lookupCurrencyPostReducer,
  lookupCurrencyPut: lookupCurrencyPutReducer,
};