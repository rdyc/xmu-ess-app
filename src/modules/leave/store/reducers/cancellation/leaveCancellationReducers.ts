import {
  leaveCancellationGetAllReducer,
  leaveCancellationGetByIdReducer,
  leaveCancellationPostReducer,
} from '@leave/store/reducers/cancellation';

const leaveCancellationReducers = {
  leaveCancellationGetAll: leaveCancellationGetAllReducer,
  leaveCancellationGetById: leaveCancellationGetByIdReducer,
  leaveCancellationPost: leaveCancellationPostReducer,
};

export default leaveCancellationReducers;