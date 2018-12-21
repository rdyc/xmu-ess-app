import { paymentGetAllReducer, paymentGetByIdReducer, paymentGetListReducer } from '@common/store/reducers/payment';

const paymentReducers = {
  commonPaymentAll: paymentGetAllReducer,
  commonPaymentList: paymentGetListReducer,
  commonPaymentDetail: paymentGetByIdReducer
};

export default paymentReducers;