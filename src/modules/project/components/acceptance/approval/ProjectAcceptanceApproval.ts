import { WorkflowStatusType } from '@common/classes/types';
import { RadioGroupChoice } from '@layout/components/input/radioGroup';
import { IPopupMenuOption } from '@layout/components/PopupMenu';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithNotification, withNotification } from '@layout/hoc/withNotification';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { ModuleDefinitionType, NotificationType } from '@layout/types';
import { IWorkflowApprovalPayload } from '@organization/classes/request/workflow/approval';
import { WorkflowApprovalFormData } from '@organization/components/workflow/approval/WorkflowApprovalForm';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import { ProjectUserAction } from '@project/classes/types';
import { WithProjectAcceptance, withProjectAcceptance } from '@project/hoc/withProjectAcceptance';
import { projectApprovalMessage } from '@project/locales/messages/projectApprovalMessage';
import { projectMessage } from '@project/locales/messages/projectMessage';
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
  handleOnValidate: (payload: WorkflowApprovalFormData) => FormErrors;
  handleOnSubmit: (payload: WorkflowApprovalFormData) => void;
  handleOnSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleOnSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

export type ProjectAcceptanceApprovalProps
  = WithProjectAcceptance
  & WithUser
  & WithLayout
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
  approvalChoices: [
    { value: WorkflowStatusType.Accepted, label: props.intl.formatMessage(organizationMessage.workflow.option.accept) },
    { value: WorkflowStatusType.Rejected, label: props.intl.formatMessage(organizationMessage.workflow.option.reject) }
  ],
  approvalTrueValue: WorkflowStatusType.Accepted,
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
  handleOnValidate: (props: ProjectAcceptanceApprovalProps) => (formData: WorkflowApprovalFormData) => { 
    const errors = {};
  
    const requiredFields = ['isApproved', 'remark'];
  
    requiredFields.forEach(field => {
      if (!formData[field] || isNullOrUndefined(formData[field])) {
        errors[field] = props.intl.formatMessage(organizationMessage.workflow.fieldFor(field, 'fieldRequired'));
      }
    });
    
    return errors;
  },
  handleOnSubmit: (props: ProjectAcceptanceApprovalProps) => (formData: WorkflowApprovalFormData) => { 
    const { match, intl } = props;
    const { user } = props.userState;
    const { createRequest } = props.projectAcceptanceDispatch;

    // user checking
    if (!user) {
      return Promise.reject('user was not found');
    }

    // props checking
    if (!match.params.assignmentUid) {
      const message = intl.formatMessage(projectApprovalMessage.emptyProps);

      return Promise.reject(message);
    }

    // compare approval status string
    const isApproved = formData.isApproved === WorkflowStatusType.Accepted;

    // generate payload
    const payload: IWorkflowApprovalPayload = {
      isApproved,
      remark: !isApproved ? formData.remark : undefined
    };

    // dispatch request
    return new Promise((resolve, reject) => {
      createRequest({
        resolve, 
        reject,
        assignmentUid: match.params.assignmentUid, 
        assignmentItemUid: match.params.assignmentItemUid, 
        data: payload, 
      });
    });
  },
  handleOnSubmitSuccess: (props: ProjectAcceptanceApprovalProps) => (response: boolean) => {
    props.layoutDispatch.alertAdd({
      time: new Date(),
      message: props.intl.formatMessage(projectMessage.acceptance.message.approvalSuccess),
    });

    props.setShouldLoad();

    // notification: mark as complete
    props.notificationDispatch.markAsComplete({
      moduleUid: ModuleDefinitionType.ProjectAssignment,
      detailType: NotificationType.Assignment,
      itemUid: props.match.params.assignmentUid
    });
  },
  handleOnSubmitFail: (props: ProjectAcceptanceApprovalProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
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
        message: intl.formatMessage(projectMessage.acceptance.message.approvalFailure),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
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
  withNotification,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(ProjectAcceptanceApprovalView);