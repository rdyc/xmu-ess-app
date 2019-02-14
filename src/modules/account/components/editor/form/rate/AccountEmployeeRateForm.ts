import { FormMode } from '@generic/types';
import { connect } from 'react-redux';
import { compose, lifecycle, ReactLifeCycleFunctions } from 'recompose';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { AccountEmployeeRateFormView } from './AccountEmployeeRateFormView';

const formName = 'AccountEmployeeRateForm';

export type AccountEmployeeRateFormData = {
  information: {
    uid: string | null | undefined;
    value: number | 0 ;
  },
};

interface OwnProps {
  formMode: FormMode;
  handleValidity: (valid: boolean) => void;
}

interface FormValueProps {
  formName: string;
}

export type AccountEmployeeRateFormProps 
  = InjectedFormProps<AccountEmployeeRateFormData, OwnProps> 
  & FormValueProps
  & OwnProps;
  
const mapStateToProps = (state: any): FormValueProps => {
  return {
    formName,
  };
};

const lifecycles: ReactLifeCycleFunctions<AccountEmployeeRateFormProps, {}> = {
  componentDidMount() {
    this.props.handleValidity(this.props.valid);
  },
  componentDidUpdate(prevProps: AccountEmployeeRateFormProps) {
    if (prevProps.valid !== this.props.valid) {
      this.props.handleValidity(this.props.valid); 
    }
  }
};

// const connectedView = connect(mapStateToProps)(AccountEmployeeRateFormView);

const enhance = compose<AccountEmployeeRateFormProps, OwnProps & InjectedFormProps<AccountEmployeeRateFormData, OwnProps>>(
  connect(mapStateToProps),
  lifecycle(lifecycles)
)(AccountEmployeeRateFormView);

export const AccountEmployeeRateForm = reduxForm<AccountEmployeeRateFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true
})(enhance);