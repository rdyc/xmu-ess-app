import { FormMode } from '@generic/types';
import { connect } from 'react-redux';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { AccountEmployeeExperienceContainerView } from './AccountEmployeeExperienceContainerView';

const formName = 'accountEmployeeExperience';

export type AccountEmployeeExperienceFormData = {
  experience: {
    uid: string | null | undefined;
    employeeUid: string | null | undefined;
    company: string | null | undefined;
    position: string | null | undefined;
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

export type AccountEmployeeExperienceContainerProps
  = InjectedFormProps<AccountEmployeeExperienceFormData, OwnProps>
  & FormValueProps 
  & OwnProps;

const mapStateToProps = (state: any): FormValueProps => {
  return {
    formName,
  };
};

const connectedView = connect(mapStateToProps)(AccountEmployeeExperienceContainerView);

export const AccountEmployeeExperienceContainerForm = reduxForm<AccountEmployeeExperienceFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true,
  destroyOnUnmount: true
})(connectedView);