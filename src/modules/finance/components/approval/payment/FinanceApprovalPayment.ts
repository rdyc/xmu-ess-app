import { FinanceStatusType, WorkflowStatusType } from '@common/classes/types';
import { RadioGroupChoice } from '@layout/components/input/radioGroup';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { WorkflowApprovalFormData } from '@organization/components/workflow/approval/WorkflowApprovalForm';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import { projectApprovalMessage } from '@project/locales/messages/projectApprovalMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, mapper, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { Dispatch } from 'redux';
import { FormErrors } from 'redux-form';
import { isNullOrUndefined, isObject } from 'util';

import { IFinanceApprovalBulkPostPayload, IFinanceApprovalItem } from '@finance/classes/request/approval';
import { IFinance } from '@finance/classes/response';
import { WithFinanceApproval, withFinanceApproval } from '@finance/hoc/withFinanceApproval';
import { financeMessage } from '@finance/locales/messages/financeMessage';
import { FinanceApprovalPaymentView } from './FinanceApprovalPaymentView';

interface OwnHandler {
  handleLoadData: () => void;
  handleValidate: (payload: WorkflowApprovalFormData) => FormErrors;
  handleSubmit: (payload: WorkflowApprovalFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface OwnRouteParams {
}
interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
  setDataload: StateHandler<OwnState>;
}

interface OwnState {
  financeUids: string[];
  finances: IFinance[];
  shouldDataReload: boolean;
  approvalTitle: string;
  approvalSubHeader: string;
  approvalChoices: RadioGroupChoice[];
  approvalTrueValue: string;
  approvalDialogTitle: string;
  approvalDialogContentText: string;
  approvalDialogCancelText: string;
  approvalDialogConfirmedText: string;
  approvalRemarkLabel: string;
  approvalRemarkPlaceholder: string;
}

export type FinanceApprovalPaymentProps
  = WithFinanceApproval
  & WithUser
  & WithLayout
  & RouteComponentProps<OwnRouteParams> 
  & InjectedIntlProps
  & OwnHandler
  & OwnStateUpdaters
  & OwnState;

const createProps: mapper<FinanceApprovalPaymentProps, OwnState> = (props: FinanceApprovalPaymentProps): OwnState => {
  const { intl, location } = props;

  return {
    finances: [],
    shouldDataReload: false,
    financeUids: location.state.values || [],
    approvalTitle: intl.formatMessage(financeMessage.approval.section.approvalTitle),
    approvalSubHeader: intl.formatMessage(financeMessage.approval.section.approvalSubTitle),
    approvalChoices: [
      { value: FinanceStatusType.Paid, label: intl.formatMessage(financeMessage.approval.action.paid) },
      { value: FinanceStatusType.Hold, label: intl.formatMessage(financeMessage.approval.action.hold) },
      { value: FinanceStatusType.NotPaid, label: intl.formatMessage(financeMessage.approval.action.notPaid) }
    ],
    approvalTrueValue: WorkflowStatusType.Approved,
    approvalDialogTitle: intl.formatMessage(financeMessage.approval.dialog.approvalTitle),
    approvalDialogContentText: intl.formatMessage(financeMessage.approval.dialog.approvalSubTitle),
    approvalDialogCancelText: intl.formatMessage(layoutMessage.action.cancel),
    approvalDialogConfirmedText: intl.formatMessage(layoutMessage.action.continue),
    approvalRemarkLabel: intl.formatMessage(financeMessage.approval.field.notes),
    approvalRemarkPlaceholder: intl.formatMessage(financeMessage.approval.field.notesPlaceholder)
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

const handlerCreators: HandleCreators<FinanceApprovalPaymentProps, OwnHandler> = {
  handleLoadData: (props: FinanceApprovalPaymentProps) => () => {
    const { financeUids, stateUpdate, history } = props;
    const { response } = props.financeApprovalState.all;

    if (response && response.data) {
      const _finances = response.data.filter(finance => 
        financeUids.some(financeUid => 
          financeUid === finance.uid
      ));

      stateUpdate({
        finances: _finances
      });
    } else {
      history.push('/finance/approvals');
    }
  },
  handleValidate: (props: FinanceApprovalPaymentProps) => (formData: WorkflowApprovalFormData) => { 
    const errors = {};
  
    const requiredFields = ['isApproved', 'remark'];
  
    requiredFields.forEach(field => {
      if (!formData[field] || isNullOrUndefined(formData[field])) {
        errors[field] = props.intl.formatMessage(organizationMessage.workflow.fieldFor(field, 'fieldRequired'));
      }
    });
    
    return errors;
  },
  handleSubmit: (props: FinanceApprovalPaymentProps) => (formData: WorkflowApprovalFormData) => { 
    const { location, intl, financeUids } = props;
    const { user } = props.userState;
    const { bulkCreateRequest } = props.financeApprovalDispatch;

    // user checking
    if (!user) {
      return Promise.reject('user was not found');
    }

    // props checking
    if (!location.state.values) {
      const message = intl.formatMessage(projectApprovalMessage.emptyProps);

      return Promise.reject(message);
    }
    
    const _financeUids = financeUids.map((financeUid: string) => {
      const uids: IFinanceApprovalItem = ({
        uid: financeUid
      });
      return uids;
    });

    // generate payload
    const payload: IFinanceApprovalBulkPostPayload = {
      financeUids: _financeUids,
      statusType: !isNullOrUndefined(formData.isApproved) ? formData.isApproved : FinanceStatusType.Approved,
      notes: !isNullOrUndefined(formData.remark) ? formData.remark : ''
    };

    // dispatch update request
    return new Promise((resolve, reject) => {
      bulkCreateRequest({
        resolve, 
        reject,
        companyUid: user.company.uid,
        positionUid: user.position.uid,
        data: payload, 
      });
    });
  },
  handleSubmitSuccess: (props: FinanceApprovalPaymentProps) => () => {
    const { intl, history } = props;
    const { alertAdd } = props.layoutDispatch;
    alertAdd({
      time: new Date(),
      message: intl.formatMessage(projectApprovalMessage.submitSuccess),
    });

    history.push('/finance/approvals');
  },
  handleSubmitFail: (props: FinanceApprovalPaymentProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
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
        message: intl.formatMessage(projectApprovalMessage.submitFailure),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

export const FinanceApprovalPayment = compose(
  withRouter,
  withUser,
  withLayout,
  withFinanceApproval,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
)(FinanceApprovalPaymentView);