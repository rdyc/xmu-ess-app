import { FormMode } from '@generic/types';
import { connect } from 'react-redux';
import { compose,  } from 'recompose';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { AccountEmployeeExperienceContainerFormView } from './AccountEmployeeExperienceContainerFormView';

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
  formMode: FormMode;
  submitDialogTitle: string;
  submitDialogContentText: string;
  submitDialogCancelText: string;
  submitDialogConfirmedText: string;
}

interface FormValueProps {
  formName: string;
}

export type AccountEmployeeExperienceContainerFormProps
  = InjectedFormProps<AccountEmployeeExperienceFormData, OwnProps>
  & FormValueProps 
  & OwnProps;

const mapStateToProps = (state: any): FormValueProps => {
  return {
    formName,
  };
};

// const connectedView = connect(mapStateToProps)(AccountEmployeeExperienceContainerView);

const enhance = compose<AccountEmployeeExperienceContainerFormProps, OwnProps & InjectedFormProps<AccountEmployeeExperienceFormData, OwnProps>>(
  connect(mapStateToProps)
)(AccountEmployeeExperienceContainerFormView);

export const AccountEmployeeExperienceContainerForm = reduxForm<AccountEmployeeExperienceFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true,
  destroyOnUnmount: true
})(enhance);