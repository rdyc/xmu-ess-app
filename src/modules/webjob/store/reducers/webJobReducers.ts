import { webJobDefinitionReducers } from './definition/webJobDefinitionReducers';
import { webJobMonitoringReducers } from './monitoring/webJobMonitoringReducers';
import { webJobRecurringReducers } from './recurring/webJobRecurringReducers';

const webJobReducers = {
  ...webJobDefinitionReducers,
  ...webJobRecurringReducers,
  ...webJobMonitoringReducers,
};

export default webJobReducers;