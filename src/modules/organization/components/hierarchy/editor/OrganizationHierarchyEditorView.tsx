import { FormMode } from '@generic/types';
import { layoutMessage } from '@layout/locales/messages';
import { Typography } from '@material-ui/core';
import * as React from 'react';
import { HierarchyForm, OrganizationHierarchyFormData } from './forms/HierarchyForm';
import { OrganizationHierarchyEditorProps } from './OrganizationHierarchyEditor';

export const CommonEditorView: React.SFC<OrganizationHierarchyEditorProps> = props => {
  const { formMode, handleValidate, handleSubmit, handleSubmitSuccess, handleSubmitFail, intl } = props;
  const { isLoading, response } = props.organizationHierarchyState.detail;

  const renderForm = (formData: OrganizationHierarchyFormData) => (
    <HierarchyForm 
      formMode={formMode}
      initialValues={formData}
      validate={handleValidate}
      onSubmit={handleSubmit} 
      onSubmitSuccess={handleSubmitSuccess}
      onSubmitFail={handleSubmitFail}
    />
  );

  // init form values
  const initialValues: OrganizationHierarchyFormData = {
    information: {
      companyUid: undefined,
      name: undefined,
      description: undefined,
      inactiveDate: undefined,
    },
    item: {
      items: []
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
          {intl.formatMessage(layoutMessage.text.loading)}
        </Typography>
      );
    }
    
    if (!isLoading && response && response.data) {
      // todo: replace values with response data
      const data = response.data;

      initialValues.information.name = data.name;
      initialValues.information.companyUid = data.companyUid;
      initialValues.information.description = data.description;
      initialValues.information.inactiveDate = data.inactiveDate;

      if (data.items) {
        data.items.forEach(item => 
          initialValues.item.items.push({
            sequence: item.level,
            positionUid: item.positionUid,
            relationType: item.relationType
          }));
      }
      
      return renderForm(initialValues);
    }
  }

  return null;
};