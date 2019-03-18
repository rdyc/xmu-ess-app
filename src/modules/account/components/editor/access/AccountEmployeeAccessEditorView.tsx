import { FormMode } from '@generic/types';
import { layoutMessage } from '@layout/locales/messages';
import { CircularProgress, Typography } from '@material-ui/core';
import * as React from 'react';
import { AccountEmployeeAccessEditorProps } from './AccountEmployeeAccessEditor';
import { AccountEmployeeAccessContainerForm, AccountEmployeeAccessContainerFormData } from './form/AccountEmployeeAccessContainerForm';

export const AccountEmployeeAccessEditorView: React.SFC<AccountEmployeeAccessEditorProps> = props => {
  const { formMode, handleValidate, handleSubmit, handleSubmitSuccess, handleSubmitFail,
    submitDialogCancelText, submitDialogConfirmedText, submitDialogContentText, submitDialogTitle } = props;
  const { isLoading, response } = props.accountEmployeeAccessState.detail;

  const renderForm = (formData: AccountEmployeeAccessContainerFormData) => (
    <AccountEmployeeAccessContainerForm
      formMode={formMode}
      initialValues={formData}
      validate={handleValidate}
      onSubmit={handleSubmit} 
      onSubmitSuccess={handleSubmitSuccess}
      onSubmitFail={handleSubmitFail}
      submitDialogTitle={submitDialogTitle}
      submitDialogContentText={submitDialogContentText}
      submitDialogCancelText={submitDialogCancelText}
      submitDialogConfirmedText={submitDialogConfirmedText}
    />
  );

  // init form values
  const initialValues: AccountEmployeeAccessContainerFormData = {
    access: {
      employeeUid: props.match.params.employeeUid,
      uid: undefined,
      companyUid: undefined,
      positionUid: undefined,
      roleUid: undefined,
      unitType: null,
      departmentType: null,
      levelType: undefined,
      start: undefined,
      end: null
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

      initialValues.access.uid = data.uid;
      initialValues.access.companyUid = data.companyUid;
      initialValues.access.positionUid = data.positionUid;
      initialValues.access.roleUid = data.roleUid;
      initialValues.access.unitType = data.unitType;
      initialValues.access.departmentType = data.departmentType;
      initialValues.access.levelType = data.levelType;
      initialValues.access.start = data.start;
      initialValues.access.end = data.end;

      return renderForm(initialValues);
    }
  }

  return null;
};