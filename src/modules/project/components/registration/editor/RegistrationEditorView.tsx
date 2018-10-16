import { FormMode } from '@generic/types';
import { Typography } from '@material-ui/core';
import {
  ProjectRegistrationFormData,
  RegistrationForm,
} from '@project/components/registration/editor/forms/RegistrationForm';
import { RegistrationEditorProps } from '@project/components/registration/editor/RegistrationEditor';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

export const RegistrationEditorView: React.SFC<RegistrationEditorProps> = props => {
  const { mode, handleValidate, handleSubmit, handleSubmitSuccess, handleSubmitFail } = props;
  const { isLoading, response } = props.projectRegisterState.detail;

  const renderForm = (formData: ProjectRegistrationFormData) => (
    <RegistrationForm 
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
      customerUid: undefined,
      projectType: undefined,
      contractNumber: undefined,
      name: undefined,
      description: 'desc',
      start: undefined,
      end: undefined,
      currencyType: undefined,
      rate: 1,
      valueUsd: 9,
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
  if (mode === FormMode.New) {
    return renderForm(initialValues);
  }

  // Modify
  if (mode === FormMode.Edit) {
    if (isLoading && !response) {
      return (
        <Typography variant="body2">
          <FormattedMessage id="global.loading"/>
        </Typography>
      );
    }
    
    if (!isLoading && response && response.data) {
      // todo: replace values with response data

      return renderForm(initialValues);
    }
  }

  return null;
};