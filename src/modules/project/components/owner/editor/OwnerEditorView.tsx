import { FormMode } from '@generic/types';
import { IProjectDetail } from '@project/classes/response';
import * as React from 'react';

import { layoutMessage } from '@layout/locales/messages';
import { CircularProgress, Typography } from '@material-ui/core';
import { OwnerForm, ProjectOwnerFormData } from './forms/OwnerForm';
import { OwnerEditorProps } from './OwnerEditor';

export const OwnerEditorView: React.SFC<OwnerEditorProps> = props => {
  const { formMode, handleValidate, handleSubmit, handleSubmitSuccess, handleSubmitFail } = props;
  const { isLoading, response } = props.projectRegisterState.detail;

  const renderForm = (formData: ProjectOwnerFormData, data: IProjectDetail) => (
    <OwnerForm
      formMode={formMode}
      initialValues={formData}
      validate={handleValidate}
      onSubmit={handleSubmit} 
      onSubmitSuccess={handleSubmitSuccess}
      onSubmitFail={handleSubmitFail}
    />
  );

  // init form values
  const initialValues: ProjectOwnerFormData = {
    information: {
      uid: undefined,
      customerUid: undefined,
      name: undefined,
      projectType: undefined,
      employeeUid: null,
    }
  };
  
  // Modify
  if (formMode === FormMode.Edit) {
    if (isLoading) {
      return (
        <div className={props.classes.preloader}>
          <div className={props.classes.preloaderContent}>
            <CircularProgress 
              style={{margin: 'auto'}} 
              color="secondary"
            />

            <Typography
              className={props.classes.marginFarTop}
            >
              {props.intl.formatMessage(layoutMessage.text.waiting)}
            </Typography>
          </div>    
        </div>
      );
    }
    
    if (!isLoading && response && response.data) {
      const data = response.data;

      initialValues.information.uid = data.uid;
      initialValues.information.employeeUid = data.ownerEmployeeUid;
      initialValues.information.customerUid = data.customer ? data.customer.name : data.customerUid;
      initialValues.information.projectType = data.projectType;
      initialValues.information.name = data.name;
      
      return renderForm(initialValues, response.data);
    }
  }
  
  return null;
};