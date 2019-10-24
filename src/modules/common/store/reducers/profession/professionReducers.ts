import { professionGetAllReducer, professionGetByIdReducer, professionGetListReducer } from '@common/store/reducers/profession';

const professionReducers = {
  commonProfessionAll: professionGetAllReducer,
  commonProfessionList: professionGetListReducer,
  commonProfessionDetail: professionGetByIdReducer
};

export default professionReducers;