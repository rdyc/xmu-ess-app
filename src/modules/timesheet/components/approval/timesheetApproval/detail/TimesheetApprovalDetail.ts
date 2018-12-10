import { WorkflowStatusType } from '@common/classes/types';
import { RadioGroupChoice } from '@layout/components/input/radioGroup';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { WorkflowApprovalFormData } from '@organization/components/workflow/approval/WorkflowApprovalForm';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import { ITimesheetApprovalPostPayload } from '@timesheet/classes/request/approval';
import { WithTimesheetApproval, withTimesheetApproval } from '@timesheet/hoc/withTimesheetApproval';
import { timesheetMessage } from '@timesheet/locales/messages/timesheetMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, mapper, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { Dispatch } from 'redux';
import { FormErrors } from 'redux-form';
import { isNullOrUndefined, isObject } from 'util';
import { TimesheetApprovalDetailView } from './TimesheetApprovalDetailView';

interface OwnRouteParams {
  timesheetUid: string;
}

interface OwnHandler {
  handleValidate: (payload: WorkflowApprovalFormData) => FormErrors;
  handleSubmit: (payload: WorkflowApprovalFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface OwnState {
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

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  setDataload: StateHandler<OwnState>;
}

export type TimesheetApprovalDetailProps
  = WithUser
  & WithLayout
  & WithTimesheetApproval
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnState
  & OwnHandler
  & OwnStateUpdaters;

const createProps: mapper<TimesheetApprovalDetailProps, OwnState> = (props: TimesheetApprovalDetailProps): OwnState => {
  const { intl } = props;

  return {
    shouldDataReload: false,
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
    approvalDialogConfirmedText: intl.formatMessage(layoutMessage.action.continue),
  };
};

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  setDataload: (prevState: OwnState) => (): Partial<OwnState> => ({
    shouldDataReload: !prevState.shouldDataReload
  })
};

const handlerCreators: HandleCreators<TimesheetApprovalDetailProps, OwnHandler> = {
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
      remark: !isApproved ? formData.remark : null
    };

    // dispatch create request
    return new Promise((resolve, reject) => {
      createRequest({
        resolve, 
        reject,
        timesheetUid: match.params.timesheetUid, 
        companyUid: user.company.uid,
        positionUid: user.position.uid,
        data: payload, 
      });
    });
  },
  handleSubmitSuccess: (props: TimesheetApprovalDetailProps) => () => {
    props.layoutDispatch.alertAdd({
      time: new Date(),
      message: props.intl.formatMessage(timesheetMessage.approval.message.submitSuccess)
    });

    props.setDataload();
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
        message: intl.formatMessage(timesheetMessage.approval.message.submitFailure),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  },
};

export const TimesheetApprovalDetail = compose<TimesheetApprovalDetailProps, {}>(
  withRouter,
  withUser,
  withLayout,
  withTimesheetApproval,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
)(TimesheetApprovalDetailView);