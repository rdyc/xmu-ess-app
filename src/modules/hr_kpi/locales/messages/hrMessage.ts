import { 
  KPIMeasurementConfirm, 
  KPIMeasurementDialog, 
  KPIMeasurementField, 
  KPIMeasurementFieldHelperFor, 
  KPIMeasurementMessage, 
  KPIMeasurementPage, 
  KPIMeasurementSection, 
  KPIMeasurementSubmission
} from './KPIMeasurementMessage';
import {
  KPITemplateConfirm,
  KPITemplateDialog,
  KPITemplateField,
  KPITemplateFieldHelperFor,
  KPITemplateMessage,
  KPITemplatePage,
  KPITemplateSection,
  KPITemplateSubmission
} from './KPITemplateMessage';

export const KPIMessage = {
  template: {
    field: KPITemplateField,
    fieldFor: KPITemplateFieldHelperFor,
    message: KPITemplateMessage,
    page: KPITemplatePage,
    confirm: KPITemplateConfirm,
    section: KPITemplateSection,
    submission: KPITemplateSubmission,
    dialog: KPITemplateDialog
  },
  measurement: {
    field: KPIMeasurementField,
    fieldFor: KPIMeasurementFieldHelperFor,
    message: KPIMeasurementMessage,
    page: KPIMeasurementPage,
    confirm: KPIMeasurementConfirm,
    section: KPIMeasurementSection,
    submission: KPIMeasurementSubmission,
    dialog: KPIMeasurementDialog
  }
};