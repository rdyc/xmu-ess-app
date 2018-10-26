import AppMenu from '@constants/AppMenu';
import { FormMode } from '@generic/types';
import { ApprovalOptions } from '@generic/types/ApprovalOptions';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { ILeaveApprovalPostPayload } from '@leave/classes/request/';
import { WithLeaveApproval, withLeaveApproval } from '@leave/hoc/withLeaveApproval';
import { leaveApprovalMessage } from '@leave/locales/messages/leaveApprovalMessage';
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
import { LeaveApprovalFormData } from './forms/LeaveApprovalForm';
import { LeaveApprovalEditorView } from './LeaveApprovalEditorView';

interface OwnHandlers {
  handleValidate: (payload: LeaveApprovalFormData) => FormErrors;
  handleSubmit: (payload: LeaveApprovalFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface OwnRouteParams {
  leaveUid: string;
}

interface OwnState {
  formMode: FormMode;
  isApprove?: boolean | undefined;
  companyUid?: string | undefined;
  positionUid?: string | undefined;
  leaveUid?: string | undefined;
  dialogFullScreen: boolean;
  dialogOpen: boolean;
  dialogTitle?: string | undefined;
  dialogDescription?: string | undefined;
  dialogCancelText: string;
  dialogConfirmedText: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type LeaveApprovalEditorProps
  = WithLeaveApproval
  & WithUser
  & WithLayout
  & WithAppBar
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;

const handlerCreators: HandleCreators<LeaveApprovalEditorProps, OwnHandlers> = {
  handleValidate: (props: LeaveApprovalEditorProps) => (formData: LeaveApprovalFormData) => { 
    const errors = {
      information: {}
    };
  
    const requiredFields = ['isApproved'];
  
    requiredFields.forEach(field => {
      if (!formData.information[field] || isNullOrUndefined(formData.information[field])) {
        errors.information[field] = props.intl.formatMessage({id: `leave.field.information.${field}.required`});
      }
    });
    
    return errors;
  },
  handleSubmit: (props: LeaveApprovalEditorProps) => (formData: LeaveApprovalFormData) => { 
    const { leaveUid, intl } = props;
    const { user } = props.userState;
    const { createApproval } = props.leaveApprovalDispatch;
    const { information } = formData;

    // user checking
    if (!user) {
      return Promise.reject('user was not found');
    }

    // props checking
    if (!leaveUid || !information.isApproved) {
      const message = intl.formatMessage(leaveApprovalMessage.emptyProps);

      return Promise.reject(message);
    }

    // generate payload
    const payload: ILeaveApprovalPostPayload = {
      isApproved: information.isApproved === ApprovalOptions.approve ? true : false,
      remark: information.isApproved === ApprovalOptions.approve ? null : information.remark
    };

    // dispatch create request
    return new Promise((resolve, reject) => {
      createApproval({
        leaveUid, 
        resolve, 
        reject,
        companyUid: user.company.uid,
        positionUid: user.position.uid,
        data: payload, 
      });
    });
  },
  handleSubmitSuccess: (props: LeaveApprovalEditorProps) => (response: boolean) => {
    const { isApprove, intl, history, leaveUid } = props;
    const { alertAdd } = props.layoutDispatch;
    
    let message: string = '';

    if (isApprove) {
      message = intl.formatMessage(leaveApprovalMessage.approveSuccess, {uid: leaveUid});
    } else {
      message = intl.formatMessage(leaveApprovalMessage.rejectSuccess, {uid: leaveUid});
    }

    alertAdd({
      message,
      time: new Date()
    });

    if (leaveUid) {
      history.push(`/approval/leave/`);
    }
  },
  handleSubmitFail: (props: LeaveApprovalEditorProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
    const { intl } = props;
    const { alertAdd } = props.layoutDispatch;
    
    if (errors) {
      // validation errors from server (400: Bad Request)
      alertAdd({
        time: new Date(),
        message: isObject(submitError) ? submitError.message : submitError
      });
    } else {
      alertAdd({
        time: new Date(),
        message: intl.formatMessage(leaveApprovalMessage.createFailure),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

const createProps: mapper<LeaveApprovalEditorProps, OwnState> = (props: LeaveApprovalEditorProps): OwnState => {
  const { match } = props;
  
  return { 
    formMode: FormMode.New,
    leaveUid: match.params.leaveUid,
    dialogFullScreen: false,
    dialogOpen: false,
    dialogCancelText: 'global.action.cancel',
    dialogConfirmedText: 'global.action.ok',
  };
};

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const lifecycles: ReactLifeCycleFunctions<LeaveApprovalEditorProps, {}> = {
  componentDidMount() {
    const { layoutDispatch, intl, match } = this.props;
    const { user } = this.props.userState;
    const { response } = this.props.leaveApprovalState.detail;
    const { loadDetailApproval } = this.props.leaveApprovalDispatch;

    layoutDispatch.changeView({
      uid: AppMenu.LeaveApproval,
      parentUid: AppMenu.Leave,
      title: intl.formatMessage({id: 'leave.form.approval.newTitle'}),
      subTitle : intl.formatMessage({id: 'leave.form.approval.newSubTitle'})
    });
    
    layoutDispatch.navBackShow(); 

    if (!isNullOrUndefined(match.params.leaveUid) && !response && user) {
      loadDetailApproval({
        companyUid: user.company.uid,
        positionUid: user.position.uid,
        leaveUid: match.params.leaveUid
      });
    }
  },
  componentWillUnmount() {
    const { layoutDispatch, appBarDispatch, leaveApprovalDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();
    layoutDispatch.actionCentreHide();

    appBarDispatch.dispose();

    leaveApprovalDispatch.createDispose();
  }
};

export const LeaveApprovalEditor = compose<LeaveApprovalEditorProps, {}>(
  withUser,
  withLayout,
  withAppBar,
  withRouter,
  withLeaveApproval,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<LeaveApprovalEditorProps, OwnHandlers>(handlerCreators),
  lifecycle<LeaveApprovalEditorProps, {}>(lifecycles),
)(LeaveApprovalEditorView);