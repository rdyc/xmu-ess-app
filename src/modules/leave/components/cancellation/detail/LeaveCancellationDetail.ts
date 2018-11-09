
import AppMenu from '@constants/AppMenu';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { ILeaveCancellationPostPayload } from '@leave/classes/request';
import { LeaveRequestUserAction } from '@leave/classes/types';
import { WithLeaveCancellation, withLeaveCancellation } from '@leave/hoc/withLeaveCancellation';
import { leaveCancellationMessage } from '@leave/locales/messages/leaveCancellationMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  compose,
  HandleCreators,
  lifecycle,
  mapper,
  ReactLifeCycleFunctions,
  withHandlers,
  withStateHandlers,
} from 'recompose';
import { Dispatch } from 'redux';
import { FormErrors } from 'redux-form';
import { isNullOrUndefined, isObject } from 'util';
import { LeaveCancellationFormData } from '../form/LeaveCancellationForm';
import { LeaveCancellationDetailView } from './LeaveCancellationDetailView';

interface OwnHandler {
  handleRefresh: () => void;
  handleValidate: (payload: LeaveCancellationFormData) => FormErrors;
  handleSubmit: (payload: LeaveCancellationFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface OwnRouteParams {
  leaveUid: string;
}

interface OwnState {
  cancellationTitle: string;
  cancellationSubHeader: string;
  cancellationDialogTitle: string;
  cancellationDialogContentText: string;
  cancellationDialogCancelText: string;
  cancellationDialogConfirmedText: string;
}

export type LeaveCancellationDetailProps
  = WithLeaveCancellation
  & WithUser
  & WithLayout
  & WithAppBar
  & RouteComponentProps<OwnRouteParams> 
  & InjectedIntlProps
  & OwnHandler
  & OwnState;

const handlerCreators: HandleCreators<LeaveCancellationDetailProps, OwnHandler> = {
  handleValidate: (props: LeaveCancellationDetailProps) => (formData: LeaveCancellationFormData) => { 
    const errors = {};
  
    const requiredFields = ['isApproved', 'remark'];
  
    requiredFields.forEach(field => {
      if (!formData[field] || isNullOrUndefined(formData[field])) {
        errors[field] = props.intl.formatMessage({id: `leave.cancellation.field.${field}.required`});
      }
    });
    
    return errors;
  },
  handleSubmit: (props: LeaveCancellationDetailProps) => (formData: LeaveCancellationFormData) => { 
    const { match, intl } = props;
    const { user } = props.userState;
    const { createRequest } = props.leaveCancellationDispatch;

    // user checking
    if (!user) {
      return Promise.reject('user was not found');
    }

    // props checking
    if (!match.params.leaveUid) {
      const message = intl.formatMessage(leaveCancellationMessage.emptyProps);

      return Promise.reject(message);
    }

    // generate payload
    const payload: ILeaveCancellationPostPayload = {
      cancelDate: null,
    };

    // dispatch update request
    return new Promise((resolve, reject) => {
      createRequest({
        resolve, 
        reject,
        companyUid: user.company.uid,
        positionUid: user.position.uid,
        leaveUid: match.params.leaveUid, 
        data: payload, 
      });
    });
  },
  handleSubmitSuccess: (props: LeaveCancellationDetailProps) => (response: boolean) => {
    const { intl, history } = props;
    const { alertAdd } = props.layoutDispatch;
    
    alertAdd({
      time: new Date(),
      message: intl.formatMessage(leaveCancellationMessage.createSuccess),
    });

    history.push('/leave/cancellations/');
  },
  handleSubmitFail: (props: LeaveCancellationDetailProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
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
        message: intl.formatMessage(leaveCancellationMessage.createFailure),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  },
  handleRefresh: (props: LeaveCancellationDetailProps) => () => { 
    const { match } = props;
    const { user } = props.userState;
    const { loadDetailRequest } = props.leaveCancellationDispatch;

    if (user) {
      loadDetailRequest({
        companyUid: user.company.uid,
        positionUid: user.position.uid,
        leaveUid: match.params.leaveUid
      });
    }
  }
};

const lifecycles: ReactLifeCycleFunctions<LeaveCancellationDetailProps, {}> = {
  componentDidMount() {
    const { 
      match, layoutDispatch, appBarDispatch, intl, 
      handleRefresh
    } = this.props;

    const { user } = this.props.userState;
    const { loadDetailRequest } = this.props.leaveCancellationDispatch;

    layoutDispatch.changeView({
      uid: AppMenu.LeaveRequest,
      parentUid: AppMenu.Leave,
      title: intl.formatMessage({id: 'leave.detail.title'}),
      subTitle : intl.formatMessage({id: 'leave.detail.subTitle'})
    });

    layoutDispatch.navBackShow();
    layoutDispatch.moreShow();
    
    const handleMenuClick = (menu: IAppBarMenu): void => {
      switch (menu.id) {
        case LeaveRequestUserAction.Refresh:
          handleRefresh();
          break;

        default:
          break;
      }
    };

    appBarDispatch.assignCallback(handleMenuClick);

    if (user) {
      loadDetailRequest({
        leaveUid: match.params.leaveUid,
        companyUid: user.company.uid,
        positionUid: user.position.uid,
      });
    }
  },
  componentWillReceiveProps(nextProps: LeaveCancellationDetailProps) {
    if (nextProps.leaveCancellationState.detail.response !== this.props.leaveCancellationState.detail.response) {
      const { intl } = nextProps;
      const { assignMenus } = nextProps.appBarDispatch;

      const currentMenus = [
        {
          id: LeaveRequestUserAction.Refresh,
          name: intl.formatMessage({id: 'global.action.refresh'}),
          enabled: true,
          visible: true
        }
      ];

      assignMenus(currentMenus);
    }
  },
  componentWillUnmount() {
    const { layoutDispatch, appBarDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();
    layoutDispatch.actionCentreHide();

    appBarDispatch.dispose();
  }
};

const createProps: mapper<LeaveCancellationDetailProps, OwnState> = (props: LeaveCancellationDetailProps): OwnState => {
  const { intl } = props;

  return {
    cancellationTitle: intl.formatMessage({id: 'leave.CancellationTitle'}),
    cancellationSubHeader: intl.formatMessage({id: 'leave.CancellationSubHeader'}),
    cancellationDialogTitle: intl.formatMessage({id: 'leave.dialog.CancellationTitle'}),
    cancellationDialogContentText: intl.formatMessage({id: 'leave.dialog.CancellationContent'}),
    cancellationDialogCancelText: intl.formatMessage({id: 'global.action.cancel'}),
    cancellationDialogConfirmedText: intl.formatMessage({id: 'global.action.continue'}),
  };
};

export const LeaveCancellationDetail = compose<LeaveCancellationDetailProps, {}>(
  withUser,
  withLayout,
  withAppBar,
  withRouter,
  withLeaveCancellation,
  injectIntl,
  withStateHandlers<OwnState, {}, {}>(createProps, {}),
  withHandlers<LeaveCancellationDetailProps, OwnHandler>(handlerCreators),
  lifecycle<LeaveCancellationDetailProps, {}>(lifecycles),
)(LeaveCancellationDetailView);