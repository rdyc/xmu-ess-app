import { FormMode } from '@generic/types';
import { connect } from 'react-redux';
import { compose, lifecycle, ReactLifeCycleFunctions } from 'recompose';
import {  formValueSelector, InjectedFormProps, reduxForm } from 'redux-form';
import { AccountEmployeeAccessFormView } from './AccountEmployeeAccessFormView';

const formName = 'AccountEmployeeAccessForm';

export type AccountEmployeeAccessFormData = {
  information: {
    uid: string | null | undefined;
    companyUid: string | null | undefined;
    positionUid: string | null | undefined;
    roleUid: string | null | undefined;
    unitType: string | null | undefined;
    departmentType: string | null | undefined;
    levelType: string | null | undefined;
    start: string | null | undefined;
    end: string | null | undefined;
  },
};

interface OwnProps {
  formMode: FormMode;
  handleValidity: (valid: boolean) => void;
}

interface FormValueProps {
  companyUidValue: string | undefined;
  unitTypeValue: string | undefined;
  formName: string;
}

export type AccountEmployeeAccessFormProps 
  = InjectedFormProps<AccountEmployeeAccessFormData, OwnProps> 
  & FormValueProps
  & OwnProps;

const selector = formValueSelector(formName);
  
const mapStateToProps = (state: any): FormValueProps => {
  const companyUid = selector(state, 'information.companyUid');
  const unitType = selector(state, 'information.unitType');

  return {
    formName,
    companyUidValue: companyUid,
    unitTypeValue: unitType,
  };
};

const lifecycles: ReactLifeCycleFunctions<AccountEmployeeAccessFormProps, {}> = {
  componentDidMount() {
    this.props.handleValidity(this.props.valid);
  },
  componentDidUpdate(prevProps: AccountEmployeeAccessFormProps) {
    if (prevProps.valid !== this.props.valid) {
      this.props.handleValidity(this.props.valid); 
    }
  }
};

// const connectedView = connect(mapStateToProps)(AccountEmployeeAccessFormView);

const enhance = compose<AccountEmployeeAccessFormProps, OwnProps & InjectedFormProps<AccountEmployeeAccessFormData, OwnProps>>(
  connect(mapStateToProps),
  lifecycle(lifecycles)
)(AccountEmployeeAccessFormView);

export const AccountEmployeeAccessForm = reduxForm<AccountEmployeeAccessFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true
})(enhance);