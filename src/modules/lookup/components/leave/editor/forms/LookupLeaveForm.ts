import { FormMode } from '@generic/types';
import { LookupLeaveFormView } from '@lookup/components/leave/editor/forms/LookupLeaveFormView';
import { connect } from 'react-redux';
import { InjectedFormProps, reduxForm } from 'redux-form';

const formName = 'lookupLeave';

export type LookupLeaveFormData = {
  information: {
    uid: string | null | undefined;
    companyUid: string | null | undefined;
    categoryType: string | null | undefined;
    year: number | null | undefined;
    name: string | null | undefined;
    allocation: number | null | undefined;
    isWithinHoliday: boolean | null | undefined;
  },
};

interface OwnProps {
  formMode: FormMode;
}

export type RequestFormProps 
  = InjectedFormProps<LookupLeaveFormData, OwnProps> 
  & OwnProps;

const connectedView = connect()(LookupLeaveFormView);

export const LeaveForm = reduxForm<LookupLeaveFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true,
  destroyOnUnmount: true
})(connectedView);