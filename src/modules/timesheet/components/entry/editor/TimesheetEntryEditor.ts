import { SystemLimitType } from '@common/classes/types/SystemLimitType';
import AppMenu from '@constants/AppMenu';
import { AppRole } from '@constants/AppRole';
import { FormMode } from '@generic/types';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithOidc, withOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { WithLookupSystemLimit, withLookupSystemLimit } from '@lookup/hoc/withLookupSystemLimit';
import { ITimesheetPostPayload, ITimesheetPutPayload } from '@timesheet/classes/request/entry';
import { ITimesheet } from '@timesheet/classes/response';
import { TimesheetFormData } from '@timesheet/components/entry/editor/forms/TimesheetEntryForm';
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
  setDisplayName,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';
import { Dispatch } from 'redux';
import { FormErrors } from 'redux-form';

interface IOwnHandlers {
  handleSetMinDate: (days: number, fromDate?: Date | null) => void;
  handleValidate: (payload: TimesheetFormData) => FormErrors;
  handleSubmit: (payload: TimesheetFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface IOwnRouteParams {
  timesheetUid: string;
}

interface IOwnState {
  formMode: FormMode;
  companyUid?: string | undefined;
  positionUid?: string | undefined;
  timesheetUid?: string | undefined;
  submitDialogTitle: string;
  submitDialogContentText: string;
  submitDialogCancelText: string;
  submitDialogConfirmedText: string;
  minDate: Date;
  isAdmin: boolean;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  stateUpdate: StateHandler<IOwnState>;
}

export type TimeEntryEditorProps
  = WithTimesheetEntry
  & WithLookupSystemLimit
  & WithOidc
  & WithUser
  & WithLayout
  & WithMasterPage
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnHandlers
  & IOwnState
  & IOwnStateUpdaters;

const createProps: mapper<TimeEntryEditorProps, IOwnState> = (props: TimeEntryEditorProps): IOwnState => ({
  formMode: FormMode.New,
  submitDialogTitle: props.intl.formatMessage(timesheetMessage.entry.dialog.createTitle),
  submitDialogContentText: props.intl.formatMessage(timesheetMessage.entry.dialog.createDescription),
  submitDialogCancelText: props.intl.formatMessage(layoutMessage.action.cancel),
  submitDialogConfirmedText: props.intl.formatMessage(layoutMessage.action.ok),
  isAdmin: false,
  minDate: new Date()
});

const handlerCreators: HandleCreators<TimeEntryEditorProps, IOwnHandlers> = {
  handleSetMinDate: (props: TimeEntryEditorProps) => (days: number, fromDate?: Date | null) => {
    let today = moment(); // create date today

    if (fromDate) { // is fromDate exist, use from date instead
      today = moment(fromDate);
    }

    const minDate = today.subtract(days, 'days'); // substract date using momentjs, because using native date in js sucks

    if (moment(props.minDate).format('DD/MM/YYYY') !== minDate.format('DD/MM/YYYY')) { // only update minDate state once
      props.stateUpdate({
        minDate: minDate.toDate()
      });
    }
  },
  handleValidate: (props: TimeEntryEditorProps) => (formData: TimesheetFormData) => {
    const errors = {
      information: {}
    };

    const requiredFields = [
      'activityType', 'customerUid', 'projectUid', 'siteUid', 'date',
      'start', 'end', 'description',
    ];

    requiredFields.forEach(field => {
      if (!formData.information[field] || (formData.information[field] === undefined || formData.information[field] === null)) {
        errors.information[field] = props.intl.formatMessage(timesheetMessage.entry.fieldFor(field, 'fieldRequired'));
      }
    });

    return errors;
  },
  handleSubmit: (props: TimeEntryEditorProps) => (formData: TimesheetFormData) => {
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
  handleSubmitSuccess: (props: TimeEntryEditorProps) => (response: ITimesheet) => {
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
  handleSubmitFail: (props: TimeEntryEditorProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
    const { formMode, intl } = props;
    const { alertAdd } = props.layoutDispatch;

    if (errors) {
      // validation errors from server (400: Bad Request)
      alertAdd({
        time: new Date(),
        message: (submitError !== null && typeof submitError === 'object') ? submitError.message : submitError
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
        details: (submitError !== null && typeof submitError === 'object') ? submitError.message : submitError
      });
    }
  }
};

const stateUpdaters: StateUpdaters<{}, IOwnState, IOwnStateUpdaters> = {
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const lifecycles: ReactLifeCycleFunctions<TimeEntryEditorProps, {}> = {
  componentDidMount() {
    const { intl, history, stateUpdate } = this.props;
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

    // checking admin status
    const { user: oidc } = this.props.oidcState;
    let result: boolean = false;
    if (oidc) {
      const role: string | string[] | undefined = oidc.profile.role;

      if (role) {
        if (Array.isArray(role)) {
          result = role.indexOf(AppRole.Admin) !== -1;
        } else {
          result = role === AppRole.Admin;
        }
      }

      if (result) {
        stateUpdate({
          isAdmin: true
        });
      }
    }

    if (!(history.location.state === undefined || history.location.state === null)) {
      view.title = timesheetMessage.entry.page.modifyTitle;
      view.subTitle = timesheetMessage.entry.page.modifySubHeader;

      stateUpdate({
        formMode: FormMode.Edit,
        timesheetUid: history.location.state.uid,
        submitDialogTitle: this.props.intl.formatMessage(timesheetMessage.entry.dialog.editTitle),
        submitDialogContentText: this.props.intl.formatMessage(timesheetMessage.entry.dialog.editDescription)
      });

      loadDetailRequest({
        timesheetUid: history.location.state.uid
      });
    }

    this.props.masterPage.changePage({
      uid: AppMenu.TimesheetRequest,
      parentUid: AppMenu.Timesheet,
      parentUrl: '/timesheet/requests',
      title: intl.formatMessage(view.title),
      description: intl.formatMessage(view.subTitle)
    });
  },
  componentDidUpdate(prevProps: TimeEntryEditorProps) {
    if (this.props.formMode === FormMode.Edit && prevProps.timesheetEntryState.detail !== this.props.timesheetEntryState.detail) {
      const { response } = this.props.timesheetEntryState.detail;

      if (this.props.userState.user && response && response.data && response.data.changes) {
        if (this.props.userState.user.uid !== response.data.changes.createdBy) {
          this.props.stateUpdate({
            isRequestor: false
          });
        }
      }
    }
  },
  componentWillUnmount() {
    const { timesheetEntryDispatch, masterPage } = this.props;

    masterPage.resetPage();

    timesheetEntryDispatch.createDispose();
    timesheetEntryDispatch.updateDispose();
  }
};

export default compose<TimeEntryEditorProps, {}>(
  setDisplayName('TimesheetEntryEditor'),
  withOidc,
  withUser,
  withLayout,
  withMasterPage,
  withRouter,
  withTimesheetEntry,
  withLookupSystemLimit,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
)(TimesheetEntryEditorView);