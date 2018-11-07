import { purposeGetAllReducer, purposeGetByIdReducer, purposeGetListReducer } from '@common/store/reducers/purpose';

const purposeReducers = {
  commonPurposeAll: purposeGetAllReducer,
  commonPurposeList: purposeGetListReducer,
  commonPurposeDetail: purposeGetByIdReducer
};

export default purposeReducers;