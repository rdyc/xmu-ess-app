import { FormMode } from '@generic/types';
import { connect } from 'react-redux';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { AccountEmployeeFamilyContainerFormView } from './AccountEmployeeFamilyContainerFormView';

const formName = 'accountEmployeeFamily';

export type AccountEmployeeFamilyFormData = {
  employeeUid: string | null | undefined;
  familyType: string | null | undefined;
  fullName: string | null | undefined;
  gender: string | null | undefined;
  birthPlace: string | null | undefined;
  birthDate: string | null | undefined;
};

export type AccountEmployeeFamilyContainerFormData = {
  information:  {
    family: AccountEmployeeFamilyFormData[];
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
}

export type AccountEmployeeFamilyContainerFormProps
  = InjectedFormProps<AccountEmployeeFamilyFormData, OwnProps>
  & FormValueProps
  & OwnProps;

const mapStateToProps = (state: any): FormValueProps => {
  return {
    formName,
  };
};

const connectedView = connect(mapStateToProps)(AccountEmployeeFamilyContainerFormView);

export const AccountEmployeeFamilyContainerForm = reduxForm<AccountEmployeeFamilyFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true,
  destroyOnUnmount: true
})(connectedView);