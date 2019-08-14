import { 
  EmployeeKPIConfirm, 
  EmployeeKPIDialog, 
  EmployeeKPIField, 
  EmployeeKPIFieldHelperFor, 
  EmployeeKPIMessage, 
  EmployeeKPIPage, 
  EmployeeKPISection, 
  EmployeeKPISubmission 
} from './employeeKPIMessage';
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
    dialog: KPITemplateDialog
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
    field: EmployeeKPIField,
    fieldFor: EmployeeKPIFieldHelperFor,
    message: EmployeeKPIMessage,
    page: EmployeeKPIPage,
    confirm: EmployeeKPIConfirm,
    section: EmployeeKPISection,
    submission: EmployeeKPISubmission,
    dialog: EmployeeKPIDialog
  },
};