import { FormMode } from '@generic/types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { AccountEmployeeEducationContainerView } from './AccountEmployeeEducationContainerView';

const formName = 'accountEmployeeEducation';

export type AccountEmployeeEducationFormData = {
  education: {
    uid: string | null | undefined;
    employeeUid: string | null | undefined;
    degreeType: string | null | undefined;
    institution: string | null | undefined;
    major: string | null | undefined;
    start: number | null | undefined;
    end: number | null | undefined;
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

export type AccountEmployeeEducationContainerProps
  = InjectedFormProps<AccountEmployeeEducationFormData, OwnProps>
  & FormValueProps
  & OwnProps;

const mapStateToProps = (): FormValueProps => {
  return {
    formName,
  };
};

const enhance = compose<AccountEmployeeEducationContainerProps, OwnProps & InjectedFormProps<AccountEmployeeEducationFormData, OwnProps>>(
  connect(mapStateToProps)
)(AccountEmployeeEducationContainerView);

export const AccountEmployeeEducationContainerForm = reduxForm<AccountEmployeeEducationFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true,
  destroyOnUnmount: true
})(enhance);