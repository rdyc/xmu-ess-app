import { FormMode } from '@generic/types';
import { LookupLeaveFormView } from '@lookup/components/leave/editor/forms/LookupLeaveFormView';
import { InjectedFormProps, reduxForm } from 'redux-form';

const formName = 'lookupLeave';

export type LookupLeaveFormData = {
  information: {
    uid: string | null | undefined;
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

interface FormValueProps {
  formValue: string | null;
}

export type RequestFormProps 
  = InjectedFormProps<LookupLeaveFormData, OwnProps> 
  & FormValueProps
  & OwnProps;

export const LeaveForm = reduxForm<LookupLeaveFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true,
  destroyOnUnmount: true
})(LookupLeaveFormView);