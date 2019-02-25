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
import { WithProjectApproval, withProjectApproval } from '@project/hoc/withProjectApproval';
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

import { ProjectApprovalDetailView } from './ProjectApprovalDetailView';

interface IOwnRouteParams {
  projectUid: string;
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
  handleOnValidate: (payload: WorkflowApprovalFormData) => FormErrors;
  handleOnSubmit: (payload: WorkflowApprovalFormData) => void;
  handleOnSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleOnSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

export type ProjectApprovalDetailProps
  = WithProjectApproval
  & WithUser
  & WithLayout
  & WithNotification
  & RouteComponentProps<IOwnRouteParams> 
  & InjectedIntlProps
  & IOwnHandler
  & IOwnState
  & IOwnStateUpdater;

const createProps: mapper<ProjectApprovalDetailProps, IOwnState> = (props: ProjectApprovalDetailProps): IOwnState => ({
  shoulLoad: false,
  approvalTitle: props.intl.formatMessage(projectMessage.registration.section.approvalTitle),
  approvalSubHeader: props.intl.formatMessage(projectMessage.registration.section.approvalSubHeader),
  approvalChoices: [
    { value: WorkflowStatusType.Approved, label: props.intl.formatMessage(organizationMessage.workflow.option.approve) },
    { value: WorkflowStatusType.Rejected, label: props.intl.formatMessage(organizationMessage.workflow.option.reject) }
  ],
  approvalTrueValue: WorkflowStatusType.Approved,
  approvalDialogTitle: props.intl.formatMessage(projectMessage.approval.confirm.submissionTitle),
  approvalDialogContentText: props.intl.formatMessage(projectMessage.approval.confirm.submissionContent),
  approvalDialogCancelText: props.intl.formatMessage(layoutMessage.action.cancel),
  approvalDialogConfirmedText: props.intl.formatMessage(layoutMessage.action.continue)
});

const stateUpdaters: StateUpdaters<ProjectApprovalDetailProps, IOwnState, IOwnStateUpdater> = {
  setShouldLoad: (state: IOwnState, props: ProjectApprovalDetailProps) => (): Partial<IOwnState> => ({
    shoulLoad: !state.shoulLoad
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
    props.setShouldLoad();
  },
  handleOnValidate: (props: ProjectApprovalDetailProps) => (formData: WorkflowApprovalFormData) => { 
    const errors = {};
  
    const requiredFields = ['isApproved', 'remark'];
  
    requiredFields.forEach(field => {
      if (!formData[field] || isNullOrUndefined(formData[field])) {
        errors[field] = props.intl.formatMessage(organizationMessage.workflow.fieldFor(field, 'fieldRequired'));
      }
    });
    
    return errors;
  },
  handleOnSubmit: (props: ProjectApprovalDetailProps) => (formData: WorkflowApprovalFormData) => { 
    const { match, intl } = props;
    const { user } = props.userState;
    const { createRequest } = props.projectApprovalDispatch;

    // user checking
    if (!user) {
      return Promise.reject('user was not found');
    }

    // props checking
    if (!match.params.projectUid) {
      const message = intl.formatMessage(projectApprovalMessage.emptyProps);

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
        projectUid: match.params.projectUid, 
        data: payload, 
      });
    });
  },
  handleOnSubmitSuccess: (props: ProjectApprovalDetailProps) => (response: boolean) => {
    // add success alert
    props.layoutDispatch.alertAdd({
      time: new Date(),
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
  },
  handleOnSubmitFail: (props: ProjectApprovalDetailProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
    if (errors) {
      // validation errors from server (400: Bad Request)
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: isObject(submitError) ? submitError.message : submitError
      });
    } else {
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: props.intl.formatMessage(projectApprovalMessage.submitFailure),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

const lifecycles: ReactLifeCycleFunctions<ProjectApprovalDetailProps, IOwnState> = {
  componentDidUpdate(prevProps: ProjectApprovalDetailProps) {
    // handle updated should load
    if (this.props.shoulLoad && this.props.shoulLoad !== prevProps.shoulLoad) {
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
  withProjectApproval,
  withNotification,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(ProjectApprovalDetailView);