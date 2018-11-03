import { WorkflowStatusType } from '@common/classes/types';
import AppMenu from '@constants/AppMenu';
import { RadioGroupChoice } from '@layout/components/input/radioGroup';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { IWorkflowApprovalPayload } from '@organization/classes/request/workflow/approval';
import { WorkflowApprovalFormData } from '@organization/components/workflow/approval/WorkflowApprovalForm';
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

import { ProjectAcceptanceDetailView } from './ProjectAcceptanceDetailView';

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

export type ProjectAcceptanceDetailProps
  = WithProjectAcceptance
  & WithUser
  & WithLayout
  & WithAppBar
  & RouteComponentProps<OwnRouteParams> 
  & InjectedIntlProps
  & OwnHandler
  & OwnState;

const createProps: mapper<ProjectAcceptanceDetailProps, OwnState> = (props: ProjectAcceptanceDetailProps): OwnState => {
  const { intl } = props;

  return {
    approvalTitle: intl.formatMessage({id: 'project.acceptance.section.approval.title'}),
    approvalSubHeader: intl.formatMessage({id: 'project.acceptance.section.approval.subHeader'}),
    approvalChoices: [
      { value: WorkflowStatusType.Accepted, label: intl.formatMessage({id: 'workflow.approval.action.accept'}) },
      { value: WorkflowStatusType.Rejected, label: intl.formatMessage({id: 'workflow.approval.action.reject'}) }
    ],
    approvalTrueValue: WorkflowStatusType.Accepted,
    approvalDialogTitle: intl.formatMessage({id: 'project.dialog.approvalTitle'}),
    approvalDialogContentText: intl.formatMessage({id: 'project.dialog.approvalContent'}),
    approvalDialogCancelText: intl.formatMessage({id: 'global.action.cancel'}),
    approvalDialogConfirmedText: intl.formatMessage({id: 'global.action.continue'}),
  };
};

const handlerCreators: HandleCreators<ProjectAcceptanceDetailProps, OwnHandler> = {
  handleValidate: (props: ProjectAcceptanceDetailProps) => (formData: WorkflowApprovalFormData) => { 
    const errors = {};
  
    const requiredFields = ['isApproved', 'remark'];
  
    requiredFields.forEach(field => {
      if (!formData[field] || isNullOrUndefined(formData[field])) {
        errors[field] = props.intl.formatMessage({id: `workflow.approval.field.${field}.required`});
      }
    });
    
    return errors;
  },
  handleSubmit: (props: ProjectAcceptanceDetailProps) => (formData: WorkflowApprovalFormData) => { 
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
    const isApproved = formData.isApproved === WorkflowStatusType.Approved;

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
  handleSubmitSuccess: (props: ProjectAcceptanceDetailProps) => (response: boolean) => {
    const { intl, history } = props;
    const { alertAdd } = props.layoutDispatch;
    
    alertAdd({
      time: new Date(),
      message: intl.formatMessage(projectApprovalMessage.updateSuccess),
    });

    history.push('/project/acceptances');
  },
  handleSubmitFail: (props: ProjectAcceptanceDetailProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
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
        message: intl.formatMessage(projectApprovalMessage.updateFailure),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  },
  handleRefresh: (props: ProjectAcceptanceDetailProps) => () => { 
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

const lifecycles: ReactLifeCycleFunctions<ProjectAcceptanceDetailProps, {}> = {
  componentDidMount() {
    const { 
      layoutDispatch, appBarDispatch, intl, 
      handleRefresh
    } = this.props;

    layoutDispatch.changeView({
      uid: AppMenu.ProjectAssignmentAcceptance,
      parentUid: AppMenu.ProjectAssignment,
      title: intl.formatMessage(projectMessage.acceptance.page.detailTitle),
      subTitle : intl.formatMessage(projectMessage.acceptance.page.detailSubHeader)
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
  componentWillReceiveProps(nextProps: ProjectAcceptanceDetailProps) {
    if (nextProps.projectAcceptanceState.detail.response !== this.props.projectAcceptanceState.detail.response) {
      const { intl } = nextProps;
      const { assignMenus } = nextProps.appBarDispatch;

      const currentMenus = [
        {
          id: ProjectUserAction.Refresh,
          name: intl.formatMessage({id: 'global.action.refresh'}),
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

export const ProjectAcceptanceDetail = compose<ProjectAcceptanceDetailProps, {}>(
  withUser,
  withLayout,
  withAppBar,
  withRouter,
  withProjectAcceptance,
  injectIntl,
  withStateHandlers<OwnState, {}, {}>(createProps, {}),
  withHandlers<ProjectAcceptanceDetailProps, OwnHandler>(handlerCreators),
  lifecycle<ProjectAcceptanceDetailProps, {}>(lifecycles),
)(ProjectAcceptanceDetailView);