import { webJobRecurringDeleteReducer } from './webJobRecurringDeleteReducer';
import { webJobRecurringGetAllReducer } from './webJobRecurringGetAllReducer';
import { webJobRecurringGetDetailReducer } from './webJobRecurringGetDetailReducer';
import { webJobRecurringPostReducer } from './webJobRecurringPostReducer';
import { webJobRecurringPutReducer } from './webJobRecurringPutReducer';
import { webJobRecurringTriggerReducer } from './webJobRecurringTriggerReducer';

export const webJobRecurringReducers = {
  webJobRecurringGetAll: webJobRecurringGetAllReducer,
  webJobRecurringGetDetail: webJobRecurringGetDetailReducer,
  webJobRecurringPost: webJobRecurringPostReducer,
  webJobRecurringDelete: webJobRecurringDeleteReducer,
  webJobRecurringPut: webJobRecurringPutReducer,
  webJobRecurringTrigger: webJobRecurringTriggerReducer,  
};