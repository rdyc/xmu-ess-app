import { FormMode } from '@generic/types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import {  formValueSelector, InjectedFormProps, reduxForm } from 'redux-form';
import { AccountEmployeeAccessContainerFormView } from './AccountEmployeeAccessContainerFormView';

const formName = 'AccountEmployeeAccessContainerForm';

export type AccountEmployeeAccessContainerFormData = {
  access: {
    employeeUid: string | null | undefined;
    uid: string | null | undefined;
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
  unitTypeValue: string | undefined;
  formName: string;
}

export type AccountEmployeeAccessContainerFormProps 
  = InjectedFormProps<AccountEmployeeAccessContainerFormData, OwnProps> 
  & FormValueProps
  & OwnProps;

const selector = formValueSelector(formName);
  
const mapStateToProps = (state: any): FormValueProps => {
  const companyUid = selector(state, 'access.companyUid');
  const unitType = selector(state, 'access.unitType');

  return {
    formName,
    companyUidValue: companyUid,
    unitTypeValue: unitType,
  };
};

const enhance = compose<AccountEmployeeAccessContainerFormProps, OwnProps & InjectedFormProps<AccountEmployeeAccessContainerFormData, OwnProps>>(
  connect(mapStateToProps)
)(AccountEmployeeAccessContainerFormView);

export const AccountEmployeeAccessContainerForm = reduxForm<AccountEmployeeAccessContainerFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true
})(enhance);