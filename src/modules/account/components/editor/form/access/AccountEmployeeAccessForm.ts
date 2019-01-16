import { FormMode } from '@generic/types';
import { connect } from 'react-redux';
import {  InjectedFormProps, reduxForm } from 'redux-form';
import { AccountEmployeeAccessFormView } from './AccountEmployeeAccessFormView';

const formName = 'AccountEmployeeAccessForm';

export type AccountEmployeeAccessFormData = {
  information: {
    companyUid: string | null | undefined;
    positionUid: string | null | undefined;
    roleUid: string | null | undefined;
    employeeUid: string | null | undefined;
    unitType: string | null | undefined;
    departementType: string | null | undefined;
    levelType: string | null | undefined;
    start: string | null | undefined;
    end: string | null | undefined;
  },
};

interface OwnProps {
  formMode: FormMode;
  category: string;
  submitDialogTitle: string;
  submitDialogContentText: string;
  submitDialogCancelText: string;
  submitDialogConfirmedText: string;
}

interface FormValueProps {
  formName: string;
}

export type AccountEmployeeAccessFormProps 
  = InjectedFormProps<AccountEmployeeAccessFormData, OwnProps> 
  & FormValueProps
  & OwnProps;
  
const mapStateToProps = (): FormValueProps => {
  return {
    formName
  };
};

const connectedView = connect(mapStateToProps)(AccountEmployeeAccessFormView);

export const AccountEmployeeAccessForm = reduxForm<AccountEmployeeAccessFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true
})(connectedView);