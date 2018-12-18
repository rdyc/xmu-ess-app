import { FormMode } from '@generic/types';
import { layoutMessage } from '@layout/locales/messages';
import { Typography } from '@material-ui/core';
import * as React from 'react';
import { OrganizationStructureFormData, StructureForm } from './form/StructureForm';
import { OrganizationStructureEditorProps } from './OrganizationStructureEditor';

export const CommonEditorView: React.SFC<OrganizationStructureEditorProps> = props => {
  const { formMode, handleValidate, handleSubmit, handleSubmitSuccess, handleSubmitFail, intl } = props;
  const { isLoading, response } = props.organizationStructureState.detail;

  const renderForm = (formData: OrganizationStructureFormData) => (
    <StructureForm 
      formMode={formMode}
      initialValues={formData}
      validate={handleValidate}
      onSubmit={handleSubmit} 
      onSubmitSuccess={handleSubmitSuccess}
      onSubmitFail={handleSubmitFail}
    />
  );

  // init form values
  const initialValues: OrganizationStructureFormData = {
    information: {
      uid: undefined,
      companyUid: undefined,
      positionUid: undefined,
      description: undefined,
      inactiveDate: undefined,
    },
    item: {
      items: [{
        uid: undefined,
        positionUid: undefined,
        start: undefined,
        end: undefined 
      }]
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

      initialValues.information.uid = data.uid;
      initialValues.information.positionUid = data.positionUid;
      initialValues.information.companyUid = data.companyUid;
      initialValues.information.description = data.description;
      initialValues.information.inactiveDate = data.inactiveDate;

      if (data.reportTo) {
        initialValues.item.items = [];
        data.reportTo.forEach(item => 
          initialValues.item.items.push({
            uid: item.uid,
            positionUid: item.positionUid,
            start: item.start,
            end: item.end
          }));
      }
      
      return renderForm(initialValues);
    }
  }

  return null;
};