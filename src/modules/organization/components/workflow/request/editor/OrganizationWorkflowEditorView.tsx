import { FormMode } from '@generic/types';
import { layoutMessage } from '@layout/locales/messages';
import { Typography } from '@material-ui/core';
import * as React from 'react';
import { OrganizationWorkflowForm, WorkflowFormData } from './forms/OrganizationWorkflowForm';
import { OrganizationWorkflowEditorProps } from './OrganizationWorkflowEditor';

export const OrganizationWorkflowEditorView: React.SFC<OrganizationWorkflowEditorProps> = props => {
  const { formMode, handleValidate, handleSubmit, handleSubmitSuccess, handleSubmitFail } = props;
  const { isLoading, response } = props.organizationWorkflowState.list;

  const renderForm = (formData: WorkflowFormData) => (
    <OrganizationWorkflowForm 
      formMode={formMode}
      companyUid={props.companyUid}
      initialValues={formData}
      validate={handleValidate}
      onSubmit={handleSubmit} 
      onSubmitSuccess={handleSubmitSuccess}
      onSubmitFail={handleSubmitFail}
    />
  );

  // init form values 
  const initialValues: WorkflowFormData = {
    hierarchy: {
      hierarchies: []
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
          {props.intl.formatMessage(layoutMessage.text.loading)}
        </Typography>
      );
    }

    if (!isLoading && response && response.data) {
      const data = response.data;

      if (data) {
        data.forEach(item =>
          initialValues.hierarchy.hierarchies.push({
            uid: item.uid,
            hierarchyUid: item.hierarchyUid,
            hierarchyName: item.hierarchy ? item.hierarchy.name : 'N/A',
            priority: item.priority            
          })
        );
      }
      return renderForm(initialValues);
    }
  }
  return null;
};