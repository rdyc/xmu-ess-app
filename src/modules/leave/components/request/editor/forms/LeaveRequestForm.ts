import { LeaveType } from '@common/classes/types';
import { FormMode } from '@generic/types';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { LeaveRequestContainerFormView } from '@leave/components/request/editor/forms/LeaveRequestFormView';
import { WithLeaveGetEnd, withLeaveGetEnd } from '@leave/hoc/withLeaveGetEnd';
import { connect } from 'react-redux';
import { compose, lifecycle, ReactLifeCycleFunctions } from 'recompose';
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
  formStart: string | undefined;
  // formValue: string | null;
}

export type RequestFormProps 
  = InjectedFormProps<LeaveRequestFormData, IOwnProps> 
  & FormValueProps
  & WithLeaveGetEnd
  & WithUser
  & IOwnProps;

const selector = formValueSelector(formName);

const mapStateToProps = (state: any): FormValueProps => {
  const leaveType = selector(state, 'information.leaveType');
  const start = selector(state, 'information.start');
  const regularType = selector(state, 'information.regularType');
  
  return {
    formName,
    formIsRegularType: leaveType === LeaveType.CutiKhusus,
    formRegularType: regularType,
    formStart: start,
    // formValue: start,
  };
};

const lifecycles: ReactLifeCycleFunctions<RequestFormProps, {}> = {
  componentDidUpdate(prevProps: RequestFormProps) {
    const { user } = this.props.userState;
    const { loadDetailRequest } = this.props.leaveGetEndDispatch;

    if (this.props.formStart && this.props.formRegularType) {
      if (prevProps.formStart !== this.props.formStart &&
       prevProps.formRegularType !== this.props.formRegularType) {
         if (user) {
           loadDetailRequest({
             companyUid: user.company.uid,
             start: this.props.formStart,
             regularType: this.props.formRegularType
           });
         }
       }
    }
  }
};

const connectedView = compose<RequestFormProps, IOwnProps & InjectedFormProps<LeaveRequestFormData, IOwnProps>>(
  connect(mapStateToProps),
  withLeaveGetEnd,
  withUser,
  lifecycle(lifecycles),
)(LeaveRequestContainerFormView);

export const LeaveRequestContainerForm = reduxForm<LeaveRequestFormData, IOwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true,
  destroyOnUnmount: true
})(connectedView);