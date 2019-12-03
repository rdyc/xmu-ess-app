import { WorkflowStatusType } from '@common/classes/types';
import { RadioGroupChoice } from '@layout/components/input/radioGroup';
import { IPopupMenuOption } from '@layout/components/PopupMenu/PopupMenu';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithNotification, withNotification } from '@layout/hoc/withNotification';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IValidationErrorResponse } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { ModuleDefinitionType, NotificationType } from '@layout/types';
import { LeaveRequestUserAction } from '@leave/classes/types';
import { WithLeaveApproval, withLeaveApproval } from '@leave/hoc/withLeaveApproval';
import { leaveApprovalMessage } from '@leave/locales/messages/leaveApprovalMessage';
import { leaveMessage } from '@leave/locales/messages/leaveMessage';
import { IWorkflowApprovalPayload } from '@organization/classes/request/workflow/approval';
import { IWorkflowApprovalFormValue } from '@organization/components/workflow/approval/form/WorkflowApprovalForm';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import { FormikActions } from 'formik';
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

import { LeaveApprovalDetailView } from './LeaveApprovalDetailView';

interface IOwnRouteParams {
  leaveUid: string;
}

interface IOwnState {
  shoulLoad: boolean;
  menuOptions?: IPopupMenuOption[];
  approvalTitle: string;
  approvalSubHeader: string;
  approvalStatusTypes: RadioGroupChoice[];
  approvalTrueValues: string[];
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
  handleOnSubmit: (values: IWorkflowApprovalFormValue, actions: FormikActions<IWorkflowApprovalFormValue>) => void;
}

export type LeaveApprovalDetailProps
  = WithLeaveApproval
  & WithUser
  & WithLayout
  & WithMasterPage
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
  approvalStatusTypes: [
    { value: WorkflowStatusType.Approved, label: props.intl.formatMessage(organizationMessage.workflow.option.approve) },
    { value: WorkflowStatusType.Rejected, label: props.intl.formatMessage(organizationMessage.workflow.option.reject) }
  ],
  approvalTrueValues: [WorkflowStatusType.Approved],
  approvalDialogTitle: props.intl.formatMessage(leaveMessage.approval.confirm.submissionTitle),
  approvalDialogContentText: props.intl.formatMessage(leaveMessage.approval.confirm.submissionContent),
  approvalDialogCancelText: props.intl.formatMessage(layoutMessage.action.cancel),
  approvalDialogConfirmedText: props.intl.formatMessage(layoutMessage.action.continue)
});

const stateUpdaters: StateUpdaters<LeaveApprovalDetailProps, IOwnState, IOwnStateUpdater> = {
  setShouldLoad: (state: IOwnState, props: LeaveApprovalDetailProps) => (): Partial<IOwnState> => ({
    shoulLoad: !state.shoulLoad
  }),
  setOptions: (state: IOwnState, props: LeaveApprovalDetailProps) => (options?: IPopupMenuOption[]): Partial<IOwnState> => ({
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
  handleOnSubmit: (props: LeaveApprovalDetailProps) => (values: IWorkflowApprovalFormValue, actions: FormikActions<IWorkflowApprovalFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise((resolve, reject) => undefined);

    if (user) {
      // must have leaveUid
      if (props.match.params.leaveUid) {
        // compare approval status string
        const isApproved = props.approvalTrueValues.indexOf(values.statusType) !== -1;

        // fill payload
        const payload: IWorkflowApprovalPayload = {
          isApproved,
          remark: !isApproved ? values.remark : undefined
        };

        // set the promise
        promise = new Promise((resolve, reject) => {
          props.leaveApprovalDispatch.createRequest({
            resolve, 
            reject,
            companyUid: user.company.uid,
            positionUid: user.position.uid,
            leaveUid: props.match.params.leaveUid, 
            data: payload, 
          });
        });
      }
    }

    // handling promise
    promise
      .then((response: boolean) => {
        // set submitting status
        actions.setSubmitting(false);

        // clear form status
        actions.setStatus();
        
        // show flash message
        props.masterPage.flashMessage({
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
      })
      .catch((error: any) => {
        let err: IValidationErrorResponse | undefined = undefined;
        
        if (error.id) {
          err = error;
        }
        // set submitting status
        actions.setSubmitting(false);
        
        // set form status
        actions.setStatus(error);

        // error on form fields
        if (err && err.errors) {
          err.errors.forEach(item => {
            // in case to handle incorrect field on other fields
            let field = item.field;

            if (item.field === 'leaveUid') {
              field = 'statusType';
            }

            actions.setFieldError(field, props.intl.formatMessage({id: item.message}));
          });
        }

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(leaveApprovalMessage.submitFailure)
        });
      });
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
  withMasterPage,
  withLeaveApproval,
  withNotification,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(LeaveApprovalDetailView);