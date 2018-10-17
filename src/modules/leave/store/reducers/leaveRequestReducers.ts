import {
  leaveRequestGetAllReducer,
  leaveRequestGetByIdReducer,
  leaveRequestPostReducer,
  leaveRequestPutReducer,
} from '@leave/store/reducers';

const leaveRequestReducers = {
  leaveRequestGetAll: leaveRequestGetAllReducer,
  leaveRequestGetById: leaveRequestGetByIdReducer,
  leaveRequestPost: leaveRequestPostReducer,
  leaveRequestPut: leaveRequestPutReducer,
};

export default leaveRequestReducers;