import { FormMode } from '@generic/types';
import { connect } from 'react-redux';
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
  formMode: FormMode | undefined;
  formAction: 'update' | 'delete';
}

interface FormValueProps {
  formName: string;
}

export type AccountEmployeeEducationContainerProps
  = InjectedFormProps<AccountEmployeeEducationFormData, OwnProps>
  & FormValueProps 
  & OwnProps;

const mapStateToProps = (state: any): FormValueProps => {
  return {
    formName,
  };
};

const connectedView = connect(mapStateToProps)(AccountEmployeeEducationContainerView);

export const AccountEmployeeEducationContainerForm = reduxForm<AccountEmployeeEducationFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true,
  destroyOnUnmount: true
})(connectedView);