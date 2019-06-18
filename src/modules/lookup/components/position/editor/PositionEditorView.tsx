import { FormMode } from '@generic/types';
import { layoutMessage } from '@layout/locales/messages';
import { PositionEditorProps } from '@lookup/components/position/editor/PositionEditor';
import { CircularProgress, Typography } from '@material-ui/core';
import * as React from 'react';
import { PositionForm, PositionFormData } from './PositionForm';

export const PositionEditorView: React.SFC<PositionEditorProps> = props => {
  const { formMode, handleValidate, handleSubmit, handleSubmitSuccess, handleSubmitFail } = props;
  const { isLoading, response } = props.lookupPositionState.detail;

  const renderForm = (formData: PositionFormData) => (
    <PositionForm
      formMode={formMode}
      initialValues={formData}
      validate={handleValidate}
      onSubmit={handleSubmit}
      onSubmitSuccess={handleSubmitSuccess}
      onSubmitFail={handleSubmitFail}
      submitDialogTitle={props.submitDialogTitle}
      submitDialogContentText={props.submitDialogContentText}
      submitDialogConfirmedText={props.submitDialogConfirmedText}
      submitDialogCancelText={props.submitDialogCancelText}
    />
  );

  // init form values
  const initialValues: PositionFormData = {
    information: {
      uid: undefined,
      companyUid: undefined,
      name: undefined,
      description: undefined,
      inactiveDate: undefined,
      isAllowMultiple: false,
    }
  };

  // New
  if (formMode === FormMode.New) {
    return renderForm(initialValues);
  }

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
      // todo: replace values with response data
      const data = response.data;

      initialValues.information.uid = data.uid;
      initialValues.information.companyUid = data.companyUid;
      initialValues.information.name = data.name;
      initialValues.information.description = data.description || '';
      initialValues.information.inactiveDate = data.inactiveDate || '';
      initialValues.information.isAllowMultiple = data.isAllowMultiple;

      return renderForm(initialValues);
    }
  }

  return null;
};