import { FormMode } from '@generic/types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { AccountEmployeeTrainingContainerFormView } from './AccountEmployeeTrainingContainerFormView';

const formName = 'accountEmployeeTraining';

export type AccountEmployeeTrainingFormData = {
  training: {
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

const mapStateToProps = (): FormValueProps => {
  return {
    formName,
  };
};

// const connectedView = connect(mapStateToProps)(AccountEmployeeTrainingContainerFormView);

const enhance = compose<AccountEmployeeTrainingContainerFormProps, OwnProps & InjectedFormProps<AccountEmployeeTrainingFormData, OwnProps>>(
  connect(mapStateToProps)
)(AccountEmployeeTrainingContainerFormView);

export const AccountEmployeeTrainingContainerForm = reduxForm<AccountEmployeeTrainingFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true,
  destroyOnUnmount: true
})(enhance);