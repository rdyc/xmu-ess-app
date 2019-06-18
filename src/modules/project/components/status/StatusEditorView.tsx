import { FormMode } from '@generic/types';
import { IProjectDetail } from '@project/classes/response';
import * as React from 'react';

import { layoutMessage } from '@layout/locales/messages';
import { CircularProgress, Typography } from '@material-ui/core';
import { ProjectStatusFormData, StatusForm } from './forms/StatusForm';
import { StatusEditorProps } from './StatusEditor';

export const StatusEditorView: React.SFC<StatusEditorProps> = props => {
  const { formMode, handleValidate, handleSubmit, handleSubmitSuccess, handleSubmitFail } = props;
  const { isLoading, response } = props.projectRegisterState.detail;

  const renderForm = (formData: ProjectStatusFormData, data: IProjectDetail) => (
    <StatusForm
      formMode={formMode}
      projectData={data}
      statusType={data.statusType}
      initialValues={formData}
      validate={handleValidate}
      onSubmit={handleSubmit} 
      onSubmitSuccess={handleSubmitSuccess}
      onSubmitFail={handleSubmitFail}
    />
  );

  // init form values
  const initialValues: ProjectStatusFormData = {
    information: {
      statusType: undefined
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

      initialValues.information.statusType = data.statusType;
      
      return renderForm(initialValues, response.data);
    }
  }
  
  return null;
};