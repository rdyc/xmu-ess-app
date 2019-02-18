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

interface FormValueProps {
  formName: string;
}

interface OwnProps {
  formMode: FormMode;
  submitDialogTitle: string;
  submitDialogContentText: string;
  submitDialogCancelText: string;
  submitDialogConfirmedText: string;
}

export type RequestFormProps
  = InjectedFormProps<LookupLeaveFormData, OwnProps>
  & FormValueProps
  & OwnProps;

const mapStateToProps = (state: any): FormValueProps => {
  return {
    formName
  };
};

const connectedView = connect(mapStateToProps)(LookupLeaveFormView);

export const LeaveForm = reduxForm<LookupLeaveFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true,
})(connectedView);