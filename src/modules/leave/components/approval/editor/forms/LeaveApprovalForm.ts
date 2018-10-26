import { FormMode } from '@generic/types';
import { formValueSelector, InjectedFormProps, reduxForm } from 'redux-form';

import { ApprovalOptions } from '@generic/types/ApprovalOptions';
import { ILeaveRequestDetail } from '@leave/classes/response';
import { InjectedIntl } from 'react-intl';
import { connect } from 'react-redux';
import { LeaveApprovalFormView } from './LeaveApprovalFormView';

const formName = 'leaveApproval';

export type LeaveApprovalFormData = {
  information: {
    isApproved: string | null | undefined,
    remark: string | null | undefined
  }
};

interface OwnProps {
  formMode: FormMode;
  detailData: ILeaveRequestDetail;
  intl: InjectedIntl;
}

interface FormValueProps {
  formIsApproved: boolean | true;
}

export type LeaveApprovalFormProps 
  = InjectedFormProps<LeaveApprovalFormData, OwnProps>
  & FormValueProps
  & OwnProps;

const selector = formValueSelector(formName);

const mapStateToProps = (state: any): FormValueProps => {
  const approvalOption = selector(state, 'information.isApproved');
  
  return {
    formIsApproved: approvalOption === ApprovalOptions.approve
  };
};

const connectedView = connect(mapStateToProps)(LeaveApprovalFormView);

export const LeaveApprovalForm = reduxForm<LeaveApprovalFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true
})(connectedView);