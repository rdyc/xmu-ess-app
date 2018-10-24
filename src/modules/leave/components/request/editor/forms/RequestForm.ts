import { LeaveType } from '@common/classes/types';
import { FormMode } from '@generic/types';
import { RequestFormView } from '@leave/components/request/editor/forms/RequestFormView';
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

interface OwnProps {
  formMode: FormMode;
}

interface FormValueProps {
  formIsRegularType: boolean | false;
  formRegularType: string | null;
}

export type RequestFormProps 
  = InjectedFormProps<LeaveRequestFormData, OwnProps> 
  & FormValueProps
  & OwnProps;

const selector = formValueSelector(formName);

const mapStateToProps = (state: any): FormValueProps => {
  const leaveType = selector(state, 'information.leaveType');
  
  return {
    formIsRegularType: leaveType === LeaveType.CutiKhusus,
    formRegularType: leaveType
  };
};

const connectedView = connect(mapStateToProps)(RequestFormView);

export const RequestForm = reduxForm<LeaveRequestFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true
})(connectedView);