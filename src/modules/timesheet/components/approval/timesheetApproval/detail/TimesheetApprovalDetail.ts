import { WorkflowStatusType } from '@common/classes/types';
import AppMenu from '@constants/AppMenu';
import { RadioGroupChoice } from '@layout/components/input/radioGroup';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { IWorkflowApprovalPayload } from '@organization/classes/request/workflow/approval';
import { WorkflowApprovalFormData } from '@organization/components/workflow/approval/WorkflowApprovalForm';
import { TimesheetUserAction } from '@timesheet/classes/types';
import { WithTimesheetApproval, withTimesheetApproval } from '@timesheet/hoc/withTimesheetApproval';
import { timesheetApprovalMessage } from '@timesheet/locales/messages/timesheetApprovalMessage';
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

import { TimesheetApprovalDetailView } from './TimesheetApprovalDetailView';

interface OwnHandler {
  handleRefresh: () => void;
  handleValidate: (payload: WorkflowApprovalFormData) => FormErrors;
  handleSubmit: (payload: WorkflowApprovalFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface OwnRouteParams {
  timesheetUid: string;
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

export type TimesheetApprovalDetailProps
  = WithTimesheetApproval
  & WithUser
  & WithLayout
  & WithAppBar
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnHandler
  & OwnState;

const handlerCreators: HandleCreators<TimesheetApprovalDetailProps, OwnHandler> = {
  handleValidate: (props: TimesheetApprovalDetailProps) => (formData: WorkflowApprovalFormData) => {
    const errors = {};

    const requiredFields = ['isApproved', 'remark'];

    requiredFields.forEach(field => {
      if (!formData[field] || isNullOrUndefined(formData[field])) {
        errors[field] = props.intl.formatMessage({ id: `workflow.approval.field.${field}.required` });
      }
    });

    return errors;
  },
  handleSubmit: (props: TimesheetApprovalDetailProps) => (formData: WorkflowApprovalFormData) => {
    const { match, intl } = props;
    const { user } = props.userState;
    const { createRequest } = props.timesheetApprovalDispatch;

    // user checking
    if (!user) {
      return Promise.reject('user was not found');
    }

    // props checking
    if (!match.params.timesheetUid) {
      const message = intl.formatMessage(timesheetApprovalMessage.emptyProps);

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
        timesheetUid: match.params.timesheetUid,
        data: payload,
      });
    });
  },
  handleSubmitSuccess: (props: TimesheetApprovalDetailProps) => (response: boolean) => {
    const { intl, history } = props;
    const { alertAdd } = props.layoutDispatch;

    alertAdd({
      time: new Date(),
      message: intl.formatMessage(timesheetApprovalMessage.updateSuccess),
    });

    history.push('/approval/timesheet/');
  },
  handleSubmitFail: (props: TimesheetApprovalDetailProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
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
        message: intl.formatMessage(timesheetApprovalMessage.updateFailure),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  },
  handleRefresh: (props: TimesheetApprovalDetailProps) => () => {
    const { match } = props;
    const { user } = props.userState;
    const { loadDetailRequest } = props.timesheetApprovalDispatch;

    if (user) {
      loadDetailRequest({
        companyUid: user.company.uid,
        positionUid: user.position.uid,
        timesheetUid: match.params.timesheetUid
      });
    }
  }
};

const lifecycles: ReactLifeCycleFunctions<TimesheetApprovalDetailProps, {}> = {
  componentDidMount() {
    const { 
      match, layoutDispatch, appBarDispatch, intl, 
      handleRefresh
    } = this.props;

    const { user } = this.props.userState;
    const { loadDetailRequest } = this.props.timesheetApprovalDispatch;

    layoutDispatch.changeView({
      uid: AppMenu.TimesheetApproval,
      parentUid: AppMenu.Timesheet,
      title: intl.formatMessage({id: 'timesheet.detail.title'}),
      subTitle : intl.formatMessage({id: 'timesheet.detail.subTitle'})
    });

    layoutDispatch.navBackShow();
    layoutDispatch.moreShow();
    
    const handleMenuClick = (menu: IAppBarMenu): void => {
      switch (menu.id) {
        case TimesheetUserAction.Refresh:
          handleRefresh();
          break;

        default:
          break;
      }
    };

    appBarDispatch.assignCallback(handleMenuClick);

    if (user) {
      loadDetailRequest({
        timesheetUid: match.params.timesheetUid,
        companyUid: user.company.uid,
        positionUid: user.position.uid,
      });
    }
  },
  componentWillReceiveProps(nextProps: TimesheetApprovalDetailProps) {
    if (nextProps.timesheetApprovalState.detail.response !== this.props.timesheetApprovalState.detail.response) {
      const { intl } = nextProps;
      const { assignMenus } = nextProps.appBarDispatch;

      const currentMenus = [
        {
          id: TimesheetUserAction.Refresh,
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

const createProps: mapper<TimesheetApprovalDetailProps, OwnState> = (props: TimesheetApprovalDetailProps): OwnState => {
  const { intl } = props;

  return {
    approvalTitle: intl.formatMessage({id: 'timesheet.approvalTitle'}),
    approvalSubHeader: intl.formatMessage({id: 'timesheet.approvalSubHeader'}),
    approvalChoices: [
      { value: WorkflowStatusType.Approved, label: intl.formatMessage({id: 'workflow.approval.action.approve'}) },
      { value: WorkflowStatusType.Rejected, label: intl.formatMessage({id: 'workflow.approval.action.reject'}) }
    ],
    approvalTrueValue: WorkflowStatusType.Approved,
    approvalDialogTitle: intl.formatMessage({id: 'timesheet.dialog.approvalTitle'}),
    approvalDialogContentText: intl.formatMessage({id: 'timesheet.dialog.approvalContent'}),
    approvalDialogCancelText: intl.formatMessage({id: 'global.action.cancel'}),
    approvalDialogConfirmedText: intl.formatMessage({id: 'global.action.continue'}),
  };
};

export const TimesheetApprovalDetail = compose<TimesheetApprovalDetailProps, {}>(
  withUser,
  withLayout,
  withAppBar,
  withRouter,
  withTimesheetApproval,
  injectIntl,
  withStateHandlers<OwnState, {}, {}>(createProps, {}),
  withHandlers<TimesheetApprovalDetailProps, OwnHandler>(handlerCreators),
  lifecycle<TimesheetApprovalDetailProps, {}>(lifecycles),
)(TimesheetApprovalDetailView);