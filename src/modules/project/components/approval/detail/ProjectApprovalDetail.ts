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
import { WithProjectApproval, withProjectApproval } from '@project/hoc/withProjectApproval';
import { projectApprovalMessage } from '@project/locales/messages/projectApprovalMessage';
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

import { ProjectApprovalDetailView } from './ProjectApprovalDetailView';

interface OwnHandler {
  handleRefresh: () => void;
  handleValidate: (payload: WorkflowApprovalFormData) => FormErrors;
  handleSubmit: (payload: WorkflowApprovalFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface OwnRouteParams {
  projectUid: string;
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

export type ProjectApprovalDetailProps
  = WithProjectApproval
  & WithUser
  & WithLayout
  & WithAppBar
  & RouteComponentProps<OwnRouteParams> 
  & InjectedIntlProps
  & OwnHandler
  & OwnState;

const handlerCreators: HandleCreators<ProjectApprovalDetailProps, OwnHandler> = {
  handleValidate: (props: ProjectApprovalDetailProps) => (formData: WorkflowApprovalFormData) => { 
    const errors = {};
  
    const requiredFields = ['isApproved', 'remark'];
  
    requiredFields.forEach(field => {
      if (!formData[field] || isNullOrUndefined(formData[field])) {
        errors[field] = props.intl.formatMessage({id: `workflow.approval.field.${field}.required`});
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
      remark: !isApproved ? formData.remark : null
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
    const { intl, history } = props;
    const { alertAdd } = props.layoutDispatch;
    
    alertAdd({
      time: new Date(),
      message: intl.formatMessage(projectApprovalMessage.updateSuccess),
    });

    history.push('/project/approvals');
  },
  handleSubmitFail: (props: ProjectApprovalDetailProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
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
  handleRefresh: (props: ProjectApprovalDetailProps) => () => { 
    const { match } = props;
    const { user } = props.userState;
    const { loadDetailRequest } = props.projectApprovalDispatch;

    if (user) {
      loadDetailRequest({
        companyUid: user.company.uid,
        positionUid: user.position.uid,
        projectUid: match.params.projectUid
      });
    }
  }
};

const lifecycles: ReactLifeCycleFunctions<ProjectApprovalDetailProps, {}> = {
  componentDidMount() {
    const { 
      match, layoutDispatch, appBarDispatch, intl, 
      handleRefresh
    } = this.props;

    const { user } = this.props.userState;
    const { loadDetailRequest } = this.props.projectApprovalDispatch;

    layoutDispatch.changeView({
      uid: AppMenu.ProjectRegistrationRequest,
      parentUid: AppMenu.ProjectRegistration,
      title: intl.formatMessage({id: 'project.detail.title'}),
      subTitle : intl.formatMessage({id: 'project.detail.subTitle'})
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

    if (user) {
      loadDetailRequest({
        projectUid: match.params.projectUid,
        companyUid: user.company.uid,
        positionUid: user.position.uid,
      });
    }
  },
  componentWillReceiveProps(nextProps: ProjectApprovalDetailProps) {
    if (nextProps.projectApprovalState.detail.response !== this.props.projectApprovalState.detail.response) {
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

const createProps: mapper<ProjectApprovalDetailProps, OwnState> = (props: ProjectApprovalDetailProps): OwnState => {
  const { intl } = props;

  return {
    approvalTitle: intl.formatMessage({id: 'project.registration.section.approval.title'}),
    approvalSubHeader: intl.formatMessage({id: 'project.registration.section.approval.subHeader'}),
    approvalChoices: [
      { value: WorkflowStatusType.Approved, label: intl.formatMessage({id: 'workflow.approval.action.approve'}) },
      { value: WorkflowStatusType.Rejected, label: intl.formatMessage({id: 'workflow.approval.action.reject'}) }
    ],
    approvalTrueValue: WorkflowStatusType.Approved,
    approvalDialogTitle: intl.formatMessage({id: 'project.dialog.approvalTitle'}),
    approvalDialogContentText: intl.formatMessage({id: 'project.dialog.approvalContent'}),
    approvalDialogCancelText: intl.formatMessage({id: 'global.action.cancel'}),
    approvalDialogConfirmedText: intl.formatMessage({id: 'global.action.continue'}),
  };
};

export const ProjectApprovalDetail = compose<ProjectApprovalDetailProps, {}>(
  withUser,
  withLayout,
  withAppBar,
  withRouter,
  withProjectApproval,
  injectIntl,
  withStateHandlers<OwnState, {}, {}>(createProps, {}),
  withHandlers<ProjectApprovalDetailProps, OwnHandler>(handlerCreators),
  lifecycle<ProjectApprovalDetailProps, {}>(lifecycles),
)(ProjectApprovalDetailView);