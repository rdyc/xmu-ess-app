import { FormMode } from '@generic/types';
import { layoutMessage } from '@layout/locales/messages';
import { CircularProgress, Typography } from '@material-ui/core';
import * as React from 'react';
import { LookupCustomerForm, LookupCustomerFormData } from './forms/LookupCustomerForm';
import { LookupCustomerEditorProps } from './LookupCustomerEditor';

export const LookupCustomerEditorView: React.SFC<LookupCustomerEditorProps> = props => {
  const { formMode, handleValidate, handleSubmit, handleSubmitSuccess, handleSubmitFail,
          submitDialogTitle, submitDialogContentText, submitDialogConfirmedText, submitDialogCancelText  } = props;
  const { isLoading, response } = props.lookupCustomerState.detail;

  const renderForm = (formData: LookupCustomerFormData) => (
    <LookupCustomerForm 
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
  const initialValues: LookupCustomerFormData = {
    information: {
      uid: undefined,
      name: undefined,
      npwp: undefined,
      companyUid: undefined,
      address: undefined,
      addressAdditional: undefined,
      phone: undefined,
      phoneAdditional: undefined, 
      mobile: undefined, 
      mobileAdditional: undefined, 
      fax: undefined, 
      emailAddress: undefined, 
      contactPerson: undefined, 
      contactTitle: undefined,
      contactPersonAdditional: undefined,  
      contactTitleAdditional: undefined, 
      isActive: false
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
      initialValues.information.npwp = data.npwp;
      initialValues.information.address = data.address;
      initialValues.information.addressAdditional = data.addressAdditional;
      initialValues.information.phone = data.phone;
      initialValues.information.phoneAdditional = data.phoneAdditional;
      initialValues.information.mobile = data.mobile;
      initialValues.information.mobileAdditional = data.mobileAdditional;
      initialValues.information.fax = data.fax;
      initialValues.information.emailAddress = data.email;
      initialValues.information.contactPerson = data.contactPerson;
      initialValues.information.contactTitle = data.contactTitle;
      initialValues.information.contactPersonAdditional = data.contactPersonAdditional;
      initialValues.information.contactTitleAdditional = data.contactTitleAdditional;
      initialValues.information.isActive = data.isActive;
          
      return renderForm(initialValues);
    }
  }

  return null;
};