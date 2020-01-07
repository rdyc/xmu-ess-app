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
import { WithProjectApproval, withProjectApproval } from '@project/hoc/withProjectApproval';
import { projectApprovalMessage } from '@project/locales/messages/projectApprovalMessage';
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

import { ProjectApprovalDetailView } from './ProjectApprovalDetailView';

interface IOwnRouteParams {
  projectUid: string;
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

export type ProjectApprovalDetailProps
  = WithProjectApproval
  & WithUser
  & WithLayout
  & WithMasterPage
  & WithNotification
  & RouteComponentProps<IOwnRouteParams> 
  & InjectedIntlProps
  & IOwnHandler
  & IOwnState
  & IOwnStateUpdater;

const createProps: mapper<ProjectApprovalDetailProps, IOwnState> = (props: ProjectApprovalDetailProps): IOwnState => ({
  shouldLoad: false,
  approvalTitle: props.intl.formatMessage(projectMessage.registration.section.approvalTitle),
  approvalSubHeader: props.intl.formatMessage(projectMessage.registration.section.approvalSubHeader),
  approvalStatusTypes: [
    { value: WorkflowStatusType.Approved, label: props.intl.formatMessage(organizationMessage.workflow.option.approve) },
    { value: WorkflowStatusType.Rejected, label: props.intl.formatMessage(organizationMessage.workflow.option.reject) }
  ],
  approvalTrueValues: [WorkflowStatusType.Approved],
  approvalDialogTitle: props.intl.formatMessage(projectMessage.approval.confirm.submissionTitle),
  approvalDialogContentText: props.intl.formatMessage(projectMessage.approval.confirm.submissionContent),
  approvalDialogCancelText: props.intl.formatMessage(layoutMessage.action.cancel),
  approvalDialogConfirmedText: props.intl.formatMessage(layoutMessage.action.continue)
});

const stateUpdaters: StateUpdaters<ProjectApprovalDetailProps, IOwnState, IOwnStateUpdater> = {
  setShouldLoad: (state: IOwnState, props: ProjectApprovalDetailProps) => (): Partial<IOwnState> => ({
    shouldLoad: !state.shouldLoad
  }),
  setOptions: (state: IOwnState, props: ProjectApprovalDetailProps) => (options?: IPopupMenuOption[]): Partial<IOwnState> => ({
    menuOptions: options
  })
};

const handlerCreators: HandleCreators<ProjectApprovalDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: ProjectApprovalDetailProps) => () => { 
    if (props.userState.user && !props.projectApprovalState.detail.isLoading && props.match.params.projectUid) {
      props.projectApprovalDispatch.loadDetailRequest({
        companyUid: props.userState.user.company.uid,
        positionUid: props.userState.user.position.uid,
        projectUid: props.match.params.projectUid
      });
    }
  },
  handleOnSelectedMenu: (props: ProjectApprovalDetailProps) => (item: IPopupMenuOption) => {
    switch (item.id) {
      case ProjectUserAction.Refresh:
        props.setShouldLoad();
        break;
    
      default:
        break;
    }
  },
  handleOnSubmit: (props: ProjectApprovalDetailProps) => (values: IWorkflowApprovalFormValue, actions: FormikActions<IWorkflowApprovalFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise((resolve, reject) => undefined);

    if (user) {
      // must have projectUid
      if (props.match.params.projectUid) {
        // compare approval status string
        const isApproved = props.approvalTrueValues.indexOf(values.statusType) !== -1;

        // fill payload
        const payload: IWorkflowApprovalPayload = {
          isApproved,
          remark: !isApproved ? values.remark : undefined
        };

        // set the promise
        promise = new Promise((resolve, reject) => {
          props.projectApprovalDispatch.createRequest({
            resolve, 
            reject,
            companyUid: user.company.uid,
            positionUid: user.position.uid,
            projectUid: props.match.params.projectUid, 
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
          message: props.intl.formatMessage(projectApprovalMessage.submitSuccess)
        });
       
        // notification: mark as complete
        props.notificationDispatch.markAsComplete({
          moduleUid: ModuleDefinitionType.ProjectRegistration,
          detailType: NotificationType.Approval,
          itemUid: props.match.params.projectUid
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

            if (item.field === 'projectUid') {
              field = 'statusType';
            }

            actions.setFieldError(field, props.intl.formatMessage({id: item.message}));
          });
        }

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(projectApprovalMessage.submitFailure)
        });
      });
  }
};

const lifecycles: ReactLifeCycleFunctions<ProjectApprovalDetailProps, IOwnState> = {
  componentDidUpdate(prevProps: ProjectApprovalDetailProps) {
    // handle updated should load
    if (this.props.shouldLoad && this.props.shouldLoad !== prevProps.shouldLoad) {
      // turn of shoul load
      this.props.setShouldLoad();

      // load from api
      this.props.handleOnLoadApi();
    }

    // handle updated route params
    if (this.props.match.params.projectUid !== prevProps.match.params.projectUid) {
      this.props.handleOnLoadApi();
    }

    // handle updated response state
    if (this.props.projectApprovalState.detail !== prevProps.projectApprovalState.detail) {
      const options: IPopupMenuOption[] = [
        {
          id: ProjectUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !this.props.projectApprovalState.detail.isLoading,
          visible: true
        }
      ];

      this.props.setOptions(options);
    }
  }
};

export const ProjectApprovalDetail = compose<ProjectApprovalDetailProps, {}>(
  setDisplayName('ProjectApprovalDetail'),
  withRouter,
  withUser,
  withLayout,
  withMasterPage,
  withProjectApproval,
  withNotification,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(ProjectApprovalDetailView);