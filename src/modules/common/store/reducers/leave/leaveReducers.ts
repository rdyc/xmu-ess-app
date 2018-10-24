import { leaveGetAllReducer, leaveGetByIdReducer, leaveGetListReducer } from '@common/store/reducers/leave';

const leaveReducers = {
  commonLeaveAll: leaveGetAllReducer,
  commonLeaveList: leaveGetListReducer,
  commonLeaveDetail: leaveGetByIdReducer
};

export default leaveReducers;