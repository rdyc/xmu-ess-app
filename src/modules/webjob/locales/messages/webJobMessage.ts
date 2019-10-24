import { webJobDefinitionField } from './webJobDefinitionMessage';
import { webJobMonitoringField } from './webJobMonitoringMessage';
import { webJobRecurringField } from './webJobRecurringMessage';
import { webJobConfirm, webJobPage, webJobSection, webJobSharedHelperFor, webJobSharedMessage } from './webJobSharedMessage';

export const webJobMessage = {
  monitoring: {
    field: webJobMonitoringField
  },
  definition: {
    field: webJobDefinitionField,
  },
  recurring: {
    field: webJobRecurringField,
  },
  shared: {
    page: webJobPage,
    section: webJobSection,
    fieldFor: webJobSharedHelperFor,
    confirm: webJobConfirm,
    message: webJobSharedMessage,
  }
};