import AppMenu from '@constants/AppMenu';
import { AppRole } from '@constants/AppRole';
import { FormMode } from '@generic/types';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithOidc, withOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { ILeaveRequestPostPayload, ILeaveRequestPutPayload } from '@leave/classes/request/';
import { ILeave } from '@leave/classes/response';
import { LeaveRequestFormData } from '@leave/components/request/editor/forms/LeaveRequestForm';
import { LeaveRequestEditorView } from '@leave/components/request/editor/LeaveRequestEditorView';
import { WithLeaveRequest, withLeaveRequest } from '@leave/hoc/withLeaveRequest';
import { leaveMessage } from '@leave/locales/messages/leaveMessage';
import { leaveRequestMessage } from '@leave/locales/messages/leaveRequestMessage';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
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
  handleValidate: (payload: LeaveRequestFormData) => FormErrors;
  handleSubmit: (payload: LeaveRequestFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface IOwnRouteParams {
  leaveUid: string;
}

interface IOwnState {
  formMode: FormMode;
  companyUid?: string | undefined;
  positionUid?: string | undefined;
  leaveUid?: string | undefined;
  submitDialogTitle: string;
  submitDialogContentText: string;
  submitDialogCancelText: string;
  submitDialogConfirmedText: string;
  isAdmin: boolean;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  stateUpdate: StateHandler<IOwnState>;
}

export type LeaveRequestEditorProps
  = WithLeaveRequest
  & WithOidc
  & WithUser
  & WithLayout
  & WithMasterPage
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & WithStyles<typeof styles>
  & IOwnHandlers
  & IOwnState
  & IOwnStateUpdaters;

const createProps: mapper<LeaveRequestEditorProps, IOwnState> = (props: LeaveRequestEditorProps): IOwnState => ({
  formMode: FormMode.New,
  submitDialogTitle: props.intl.formatMessage(leaveMessage.request.dialog.createTitle),
  submitDialogContentText: props.intl.formatMessage(leaveMessage.request.dialog.createDescription),
  submitDialogCancelText: props.intl.formatMessage(layoutMessage.action.cancel),
  submitDialogConfirmedText: props.intl.formatMessage(layoutMessage.action.ok),
  isAdmin: false
});

const handlerCreators: HandleCreators<LeaveRequestEditorProps, IOwnHandlers> = {
  handleValidate: (props: LeaveRequestEditorProps) => (formData: LeaveRequestFormData) => {
    const errors = {
      information: {}
    };

    const requiredFields = [
      'leaveType', 'start',
      'address', 'contactNumber', 'reason'
    ];

    requiredFields.forEach(field => {
      if (!formData.information[field] || (formData.information[field] === undefined || formData.information[field] === null)) {
        errors.information[field] = props.intl.formatMessage(leaveMessage.request.fieldFor(field, 'fieldRequired'));
      }
    });

    return errors;
  },
  handleSubmit: (props: LeaveRequestEditorProps) => (formData: LeaveRequestFormData) => {
    const { formMode, leaveUid, intl } = props;
    const { user } = props.userState;
    const { createRequest, updateRequest } = props.leaveRequestDispatch;

    if (!user) {
      return Promise.reject('user was not found');
    }

    const payload = {
      ...formData.information,
    };

    // creating
    if (formMode === FormMode.New) {
      return new Promise((resolve, reject) => {
        createRequest({
          resolve,
          reject,
          companyUid: user.company.uid,
          positionUid: user.position.uid,
          data: payload as ILeaveRequestPostPayload
        });
      });
    }

    // update checking
    if (!leaveUid) {
      const message = intl.formatMessage(leaveRequestMessage.emptyLeaveUid);

      return Promise.reject(message);
    }

    if (formMode === FormMode.Edit) {
      return new Promise((resolve, reject) => {
        updateRequest({
          leaveUid,
          resolve,
          reject,
          companyUid: user.company.uid,
          positionUid: user.position.uid,
          data: payload as ILeaveRequestPutPayload,
        });
      });
    }

    return null;
  },
  handleSubmitSuccess: (props: LeaveRequestEditorProps) => (response: ILeave) => {
    const { formMode, intl, history } = props;
    const { alertAdd } = props.layoutDispatch;

    let message: string = '';

    if (formMode === FormMode.New) {
      message = intl.formatMessage(leaveMessage.request.message.createSuccess, { uid: response.uid });
    }

    if (formMode === FormMode.Edit) {
      message = intl.formatMessage(leaveMessage.request.message.updateSuccess, { uid: response.uid });
    }

    alertAdd({
      message,
      time: new Date()
    });

    history.push('/leave/requests/');
  },
  handleSubmitFail: (props: LeaveRequestEditorProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
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
        message = intl.formatMessage(leaveMessage.request.message.createFailure);
      }

      if (formMode === FormMode.Edit) {
        message = intl.formatMessage(leaveMessage.request.message.updateFailure);
      }

      alertAdd({
        message,
        time: new Date(),
        details: isObject(submitError) ? submitError.message : submitError
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

const lifecycles: ReactLifeCycleFunctions<LeaveRequestEditorProps, {}> = {
  componentDidMount() {
    const { intl, history, stateUpdate } = this.props;
    const { loadDetailRequest } = this.props.leaveRequestDispatch;
    const { user } = this.props.userState;

    const view = {
      title: leaveMessage.request.page.newTitle,
      subTitle: leaveMessage.request.page.newSubHeader,
    };

    if (!user) {
      return;
    }

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

    if (!isNullOrUndefined(history.location.state)) {
      view.title = leaveMessage.request.page.modifyTitle;
      view.subTitle = leaveMessage.request.page.modifySubHeader;

      stateUpdate({
        formMode: FormMode.Edit,
        leaveUid: history.location.state.uid,
        submitDialogTitle: this.props.intl.formatMessage(leaveMessage.request.dialog.editTitle),
        submitDialogContentText: this.props.intl.formatMessage(leaveMessage.request.dialog.editDescription)
      });

      loadDetailRequest({
        companyUid: user.company.uid,
        positionUid: user.position.uid,
        leaveUid: history.location.state.uid
      });
    }

    this.props.masterPage.changePage({
      uid: AppMenu.LeaveRequest,
      parentUid: AppMenu.Leave,
      parentUrl: '/leave/requests',
      title: intl.formatMessage(view.title),
      description : intl.formatMessage(view.subTitle)
    });
  },
  componentDidUpdate(prevProps: LeaveRequestEditorProps) {
    if (this.props.formMode === FormMode.Edit && prevProps.leaveRequestState.detail !== this.props.leaveRequestState.detail) {
      const { response } = this.props.leaveRequestState.detail;

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
    const { leaveRequestDispatch, masterPage } = this.props;

    masterPage.resetPage();
    leaveRequestDispatch.createDispose();
    leaveRequestDispatch.updateDispose();
  }
};

export default compose<LeaveRequestEditorProps, {}>(
  setDisplayName('LeaveRequestEditor'),
  withOidc,
  withUser,
  withLayout,
  withMasterPage,
  withRouter,
  withLeaveRequest,
  injectIntl,
  withStyles(styles),
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
)(LeaveRequestEditorView);