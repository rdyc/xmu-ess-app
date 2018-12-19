import {
  taxGetAllReducer,
  taxGetByIdReducer,
  taxGetListReducer
} from '@common/store/reducers/tax';

const taxReducers = {
  commonTaxAll: taxGetAllReducer,
  commonTaxList: taxGetListReducer,
  commonTaxDetail: taxGetByIdReducer
};

export default taxReducers;
