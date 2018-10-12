import { customerGetAllReducer, customerGetByIdReducer, customerGetListReducer ,
         holidayGetAllReducer, holidayGetByIdReducer, holidayGetListReducer ,
         leaveGetAllReducer, leaveGetByIdReducer, leaveGetListReducer, leavePutReducer } from '@lookup/store/reducers';

const lookupReducers = {
  customerGetAll: customerGetAllReducer,
  customerGetList: customerGetListReducer,
  customerGetById: customerGetByIdReducer,
  holidayGetAll: holidayGetAllReducer,
  holidayGetList: holidayGetListReducer,
  holidayGetById: holidayGetByIdReducer,
  leaveGetAll: leaveGetAllReducer,
  leaveGetList: leaveGetListReducer,
  leaveGetById: leaveGetByIdReducer,
  leavePut: leavePutReducer,
};

export default lookupReducers;