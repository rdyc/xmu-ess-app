import { FormMode } from '@generic/types';
import { layoutMessage } from '@layout/locales/messages';
import { Typography } from '@material-ui/core';
import * as React from 'react';
import { AccountEmployeeEditorProps } from './AccountEmployeeEditor';
import { AccountEmployeeContainerForm, AccountEmployeeFormData } from './form/common/AccountEmployeeContainerForm';

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
      uid: undefined,
      employmentNumber: null,
      fullName: null,
      genderType: null,
      birthPlace: null,
      dateOfBirth: null,
      companyUid: null,
      employmentType: null,
      joinDate: null,
      taxType: null,
      inactiveDate: null,
      bloodType: null,
      religionType: null,
      // image: undefined,
    },
    bank: {
      citizenNumber: null,
      taxNumber: null,
      familyCardNumber: null,
      bpjsEmploymentNumber: null,
      bpjsHealthCareNumber: null,
      bankAccount: null,
      bankAccountName: null,
      bankAccountBranch: null,
    },
    contact: {
      phone: null,
      mobilePhone: null,
      email: null,
      emailPersonal: null,
      address: null,
      addressAdditional: null,
      emergencyContactName: null,
      emergencyContactRelation: null,
      emergencyContactPhone: null,
      emergencyContactPhoneAdditional: null,
    },
    image: {
      image: undefined
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

      // bank
      initialValues.bank.citizenNumber = data.citizenNumber;
      initialValues.bank.taxNumber = data.taxNumber;
      initialValues.bank.familyCardNumber = data.familyCardNumber;
      initialValues.bank.bpjsEmploymentNumber = data.bpjsEmploymentNumber;
      initialValues.bank.bpjsHealthCareNumber = data.bpjsHealthCareNumber;
      initialValues.bank.bankAccount = data.bank && data.bank.account;
      initialValues.bank.bankAccountName = data.bank && data.bank.name;
      initialValues.bank.bankAccountBranch = data.bank && data.bank.branch;

      // contacts
      initialValues.contact.phone = data.phone;
      initialValues.contact.mobilePhone = data.mobilePhone;
      initialValues.contact.email = data.email;
      initialValues.contact.emailPersonal = data.emailPersonal;
      initialValues.contact.address = data.address;
      initialValues.contact.addressAdditional = data.addressAdditional;
      initialValues.contact.emergencyContactName = data.contact && data.contact.name;
      initialValues.contact.emergencyContactRelation = data.contact && data.contact.relation;
      initialValues.contact.emergencyContactPhone = data.contact && data.contact.phone;
      initialValues.contact.emergencyContactPhoneAdditional = data.contact && data.contact.phoneAdditional;

      // image
      initialValues.image.image = data.image;

      return renderForm(initialValues);
    }
  }

  return null;
};