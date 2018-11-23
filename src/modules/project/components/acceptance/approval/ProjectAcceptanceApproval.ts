import { WorkflowStatusType } from '@common/classes/types';
import AppMenu from '@constants/AppMenu';
import { RadioGroupChoice } from '@layout/components/input/radioGroup';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
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
  withHandlers,
  withStateHandlers,
} from 'recompose';
import { Dispatch } from 'redux';
import { FormErrors } from 'redux-form';
import { isNullOrUndefined, isObject } from 'util';

import { ProjectAcceptanceApprovalView } from './ProjectAcceptanceApprovalView';

interface OwnHandler {
  handleRefresh: () => void;
  handleValidate: (payload: WorkflowApprovalFormData) => FormErrors;
  handleSubmit: (payload: WorkflowApprovalFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface OwnRouteParams {
  assignmentUid: string;
  assignmentItemUid: string;
}

interface OwnState {
  approvalTitle: string;
  approvalSubHeader: string;
  approvalChoices: RadioGroupChoice[];
  approvalTrueValue: string;
  approvalDialogTitle: string;
  approvalDialogContentText: string;
  approvalDialogCancelText: string;
  approvalDialogConfirmedText: string;
}

export type ProjectAcceptanceApprovalProps
  = WithProjectAcceptance
  & WithUser
  & WithLayout
  & WithAppBar
  & RouteComponentProps<OwnRouteParams> 
  & InjectedIntlProps
  & OwnHandler
  & OwnState;

const createProps: mapper<ProjectAcceptanceApprovalProps, OwnState> = (props: ProjectAcceptanceApprovalProps): OwnState => {
  const { intl } = props;

  return {
    approvalTitle: intl.formatMessage(projectMessage.acceptance.section.approvalTitle),
    approvalSubHeader: intl.formatMessage(projectMessage.acceptance.section.approvalSubHeader),
    approvalChoices: [
      { value: WorkflowStatusType.Accepted, label: intl.formatMessage(organizationMessage.workflow.option.accept) },
      { value: WorkflowStatusType.Rejected, label: intl.formatMessage(organizationMessage.workflow.option.reject) }
    ],
    approvalTrueValue: WorkflowStatusType.Accepted,
    approvalDialogTitle: intl.formatMessage(projectMessage.acceptance.confirm.approvalTitle),
    approvalDialogContentText: intl.formatMessage(projectMessage.acceptance.confirm.approvalContent),
    approvalDialogCancelText: intl.formatMessage(layoutMessage.action.cancel),
    approvalDialogConfirmedText: intl.formatMessage(layoutMessage.action.continue),
  };
};

const handlerCreators: HandleCreators<ProjectAcceptanceApprovalProps, OwnHandler> = {
  handleValidate: (props: ProjectAcceptanceApprovalProps) => (formData: WorkflowApprovalFormData) => { 
    const errors = {};
  
    const requiredFields = ['isApproved', 'remark'];
  
    requiredFields.forEach(field => {
      if (!formData[field] || isNullOrUndefined(formData[field])) {
        errors[field] = props.intl.formatMessage(organizationMessage.workflow.fieldFor(field, 'fieldRequired'));
      }
    });
    
    return errors;
  },
  handleSubmit: (props: ProjectAcceptanceApprovalProps) => (formData: WorkflowApprovalFormData) => { 
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
      remark: !isApproved ? formData.remark : null
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
  handleSubmitSuccess: (props: ProjectAcceptanceApprovalProps) => (response: boolean) => {
    const { intl, match, history } = props;
    const { alertAdd } = props.layoutDispatch;
    
    alertAdd({
      time: new Date(),
      message: intl.formatMessage(projectMessage.acceptance.message.approvalSuccess),
    });

    history.push(`/project/acceptances/${match.params.assignmentUid}`);
  },
  handleSubmitFail: (props: ProjectAcceptanceApprovalProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
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
  },
  handleRefresh: (props: ProjectAcceptanceApprovalProps) => () => { 
    const { match } = props;
    const { user } = props.userState;
    const { isLoading } = props.projectAcceptanceState.detail;
    const { loadDetailRequest } = props.projectAcceptanceDispatch;

    if (user && !isLoading) { 
      loadDetailRequest({
        assignmentUid: match.params.assignmentUid,
        assignmentItemUid: match.params.assignmentItemUid
      });
    }
  }
};

const lifecycles: ReactLifeCycleFunctions<ProjectAcceptanceApprovalProps, {}> = {
  componentDidMount() {
    const { 
      layoutDispatch, appBarDispatch, intl, 
      handleRefresh
    } = this.props;

    layoutDispatch.changeView({
      uid: AppMenu.ProjectAssignmentAcceptance,
      parentUid: AppMenu.ProjectAssignment,
      title: intl.formatMessage(projectMessage.acceptance.page.approvalTitle),
      subTitle : intl.formatMessage(projectMessage.acceptance.page.approvalSubHeader)
    });

    layoutDispatch.navBackShow();
    layoutDispatch.moreShow();
    
    const handleMenuClick = (menu: IAppBarMenu): void => {
      switch (menu.id) {
        case ProjectUserAction.Refresh:
          handleRefresh();
          break;

        default:
          break;
      }
    };

    appBarDispatch.assignCallback(handleMenuClick);

    handleRefresh();
  },
  componentWillReceiveProps(nextProps: ProjectAcceptanceApprovalProps) {
    if (nextProps.projectAcceptanceState.detail.response !== this.props.projectAcceptanceState.detail.response) {
      const { intl } = nextProps;
      const { assignMenus } = nextProps.appBarDispatch;

      const currentMenus = [
        {
          id: ProjectUserAction.Refresh,
          name: intl.formatMessage(layoutMessage.action.refresh),
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

export const ProjectAcceptanceApproval = compose<ProjectAcceptanceApprovalProps, {}>(
  withUser,
  withLayout,
  withAppBar,
  withRouter,
  withProjectAcceptance,
  injectIntl,
  withStateHandlers<OwnState, {}, {}>(createProps, {}),
  withHandlers<ProjectAcceptanceApprovalProps, OwnHandler>(handlerCreators),
  lifecycle<ProjectAcceptanceApprovalProps, {}>(lifecycles),
)(ProjectAcceptanceApprovalView);