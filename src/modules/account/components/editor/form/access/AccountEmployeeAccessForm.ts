import { FormMode } from '@generic/types';
import { connect } from 'react-redux';
import {  formValueSelector, InjectedFormProps, reduxForm } from 'redux-form';
import { AccountEmployeeAccessFormView } from './AccountEmployeeAccessFormView';

const formName = 'AccountEmployeeAccessForm';

export type AccountEmployeeAccessFormData = {
  information: {
    companyUid: string | null | undefined;
    positionUid: string | null | undefined;
    roleUid: string | null | undefined;
    unitType: string | null | undefined;
    departmentType: string | null | undefined;
    levelType: string | null | undefined;
    start: string | null | undefined;
    end: string | null | undefined;
  },
};

interface OwnProps {
  formMode: FormMode;
  submitDialogTitle: string;
  submitDialogContentText: string;
  submitDialogCancelText: string;
  submitDialogConfirmedText: string;
}

interface FormValueProps {
  companyUidValue: string | undefined;
  formName: string;
}

export type AccountEmployeeAccessFormProps 
  = InjectedFormProps<AccountEmployeeAccessFormData, OwnProps> 
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

const connectedView = connect(mapStateToProps)(AccountEmployeeAccessFormView);

export const AccountEmployeeAccessForm = reduxForm<AccountEmployeeAccessFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true
})(connectedView);