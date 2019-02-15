import { FormMode } from '@generic/types';
import { connect } from 'react-redux';
import { compose, lifecycle, ReactLifeCycleFunctions } from 'recompose';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { AccountEmployeeFamilyContainerFormView } from './AccountEmployeeFamilyContainerFormView';

const formName = 'accountEmployeeFamily';

export type AccountEmployeeFamilyFormData = {
  family:  {
    uid: string | null | undefined;
    employeeUid: string | null | undefined;
    familyType: string | null | undefined;
    fullName: string | null | undefined;
    genderType: string | null | undefined;
    birthPlace: string | null | undefined;
    birthDate: string | null | undefined;
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

export type AccountEmployeeFamilyFormProps
  = InjectedFormProps<AccountEmployeeFamilyFormData, OwnProps>
  & FormValueProps
  & OwnProps;

const mapStateToProps = (state: any): FormValueProps => {
  return {
    formName,
  };
};

const lifecycles: ReactLifeCycleFunctions<AccountEmployeeFamilyFormProps, {}> = {
  componentDidMount() {
    this.props.handleValidity(this.props.valid);
  },
  componentDidUpdate(prevProps: AccountEmployeeFamilyFormProps) {
    if (prevProps.valid !== this.props.valid) {
      this.props.handleValidity(this.props.valid); 
    }
  }
};

// const connectedView = connect(mapStateToProps)(AccountEmployeeFamilyContainerFormView);

const enhance = compose<AccountEmployeeFamilyFormProps, OwnProps & InjectedFormProps<AccountEmployeeFamilyFormData, OwnProps>>(
  connect(mapStateToProps),
  lifecycle(lifecycles)
)(AccountEmployeeFamilyContainerFormView);

export const AccountEmployeeFamilyContainerForm = reduxForm<AccountEmployeeFamilyFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true,
  destroyOnUnmount: true
})(enhance);