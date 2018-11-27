import { WorkflowStatusType } from '@common/classes/types';
import { RadioGroupChoice } from '@layout/components/input/radioGroup';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { WorkflowApprovalFormData } from '@organization/components/workflow/approval/WorkflowApprovalForm';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import { IPurchaseApprovalPostPayload } from '@purchase/classes/request/purchaseHistories';
import { WithPurchaseApproval, withPurchaseApproval } from '@purchase/hoc/purchaseHistories/withPurchaseApproval';
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
import { PurchaseApprovalDetailView } from './PurchaseApprovalDetailView';

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

export type PurchaseApprovalDetailProps
  = WithPurchaseApproval
  & WithUser
  & WithLayout
  & WithAppBar
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnHandler
  & OwnState
  & OwnStateUpdaters;

const handlerCreators: HandleCreators<PurchaseApprovalDetailProps, OwnHandler> = {
  handleValidate: (props: PurchaseApprovalDetailProps) => (formData: WorkflowApprovalFormData) => {
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
  handleSubmit: (props: PurchaseApprovalDetailProps) => (formData: WorkflowApprovalFormData) => {
    const { match, intl } = props;
    const { user } = props.userState;
    const { createRequest } = props.purchaseApprovalDispatch;

    // user checking
    if (!user) {
      return Promise.reject('user was not found');
    }

    // props checking
    if (!match.params.purchaseUid) {
      const message = intl.formatMessage(purchaseMessage.approval.message.emptyProps);

      return Promise.reject(message);
    }

    // compare approval status string
    const isApproved = formData.isApproved === WorkflowStatusType.Approved;

    // generate payload
    const payload: IPurchaseApprovalPostPayload = {
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
  handleSubmitSuccess: (props: PurchaseApprovalDetailProps) => () => {
    let message: string = '';

    message = props.intl.formatMessage(purchaseMessage.approval.message.submitSuccess, { uid: props.match.params.purchaseUid });

    props.layoutDispatch.alertAdd({
      message,
      time: new Date()
    });
    props.setDataload();
  },
  handleSubmitFail: (props: PurchaseApprovalDetailProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
    if (errors) {
      // validation errors from server (400: Bad Request)
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: isObject(submitError) ? submitError.message : submitError
      });
    } else {
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: props.intl.formatMessage(purchaseMessage.approval.message.createFailure),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

const createProps: mapper<PurchaseApprovalDetailProps, OwnState> = (props: PurchaseApprovalDetailProps): OwnState => ({
    shouldDataReload: false,
    approvalTitle: props.intl.formatMessage(purchaseMessage.approval.section.approveForm),
    approvalSubHeader: props.intl.formatMessage(purchaseMessage.approval.section.approveContent),
    approvalChoices: [
      { value: WorkflowStatusType.Approved, label: props.intl.formatMessage(organizationMessage.workflow.option.approve) },
      { value: WorkflowStatusType.Rejected, label: props.intl.formatMessage(organizationMessage.workflow.option.reject) }
    ],
    approvalTrueValue: WorkflowStatusType.Approved,
    approvalDialogTitle: props.intl.formatMessage(purchaseMessage.approval.confirm.approveTitle),
    approvalDialogContentText: props.intl.formatMessage(purchaseMessage.approval.confirm.approveTitle),
    approvalDialogCancelText: props.intl.formatMessage(layoutMessage.action.discard),
    approvalDialogConfirmedText: props.intl.formatMessage(layoutMessage.action.continue),

});

export const PurchaseApprovalDetail = compose<PurchaseApprovalDetailProps, {}>(
  withUser,
  withLayout,
  withAppBar,
  withRouter,
  withPurchaseApproval,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<PurchaseApprovalDetailProps, OwnHandler>(handlerCreators),
)(PurchaseApprovalDetailView);