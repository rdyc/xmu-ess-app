import { RequestFormView } from '@expense/components/request/editor/forms/RequestFormView';
import { FormMode } from '@generic/types';
import { connect } from 'react-redux';
import {  formValueSelector, InjectedFormProps, reduxForm } from 'redux-form';

const formName = 'expenseRequest';

export type ExpenseRequestFormData = {
  information: {
    uid?: string;
    date?: string;
    expenseType?: string;
    customerUid?: string;
    projectUid?: string;
    value?: number;
    location?: string;
    address?: string;
    name?: string;
    title?: string;
    notes?: string;
  },
};

interface OwnProps {
  formMode: FormMode;
  submitDialogTitle: string;
  submitDialogContentText: string;
  submitDialogCancelText: string;
  submitDialogConfirmedText: string;
  minDate: Date;
}

interface FormValueProps {
  customerUidValue?: string;
  formName: string;
}

export type RequestFormProps 
  = InjectedFormProps<ExpenseRequestFormData, OwnProps> 
  & FormValueProps
  & OwnProps;
  
const selector = formValueSelector(formName);
  
const mapStateToProps = (state: any): FormValueProps => {
    const customerUid = selector(state, 'information.customerUid');
    
    return {
      formName,
      customerUidValue: customerUid,      
    };
  };

const connectedView = connect(mapStateToProps)(RequestFormView);

export const RequestForm = reduxForm<ExpenseRequestFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true
})(connectedView);