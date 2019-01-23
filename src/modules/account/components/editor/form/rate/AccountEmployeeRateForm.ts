import { FormMode } from '@generic/types';
import { connect } from 'react-redux';
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

const connectedView = connect(mapStateToProps)(AccountEmployeeRateFormView);

export const AccountEmployeeRateForm = reduxForm<AccountEmployeeRateFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true
})(connectedView);