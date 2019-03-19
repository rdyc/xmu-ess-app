import { FormMode } from '@generic/types';
import { IProjectDetail } from '@project/classes/response';
import * as React from 'react';

import { layoutMessage } from '@layout/locales/messages';
import { CircularProgress, Typography } from '@material-ui/core';
import { HourForm, ProjectHourFormData } from './forms/HourForm';
import { HourEditorProps } from './HourEditor';

export const HourEditorView: React.SFC<HourEditorProps> = props => {
  const { formMode, handleValidate, handleSubmit, handleSubmitSuccess, handleSubmitFail } = props;
  const { isLoading, response } = props.projectRegisterState.detail;

  const renderForm = (formData: ProjectHourFormData, data: IProjectDetail) => (
    <HourForm
      formMode={formMode}
      initialValues={formData}
      validate={handleValidate}
      onSubmit={handleSubmit} 
      onSubmitSuccess={handleSubmitSuccess}
      onSubmitFail={handleSubmitFail}
    />
  );

  // init form values
  const initialValues: ProjectHourFormData = {
    information: {
      uid: undefined,
      customerUid: undefined,
      name: undefined,
      description: undefined,
      hours: undefined
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
      initialValues.information.customerUid = data.customer ? data.customer.name : data.customerUid;
      initialValues.information.name = data.name;
      initialValues.information.description = data.description;
      initialValues.information.hours = data.maxHours;
      
      return renderForm(initialValues, response.data);
    }
  }
  
  return null;
};