import {
  leaveGetEndReducer,
  leaveRequestGetAllReducer,
  leaveRequestGetByIdReducer,
  leaveRequestPostReducer,
  leaveRequestPutReducer,
} from '@leave/store/reducers/request';

const leaveRequestReducers = {
  leaveRequestGetAll: leaveRequestGetAllReducer,
  leaveRequestGetById: leaveRequestGetByIdReducer,
  leaveGetEnd: leaveGetEndReducer,
  leaveRequestPost: leaveRequestPostReducer,
  leaveRequestPut: leaveRequestPutReducer,
};

export default leaveRequestReducers;