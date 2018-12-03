import { FormMode } from '@generic/types';
import { LookupHolidayFormView } from '@lookup/components/holiday/editor/forms/LookupHolidayFormView';
import { connect } from 'react-redux';
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

export type RequestFormProps 
  = InjectedFormProps<LookupHolidayFormData, OwnProps> 
  & OwnProps;

const connectedView = connect()(LookupHolidayFormView);

export const HolidayForm = reduxForm<LookupHolidayFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true,
})(connectedView);