import { 
  hrMeasurementConfirm, 
  hrMeasurementDialog, 
  hrMeasurementField, 
  hrMeasurementFieldHelperFor, 
  hrMeasurementMessage, 
  hrMeasurementPage, 
  hrMeasurementSection, 
  hrMeasurementSubmission
} from './hrMeasurementMessage';
import {
  hrTemplateConfirm,
  hrTemplateDialog,
  hrTemplateField,
  hrTemplateFieldHelperFor,
  hrTemplateMessage,
  hrTemplatePage,
  hrTemplateSection,
  hrTemplateSubmission
} from './hrTemplateMessage';

export const hrMessage = {
  template: {
    field: hrTemplateField,
    fieldFor: hrTemplateFieldHelperFor,
    message: hrTemplateMessage,
    page: hrTemplatePage,
    confirm: hrTemplateConfirm,
    section: hrTemplateSection,
    submission: hrTemplateSubmission,
    dialog: hrTemplateDialog
  },
  measurement: {
    field: hrMeasurementField,
    fieldFor: hrMeasurementFieldHelperFor,
    message: hrMeasurementMessage,
    page: hrMeasurementPage,
    confirm: hrMeasurementConfirm,
    section: hrMeasurementSection,
    submission: hrMeasurementSubmission,
    dialog: hrMeasurementDialog
  }
};