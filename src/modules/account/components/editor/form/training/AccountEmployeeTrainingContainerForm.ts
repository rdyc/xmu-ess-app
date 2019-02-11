import { FormMode } from '@generic/types';
import { connect } from 'react-redux';
import { compose, lifecycle, ReactLifeCycleFunctions } from 'recompose';
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
  formMode: FormMode | undefined;
  formAction: 'update' | 'delete';
  handleValidity: (valid: boolean) => void;
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

const lifecycles: ReactLifeCycleFunctions<AccountEmployeeTrainingContainerFormProps, {}> = {
  componentDidMount() {
    this.props.handleValidity(this.props.valid);
  },
  componentDidUpdate(prevProps: AccountEmployeeTrainingContainerFormProps) {
    if (prevProps.valid !== this.props.valid) {
      this.props.handleValidity(this.props.valid); 
    }
  }
};

// const connectedView = connect(mapStateToProps)(AccountEmployeeTrainingContainerFormView);

const enhance = compose<AccountEmployeeTrainingContainerFormProps, OwnProps & InjectedFormProps<AccountEmployeeTrainingFormData, OwnProps>>(
  connect(mapStateToProps),
  lifecycle(lifecycles)
)(AccountEmployeeTrainingContainerFormView);

export const AccountEmployeeTrainingContainerForm = reduxForm<AccountEmployeeTrainingFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true,
  destroyOnUnmount: true
})(enhance);