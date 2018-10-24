import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import {
  ITimesheetPostPayload,
  ITimesheetPutPayload,
} from '@timesheet/classes/request/entry';
import { ITimesheet } from '@timesheet/classes/response';
import { EntryEditorView } from '@timesheet/components/entry/editor/EntryEditorView';
import {
  TimesheetFormData,
} from '@timesheet/components/entry/editor/forms/EntryForm';
import { WithTimesheet, withTimesheet } from '@timesheet/hoc/withTimesheet';
import { timesheetMessage } from '@timesheet/locales/messages/timesheetMessage';
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
  handleValidate: (payload: TimesheetFormData) => FormErrors;
  handleSubmit: (payload: TimesheetFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface OwnRouteParams {
  projectUid: string;
}

interface OwnState {
  formMode: FormMode;
  companyUid?: string | undefined;
  positionUid?: string | undefined;
  timesheetUid?: string | undefined;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type EntryEditorProps
  = WithTimesheet
  & WithUser
  & WithLayout
  & WithAppBar
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;

const handlerCreators: HandleCreators<EntryEditorProps, OwnHandlers> = {
  handleValidate: (props: EntryEditorProps) => (formData: TimesheetFormData) => {
    const errors = {
      information: {}
    };

    const requiredFields = [
      'activityType', 'customerUid', 'projectUid', 'siteUid', 'date',
      'start', 'end',
    ];

    requiredFields.forEach(field => {
      if (!formData.information[field] || isNullOrUndefined(formData.information[field])) {
        errors.information[field] = props.intl.formatMessage({ id: `timesheet.field.information.${field}.required` });
      }
    });

    return errors;
  },
  handleSubmit: (props: EntryEditorProps) => (formData: TimesheetFormData) => {
    const { formMode, timesheetUid, intl } = props;
    const { user } = props.userState;
    const { createRequest, updateRequest } = props.timesheetDispatch;

    if (!user) {
      return Promise.reject('user was not found');
    }

    const payload = {
      ...formData.information,
      companyUid: user.company.uid,
      positionUid: user.position.uid,
      notes: formData.information.description
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
      const message = intl.formatMessage(timesheetMessage.emptyTimesheetUid);

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
      message = intl.formatMessage(timesheetMessage.createSuccess, { uid: response.uid });
    }

    if (formMode === FormMode.Edit) {
      message = intl.formatMessage(timesheetMessage.updateSuccess, { uid: response.uid });
    }

    alertAdd({
      message,
      time: new Date()
    });

    history.push('/timesheet/entry/history');
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
        message = intl.formatMessage(timesheetMessage.createFailure);
      }

      if (formMode === FormMode.Edit) {
        message = intl.formatMessage(timesheetMessage.updateFailure);
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
  formMode: FormMode.New
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
    const { loadDetailRequest } = this.props.timesheetDispatch;
    const { user } = this.props.userState;
    
    const view = {
      title: 'timesheet.form.newTitle',
      subTitle: 'timesheet.form.newSubTitle',
    };

    if (!user) {
      return;
    }

    stateUpdate({ 
      companyUid: user.company.uid,
      positionUid: user.position.uid
    });

    if (!isNullOrUndefined(history.location.state)) {
      view.title = 'timesheet.form.editTitle';
      view.subTitle = 'timesheet.form.editSubTitle';

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
      title: intl.formatMessage({id: view.title}),
      subTitle : intl.formatMessage({id: view.subTitle})
    });

    layoutDispatch.navBackShow(); 
  },
  componentWillUnmount() {
    const { layoutDispatch, appBarDispatch, timesheetDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();
    layoutDispatch.actionCentreHide();

    appBarDispatch.dispose();

    timesheetDispatch.createDispose();
    timesheetDispatch.updateDispose();
  }
};

export default compose<EntryEditorProps, {}>(
  withUser,
  withLayout,
  withAppBar,
  withRouter,
  withTimesheet,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<EntryEditorProps, OwnHandlers>(handlerCreators),
  lifecycle<EntryEditorProps, {}>(lifecycles),
)(EntryEditorView);