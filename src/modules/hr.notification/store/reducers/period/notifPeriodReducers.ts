import { 
  notifPeriodDeleteReducer, 
  notifPeriodGetAllReducer, 
  notifPeriodGetByIdReducer, 
  notifPeriodPostReducer, 
  notifPeriodPutReducer 
} from '@hr.notification/store/reducers/period';

const notifPeriodReducers = {
  periodGetAll: notifPeriodGetAllReducer,
  periodGetById: notifPeriodGetByIdReducer,
  periodPost: notifPeriodPostReducer,
  periodPut: notifPeriodPutReducer,
  periodDelete: notifPeriodDeleteReducer,
};

export default notifPeriodReducers;