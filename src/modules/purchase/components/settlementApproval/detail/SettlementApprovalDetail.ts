import { WorkflowStatusType } from '@common/classes/types';
import { RadioGroupChoice } from '@layout/components/input/radioGroup';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { WorkflowApprovalFormData } from '@organization/components/workflow/approval/WorkflowApprovalForm';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import { ISettlementApprovalPostPayload } from '@purchase/classes/request/settlementApproval';
import { WithSettlementApproval, withSettlementApproval } from '@purchase/hoc/settlementApproval/withSettlementApproval';
import { purchaseMessage } from '@purchase/locales/messages/purchaseMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  compose,
  HandleCreators,
  mapper,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';
import { Dispatch } from 'redux';
import { FormErrors } from 'redux-form';
import { isNullOrUndefined, isObject } from 'util';
import { SettlementApprovalDetailView } from './SettlementApprovalDetailView';

interface OwnHandler {
  handleValidate: (payload: WorkflowApprovalFormData) => FormErrors;
  handleSubmit: (payload: WorkflowApprovalFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  setDataload: StateHandler<OwnState>;
}

interface OwnRouteParams {
  purchaseUid: string;
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

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  setDataload: (prevState: OwnState) => (): Partial<OwnState> => ({
    shouldDataReload: !prevState.shouldDataReload
  })
};

export type SettlementApprovalDetailProps
  = WithSettlementApproval
  & WithUser
  & WithLayout
  & WithAppBar
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnHandler
  & OwnState
  & OwnStateUpdaters;

const handlerCreators: HandleCreators<SettlementApprovalDetailProps, OwnHandler> = {
  handleValidate: (props: SettlementApprovalDetailProps) => (formData: WorkflowApprovalFormData) => {
    const errors = {
    };

    const requiredFields = ['isApproved', 'remark'];

    requiredFields.forEach(field => {
      if (!formData[field] || isNullOrUndefined(formData[field])) {
        errors[field] = props.intl.formatMessage(organizationMessage.workflow.fieldFor(field, 'fieldRequired'));
      }
    });

    return errors;
  },
  handleSubmit: (props: SettlementApprovalDetailProps) => (formData: WorkflowApprovalFormData) => {
    const { match, intl } = props;
    const { user } = props.userState;
    const { createRequest } = props.settlementApprovalDispatch;

    // user checking
    if (!user) {
      return Promise.reject('user was not found');
    }

    // props checking
    if (!match.params.purchaseUid) {
      const message = intl.formatMessage(purchaseMessage.s_approval.message.emptyProps);

      return Promise.reject(message);
    }

    // compare approval status string
    const isApproved = formData.isApproved === WorkflowStatusType.Approved;

    // generate payload
    const payload: ISettlementApprovalPostPayload = {
      isApproved,
      remark: !isApproved ? formData.remark : null
    };

    // dispatch create request
    return new Promise((resolve, reject) => {
      createRequest({
        resolve,
        reject,
        purchaseUid: match.params.purchaseUid,
        companyUid: user.company.uid,
        positionUid: user.position.uid,
        data: payload,
      });
    });
  },
  handleSubmitSuccess: (props: SettlementApprovalDetailProps) => () => {
    let message: string = '';

    message = props.intl.formatMessage(purchaseMessage.s_approval.message.submitSuccess, { uid: props.match.params.purchaseUid });

    props.layoutDispatch.alertAdd({
      message,
      time: new Date()
    });
    props.setDataload();
  },
  handleSubmitFail: (props: SettlementApprovalDetailProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
    if (errors) {
      // validation errors from server (400: Bad Request)
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: isObject(submitError) ? submitError.message : submitError
      });
    } else {
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: props.intl.formatMessage(purchaseMessage.s_approval.message.createFailure),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

const createProps: mapper<SettlementApprovalDetailProps, OwnState> = (props: SettlementApprovalDetailProps): OwnState => ({
  shouldDataReload: false,
  approvalTitle: props.intl.formatMessage(purchaseMessage.s_approval.section.approveForm),
  // approvalSubHeader: props.intl.formatMessage(purchaseMessage.s_approval.section.approveContent),
  approvalSubHeader: ` `,
  approvalChoices: [
    { value: WorkflowStatusType.Approved, label: props.intl.formatMessage(purchaseMessage.s_approval.message.approve) },
    { value: WorkflowStatusType.AdjustmentNeeded, label: props.intl.formatMessage(purchaseMessage.s_approval.message.adjustmentNeeded) }
  ],
  approvalTrueValue: WorkflowStatusType.Approved,
  approvalDialogTitle: props.intl.formatMessage(purchaseMessage.s_approval.confirm.approveTitle),
  // approvalDialogContentText: props.intl.formatMessage(purchaseMessage.s_approval.confirm.approveDescription),
  approvalDialogContentText: ` `,
  approvalDialogCancelText: props.intl.formatMessage(layoutMessage.action.discard),
  approvalDialogConfirmedText: props.intl.formatMessage(layoutMessage.action.continue),

});

export const SettlementApprovalDetail = compose<SettlementApprovalDetailProps, {}>(
  withUser,
  withLayout,
  withAppBar,
  withRouter,
  withSettlementApproval,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<SettlementApprovalDetailProps, OwnHandler>(handlerCreators),
)(SettlementApprovalDetailView);