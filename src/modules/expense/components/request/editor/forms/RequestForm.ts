import { RequestFormView } from '@expense/components/request/editor/forms/RequestFormView';
import { FormMode } from '@generic/types';
import { connect } from 'react-redux';
import {  InjectedFormProps, reduxForm } from 'redux-form';

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

export type RequestFormProps 
  = InjectedFormProps<ExpenseRequestFormData, OwnProps> 
  & OwnProps;

const connectedView = connect()(RequestFormView);

export const RequestForm = reduxForm<ExpenseRequestFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true
})(connectedView);