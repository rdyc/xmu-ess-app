import { FormMode } from '@generic/types';
import { InjectedFormProps, reduxForm } from 'redux-form';

import { HourFormView } from './HourFormView';

export type ProjectHourFormData = {
  information: {
    uid: string | null | undefined;
    customerUid: string | null | undefined;
    name: string | null | undefined;
    description: string | null | undefined;
    hours: number | null | undefined;
  }
};

interface IOwnProps {
  formMode: FormMode;
}

export type HourFormProps 
  = InjectedFormProps<ProjectHourFormData, IOwnProps>
  & IOwnProps;

export const HourForm = reduxForm<ProjectHourFormData, IOwnProps>({
  form: 'projectHour',
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true,
  destroyOnUnmount: true
})(HourFormView);