import { WorkflowStatusType } from '@common/classes/types';
import { RadioGroupChoice } from '@layout/components/input/radioGroup';
import { ModuleDefinition, NotificationType } from '@layout/helper/redirector';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithNotification, withNotification } from '@layout/hoc/withNotification';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { IWorkflowApprovalPayload } from '@organization/classes/request/workflow/approval';
import { WorkflowApprovalFormData } from '@organization/components/workflow/approval/WorkflowApprovalForm';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import { WithProjectApproval, withProjectApproval } from '@project/hoc/withProjectApproval';
import { projectApprovalMessage } from '@project/locales/messages/projectApprovalMessage';
import { projectMessage } from '@project/locales/messages/projectMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  compose,
  HandleCreators,
  mapper,
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

interface IOwnHandler {
  handleValidate: (payload: WorkflowApprovalFormData) => FormErrors;
  handleSubmit: (payload: WorkflowApprovalFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface IOwnRouteParams {
  projectUid: string;
}

interface IOwnState {
  shouldDataReload: boolean;
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
  setDataload: StateHandler<IOwnState>;
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
  shouldDataReload: false,
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

const stateUpdaters: StateUpdaters<{}, IOwnState, IOwnStateUpdater> = {
  setDataload: (prevState: IOwnState) => (): Partial<IOwnState> => ({
    shouldDataReload: !prevState.shouldDataReload
  })
};

const handlerCreators: HandleCreators<ProjectApprovalDetailProps, IOwnHandler> = {
  handleValidate: (props: ProjectApprovalDetailProps) => (formData: WorkflowApprovalFormData) => { 
    const errors = {};
  
    const requiredFields = ['isApproved', 'remark'];
  
    requiredFields.forEach(field => {
      if (!formData[field] || isNullOrUndefined(formData[field])) {
        errors[field] = props.intl.formatMessage(organizationMessage.workflow.fieldFor(field, 'fieldRequired'));
      }
    });
    
    return errors;
  },
  handleSubmit: (props: ProjectApprovalDetailProps) => (formData: WorkflowApprovalFormData) => { 
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
  handleSubmitSuccess: (props: ProjectApprovalDetailProps) => (response: boolean) => {
    props.layoutDispatch.alertAdd({
      time: new Date(),
      message: props.intl.formatMessage(projectApprovalMessage.submitSuccess)
    });

    props.setDataload();

    // notification: mark as complete
    props.notificationDispatch.markAsComplete({
      moduleUid: ModuleDefinition.ProjectRegistration,
      detailType: NotificationType.Approval,
      itemUid: props.match.params.projectUid
    });
  },
  handleSubmitFail: (props: ProjectApprovalDetailProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
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
)(ProjectApprovalDetailView);