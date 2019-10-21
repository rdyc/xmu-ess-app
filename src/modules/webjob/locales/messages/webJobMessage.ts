import { webJobMonitoringField } from './webJobMonitoringMessage';
import { webJobPage, webJobSharedHelperFor } from './webJobSharedMessage';

export const webJobMessage = {
  monitoring: {
    field: webJobMonitoringField
  },
  shared: {
    page: webJobPage,
    fieldFor: webJobSharedHelperFor
  }
};