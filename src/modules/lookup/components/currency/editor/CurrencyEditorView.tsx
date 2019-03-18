import { FormMode } from '@generic/types';
import { layoutMessage } from '@layout/locales/messages';
import { CurrencyEditorProps } from '@lookup/components/currency/editor/CurrencyEditor';
import { CircularProgress, Typography } from '@material-ui/core';
import * as React from 'react';
import { CurrencyForm, CurrencyFormData } from './CurrencyForm';

export const CurrencyEditorView: React.SFC<CurrencyEditorProps> = props => {
  const { formMode, handleValidate, handleSubmit, handleSubmitSuccess, handleSubmitFail } = props;
  const { isLoading, response } = props.lookupCurrencyState.detail;

  const renderForm = (formData: CurrencyFormData) => (
    <CurrencyForm
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
  const initialValues: CurrencyFormData = {
    information: {
      uid: undefined,
      name: undefined,
      symbol: undefined,
      rate: 1,
      isActive: false,
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
      initialValues.information.name = data.name;
      initialValues.information.symbol = data.symbol;
      initialValues.information.rate = data.rate || 1;
      initialValues.information.isActive = data.isActive;

      return renderForm(initialValues);
    }
  }

  return null;
};