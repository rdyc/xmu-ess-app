import { FormMode } from '@generic/types';
import { Typography } from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { LookupCompanyForm, LookupCompanyFormData } from './form/LookupCompanyForm';
import { CompanyEditorProps } from './LookupCompanyEditor';

export const LookupCompanyEditorView: React.SFC<CompanyEditorProps> = props => {
  const { formMode, handleValidate, handleSubmit, handleSubmitSuccess, handleSubmitFail } = props;
  const { isLoading, response } = props.lookupCompanyState.detail;

  const renderForm = (formData: LookupCompanyFormData) => (
    <LookupCompanyForm 
      formMode={formMode}
      initialValues={formData}
      validate={handleValidate}
      onSubmit={handleSubmit} 
      onSubmitSuccess={handleSubmitSuccess}
      onSubmitFail={handleSubmitFail}
    />
  );

  // init form values
  const initialValues: LookupCompanyFormData = {
    information: {
      uid: undefined,
      code: undefined,
      name: undefined,
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
      initialValues.information.code = data.code;
      initialValues.information.name = data.name;
          
      return renderForm(initialValues);
    }
  }

  return null;
};