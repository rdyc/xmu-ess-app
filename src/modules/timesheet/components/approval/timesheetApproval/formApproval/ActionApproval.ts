import { WorkflowStatusType } from '@common/classes/types';
import AppMenu from '@constants/AppMenu';
import { RadioGroupChoice } from '@layout/components/input/radioGroup';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { WithUser } from '@lookup/components/leave';
import { WorkflowApprovalFormData } from '@organization/components/workflow/approval/WorkflowApprovalForm';
import {
  ITimesheetApprovalItem, ITimesheetApprovalPostBulkPayload
} from '@timesheet/classes/request/approval';
import { ITimesheet } from '@timesheet/classes/response';
import { TimesheetUserAction } from '@timesheet/classes/types';
import { WithTimesheetApproval, withTimesheetApproval } from '@timesheet/hoc/withTimesheetApproval';
import { timesheetApprovalMessage } from '@timesheet/locales/messages/timesheetApprovalMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, lifecycle, mapper, ReactLifeCycleFunctions, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { Dispatch } from 'redux';
import { FormErrors } from 'redux-form';
import { isNullOrUndefined, isObject } from 'util';
import { ActionApprovalView } from './ActionApprovalView';

interface OwnHandler {
  handleRefresh: () => void;
  handleValidate: (payload: WorkflowApprovalFormData) => FormErrors;
  handleSubmit: (payload: WorkflowApprovalFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface OwnState {
  timesheetUids: string[];
  timesheets?: ITimesheet[] | null | undefined;
  action?: TimesheetUserAction | undefined;
  approvalTitle: string;
  approvalSubHeader: string;
  approvalChoices: RadioGroupChoice[];
  approvalTrueValue: string;
  approvalDialogTitle: string;
  approvalDialogContentText: string;
  approvalDialogCancelText: string;
  approvalDialogConfirmedText: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

interface OwnRouteParams {
  timesheetUids: string;
}

export type ApprovalTimesheetsProps
  = WithTimesheetApproval
  & WithUser
  & WithLayout
  & WithAppBar
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnState
  & OwnStateUpdaters
  & OwnHandler;

const createProps: mapper<ApprovalTimesheetsProps, OwnState> = (props: ApprovalTimesheetsProps): OwnState => {
  const { intl } = props;

  return {
    timesheetUids: props.match.params.timesheetUids.split(','),
    timesheets: [],
    approvalTitle: intl.formatMessage({ id: 'timesheet.view.approval.title' }),
    approvalSubHeader: intl.formatMessage({ id: 'timesheet.view.approval.subHeader' }),
    approvalChoices: [
      { value: WorkflowStatusType.Approved, label: intl.formatMessage({ id: 'workflow.approval.action.approve' }) },
      { value: WorkflowStatusType.Rejected, label: intl.formatMessage({ id: 'workflow.approval.action.reject' }) }
    ],
    approvalTrueValue: WorkflowStatusType.Approved,
    approvalDialogTitle: intl.formatMessage({ id: 'timesheet.dialog.approvalTitle' }),
    approvalDialogContentText: intl.formatMessage({ id: 'timesheet.dialog.approvalContent' }),
    approvalDialogCancelText: intl.formatMessage({ id: 'global.action.cancel' }),
    approvalDialogConfirmedText: intl.formatMessage({ id: 'global.action.continue' }),
  };
};

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),
  stateReset: (prevState: OwnState) => () => ({
    ...prevState,
    dialogFullScreen: false,
    dialogOpen: false,
    dialogTitle: undefined,
    dialogDescription: undefined,
    dialogCancelText: 'global.action.cancel',
    dialogConfirmedText: 'global.action.ok',
  })
};

const loadDetail = (props: ApprovalTimesheetsProps): void => {
  const { timesheetUids, stateUpdate } = props;
  const { response } = props.timesheetApprovalState.all;

  const _timesheets = response && response.data && response.data.filter(timesheet => 
    timesheetUids.some(timesheetUid => 
      timesheetUid === timesheet.uid
  ));

  stateUpdate({
    timesheets: _timesheets
  });
};

const handlerCreators: HandleCreators<ApprovalTimesheetsProps, OwnHandler> = {
  handleValidate: (props: ApprovalTimesheetsProps) => (formData: WorkflowApprovalFormData) => {
    const errors = {};

    const requiredFields = ['isApproved', 'remark'];

    requiredFields.forEach(field => {
      if (!formData[field] || isNullOrUndefined(formData[field])) {
        errors[field] = props.intl.formatMessage({ id: `workflow.approval.field.${field}.required` });
      }
    });

    return errors;
  },
  handleSubmit: (props: ApprovalTimesheetsProps) => (formData: WorkflowApprovalFormData) => {
    const { match, intl, timesheetUids } = props;
    const { user } = props.userState;
    const { createRequestBulk } = props.timesheetApprovalDispatch;

    // user checking
    if (!user) {
      return Promise.reject('user was not found');
    }

    // props checking
    if (!match.params.timesheetUids) {
      const message = intl.formatMessage(timesheetApprovalMessage.emptyProps);

      return Promise.reject(message);
    }

    const _timesheetUids = timesheetUids.map((timesheetUid: string) => {
      const uids: ITimesheetApprovalItem = ({
        uid: timesheetUid
      });
      return uids;
    });

    // compare approval status string
    const isApproved = formData.isApproved === WorkflowStatusType.Approved;

    // generate payload
    const payload: ITimesheetApprovalPostBulkPayload = {
      isApproved,
      timesheetUids: _timesheetUids,
      remark: !isApproved ? formData.remark : null
    };

    // dispatch update request
    return new Promise((resolve, reject) => {
      createRequestBulk({
        resolve,
        reject,
        companyUid: user.company.uid,
        positionUid: user.position.uid,
        data: payload,
      });
    });
  },
  handleSubmitSuccess: (props: ApprovalTimesheetsProps) => (response: boolean) => {
    const { intl, history } = props;
    const { alertAdd } = props.layoutDispatch;

    alertAdd({
      time: new Date(),
      message: intl.formatMessage(timesheetApprovalMessage.updateSuccess),
    });

    history.push('/timesheet/approval/');
  },
  handleSubmitFail: (props: ApprovalTimesheetsProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
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
  handleRefresh: (props: ApprovalTimesheetsProps) => () => {
    // const { match } = props;
    // const { user } = props.userState;
    // const { loadDetailRequest } = props.timesheetApprovalDispatch;

    // if (user) {
    //   loadDetailRequest({
    //     companyUid: user.company.uid,
    //     positionUid: user.position.uid,
    //     timesheetUid: match.params.timesheetUid
    //   });
    // }
  }
};

const lifecycles: ReactLifeCycleFunctions<ApprovalTimesheetsProps, {}> = {
  componentDidMount() {
    const {
      layoutDispatch, appBarDispatch, intl,
      handleRefresh, history
    } = this.props;

    const { response } = this.props.timesheetApprovalState.all;

    layoutDispatch.changeView({
      uid: AppMenu.TimesheetApproval,
      parentUid: AppMenu.Timesheet,
      title: intl.formatMessage({ id: 'timesheet.detail.title' }),
      subTitle: intl.formatMessage({ id: 'timesheet.detail.subTitle' })
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

    if ( response && response.data ) {
      loadDetail(this.props);
    } else {
      history.goBack();
    }
  },
  componentWillReceiveProps(nextProps: ApprovalTimesheetsProps) {
    if (nextProps.timesheetApprovalState.all.response !== this.props.timesheetApprovalState.all.response) {
      const { intl } = nextProps;
      const { assignMenus } = nextProps.appBarDispatch;

      const currentMenus = [
        {
          id: TimesheetUserAction.Refresh,
          name: intl.formatMessage({ id: 'global.action.refresh' }),
          enabled: true,
          visible: true
        }
      ];

      assignMenus(currentMenus);
    }
  },
  componentWillUnmount() {
    const { layoutDispatch, appBarDispatch } = this.props;
    // const { loadDetailDispose } = this.props.financeApprovalDispatch;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();
    layoutDispatch.actionCentreHide();

    appBarDispatch.dispose();
    // loadDetailDispose();
  }
};

export const ActionApproval = compose<ApprovalTimesheetsProps, {}>(
  withUser,
  withLayout,
  withAppBar,
  withRouter,
  withTimesheetApproval,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<ApprovalTimesheetsProps, OwnHandler>(handlerCreators),
  lifecycle<ApprovalTimesheetsProps, OwnState>(lifecycles),
)(ActionApprovalView);