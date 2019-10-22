import { webJobMonitoringField } from './webJobMonitoringMessage';
import { webJobPage, webJobSection, webJobSharedHelperFor } from './webJobSharedMessage';

export const webJobMessage = {
  monitoring: {
    field: webJobMonitoringField
  },
  shared: {
    page: webJobPage,
    section: webJobSection,
    fieldFor: webJobSharedHelperFor
  }
};