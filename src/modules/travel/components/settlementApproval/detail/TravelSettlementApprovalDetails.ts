import { WorkflowStatusType } from '@common/classes/types';
import { RadioGroupChoice } from '@layout/components/input/radioGroup';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { IWorkflowApprovalPayload } from '@organization/classes/request/workflow/approval';
import { WorkflowApprovalFormData } from '@organization/components/workflow/approval/WorkflowApprovalForm';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import { WithTravelApproval, withTravelApproval } from '@travel/hoc/withTravelApproval';
import { WithTravelSettlementApproval, withTravelSettlementApproval } from '@travel/hoc/withTravelSettlementApproval';
import { travelApprovalMessage } from '@travel/locales/messages/travelApprovalMessages';
import { travelMessage } from '@travel/locales/messages/travelMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, lifecycle, mapper, ReactLifeCycleFunctions, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { Dispatch } from 'redux';
import { FormErrors } from 'redux-form';
import { isNullOrUndefined, isObject } from 'util';
import { TravelSettlementApprovalDetailViews } from './TravelSettlementApprovalDetailViews';

interface OwnHandler {
  handleValidate: (payload: WorkflowApprovalFormData) => FormErrors;
  handleSubmit: (payload: WorkflowApprovalFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface OwnRouteParams {
  travelSettlementUid: string;
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

interface OwnStateUpdater extends StateHandlerMap<OwnState> {
  setDataload: StateHandler<OwnState>;
}

export type TravelSettlementApprovalDetailProps
  = WithTravelSettlementApproval
  & WithTravelApproval
  & WithUser
  & WithLayout
  & RouteComponentProps<OwnRouteParams> 
  & InjectedIntlProps
  & OwnHandler
  & OwnState
  & OwnStateUpdater;

const createProps: mapper<TravelSettlementApprovalDetailProps, OwnState> = (props: TravelSettlementApprovalDetailProps): OwnState => ({
  shouldDataReload: false,
  approvalTitle: props.intl.formatMessage(travelMessage.settlement.section.approvalTitle),
  approvalSubHeader: props.intl.formatMessage(travelMessage.settlement.section.approvalSubHeader),
  approvalChoices: [
    { value: WorkflowStatusType.Approved, label: props.intl.formatMessage(organizationMessage.workflow.option.approve) },
    { value: WorkflowStatusType.Rejected, label: props.intl.formatMessage(travelMessage.settlementApproval.option.adjustmentNeeded) }
  ],
  approvalTrueValue: WorkflowStatusType.Approved,
  approvalDialogTitle: props.intl.formatMessage(travelMessage.settlementApproval.confirm.submissionTitle),
  approvalDialogContentText: props.intl.formatMessage(travelMessage.settlementApproval.confirm.submissionContent),
  approvalDialogCancelText: props.intl.formatMessage(layoutMessage.action.cancel),
  approvalDialogConfirmedText: props.intl.formatMessage(layoutMessage.action.continue)
});

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdater> = {
  setDataload: (prevState: OwnState) => (): Partial<OwnState> => ({
    shouldDataReload: !prevState.shouldDataReload
  })
};

const handlerCreators: HandleCreators<TravelSettlementApprovalDetailProps, OwnHandler> = {
  handleValidate: (props: TravelSettlementApprovalDetailProps) => (formData: WorkflowApprovalFormData) => { 
    const errors = {};
  
    const requiredFields = formData.isApproved !== props.approvalTrueValue
      ? ['isApproved', 'remark']
      : ['isApproved'];

    requiredFields.forEach(field => {
      if (!formData[field] || isNullOrUndefined(formData[field])) {
        errors[field] = props.intl.formatMessage(organizationMessage.workflow.fieldFor(field, 'fieldRequired'));
      }
    });
    
    return errors;
  },
  handleSubmit: (props: TravelSettlementApprovalDetailProps) => (formData: WorkflowApprovalFormData) => { 
    const { match, intl } = props;
    const { user } = props.userState;
    const { createRequest } = props.travelSettlementApprovalDispatch;

    // user checking
    if (!user) {
      return Promise.reject('user was not found');
    }

    // props checking
    if (!match.params.travelSettlementUid) {
      const message = intl.formatMessage(travelApprovalMessage.emptyProps);

      return Promise.reject(message);
    }

    // compare approval status string
    const isApproved = formData.isApproved === WorkflowStatusType.Approved;

    // generate payload
    const payload: IWorkflowApprovalPayload = {
      isApproved,
      remark: formData.remark
    };

    // dispatch update request
    return new Promise((resolve, reject) => {
      createRequest({
        resolve, 
        reject,
        companyUid: user.company.uid,
        positionUid: user.position.uid,
        travelSettlementUid: match.params.travelSettlementUid, 
        data: payload, 
      });
    });
  },
  handleSubmitSuccess: (props: TravelSettlementApprovalDetailProps) => (response: boolean) => {
    const { intl } = props;
    const { alertAdd } = props.layoutDispatch;
    
    alertAdd({
      time: new Date(),
      message: intl.formatMessage(travelApprovalMessage.submitSuccess),
    });

    props.setDataload();
    // history.push('/travel/approvals/settlement');
  },
  handleSubmitFail: (props: TravelSettlementApprovalDetailProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
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
        message: intl.formatMessage(travelApprovalMessage.submitFailure),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

const lifecycles: ReactLifeCycleFunctions<TravelSettlementApprovalDetailProps, OwnState> = {
  componentWillReceiveProps(nextProps: TravelSettlementApprovalDetailProps) {
    if (nextProps.travelSettlementApprovalState.detail.response !== this.props.travelSettlementApprovalState.detail.response) {
      const { response } = nextProps.travelSettlementApprovalState.detail;
      const { user } = this.props.userState;
      const { loadDetailRequest } = this.props.travelApprovalDispatch;

      if (user && response) {
            loadDetailRequest ({
              companyUid: user.company.uid,
              positionUid: user.position.uid,
              travelUid: response.data.travelUid
            });
          }
    }
  },
  componentWillUnmount() {
    const { travelSettlementApprovalDispatch, travelApprovalDispatch } = this.props;

    travelSettlementApprovalDispatch.loadDetailDispose();
    travelApprovalDispatch.loadDetailDispose();
    
  }
};

export const TravelSettlementApprovalDetails = compose<TravelSettlementApprovalDetailProps, {}>(
  withRouter,
  withUser,
  withLayout,
  withTravelApproval,
  withTravelSettlementApproval,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle<TravelSettlementApprovalDetailProps, OwnState>(lifecycles),
)(TravelSettlementApprovalDetailViews);