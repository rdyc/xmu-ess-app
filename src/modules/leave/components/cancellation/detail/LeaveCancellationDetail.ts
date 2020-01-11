import { IPopupMenuOption } from '@layout/components/PopupMenu';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithNotification, withNotification } from '@layout/hoc/withNotification';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { ModuleDefinitionType, NotificationType } from '@layout/types';
import { ILeaveCancellationPostPayload } from '@leave/classes/request';
import { LeaveRequestUserAction } from '@leave/classes/types';
import { WithLeaveCancellation, withLeaveCancellation } from '@leave/hoc/withLeaveCancellation';
import { leaveCancellationMessage } from '@leave/locales/messages/leaveCancellationMessage';
import { leaveMessage } from '@leave/locales/messages/leaveMessage';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
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

import { LeaveCancellationFormData } from '../form/LeaveCancellationForm';
import { LeaveCancellationDetailView } from './LeaveCancellationDetailView';

interface IOwnRouteParams {
  leaveUid: string;
}

interface IOwnState {
  shoulLoad: boolean;
  menuOptions?: IPopupMenuOption[];
  cancellationTitle: string;
  cancellationSubHeader: string;
  cancellationDialogTitle: string;
  cancellationDialogContentText: string;
  cancellationDialogCancelText: string;
  cancellationDialogConfirmedText: string;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setOptions: StateHandler<IOwnState>;
  setShouldLoad: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadApi: () => void;
  handleOnSelectedMenu: (item: IPopupMenuOption) => void;
  handleValidate: (payload: LeaveCancellationFormData) => FormErrors;
  handleSubmit: (payload: LeaveCancellationFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

export type LeaveCancellationDetailProps
  = WithLeaveCancellation
  & WithUser
  & WithLayout
  & WithNotification
  & RouteComponentProps<IOwnRouteParams> 
  & InjectedIntlProps
  & IOwnHandler
  & IOwnState
  & IOwnStateUpdater;

const createProps: mapper<LeaveCancellationDetailProps, IOwnState> = (props: LeaveCancellationDetailProps): IOwnState => ({
  shoulLoad: false,
  cancellationTitle: props.intl.formatMessage(leaveMessage.request.section.cancellationTitle),
  cancellationSubHeader: props.intl.formatMessage(leaveMessage.request.section.cancellationSubHeader),
  cancellationDialogTitle: props.intl.formatMessage(leaveMessage.cancellation.confirm.submissionTitle),
  cancellationDialogContentText: props.intl.formatMessage(leaveMessage.cancellation.confirm.submissionContent),
  cancellationDialogCancelText: props.intl.formatMessage(layoutMessage.action.cancel),
  cancellationDialogConfirmedText: props.intl.formatMessage(layoutMessage.action.continue)
});

const stateUpdaters: StateUpdaters<LeaveCancellationDetailProps, IOwnState, IOwnStateUpdater> = {
  setShouldLoad: (state: IOwnState, props: LeaveCancellationDetailProps) => (): Partial<IOwnState> => ({
    shoulLoad: !state.shoulLoad
  }),
  setOptions: (state: IOwnState, props: LeaveCancellationDetailProps) => (options?: IPopupMenuOption[]): Partial<IOwnState> => ({
    menuOptions: options
  })
};

const handlerCreators: HandleCreators<LeaveCancellationDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: LeaveCancellationDetailProps) => () => { 
    if (props.userState.user && !props.leaveCancellationState.detail.isLoading && props.match.params.leaveUid) {
      props.leaveCancellationDispatch.loadDetailRequest({
        companyUid: props.userState.user.company.uid,
        positionUid: props.userState.user.position.uid,
        leaveUid: props.match.params.leaveUid
      });
    }
  },
  handleOnSelectedMenu: (props: LeaveCancellationDetailProps) => (item: IPopupMenuOption) => {
    switch (item.id) {
      case LeaveRequestUserAction.Refresh:
        props.setShouldLoad();
        break;
    
      default:
        break;
    }
  },
  handleValidate: (props: LeaveCancellationDetailProps) => (formData: LeaveCancellationFormData) => { 
    const errors = {};
  
    const requiredFields = ['isApproved', 'remark'];
  
    requiredFields.forEach(field => {
      if (!formData[field] || (formData[field] === undefined || formData[field] === null)) {
        errors[field] = props.intl.formatMessage(organizationMessage.workflow.fieldFor(field, 'fieldRequired'));
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
      cancelDate: formData.cancelDate
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
    // add success alert
    props.layoutDispatch.alertAdd({
      time: new Date(),
      message: props.intl.formatMessage(leaveCancellationMessage.submitSuccess)
    });

    // notification: mark as complete
    props.notificationDispatch.markAsComplete({
      moduleUid: ModuleDefinitionType.Leave,
      detailType: NotificationType.Approval,
      itemUid: props.match.params.leaveUid
    });

    // set next load
    props.setShouldLoad();
  },
  handleSubmitFail: (props: LeaveCancellationDetailProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
    if (errors) {
      // validation errors from server (400: Bad Request)
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: (submitError !== null && typeof submitError === 'object') ? submitError.message : submitError
      });
    } else {
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: props.intl.formatMessage(leaveCancellationMessage.submitFailure),
        details: (submitError !== null && typeof submitError === 'object') ? submitError.message : submitError
      });
    }
  }
};

const lifecycles: ReactLifeCycleFunctions<LeaveCancellationDetailProps, IOwnState> = {
  componentDidUpdate(prevProps: LeaveCancellationDetailProps) {
    // handle updated should load
    if (this.props.shoulLoad && this.props.shoulLoad !== prevProps.shoulLoad) {
      // turn of shoul load
      this.props.setShouldLoad();

      // load from api
      this.props.handleOnLoadApi();
    }

    // handle updated route params
    if (this.props.match.params.leaveUid !== prevProps.match.params.leaveUid) {
      this.props.handleOnLoadApi();
    }

    // handle updated response state
    if (this.props.leaveCancellationState.detail !== prevProps.leaveCancellationState.detail) {
      const options: IPopupMenuOption[] = [
        {
          id: LeaveRequestUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !this.props.leaveCancellationState.detail.isLoading,
          visible: true,
        }
      ];

      this.props.setOptions(options);
    }
  }
};

export const LeaveCancellationDetail = compose<LeaveCancellationDetailProps, {}>(
  setDisplayName('LeaveCancellationDetail'),
  withRouter,
  withUser,
  withLayout,
  withLeaveCancellation,
  withNotification,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(LeaveCancellationDetailView);