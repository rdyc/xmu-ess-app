import { SystemLimitType } from '@common/classes/types/SystemLimitType';
import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { WithLookupSystemLimit, withLookupSystemLimit } from '@lookup/hoc/withLookupSystemLimit';
import {
  ITimesheetPostPayload,
  ITimesheetPutPayload,
} from '@timesheet/classes/request/entry';
import { ITimesheet } from '@timesheet/classes/response';
import {
  TimesheetFormData,
} from '@timesheet/components/entry/editor/forms/TimesheetEntryForm';
import { TimesheetEntryEditorView } from '@timesheet/components/entry/editor/TimesheetEntryEditorView';
import { WithTimesheetEntry, withTimesheetEntry } from '@timesheet/hoc/withTimesheetEntry';
import { timesheetMessage } from '@timesheet/locales/messages/timesheetMessage';
import * as moment from 'moment';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  compose,
  HandleCreators,
  lifecycle,
  mapper,
  ReactLifeCycleFunctions,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';
import { Dispatch } from 'redux';
import { FormErrors } from 'redux-form';
import { isNullOrUndefined, isObject } from 'util';

interface OwnHandlers {
  handleSetMinDate: (days: number, fromDate?: Date | null) => void;
  handleValidate: (payload: TimesheetFormData) => FormErrors;
  handleSubmit: (payload: TimesheetFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface OwnRouteParams {
  timesheetUid: string;
}

interface OwnState {
  formMode: FormMode;
  companyUid?: string | undefined;
  positionUid?: string | undefined;
  timesheetUid?: string | undefined;
  submitDialogTitle: string;
  submitDialogContentText: string;
  submitDialogCancelText: string;
  submitDialogConfirmedText: string;
  minDate: Date;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type EntryEditorProps
  = WithTimesheetEntry
  & WithLookupSystemLimit
  & WithUser
  & WithLayout
  & WithAppBar
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;

const handlerCreators: HandleCreators<EntryEditorProps, OwnHandlers> = {
  handleSetMinDate: (props: EntryEditorProps) => (days: number, fromDate?: Date | null) => {
    let today = moment(); // create date today

    if (!isNullOrUndefined(fromDate)) { // is fromDate exist, use from date instead
      today = moment(fromDate);
    }

    const minDate = today.subtract(days, 'days'); // substract date using momentjs, because using native date in js sucks

    if (moment(props.minDate).format('DD/MM/YYYY') !== minDate.format('DD/MM/YYYY')) { // only update minDate state once
      props.stateUpdate({
        minDate: minDate.toDate()
      });
    }
  },
  handleValidate: (props: EntryEditorProps) => (formData: TimesheetFormData) => {
    const errors = {
      information: {}
    };

    const requiredFields = [
      'activityType', 'customerUid', 'projectUid', 'siteUid', 'date',
      'start', 'end', 'description',
    ];

    requiredFields.forEach(field => {
      if (!formData.information[field] || isNullOrUndefined(formData.information[field])) {
        errors.information[field] = props.intl.formatMessage(timesheetMessage.entry.fieldFor(field, 'fieldRequired'));
      }
    });

    return errors;
  },
  handleSubmit: (props: EntryEditorProps) => (formData: TimesheetFormData) => {
    const { formMode, timesheetUid, intl } = props;
    const { user } = props.userState;
    const { createRequest, updateRequest } = props.timesheetEntryDispatch;

    if (!user) {
      return Promise.reject('user was not found');
    }

    const payload = {
      ...formData.information,
      companyUid: user.company.uid,
      positionUid: user.position.uid,
      notes: formData.information.description,
      start: `${formData.information.date && formData.information.date.substring(0, 10)}${formData.information.start && formData.information.start.substring(10)}`,
      end: `${formData.information.date && formData.information.date.substring(0, 10)}${formData.information.end && formData.information.end.substring(10)}`,
    };

    // creating
    if (formMode === FormMode.New) {
      return new Promise((resolve, reject) => {
        createRequest({
          resolve,
          reject,
          companyUid: user.company.uid,
          positionUid: user.position.uid,
          data: payload as ITimesheetPostPayload
        });
      });
    }

    // update checking
    if (!timesheetUid) {
      const message = intl.formatMessage(timesheetMessage.entry.message.emptyProps);

      return Promise.reject(message);
    }

    if (formMode === FormMode.Edit) {
      return new Promise((resolve, reject) => {
        updateRequest({
          timesheetUid,
          resolve,
          reject,
          companyUid: user.company.uid,
          positionUid: user.position.uid,
          data: payload as ITimesheetPutPayload,
        });
      });
    }

    return null;
  },
  handleSubmitSuccess: (props: EntryEditorProps) => (response: ITimesheet) => {
    const { formMode, intl, history } = props;
    const { alertAdd } = props.layoutDispatch;

    let message: string = '';

    if (formMode === FormMode.New) {
      message = intl.formatMessage(timesheetMessage.entry.message.createSuccess, { uid: response.uid });
    }

    if (formMode === FormMode.Edit) {
      message = intl.formatMessage(timesheetMessage.entry.message.updateSuccess, { uid: response.uid });
    }

    alertAdd({
      message,
      time: new Date()
    });

    history.push(`/timesheet/requests/${response.uid}`);
  },
  handleSubmitFail: (props: EntryEditorProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
    const { formMode, intl } = props;
    const { alertAdd } = props.layoutDispatch;

    if (errors) {
      // validation errors from server (400: Bad Request)
      alertAdd({
        time: new Date(),
        message: isObject(submitError) ? submitError.message : submitError
      });
    } else {
      // another errors from server
      let message: string = '';

      if (formMode === FormMode.New) {
        message = intl.formatMessage(timesheetMessage.entry.message.createFailure);
      }

      if (formMode === FormMode.Edit) {
        message = intl.formatMessage(timesheetMessage.entry.message.updateFailure);
      }

      alertAdd({
        message,
        time: new Date(),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

const createProps: mapper<EntryEditorProps, OwnState> = (props: EntryEditorProps): OwnState => ({ 
  formMode: FormMode.New,
  submitDialogTitle: props.intl.formatMessage(timesheetMessage.entry.dialog.createTitle),
  submitDialogContentText: props.intl.formatMessage(timesheetMessage.entry.dialog.createDescription),
  submitDialogCancelText: props.intl.formatMessage(layoutMessage.action.cancel),
  submitDialogConfirmedText: props.intl.formatMessage(layoutMessage.action.ok),
  minDate: new Date(),
});

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const lifecycles: ReactLifeCycleFunctions<EntryEditorProps, {}> = {
  componentDidMount() {
    const { layoutDispatch, intl, history, stateUpdate } = this.props;
    const { loadDetailRequest } = this.props.timesheetEntryDispatch;
    const { loadAmountRequest } = this.props.systemLimitDispatch;
    const { user } = this.props.userState;
    
    const view = {
      title: timesheetMessage.entry.page.newTitle,
      subTitle: timesheetMessage.entry.page.newSubHeader,
    };

    if (!user) {
      return;
    }

    loadAmountRequest({
      companyUid: user.company.uid,
      categoryType: SystemLimitType.Timesheet
    });

    stateUpdate({ 
      companyUid: user.company.uid,
      positionUid: user.position.uid
    });

    if (!isNullOrUndefined(history.location.state)) {
      view.title = timesheetMessage.entry.page.modifyTitle;
      view.subTitle = timesheetMessage.entry.page.modifySubHeader;

      stateUpdate({ 
        formMode: FormMode.Edit,
        timesheetUid: history.location.state.uid
      });

      loadDetailRequest({
        timesheetUid: history.location.state.uid
      });
    }

    layoutDispatch.changeView({
      uid: AppMenu.TimesheetRequest,
      parentUid: AppMenu.Timesheet,
      title: intl.formatMessage(view.title),
      subTitle : intl.formatMessage(view.subTitle)
    });

    layoutDispatch.navBackShow(); 
  },
  componentWillUnmount() {
    const { layoutDispatch, appBarDispatch, timesheetEntryDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();

    appBarDispatch.dispose();

    timesheetEntryDispatch.createDispose();
    timesheetEntryDispatch.updateDispose();
  }
};

export default compose<EntryEditorProps, {}>(
  withUser,
  withLayout,
  withAppBar,
  withRouter,
  withTimesheetEntry,
  withLookupSystemLimit,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<EntryEditorProps, OwnHandlers>(handlerCreators),
  lifecycle<EntryEditorProps, {}>(lifecycles),
)(TimesheetEntryEditorView);