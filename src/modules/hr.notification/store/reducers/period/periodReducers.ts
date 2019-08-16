import { 
  periodDeleteReducer, 
  periodGetAllReducer, 
  periodGetByIdReducer, 
  periodPostReducer, 
  periodPutReducer 
} from '@hr.notification/store/reducers/period';

const periodReducers = {
  periodGetAll: periodGetAllReducer,
  periodGetById: periodGetByIdReducer,
  periodPost: periodPostReducer,
  periodPut: periodPutReducer,
  periodDelete: periodDeleteReducer,
};

export default periodReducers;