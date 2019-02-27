import { LeaveType } from '@common/classes/types';
import { FormMode } from '@generic/types';
import { LeaveRequestContainerFormView } from '@leave/components/request/editor/forms/LeaveRequestFormView';
import { connect } from 'react-redux';
import { formValueSelector, InjectedFormProps, reduxForm } from 'redux-form';

const formName = 'leaveRequest';

export type LeaveRequestFormData = {
  information: {
    uid: string | null | undefined;
    leaveType: string | null | undefined;
    regularType: string | null | undefined;
    start: string | null | undefined;
    end: string | null | undefined;
    address: string | null | undefined;
    contactNumber: string | null | undefined;
    reason: string | null | undefined;
  },
};

interface IOwnProps {
  formMode: FormMode;
  isAdmin: boolean;
  submitDialogTitle: string;
  submitDialogContentText: string;
  submitDialogCancelText: string;
  submitDialogConfirmedText: string;
}

interface FormValueProps {
  formIsRegularType: boolean | false;
  formName: string;
  formRegularType: string | null;
  formValue: string | null;
}

export type RequestFormProps 
  = InjectedFormProps<LeaveRequestFormData, IOwnProps> 
  & FormValueProps
  & IOwnProps;

const selector = formValueSelector(formName);

const mapStateToProps = (state: any): FormValueProps => {
  const leaveType = selector(state, 'information.leaveType');
  const start = selector(state, 'information.start');
  
  return {
    formName,
    formIsRegularType: leaveType === LeaveType.CutiKhusus,
    formRegularType: leaveType,
    formValue: start,
  };
};

const connectedView = connect(mapStateToProps)(LeaveRequestContainerFormView);

export const LeaveRequestContainerForm = reduxForm<LeaveRequestFormData, IOwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true,
  destroyOnUnmount: true
})(connectedView);