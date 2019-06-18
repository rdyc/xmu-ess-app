import { 
  hrMeasurementConfirm, 
  hrMeasurementField, 
  hrMeasurementFieldHelperFor, 
  hrMeasurementMessage, 
  hrMeasurementPage, 
  hrMeasurementSection, 
  hrMeasurementSubmission 
} from './hrMeasurementMessage';
import {
  hrTemplateField,
  hrTemplateFieldHelperFor,
  hrTemplateMessage,
  hrTemplatenConfirm,
  hrTemplatenSection,
  hrTemplatenSubmission,
  hrTemplatePage
} from './hrTemplateMessage';

export const hrMessage = {
  template: {
    field: hrTemplateField,
    fieldFor: hrTemplateFieldHelperFor,
    message: hrTemplateMessage,
    page: hrTemplatePage,
    confirm: hrTemplatenConfirm,
    section: hrTemplatenSection,
    submission: hrTemplatenSubmission
  },
  measurement: {
    field: hrMeasurementField,
    fieldFor: hrMeasurementFieldHelperFor,
    message: hrMeasurementMessage,
    page: hrMeasurementPage,
    confirm: hrMeasurementConfirm,
    section: hrMeasurementSection,
    submission: hrMeasurementSubmission
  }
};