import { FormMode } from '@generic/types';
import { TimesheetEntryFormView } from '@timesheet/components/entry/editor/forms/TimesheetEntryFormView';
import { connect } from 'react-redux';
import { InjectedFormProps, reduxForm } from 'redux-form';

const formName = 'timeEntry';

export type TimesheetFormData = {
  information: {
    uid: string | null | undefined;
    activityType: string | null | undefined;
    customerUid: string | null | undefined;
    projectUid: string | null | undefined;
    siteUid: string | null | undefined;
    date: string | null | undefined;
    start: string | null | undefined;
    end: string | null | undefined;
    description: string | null | undefined;
  }
};

interface OwnProps {
  formMode: FormMode;
}

export type EntryFormProps
  = InjectedFormProps<TimesheetFormData, OwnProps>
  & OwnProps;

const connectedView = connect()(TimesheetEntryFormView);

export const TimesheetEntryForm = reduxForm<TimesheetFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true
})(connectedView);