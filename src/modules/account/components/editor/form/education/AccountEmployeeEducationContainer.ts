import { FormMode } from '@generic/types';
import { connect } from 'react-redux';
import { compose, lifecycle, ReactLifeCycleFunctions } from 'recompose';
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
  formMode?: FormMode | undefined;
  formAction?: 'update' | 'delete';
  handleValidity: (valid: boolean) => void;
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

const lifecycles: ReactLifeCycleFunctions<AccountEmployeeEducationContainerProps, {}> = {
  componentDidMount() {
    this.props.handleValidity(this.props.valid);
  },
  componentDidUpdate(prevProps: AccountEmployeeEducationContainerProps) {
    if (prevProps.valid !== this.props.valid) {
      this.props.handleValidity(this.props.valid); 
    }
  }
};

const enhance = compose<AccountEmployeeEducationContainerProps, OwnProps & InjectedFormProps<AccountEmployeeEducationFormData, OwnProps>>(
  connect(mapStateToProps),
  lifecycle(lifecycles)
)(AccountEmployeeEducationContainerView);

export const AccountEmployeeEducationContainerForm = reduxForm<AccountEmployeeEducationFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true,
  destroyOnUnmount: true
})(enhance);