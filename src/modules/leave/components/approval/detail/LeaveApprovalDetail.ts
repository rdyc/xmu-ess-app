import { WorkflowStatusType } from '@common/classes/types';
import { RadioGroupChoice } from '@layout/components/input/radioGroup';
import { IPopupMenuOption } from '@layout/components/PopupMenu/PopupMenu';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithNotification, withNotification } from '@layout/hoc/withNotification';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { ModuleDefinitionType, NotificationType } from '@layout/types';
import { LeaveRequestUserAction } from '@leave/classes/types';
import { WithLeaveApproval, withLeaveApproval } from '@leave/hoc/withLeaveApproval';
import { leaveApprovalMessage } from '@leave/locales/messages/leaveApprovalMessage';
import { leaveMessage } from '@leave/locales/messages/leaveMessage';
import { IWorkflowApprovalPayload } from '@organization/classes/request/workflow/approval';
import { WorkflowApprovalFormData } from '@organization/components/workflow/approval/WorkflowApprovalForm';
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
import { isNullOrUndefined, isObject } from 'util';

import { LeaveApprovalDetailView } from './LeaveApprovalDetailView';

interface IOwnRouteParams {
  leaveUid: string;
}

interface IOwnState {
  shoulLoad: boolean;
  menuOptions?: IPopupMenuOption[];
  approvalTitle: string;
  approvalSubHeader: string;
  approvalChoices: RadioGroupChoice[];
  approvalTrueValue: string;
  approvalDialogTitle: string;
  approvalDialogContentText: string;
  approvalDialogCancelText: string;
  approvalDialogConfirmedText: string;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setOptions: StateHandler<IOwnState>;
  setShouldLoad: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadApi: () => void;
  handleOnSelectedMenu: (item: IPopupMenuOption) => void;
  handleValidate: (payload: WorkflowApprovalFormData) => FormErrors;
  handleSubmit: (payload: WorkflowApprovalFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

export type LeaveApprovalDetailProps
  = WithLeaveApproval
  & WithUser
  & WithLayout
  & WithNotification
  & RouteComponentProps<IOwnRouteParams> 
  & InjectedIntlProps
  & IOwnHandler
  & IOwnState
  & IOwnStateUpdater;

const createProps: mapper<LeaveApprovalDetailProps, IOwnState> = (props: LeaveApprovalDetailProps): IOwnState => ({
  shoulLoad: false,
  approvalTitle: props.intl.formatMessage(leaveMessage.request.section.approvalTitle),
  approvalSubHeader: props.intl.formatMessage(leaveMessage.request.section.approvalSubHeader),
  approvalChoices: [
    { value: WorkflowStatusType.Approved, label: props.intl.formatMessage(organizationMessage.workflow.option.approve) },
    { value: WorkflowStatusType.Rejected, label: props.intl.formatMessage(organizationMessage.workflow.option.reject) }
  ],
  approvalTrueValue: WorkflowStatusType.Approved,
  approvalDialogTitle: props.intl.formatMessage(leaveMessage.approval.confirm.submissionTitle),
  approvalDialogContentText: props.intl.formatMessage(leaveMessage.approval.confirm.submissionContent),
  approvalDialogCancelText: props.intl.formatMessage(layoutMessage.action.cancel),
  approvalDialogConfirmedText: props.intl.formatMessage(layoutMessage.action.continue)
});

const stateUpdaters: StateUpdaters<LeaveApprovalDetailProps, IOwnState, IOwnStateUpdater> = {
  setShouldLoad: (state: IOwnState, props: LeaveApprovalDetailProps) => (): Partial<IOwnState> => ({
    shoulLoad: !state.shoulLoad
  }),
  setOptions: (state: IOwnState, props: LeaveApprovalDetailProps) => (options?: IAppBarMenu[]): Partial<IOwnState> => ({
    menuOptions: options
  })
};

const handlerCreators: HandleCreators<LeaveApprovalDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: LeaveApprovalDetailProps) => () => { 
    if (props.userState.user && !props.leaveApprovalState.detail.isLoading && props.match.params.leaveUid) {
      props.leaveApprovalDispatch.loadDetailRequest({
        companyUid: props.userState.user.company.uid,
        positionUid: props.userState.user.position.uid,
        leaveUid: props.match.params.leaveUid
      });
    }
  },
  handleOnSelectedMenu: (props: LeaveApprovalDetailProps) => (item: IPopupMenuOption) => {
    switch (item.id) {
      case LeaveRequestUserAction.Refresh:
        props.setShouldLoad();
        break;
    
      default:
        break;
    }
  },
  handleValidate: (props: LeaveApprovalDetailProps) => (formData: WorkflowApprovalFormData) => { 
    const errors = {};
  
    const requiredFields = ['isApproved', 'remark'];
  
    requiredFields.forEach(field => {
      if (!formData[field] || isNullOrUndefined(formData[field])) {
        errors[field] = props.intl.formatMessage(organizationMessage.workflow.fieldFor(field, 'fieldRequired'));
      }
    });
    
    return errors;
  },
  handleSubmit: (props: LeaveApprovalDetailProps) => (formData: WorkflowApprovalFormData) => { 
    const { match, intl } = props;
    const { user } = props.userState;
    const { createRequest } = props.leaveApprovalDispatch;

    // user checking
    if (!user) {
      return Promise.reject('user was not found');
    }

    // props checking
    if (!match.params.leaveUid) {
      const message = intl.formatMessage(leaveApprovalMessage.emptyProps);

      return Promise.reject(message);
    }

    // compare approval status string
    const isApproved = formData.isApproved === WorkflowStatusType.Approved;

    // generate payload
    const payload: IWorkflowApprovalPayload = {
      isApproved,
      remark: !isApproved ? formData.remark : undefined
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
  handleSubmitSuccess: (props: LeaveApprovalDetailProps) => (response: boolean) => {
    // add success alert
    props.layoutDispatch.alertAdd({
      time: new Date(),
      message: props.intl.formatMessage(leaveApprovalMessage.submitSuccess)
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
  handleSubmitFail: (props: LeaveApprovalDetailProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
    if (errors) {
      // validation errors from server (400: Bad Request)
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: isObject(submitError) ? submitError.message : submitError
      });
    } else {
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: props.intl.formatMessage(leaveApprovalMessage.submitFailure),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

const lifecycles: ReactLifeCycleFunctions<LeaveApprovalDetailProps, IOwnState> = {
  componentDidUpdate(prevProps: LeaveApprovalDetailProps) {
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
    if (this.props.leaveApprovalState.detail !== prevProps.leaveApprovalState.detail) {
      const options: IPopupMenuOption[] = [
        {
          id: LeaveRequestUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !this.props.leaveApprovalState.detail.isLoading,
          visible: true,
        }
      ];

      this.props.setOptions(options);
    }
  }
};

export const LeaveApprovalDetail = compose<LeaveApprovalDetailProps, {}>(
  setDisplayName('LeaveApprovalDetail'),
  withRouter,
  withUser,
  withLayout,
  withLeaveApproval,
  withNotification,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(LeaveApprovalDetailView);