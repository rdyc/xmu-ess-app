import { 
  KPICategoryConfirm, 
  KPICategoryDialog, 
  KPICategoryField, 
  KPICategoryFieldHelperFor, 
  KPICategoryMessage, 
  KPICategoryPage, 
  KPICategorySection, 
  KPICategorySubmission
} from './kpiCategoryMessage';
import { 
  KPIEmployeeAction, 
  KPIEmployeeConfirm, 
  KPIEmployeeDialog, 
  KPIEmployeeField, 
  KPIEmployeeFieldHelperFor, 
  KPIEmployeeMessage, 
  KPIEmployeePage, 
  KPIEmployeeSection, 
  KPIEmployeeSubmission
} from './kpiEmployeeMessage';
import { 
  KPIMeasurementConfirm, 
  KPIMeasurementDialog, 
  KPIMeasurementField, 
  KPIMeasurementFieldHelperFor, 
  KPIMeasurementMessage, 
  KPIMeasurementPage, 
  KPIMeasurementSection, 
  KPIMeasurementSubmission
} from './kpiMeasurementMessage';
import { 
  KPIOpenConfirm, 
  KPIOpenDialog, 
  KPIOpenField, 
  KPIOpenFieldHelperFor, 
  KPIOpenMessage, 
  KPIOpenPage, 
  KPIOpenSection, 
  KPIOpenSubmission 
} from './kpiOpenMessage';
import {
  KPITemplateAction,
  KPITemplateConfirm,
  KPITemplateDialog,
  KPITemplateField,
  KPITemplateFieldHelperFor,
  KPITemplateMessage,
  KPITemplatePage,
  KPITemplateSection,
  KPITemplateSubmission
} from './kpiTemplateMessage';
export const kpiMessage = {
  template: {
    field: KPITemplateField,
    fieldFor: KPITemplateFieldHelperFor,
    message: KPITemplateMessage,
    page: KPITemplatePage,
    confirm: KPITemplateConfirm,
    section: KPITemplateSection,
    submission: KPITemplateSubmission,
    dialog: KPITemplateDialog,
    action: KPITemplateAction,
  },
  category: {
    field: KPICategoryField,
    fieldFor: KPICategoryFieldHelperFor,
    message: KPICategoryMessage,
    page: KPICategoryPage,
    confirm: KPICategoryConfirm,
    section: KPICategorySection,
    submission: KPICategorySubmission,
    dialog: KPICategoryDialog
  },
  open: {
    field: KPIOpenField,
    fieldFor: KPIOpenFieldHelperFor,
    message: KPIOpenMessage,
    page: KPIOpenPage,
    confirm: KPIOpenConfirm,
    section: KPIOpenSection,
    submission: KPIOpenSubmission,
    dialog: KPIOpenDialog
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
  },
  employee: {
    field: KPIEmployeeField,
    fieldFor: KPIEmployeeFieldHelperFor,
    message: KPIEmployeeMessage,
    page: KPIEmployeePage,
    confirm: KPIEmployeeConfirm,
    section: KPIEmployeeSection,
    submission: KPIEmployeeSubmission,
    dialog: KPIEmployeeDialog,
    action: KPIEmployeeAction,
  },
};