import { FormMode } from '@generic/types';
import { connect } from 'react-redux';
import { formValueSelector, InjectedFormProps, reduxForm } from 'redux-form';
import { AccountEmployeeContainerFormView } from './AccountEmployeeContainerFormView';

const formName = 'accountEmployee';

export type AccountEmployeeFormData = {
  information: {
    // basic
    uid: string | null | undefined;
    companyUid: string | null | undefined;
    employmentNumber: string | null | undefined;
    employmentType: string | null | undefined;
    joinDate: string | null | undefined;
    inactiveDate: string | null | undefined;
    fullName: string | null | undefined;
    dateOfBirth: string | null | undefined;
    birthPlace: string | null | undefined;
    genderType: string | null | undefined;
    religionType: string | null | undefined;
    taxType: string | null | undefined;
    bloodType: string | null | undefined;
    // image: File | null | undefined;
  },
  bank: {
    familyCardNumber: string | null | undefined;
    citizenNumber: string | null | undefined;
    taxNumber: string | null | undefined;
    bpjsEmploymentNumber: string | null | undefined;
    bpjsHealthCareNumber: string | null | undefined;
    bankAccount: string | null | undefined;
    bankAccountName: string | null | undefined;
    bankAccountBranch: string | null | undefined;
  },
  contact: {
    address: string | null | undefined;
    addressAdditional: string | null | undefined;
    email: string | null | undefined;
    emailPersonal: string | null | undefined;
    phone: string | null | undefined;
    mobilePhone: string | null | undefined;
    emergencyContactName: string | null | undefined;
    emergencyContactRelation: string | null | undefined;
    emergencyContactPhone: string | null | undefined;
    emergencyContactPhoneAdditional: string | null | undefined;
  },
  image: {
    image: File | null | undefined;
  }
};

interface OwnProps {
  formMode: FormMode;
  submitDialogTitle: string;
  submitDialogContentText: string;
  submitDialogCancelText: string;
  submitDialogConfirmedText: string;
}

interface FormValueProps {
  formName: string;
  companyUidValue: string | undefined;
}

export type AccountEmployeeContainerFormProps
  = InjectedFormProps<AccountEmployeeFormData, OwnProps>
  & FormValueProps 
  & OwnProps;

const selector = formValueSelector(formName);

const mapStateToProps = (state: any): FormValueProps => {
  const companyUid = selector(state, 'information.companyUid');

  return {
    formName,
    companyUidValue: companyUid
  };
};

const connectedView = connect(mapStateToProps)(AccountEmployeeContainerFormView);

export const AccountEmployeeContainerForm = reduxForm<AccountEmployeeFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true,
  destroyOnUnmount: true
})(connectedView);