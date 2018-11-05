import { FormMode } from '@generic/types';
import { Typography } from '@material-ui/core';
import {
  ProjectRegistrationContainerForm,
  ProjectRegistrationFormData,
} from '@project/components/registration/editor/forms/ProjectRegistrationContainerForm';
import { ProjectRegistrationEditorProps } from '@project/components/registration/editor/ProjectRegistrationEditor';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

export const ProjectRegistrationEditorView: React.SFC<ProjectRegistrationEditorProps> = props => {
  const { formMode, handleValidate, handleSubmit, handleSubmitSuccess, handleSubmitFail } = props;
  const { isLoading, response } = props.projectRegisterState.detail;

  const renderForm = (formData: ProjectRegistrationFormData) => (
    <ProjectRegistrationContainerForm 
      formMode={formMode}
      initialValues={formData}
      validate={handleValidate}
      onSubmit={handleSubmit} 
      onSubmitSuccess={handleSubmitSuccess}
      onSubmitFail={handleSubmitFail}
    />
  );

  // init form values
  const initialValues: ProjectRegistrationFormData = {
    information: {
      uid: undefined,
      ownerEmployeeUid: undefined,
      customerUid: undefined,
      projectType: undefined,
      contractNumber: undefined,
      name: undefined,
      description: undefined,
      start: undefined,
      end: undefined,
      currencyType: undefined,
      rate: 1,
      valueUsd: 0,
      valueIdr: 0,
    },
    document: {
      project: [],
      preSales: [],
    },
    sales: {
      employees: []
    }
  };

  // New
  if (formMode === FormMode.New) {
    return renderForm(initialValues);
  }

  // Modify
  if (formMode === FormMode.Edit) {
    if (isLoading && !response) {
      return (
        <Typography variant="body2">
          <FormattedMessage id="global.loading"/>
        </Typography>
      );
    }
    
    if (!isLoading && response && response.data) {
      // todo: replace values with response data
      const data = response.data;

      initialValues.information.uid = data.uid;
      initialValues.information.ownerEmployeeUid = data.owner ? data.owner.fullName : data.ownerEmployeeUid;
      initialValues.information.customerUid = data.customerUid;
      initialValues.information.projectType = data.projectType;
      initialValues.information.contractNumber = data.contractNumber;
      initialValues.information.name = data.name;
      initialValues.information.description = data.description;
      initialValues.information.start = data.start;
      initialValues.information.end = data.end;
      initialValues.information.currencyType = data.currencyType;
      initialValues.information.rate = data.rate;
      initialValues.information.valueUsd = data.valueUsd;
      initialValues.information.valueIdr = data.valueIdr || 0;

      if (data.documents) {
        data.documents.forEach(item => 
          initialValues.document.project.push({
            [`${item.documentType}`]: item.isAvailable
          })
        );
      }

      if (data.documentPreSales) {
        data.documentPreSales.forEach(item => 
          initialValues.document.preSales.push({
            [`${item.documentType}`]: item.isAvailable
          })
        );
      }
      
      if (data.sales) {
        data.sales.forEach(item => 
          initialValues.sales.employees.push({ 
            uid: item.uid,
            employeeUid: item.employeeUid,
            fullName: item.employee ? item.employee.fullName : 'N/A',
            email: item.employee ? item.employee.email : 'N/A'
          })
        );
      }
      
      return renderForm(initialValues);
    }
  }

  return null;
};