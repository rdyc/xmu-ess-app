import { FormMode } from '@generic/types';
import { InjectedFormProps, reduxForm } from 'redux-form';

import { IExpenseDetail } from '@expense/classes/response';
import { InjectedIntl } from 'react-intl';
import { ApprovalFormView } from './ApprovalFormView';

export type ExpenseApprovalFormData = {
  information: {
    isApproved: boolean | undefined,
    remark: string | null | undefined
  }
};

interface OwnProps {
  formMode: FormMode;
  detailData: IExpenseDetail;
  intl: InjectedIntl;
}

export type ApprovalFormProps 
  = InjectedFormProps<ExpenseApprovalFormData, OwnProps>
  & OwnProps;

export const ApprovalForm = reduxForm<ExpenseApprovalFormData, OwnProps>({
  form: 'expenseApproval',
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true
})(ApprovalFormView);