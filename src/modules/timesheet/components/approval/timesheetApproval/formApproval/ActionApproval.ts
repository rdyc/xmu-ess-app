import { WorkflowStatusType } from '@common/classes/types';
import { RadioGroupChoice } from '@layout/components/input/radioGroup';
import { WithAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { withUser, WithUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { WorkflowApprovalFormData } from '@organization/components/workflow/approval/WorkflowApprovalForm';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import {
  ITimesheetApprovalItem, ITimesheetApprovalPostBulkPayload
} from '@timesheet/classes/request/approval';
import { ITimesheet } from '@timesheet/classes/response';
import { WithTimesheetApproval, withTimesheetApproval } from '@timesheet/hoc/withTimesheetApproval';
import { timesheetMessage } from '@timesheet/locales/messages/timesheetMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, mapper, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { Dispatch } from 'redux';
import { FormErrors } from 'redux-form';
import { isNullOrUndefined, isObject } from 'util';
import { ActionApprovalView } from './ActionApprovalView';

interface OwnHandler {
  handleLoadData: () => void;
  handleValidate: (payload: WorkflowApprovalFormData) => FormErrors;
  handleSubmit: (payload: WorkflowApprovalFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface OwnState {
  shouldDataReload: boolean;
  timesheetUids: string[];
  timesheets: ITimesheet[];
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
  setDataload: StateHandler<OwnState>;
}

interface OwnRouteParams {
  // timesheetUids: string;
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
  const { intl, location } = props;

  return {
    timesheets: [],
    shouldDataReload: false,
    timesheetUids: location.state.values || [],
    approvalTitle: intl.formatMessage(timesheetMessage.approval.section.approvalTitle),
    approvalSubHeader: intl.formatMessage(timesheetMessage.approval.section.approvalSubHeader),
    approvalChoices: [
      { value: WorkflowStatusType.Approved, label: intl.formatMessage(organizationMessage.workflow.option.approve) },
      { value: WorkflowStatusType.Rejected, label: intl.formatMessage(organizationMessage.workflow.option.reject) }
    ],
    approvalTrueValue: WorkflowStatusType.Approved,
    approvalDialogTitle: intl.formatMessage(timesheetMessage.approval.confirm.submissionTitle),
    approvalDialogContentText: intl.formatMessage(timesheetMessage.approval.confirm.submissionContent),
    approvalDialogCancelText: intl.formatMessage(layoutMessage.action.cancel),
    approvalDialogConfirmedText: intl.formatMessage(layoutMessage.action.continue)
  };
};

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),
  setDataload: (prevState: OwnState) => (): Partial<OwnState> => ({
    shouldDataReload: !prevState.shouldDataReload
  })
};

const handlerCreators: HandleCreators<ApprovalTimesheetsProps, OwnHandler> = {
  handleLoadData: (props: ApprovalTimesheetsProps) => () => {
    const { timesheetUids, stateUpdate, history } = props;
    const { response } = props.timesheetApprovalState.all;

    if (response && response.data) {
      const _timesheets = response.data.filter(timesheet => 
        timesheetUids.some(timesheetUid => 
          timesheetUid === timesheet.uid
      ));

      stateUpdate({
        timesheets: _timesheets
      });
    } else {
      history.push('/timesheet/approvals');
    }
  },
  handleValidate: (props: ApprovalTimesheetsProps) => (formData: WorkflowApprovalFormData) => {
    const errors = {};

    const requiredFields = ['isApproved', 'remark'];

    requiredFields.forEach(field => {
      if (!formData[field] || isNullOrUndefined(formData[field])) {
        errors[field] = props.intl.formatMessage(organizationMessage.workflow.fieldFor(field, 'fieldRequired'));
      }
    });

    return errors;
  },
  handleSubmit: (props: ApprovalTimesheetsProps) => (formData: WorkflowApprovalFormData) => {
    const { location, intl, timesheetUids } = props;
    const { user } = props.userState;
    const { createRequestBulk } = props.timesheetApprovalDispatch;

    // user checking
    if (!user) {
      return Promise.reject('user was not found');
    }

    // props checking
    if (!location.state.values) {
      const message = intl.formatMessage(timesheetMessage.approval.message.emptyProps);

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
      remark: !isApproved ? formData.remark : undefined
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
      message: intl.formatMessage(timesheetMessage.approval.message.submitSuccess),
    });

    history.push('/timesheet/approvals');
  },
  handleSubmitFail: (props: ApprovalTimesheetsProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
    const { intl } = props;

    if (errors) {
      // validation errors from server (400: Bad Request)
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: isObject(submitError) ? submitError.message : submitError
      });
    } else {
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: intl.formatMessage(timesheetMessage.approval.message.submitFailure),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

export const ActionApproval = compose(
  withUser,
  withLayout,
  withRouter,
  withTimesheetApproval,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
)(ActionApprovalView);