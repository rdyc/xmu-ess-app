import { FormMode } from '@generic/types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { AccountEmployeeFamilyContainerFormView } from './AccountEmployeeFamilyContainerFormView';

const formName = 'accountEmployeeFamily';

export type AccountEmployeeFamilyFormData = {
  family:  {
    uid: string | null | undefined;
    employeeUid: string | null | undefined;
    familyType: string | null | undefined;
    fullName: string | null | undefined;
    genderType: string | null | undefined;
    birthPlace: string | null | undefined;
    birthDate: string | null | undefined;
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

export type AccountEmployeeFamilyFormProps
  = InjectedFormProps<AccountEmployeeFamilyFormData, OwnProps>
  & FormValueProps
  & OwnProps;

const mapStateToProps = (): FormValueProps => {
  return {
    formName,
  };
};

const enhance = compose<AccountEmployeeFamilyFormProps, OwnProps & InjectedFormProps<AccountEmployeeFamilyFormData, OwnProps>>(
  connect(mapStateToProps)
)(AccountEmployeeFamilyContainerFormView);

export const AccountEmployeeFamilyContainerForm = reduxForm<AccountEmployeeFamilyFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true,
  destroyOnUnmount: true
})(enhance);