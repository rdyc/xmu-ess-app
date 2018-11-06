import { RequestFormView } from '@expense/components/request/editor/forms/RequestFormView';
import { FormMode } from '@generic/types';
import { connect } from 'react-redux';
import {  formValueSelector, InjectedFormProps, reduxForm } from 'redux-form';

const formName = 'expenseRequest';

export type ExpenseRequestFormData = {
  information: {
    uid: string | null | undefined;
    date: string | null | undefined;
    expenseType: string | null | undefined;
    customerUid: string | null | undefined;
    projectUid: string | null | undefined;
    value: number | null | undefined;
    location: string | null | undefined;
    address: string | null | undefined;
    name: string | null | undefined;
    title: string | null | undefined;
    notes: string | null | undefined;
  },
};

interface OwnProps {
  formMode: FormMode;
}

interface FormValueProps {
  customerUidValue: string | undefined;
}

export type RequestFormProps 
  = InjectedFormProps<ExpenseRequestFormData, OwnProps> 
  & FormValueProps
  & OwnProps;
  
const selector = formValueSelector(formName);
  
const mapStateToProps = (state: any): FormValueProps => {
    const customerUid = selector(state, 'information.customerUid');
    
    return {
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