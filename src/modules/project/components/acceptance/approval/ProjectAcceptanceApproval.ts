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
import { ProjectUserAction } from '@project/classes/types';
import { WithProjectAcceptance, withProjectAcceptance } from '@project/hoc/withProjectAcceptance';
import { projectMessage } from '@project/locales/messages/projectMessage';
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

import { ProjectAcceptanceApprovalView } from './ProjectAcceptanceApprovalView';

interface IOwnRouteParams {
  assignmentUid: string;
  assignmentItemUid: string;
}

interface IOwnState {
  shouldLoad: boolean;
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

export type ProjectAcceptanceApprovalProps
  = WithProjectAcceptance
  & WithUser
  & WithLayout
  & WithMasterPage
  & WithNotification
  & RouteComponentProps<IOwnRouteParams> 
  & InjectedIntlProps
  & IOwnHandler
  & IOwnState
  & IOwnStateUpdater;

const createProps: mapper<ProjectAcceptanceApprovalProps, IOwnState> = (props: ProjectAcceptanceApprovalProps): IOwnState => ({
  shouldLoad: false,
  approvalTitle: props.intl.formatMessage(projectMessage.acceptance.section.approvalTitle),
  approvalSubHeader: props.intl.formatMessage(projectMessage.acceptance.section.approvalSubHeader),
  approvalStatusTypes: [
    { value: WorkflowStatusType.Accepted, label: props.intl.formatMessage(organizationMessage.workflow.option.accept) },
    { value: WorkflowStatusType.Rejected, label: props.intl.formatMessage(organizationMessage.workflow.option.reject) }
  ],
  approvalTrueValues: [WorkflowStatusType.Accepted],
  approvalDialogTitle: props.intl.formatMessage(projectMessage.acceptance.confirm.approvalTitle),
  approvalDialogContentText: props.intl.formatMessage(projectMessage.acceptance.confirm.approvalContent),
  approvalDialogCancelText: props.intl.formatMessage(layoutMessage.action.cancel),
  approvalDialogConfirmedText: props.intl.formatMessage(layoutMessage.action.continue),
});

const stateUpdaters: StateUpdaters<ProjectAcceptanceApprovalProps, IOwnState, IOwnStateUpdater> = {
  setShouldLoad: (state: IOwnState, props: ProjectAcceptanceApprovalProps) => (): Partial<IOwnState> => ({
    shouldLoad: !state.shouldLoad
  }),
  setOptions: (state: IOwnState, props: ProjectAcceptanceApprovalProps) => (options?: IPopupMenuOption[]): Partial<IOwnState> => ({
    menuOptions: options
  })
};

const handlerCreators: HandleCreators<ProjectAcceptanceApprovalProps, IOwnHandler> = {
  handleOnLoadApi: (props: ProjectAcceptanceApprovalProps) => () => { 
    if (props.userState.user && !props.projectAcceptanceState.detail.isLoading && props.match.params.assignmentItemUid) {
      props.projectAcceptanceDispatch.loadDetailRequest({
        assignmentUid: props.match.params.assignmentUid,
        assignmentItemUid: props.match.params.assignmentItemUid
      });
    }
  },
  handleOnSelectedMenu: (props: ProjectAcceptanceApprovalProps) => (item: IPopupMenuOption) => {
    switch (item.id) {
      case ProjectUserAction.Refresh:
        props.setShouldLoad();
        break;
    
      default:
        break;
    }
  },
  handleOnSubmit: (props: ProjectAcceptanceApprovalProps) => (values: IWorkflowApprovalFormValue, actions: FormikActions<IWorkflowApprovalFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise((resolve, reject) => undefined);

    if (user) {
      // must have assignmentUid
      if (props.match.params.assignmentUid) {
        // compare approval status string
        const isApproved = props.approvalTrueValues.indexOf(values.statusType) !== -1;

        // fill payload
        const payload: IWorkflowApprovalPayload = {
          isApproved,
          remark: !isApproved ? values.remark : undefined
        };

        // set the promise
        promise = new Promise((resolve, reject) => {
          props.projectAcceptanceDispatch.createRequest({
            resolve, 
            reject,
            assignmentUid: props.match.params.assignmentUid, 
            assignmentItemUid: props.match.params.assignmentItemUid, 
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
          message: props.intl.formatMessage(projectMessage.acceptance.message.approvalSuccess)
        });
       
        // notification: mark as complete
        props.notificationDispatch.markAsComplete({
          moduleUid: ModuleDefinitionType.ProjectAssignment,
          detailType: NotificationType.Assignment,
          itemUid: props.match.params.assignmentUid
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

            if ((['assignmentUid', 'assignmentItemUid']).indexOf(item.field) !== -1) {
              field = 'statusType';
            }

            actions.setFieldError(field, props.intl.formatMessage({id: item.message}));
          });
        }

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(projectMessage.acceptance.message.approvalFailure)
        });
      });
  }
};

const lifecycles: ReactLifeCycleFunctions<ProjectAcceptanceApprovalProps, IOwnState> = {
  componentDidUpdate(prevProps: ProjectAcceptanceApprovalProps) {
    // handle updated should load
    if (this.props.shouldLoad && this.props.shouldLoad !== prevProps.shouldLoad) {
      // turn of shoul load
      this.props.setShouldLoad();

      // load from api
      this.props.handleOnLoadApi();
    }

    // handle updated route params
    if (this.props.match.params.assignmentItemUid !== prevProps.match.params.assignmentItemUid) {
      this.props.handleOnLoadApi();
    }

    // handle updated response state
    if (this.props.projectAcceptanceState.detail !== prevProps.projectAcceptanceState.detail) {
      const options: IPopupMenuOption[] = [
        {
          id: ProjectUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !this.props.projectAcceptanceState.detail.isLoading,
          visible: true
        }
      ];

      this.props.setOptions(options);
    }
  }
};

export const ProjectAcceptanceApproval = compose<ProjectAcceptanceApprovalProps, {}>(
  setDisplayName('ProjectAcceptanceApproval'),
  withRouter,
  withUser,
  withLayout,
  withProjectAcceptance,
  withMasterPage,
  withNotification,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(ProjectAcceptanceApprovalView);