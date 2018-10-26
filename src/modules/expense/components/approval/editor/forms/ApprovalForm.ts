import { FormMode } from '@generic/types';
import { formValueSelector, InjectedFormProps, reduxForm } from 'redux-form';

import { IExpenseDetail } from '@expense/classes/response';
import { ApprovalOptions } from '@generic/types/ApprovalOptions';
import { InjectedIntl } from 'react-intl';
import { connect } from 'react-redux';
import { ApprovalFormView } from './ApprovalFormView';

const formName = 'expenseApproval';

export type ExpenseApprovalFormData = {
  information: {
    isApproved: string | null | undefined,
    remark: string | null | undefined
  }
};

interface OwnProps {
  formMode: FormMode;
  detailData: IExpenseDetail;
  intl: InjectedIntl;
}

interface FormValueProps {
  formIsApproved: boolean | true;
}

export type ApprovalFormProps 
  = InjectedFormProps<ExpenseApprovalFormData, OwnProps>
  & FormValueProps
  & OwnProps;

const selector = formValueSelector(formName);

const mapStateToProps = (state: any): FormValueProps => {
  const approvalOption = selector(state, 'information.isApproved');
  
  return {
    formIsApproved: approvalOption === ApprovalOptions.approve
  };
};

const connectedView = connect(mapStateToProps)(ApprovalFormView);

export const ApprovalForm = reduxForm<ExpenseApprovalFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true
})(connectedView);