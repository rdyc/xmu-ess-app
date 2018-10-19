import {
  leaveRequestGetAllReducer,
  leaveRequestGetByIdReducer,
  leaveRequestPostReducer,
  leaveRequestPutReducer,
} from '@leave/store/reducers/request';

const leaveRequestReducers = {
  leaveRequestGetAll: leaveRequestGetAllReducer,
  leaveRequestGetById: leaveRequestGetByIdReducer,
  leaveRequestPost: leaveRequestPostReducer,
  leaveRequestPut: leaveRequestPutReducer,
};

export default leaveRequestReducers;