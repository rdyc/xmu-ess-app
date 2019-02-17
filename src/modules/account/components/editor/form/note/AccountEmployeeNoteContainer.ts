import { FormMode } from '@generic/types';
import { connect } from 'react-redux';
import { compose, lifecycle, ReactLifeCycleFunctions } from 'recompose';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { AccountEmployeeNoteContainerView } from './AccountEmployeeNoteContainerView';

const formName = 'accountEmployeeNote';

export type AccountEmployeeNoteFormData = {
  note: {
    id: string | null | undefined;
    employeeUid: string | null | undefined;
    text: string | null | undefined;
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

export type AccountEmployeeNoteContainerProps
  = InjectedFormProps<AccountEmployeeNoteFormData, OwnProps>
  & FormValueProps 
  & OwnProps;

const mapStateToProps = (state: any): FormValueProps => {
  return {
    formName,
  };
};

const lifecycles: ReactLifeCycleFunctions<AccountEmployeeNoteContainerProps, {}> = {
  componentDidMount() {
    this.props.handleValidity(this.props.valid);
  },
  componentDidUpdate(prevProps: AccountEmployeeNoteContainerProps) {
    if (prevProps.valid !== this.props.valid) {
      this.props.handleValidity(this.props.valid); 
    }
  }
};

// const connectedView = connect(mapStateToProps)(AccountEmployeeNoteContainerView);

const enhance = compose<AccountEmployeeNoteContainerProps, OwnProps & InjectedFormProps<AccountEmployeeNoteFormData, OwnProps>>(
  connect(mapStateToProps),
  lifecycle(lifecycles)
)(AccountEmployeeNoteContainerView);

export const AccountEmployeeNoteContainerForm = reduxForm<AccountEmployeeNoteFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true,
  destroyOnUnmount: true
})(enhance);