import { FormMode } from '@generic/types';
import { TimesheetEntryFormView } from '@timesheet/components/entry/editor/forms/TimesheetEntryFormView';
import { connect } from 'react-redux';
import { formValueSelector, InjectedFormProps, reduxForm } from 'redux-form';

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

interface FormValueProps {
  customerUidValue: string | undefined;
  isPresalesActivity: boolean | false;
  projectUidValue: string | undefined;
}

export type EntryFormProps
  = InjectedFormProps<TimesheetFormData, OwnProps>
  & OwnProps
  & FormValueProps;

const selector = formValueSelector(formName);

const mapStateToProps = (state: any): FormValueProps => {
  const customerUid = selector(state, 'information.customerUid');
  const activityType = selector(state, 'information.activityType');
  const projectUid = selector(state, 'information.projectUid');

  return {
    customerUidValue: customerUid,
    isPresalesActivity: activityType === 'SAT02',
    projectUidValue: projectUid,
  };
};

const connectedView = connect(mapStateToProps)(TimesheetEntryFormView);

export const TimesheetEntryForm = reduxForm<TimesheetFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true
})(connectedView);