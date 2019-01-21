import { FormMode } from '@generic/types';
import { connect } from 'react-redux';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { AccountEmployeeTrainingContainerFormView } from './AccountEmployeeTrainingContainerFormView';

const formName = 'accountEmployeeTraining';

export type AccountEmployeeTrainingFormData = {
  information: {
    uid: string | null | undefined;
    employeeUid: string| null | undefined;
    name: string | null | undefined;
    start: string | null | undefined;
    end: string | null | undefined;
    organizer: string | null | undefined;
    trainingType: string | null | undefined;
    certificationType: string | null | undefined;
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

export type AccountEmployeeTrainingContainerFormProps
  = InjectedFormProps<AccountEmployeeTrainingFormData, OwnProps>
  & FormValueProps
  & OwnProps;

const mapStateToProps = (state: any): FormValueProps => {
  return {
    formName,
  };
};

const connectedView = connect(mapStateToProps)(AccountEmployeeTrainingContainerFormView);

export const AccountEmployeeTrainingContainerForm = reduxForm<AccountEmployeeTrainingFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true,
  destroyOnUnmount: true
})(connectedView);