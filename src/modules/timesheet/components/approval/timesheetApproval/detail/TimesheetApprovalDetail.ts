import { WorkflowStatusType } from '@common/classes/types';
import { RadioGroupChoice } from '@layout/components/input/radioGroup';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithNotification, withNotification } from '@layout/hoc/withNotification';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { ModuleDefinitionType, NotificationType } from '@layout/types';
import { WorkflowApprovalFormData } from '@organization/components/workflow/approval/WorkflowApprovalForm';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import { ITimesheetApprovalPostPayload } from '@timesheet/classes/request/approval';
import { TimesheetUserAction } from '@timesheet/classes/types';
import { WithTimesheetApproval, withTimesheetApproval } from '@timesheet/hoc/withTimesheetApproval';
import { timesheetMessage } from '@timesheet/locales/messages/timesheetMessage';
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

import { TimesheetApprovalDetailView } from './TimesheetApprovalDetailView';

interface IOwnRouteParams {
  timesheetUid: string;
}

interface IOwnHandler {
  handleOnLoadApi: () => void;
  handleValidate: (payload: WorkflowApprovalFormData) => FormErrors;
  handleSubmit: (payload: WorkflowApprovalFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface IOwnState {
  shoulLoad: boolean;
  pageOptions?: IAppBarMenu[];
  approvalTitle: string;
  approvalSubHeader: string;
  approvalChoices: RadioGroupChoice[];
  approvalTrueValue: string;
  approvalDialogTitle: string;
  approvalDialogContentText: string;
  approvalDialogCancelText: string;
  approvalDialogConfirmedText: string;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  setOptions: StateHandler<IOwnState>;
  setNextLoad: StateHandler<IOwnState>;
}

export type TimesheetApprovalDetailProps
  = WithUser
  & WithLayout
  & WithTimesheetApproval
  & WithNotification
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnState
  & IOwnHandler
  & IOwnStateUpdaters;

const createProps: mapper<TimesheetApprovalDetailProps, IOwnState> = (props: TimesheetApprovalDetailProps): IOwnState => ({
  shoulLoad: false,
  approvalTitle: props.intl.formatMessage(timesheetMessage.approval.section.approvalTitle),
  approvalSubHeader: props.intl.formatMessage(timesheetMessage.approval.section.approvalSubHeader),
  approvalChoices: [
    { value: WorkflowStatusType.Approved, label: props.intl.formatMessage(organizationMessage.workflow.option.approve) },
    { value: WorkflowStatusType.Rejected, label: props.intl.formatMessage(organizationMessage.workflow.option.reject) }
  ],
  approvalTrueValue: WorkflowStatusType.Approved,
  approvalDialogTitle: props.intl.formatMessage(timesheetMessage.approval.confirm.submissionTitle),
  approvalDialogContentText: props.intl.formatMessage(timesheetMessage.approval.confirm.submissionContent),
  approvalDialogCancelText: props.intl.formatMessage(layoutMessage.action.cancel),
  approvalDialogConfirmedText: props.intl.formatMessage(layoutMessage.action.continue)
});

const stateUpdaters: StateUpdaters<TimesheetApprovalDetailProps, IOwnState, IOwnStateUpdaters> = {
  setNextLoad: (state: IOwnState, props: TimesheetApprovalDetailProps) => (): Partial<IOwnState> => ({
    shoulLoad: !state.shoulLoad
  }),
  setOptions: (state: IOwnState, props: TimesheetApprovalDetailProps) => (options?: IAppBarMenu[]): Partial<IOwnState> => ({
    pageOptions: options
  })
};

const handlerCreators: HandleCreators<TimesheetApprovalDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: TimesheetApprovalDetailProps) => () => {
    if (props.userState.user && !props.timesheetApprovalState.detail.isLoading && props.match.params.timesheetUid) {
      props.timesheetApprovalDispatch.loadDetailRequest({
        companyUid: props.userState.user.company.uid,
        positionUid: props.userState.user.position.uid,
        timesheetUid: props.match.params.timesheetUid
      });
    }
  },
  handleValidate: (props: TimesheetApprovalDetailProps) => (formData: WorkflowApprovalFormData) => {
    const errors = {};

    const requiredFields = ['isApproved', 'remark'];

    requiredFields.forEach(field => {
      if (!formData[field] || isNullOrUndefined(formData[field])) {
        errors[field] = props.intl.formatMessage(organizationMessage.workflow.fieldFor(field, 'fieldRequired'));
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
      const message = intl.formatMessage(timesheetMessage.entry.message.emptyProps);

      return Promise.reject(message);
    }

    // compare approval status string
    const isApproved = formData.isApproved === WorkflowStatusType.Approved;

    // generate payload
    const payload: ITimesheetApprovalPostPayload = {
      isApproved,
      remark: !isApproved ? formData.remark : undefined
    };

    // dispatch create request
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
  handleSubmitSuccess: (props: TimesheetApprovalDetailProps) => () => {
    // add success alert
    props.layoutDispatch.alertAdd({
      time: new Date(),
      message: props.intl.formatMessage(timesheetMessage.approval.message.submitSuccess)
    });

    // notification: mark as complete
    props.notificationDispatch.markAsComplete({
      moduleUid: ModuleDefinitionType.Timesheet,
      detailType: NotificationType.Approval,
      itemUid: props.match.params.timesheetUid
    });

    // set next load
    props.setNextLoad();
  },
  handleSubmitFail: (props: TimesheetApprovalDetailProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
    if (errors) {
      // validation errors from server (400: Bad Request)
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: isObject(submitError) ? submitError.message : submitError
      });
    } else {
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: props.intl.formatMessage(timesheetMessage.approval.message.submitFailure),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  },
};

const lifecycles: ReactLifeCycleFunctions<TimesheetApprovalDetailProps, IOwnState> = {
  componentDidUpdate(prevProps: TimesheetApprovalDetailProps) {
    // handle updated should load
    if (this.props.shoulLoad && this.props.shoulLoad !== prevProps.shoulLoad) {
      // turn of shoul load
      this.props.setNextLoad();

      // load from api
      this.props.handleOnLoadApi();
    }

    // handle updated route params
    if (this.props.match.params.timesheetUid !== prevProps.match.params.timesheetUid) {
      this.props.handleOnLoadApi();
    }

    // handle updated response state
    if (this.props.timesheetApprovalState.detail !== prevProps.timesheetApprovalState.detail) {
      const options: IAppBarMenu[] = [
        {
          id: TimesheetUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !this.props.timesheetApprovalState.detail.isLoading,
          visible: true,
          onClick: this.props.handleOnLoadApi
        }
      ];

      this.props.setOptions(options);
    }
  }
};

export const TimesheetApprovalDetail = compose<TimesheetApprovalDetailProps, {}>(
  setDisplayName('TimesheetApprovalDetail'),
  withRouter,
  withUser,
  withLayout,
  withTimesheetApproval,
  withNotification,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(TimesheetApprovalDetailView);