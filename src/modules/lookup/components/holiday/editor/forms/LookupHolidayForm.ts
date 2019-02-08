import { FormMode } from '@generic/types';
import { connect } from 'react-redux';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { LookupHolidayFormView } from './LookupHolidayFormView';

const formName = 'lookupHoliday';

export type LookupHolidayFormData = {
  information: {
    uid: string | null | undefined;
    companyUid: string | null | undefined;
    description: string | null | undefined;
    date: string | null | undefined;
  }
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

export type HolidayFormProps
  = InjectedFormProps<LookupHolidayFormData, OwnProps>
  & FormValueProps
  & OwnProps;

const mapStateToProps = (state: any): FormValueProps => {
  return {
    formName
  };
};

const connectedView = connect(mapStateToProps)(LookupHolidayFormView);

export const LookupHolidayForm = reduxForm<LookupHolidayFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true
})(connectedView);
