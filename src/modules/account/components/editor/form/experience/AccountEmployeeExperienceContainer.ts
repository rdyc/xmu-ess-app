import { FormMode } from '@generic/types';
import { connect } from 'react-redux';
import { compose, lifecycle, ReactLifeCycleFunctions } from 'recompose';
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
  handleValidity: (valid: boolean) => void;
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

const lifecycles: ReactLifeCycleFunctions<AccountEmployeeExperienceContainerProps, {}> = {
  componentDidMount() {
    this.props.handleValidity(this.props.valid);
  },
  componentDidUpdate(prevProps: AccountEmployeeExperienceContainerProps) {
    if (prevProps.valid !== this.props.valid) {
      this.props.handleValidity(this.props.valid); 
    }
  }
};

// const connectedView = connect(mapStateToProps)(AccountEmployeeExperienceContainerView);

const enhance = compose<AccountEmployeeExperienceContainerProps, OwnProps & InjectedFormProps<AccountEmployeeExperienceFormData, OwnProps>>(
  connect(mapStateToProps),
  lifecycle(lifecycles)
)(AccountEmployeeExperienceContainerView);

export const AccountEmployeeExperienceContainerForm = reduxForm<AccountEmployeeExperienceFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true,
  destroyOnUnmount: true
})(enhance);