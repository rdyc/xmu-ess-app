import {
  leaveRequestGetAllReducer,
  leaveRequestGetByIdReducer,
  leaveRequestGetEndReducer,
  leaveRequestPostReducer,
  leaveRequestPutReducer,
} from '@leave/store/reducers/request';

const leaveRequestReducers = {
  leaveRequestGetAll: leaveRequestGetAllReducer,
  leaveRequestGetById: leaveRequestGetByIdReducer,
  leaveRequestGetEnd: leaveRequestGetEndReducer,
  leaveRequestPost: leaveRequestPostReducer,
  leaveRequestPut: leaveRequestPutReducer,
};

export default leaveRequestReducers;