import { WorkflowStatusType } from '@common/classes/types';
import { RadioGroupChoice } from '@layout/components/input/radioGroup';
import { IPopupMenuOption } from '@layout/components/PopupMenu';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithNotification, withNotification } from '@layout/hoc/withNotification';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IValidationErrorResponse } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { ModuleDefinitionType, NotificationType } from '@layout/types';
import { IWorkflowApprovalPayload } from '@organization/classes/request/workflow/approval';
import { IWorkflowApprovalFormValue } from '@organization/components/workflow/approval/form/WorkflowApprovalForm';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import { TimesheetUserAction } from '@timesheet/classes/types';
import { WithTimesheetApproval, withTimesheetApproval } from '@timesheet/hoc/withTimesheetApproval';
import { timesheetMessage } from '@timesheet/locales/messages/timesheetMessage';
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

import { TimesheetApprovalDetailView } from './TimesheetApprovalDetailView';

interface IOwnRouteParams {
  timesheetUid: string;
}

interface IOwnHandler {
  handleOnLoadApi: () => void;
  handleOnSelectedMenu: (item: IPopupMenuOption) => void;
  handleOnSubmit: (values: IWorkflowApprovalFormValue, actions: FormikActions<IWorkflowApprovalFormValue>) => void;
}

interface IOwnState {
  menuOptions?: IPopupMenuOption[];
  shouldLoad: boolean;
  approvalTitle: string;
  approvalSubHeader: string;
  approvalStatusTypes: RadioGroupChoice[];
  approvalTrueValues: string[];
  approvalDialogTitle: string;
  approvalDialogContentText: string;
  approvalDialogCancelText: string;
  approvalDialogConfirmedText: string;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  setOptions: StateHandler<IOwnState>;
  setShouldLoad: StateHandler<IOwnState>;
}

export type TimesheetApprovalDetailProps
  = WithUser
  & WithLayout
  & WithMasterPage
  & WithTimesheetApproval
  & WithNotification
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnState
  & IOwnHandler
  & IOwnStateUpdaters;

const createProps: mapper<TimesheetApprovalDetailProps, IOwnState> = (props: TimesheetApprovalDetailProps): IOwnState => ({
  shouldLoad: false,
  approvalTitle: props.intl.formatMessage(timesheetMessage.approval.section.approvalTitle),
  approvalSubHeader: props.intl.formatMessage(timesheetMessage.approval.section.approvalSubHeader),
  approvalStatusTypes: [
    { value: WorkflowStatusType.Approved, label: props.intl.formatMessage(organizationMessage.workflow.option.approve) },
    { value: WorkflowStatusType.Rejected, label: props.intl.formatMessage(organizationMessage.workflow.option.reject) }
  ],
  approvalTrueValues: [WorkflowStatusType.Approved],
  approvalDialogTitle: props.intl.formatMessage(timesheetMessage.approval.confirm.submissionTitle),
  approvalDialogContentText: props.intl.formatMessage(timesheetMessage.approval.confirm.submissionContent),
  approvalDialogCancelText: props.intl.formatMessage(layoutMessage.action.cancel),
  approvalDialogConfirmedText: props.intl.formatMessage(layoutMessage.action.continue)
});

const stateUpdaters: StateUpdaters<TimesheetApprovalDetailProps, IOwnState, IOwnStateUpdaters> = {
  setShouldLoad: (state: IOwnState, props: TimesheetApprovalDetailProps) => (): Partial<IOwnState> => ({
    shouldLoad: !state.shouldLoad
  }),
  setOptions: (state: IOwnState, props: TimesheetApprovalDetailProps) => (options?: IPopupMenuOption[]): Partial<IOwnState> => ({
    menuOptions: options
  })
};

const handlerCreators: HandleCreators<TimesheetApprovalDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: TimesheetApprovalDetailProps) => () => {
    if (props.userState.user && !props.timesheetApprovalState.detail.isLoading && props.match.params.timesheetUid) {
      props.timesheetApprovalDispatch.loadDetailRequest({
        companyUid: props.userState.user.company.uid,
        positionUid: props.userState.user.position.uid,
        timesheetUid: props.match.params.timesheetUid
      });
    }
  },
  handleOnSelectedMenu: (props: TimesheetApprovalDetailProps) => (item: IPopupMenuOption) => { 
    switch (item.id) {
      case TimesheetUserAction.Refresh:
        props.setShouldLoad();
        break;
    
      default:
        break;
    }
  },
  handleOnSubmit: (props: TimesheetApprovalDetailProps) => (values: IWorkflowApprovalFormValue, actions: FormikActions<IWorkflowApprovalFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise((resolve, reject) => undefined);

    if (user) {
      // must have timesheetUid
      if (props.match.params.timesheetUid) {
        // compare approval status string
        const isApproved = props.approvalTrueValues.indexOf(values.statusType) !== -1;

        // fill payload
        const payload: IWorkflowApprovalPayload = {
          isApproved,
          remark: !isApproved ? values.remark : undefined
        };

        // set the promise
        promise = new Promise((resolve, reject) => {
          props.timesheetApprovalDispatch.createRequest({
            resolve, 
            reject,
            companyUid: user.company.uid,
            positionUid: user.position.uid,
            timesheetUid: props.match.params.timesheetUid, 
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
          message: props.intl.formatMessage(timesheetMessage.approval.message.submitSuccess)
        });
       
        // notification: mark as complete
        props.notificationDispatch.markAsComplete({
          moduleUid: ModuleDefinitionType.Timesheet,
          detailType: NotificationType.Approval,
          itemUid: props.match.params.timesheetUid
        });

        // set next load
        props.setShouldLoad();
      })
      .catch((error: IValidationErrorResponse) => {
        // set submitting status
        actions.setSubmitting(false);
        
        // set form status
        actions.setStatus(error);
        
        // error on form fields
        if (error.errors) {
          error.errors.forEach(item => {
            // in case to handle incorrect field on other fields
            let field = item.field;

            if (item.field === 'projectUid') {
              field = 'statusType';
            }

            actions.setFieldError(field, props.intl.formatMessage({id: item.message}));
          });
        }

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(timesheetMessage.approval.message.submitFailure)
        });
      });
  }
};

const lifecycles: ReactLifeCycleFunctions<TimesheetApprovalDetailProps, IOwnState> = {
  componentDidUpdate(prevProps: TimesheetApprovalDetailProps) {
    // handle updated should load
    if (this.props.shouldLoad && this.props.shouldLoad !== prevProps.shouldLoad) {
      // turn of shoul load
      this.props.setShouldLoad();

      // load from api
      this.props.handleOnLoadApi();
    }

    // handle updated route params
    if (this.props.match.params.timesheetUid !== prevProps.match.params.timesheetUid) {
      this.props.handleOnLoadApi();
    }

    // handle updated response state
    if (this.props.timesheetApprovalState.detail !== prevProps.timesheetApprovalState.detail) {
      const options: IPopupMenuOption[] = [
        {
          id: TimesheetUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !this.props.timesheetApprovalState.detail.isLoading,
          visible: true
        }
      ];

      this.props.setOptions(options);
    }
  }
};

export const TimesheetApprovalDetail = compose<TimesheetApprovalDetailProps, {}>(
  setDisplayName('TimesheetApprovalDetail'),
  withRouter,
  withUser,
  withLayout,
  withMasterPage,
  withTimesheetApproval,
  withNotification,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(TimesheetApprovalDetailView);