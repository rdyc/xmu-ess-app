import { FormMode } from '@generic/types';
import { layoutMessage } from '@layout/locales/messages';
import { Typography } from '@material-ui/core';
import * as React from 'react';
import { AccountEmployeeEditorProps } from './AccountEmployeeEditor';
import { AccountEmployeeContainerForm, AccountEmployeeFormData } from './form/AccountEmployeeContainerForm';

export const AccountEmployeeEditorView: React.SFC<AccountEmployeeEditorProps> = props => {
  const { formMode, handleValidate, handleSubmit, handleSubmitSuccess, handleSubmitFail,
    submitDialogCancelText, submitDialogConfirmedText, submitDialogContentText, submitDialogTitle } = props;
  const { isLoading, response } = props.accountEmployeeState.detail;

  const renderForm = (formData: AccountEmployeeFormData) => (
    <AccountEmployeeContainerForm 
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

  const initialValues: AccountEmployeeFormData = {
    information: {
      // basic
      uid: undefined,
      companyUid: undefined,
      employmentNumber: undefined,
      employmentType: undefined,
      joinDate: undefined,
      inactiveDate: undefined,
      fullName: undefined,
      dateOfBirth: undefined,
      birthPlace: undefined,
      genderType: undefined,
      religionType: undefined,
      taxType: undefined,
      bloodType: undefined,
      image: undefined,

      // bank
      familyCardNumber: undefined,
      citizenNumber: undefined,
      taxNumber: undefined,
      bpjsEmployementNumber: undefined,
      bpjsHealthCareNumber: undefined,
      bankAccount: undefined,
      bankAccountName: undefined,
      bankAccountBranch: undefined,

      // contacts
      address: undefined,
      addressAdditional: undefined,
      email: undefined,
      emailPersonal: undefined,
      phone: undefined,
      mobilePhone: undefined,
      emergencyContactName: undefined,
      emergencyContactRelation: undefined,
      emergencyContactPhone: undefined,
      emergencyContactPhoneAdditional: undefined,
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
      // todo: replace values with response data
      const data = response.data;
      // basic
      initialValues.information.uid = data.uid;
      initialValues.information.employmentNumber = data.employmentNumber;
      initialValues.information.fullName = data.fullName;
      initialValues.information.genderType = data.genderType;
      initialValues.information.birthPlace = data.birthPlace;
      initialValues.information.dateOfBirth = data.dateOfBirth;
      initialValues.information.companyUid = data.companyUid;
      initialValues.information.employmentType = data.employmentType;
      initialValues.information.joinDate = data.joinDate;
      initialValues.information.taxType = data.taxType;
      initialValues.information.inactiveDate = data.inactiveDate;
      initialValues.information.bloodType = data.bloodType;
      initialValues.information.religionType = data.religionType;
      initialValues.information.image = data.image;

      // bank
      initialValues.information.citizenNumber = data.citizenNumber;
      initialValues.information.taxNumber = data.taxNumber;
      initialValues.information.familyCardNumber = data.familyCardNumber;
      initialValues.information.bpjsEmployementNumber = data.bpjsEmploymentNumber;
      initialValues.information.bpjsHealthCareNumber = data.bpjsHealthCareNumber;
      initialValues.information.bankAccount = data.bank && data.bank.account;
      initialValues.information.bankAccountName = data.bank && data.bank.name;
      initialValues.information.bankAccountBranch = data.bank && data.bank.branch;

      // contacts
      initialValues.information.phone = data.phone;
      initialValues.information.mobilePhone = data.mobilePhone;
      initialValues.information.email = data.email;
      initialValues.information.emailPersonal = data.emailPersonal;
      initialValues.information.address = data.address;
      initialValues.information.addressAdditional = data.addressAdditional;
      initialValues.information.emergencyContactName = data.contact && data.contact.name;
      initialValues.information.emergencyContactRelation = data.contact && data.contact.relation;
      initialValues.information.emergencyContactPhone = data.contact && data.contact.phone;
      initialValues.information.emergencyContactPhoneAdditional = data.contact && data.contact.phoneAdditional;

      return renderForm(initialValues);
    }
  }

  return null;
};