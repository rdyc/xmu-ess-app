import { FormMode } from '@generic/types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { AccountEmployeeRateFormView } from './AccountEmployeeRateFormView';

const formName = 'accountEmployeeRateForm';

export type AccountEmployeeRateFormData = {
  information: {
    uid: string | null | undefined;
    value: number | 0 ;
  },
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

export type AccountEmployeeRateFormProps 
  = InjectedFormProps<AccountEmployeeRateFormData, OwnProps> 
  & FormValueProps
  & OwnProps;
  
const mapStateToProps = (): FormValueProps => {
  return {
    formName,
  };
};

const enhance = compose<AccountEmployeeRateFormProps, OwnProps & InjectedFormProps<AccountEmployeeRateFormData, OwnProps>>(
  connect(mapStateToProps),
)(AccountEmployeeRateFormView);

export const AccountEmployeeRateForm = reduxForm<AccountEmployeeRateFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true,
  destroyOnUnmount: true
})(enhance);