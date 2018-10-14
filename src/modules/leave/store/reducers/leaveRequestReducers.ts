import {
  leaveRequestGetAllReducer,
  leaveRequestGetByIdReducer,
  // projectGetListReducer,
  leaveRequestPostReducer,
  leaveRequestPutReducer,
} from '@leave/store/reducers';

const leaveRequestReducers = {
  leaveRequestGetAll: leaveRequestGetAllReducer,
  // leaveRequestGetList: leaveRequestGetListReducer,
  leaveRequestGetById: leaveRequestGetByIdReducer,
  leaveRequestPost: leaveRequestPostReducer,
  leaveRequestPut: leaveRequestPutReducer,
};

export default leaveRequestReducers;