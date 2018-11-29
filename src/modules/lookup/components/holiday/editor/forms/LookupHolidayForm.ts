import { FormMode } from '@generic/types';
import { LookupHolidayFormView } from '@lookup/components/holiday/editor/forms/LookupHolidayFormView';
import { InjectedFormProps, reduxForm } from 'redux-form';

const formName = 'lookupHoliday';

export type LookupHolidayFormData = {
  information: {
    uid: string | null | undefined;
    companyUid: string | null | undefined;
    description: string | null | undefined;
    date: string | null | undefined;
  },
};

interface OwnProps {
  formMode: FormMode;
}

interface FormValueProps {
  formIsRegularType: boolean | false;
  formRegularType: string | null;
  formValue: string | null;
}

export type RequestFormProps 
  = InjectedFormProps<LookupHolidayFormData, OwnProps> 
  & FormValueProps
  & OwnProps;

export const HolidayForm = reduxForm<LookupHolidayFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true,
  destroyOnUnmount: true
})(LookupHolidayFormView);