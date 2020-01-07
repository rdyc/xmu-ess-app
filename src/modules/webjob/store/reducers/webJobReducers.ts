import { webJobDefinitionReducers } from './definition/webJobDefinitionReducers';
import { webJobMonitoringReducers } from './monitoring/webJobMonitoringReducers';
import { webJobPageReducer } from './page/webJobPageReducer';
import { webJobRecurringReducers } from './recurring/webJobRecurringReducers';

const webJobReducers = {
  ...webJobDefinitionReducers,
  ...webJobRecurringReducers,
  ...webJobMonitoringReducers,
  webJobPage: webJobPageReducer
};

export default webJobReducers;