import { FinanceStatusType, WorkflowStatusType } from '@common/classes/types';
import { IFinanceApprovalBulkPostPayload, IFinanceApprovalItem } from '@finance/classes/request/approval';
import { IFinance } from '@finance/classes/response';
import { WithFinanceApproval, withFinanceApproval } from '@finance/hoc/withFinanceApproval';
import { financeMessage } from '@finance/locales/messages/financeMessage';
import { RadioGroupChoice } from '@layout/components/input/radioGroup';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IValidationErrorResponse } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { IWorkflowApprovalFormValue } from '@organization/components/workflow/approval/form/WorkflowApprovalForm';
import { FormikActions } from 'formik';
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

import { FinanceApprovalPaymentView } from './FinanceApprovalPaymentView';

interface IOwnRouteParams {
}

interface IOwnState {
  financeUids: string[];
  finances: IFinance[];
  shouldDataReload: boolean;
  approvalTitle: string;
  approvalSubHeader: string;
  approvalStatusTypes: RadioGroupChoice[];
  approvalTrueValues: string[];
  approvalDialogTitle: string;
  approvalDialogContentText: string;
  approvalDialogCancelText: string;
  approvalDialogConfirmedText: string;
  approvalRemarkLabel: string;
  approvalRemarkPlaceholder: string;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  stateUpdate: StateHandler<IOwnState>;
  setDataload: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleLoadData: () => void;
  handleOnSubmit: (values: IWorkflowApprovalFormValue, actions: FormikActions<IWorkflowApprovalFormValue>) => void;
}

export type FinanceApprovalPaymentProps
  = WithFinanceApproval
  & WithUser
  & WithLayout
  & WithMasterPage
  & RouteComponentProps<IOwnRouteParams> 
  & InjectedIntlProps
  & IOwnHandler
  & IOwnStateUpdater
  & IOwnState;

const createProps: mapper<FinanceApprovalPaymentProps, IOwnState> = (props: FinanceApprovalPaymentProps): IOwnState => {
  const { intl, location } = props;

  return {
    finances: [],
    shouldDataReload: false,
    financeUids: location.state.values || [],
    approvalTitle: intl.formatMessage(financeMessage.approval.section.approvalTitle),
    approvalSubHeader: intl.formatMessage(financeMessage.approval.section.approvalSubTitle),
    approvalStatusTypes: [
      { value: FinanceStatusType.Paid, label: intl.formatMessage(financeMessage.approval.action.paid) },
      { value: FinanceStatusType.Hold, label: intl.formatMessage(financeMessage.approval.action.hold) },
      { value: FinanceStatusType.NotPaid, label: intl.formatMessage(financeMessage.approval.action.notPaid) }
    ],
    approvalTrueValues: [WorkflowStatusType.Approved],
    approvalDialogTitle: intl.formatMessage(financeMessage.approval.dialog.approvalTitle),
    approvalDialogContentText: intl.formatMessage(financeMessage.approval.dialog.approvalSubTitle),
    approvalDialogCancelText: intl.formatMessage(layoutMessage.action.cancel),
    approvalDialogConfirmedText: intl.formatMessage(layoutMessage.action.continue),
    approvalRemarkLabel: intl.formatMessage(financeMessage.approval.field.notes),
    approvalRemarkPlaceholder: intl.formatMessage(financeMessage.approval.field.notesPlaceholder)
  };
};
const stateUpdaters: StateUpdaters<{}, IOwnState, IOwnStateUpdater> = {
    stateUpdate: (prevState: IOwnState) => (newState: any) => ({
      ...prevState,
      ...newState
    }),
    setDataload: (prevState: IOwnState) => (): Partial<IOwnState> => ({
      shouldDataReload: !prevState.shouldDataReload
    })
  };

const handlerCreators: HandleCreators<FinanceApprovalPaymentProps, IOwnHandler> = {
  handleLoadData: (props: FinanceApprovalPaymentProps) => () => {
    const { financeUids, stateUpdate, history } = props;
    const { response } = props.financeApprovalState.all;
    const { response: detailReponse } = props.financeApprovalState.detail;
    const { loadDetailRequest } = props.financeApprovalDispatch;

    if (response && response.data) {
      const _finances = response.data.filter(finance => 
        financeUids.some(financeUid => 
          financeUid === finance.uid
      ));

      // fool the PreviewPage Component to think the detail is exist (if detail not loaded) lul :p
      if (!detailReponse) {
        if (props.userState.user) {
          loadDetailRequest({
            companyUid: props.userState.user.company.uid,
            positionUid: props.userState.user.position.uid,
            financeUid: _finances[0].uid,
          });
        } else {
          history.push('/finance/approvals');
        }
      }

      stateUpdate({
        finances: _finances
      });
    } else {
      history.push('/finance/approvals');
    }
  },
  handleOnSubmit: (props: FinanceApprovalPaymentProps) => (values: IWorkflowApprovalFormValue, actions: FormikActions<IWorkflowApprovalFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise((resolve, reject) => undefined);

    if (user) {
      // must have projectUid
      if (props.financeUids.length) {
        const _financeUids = props.financeUids.map((financeUid: string) => {
          const uids: IFinanceApprovalItem = ({
            uid: financeUid
          });

          return uids;
        });
    
        // fill payload
        const payload: IFinanceApprovalBulkPostPayload = {
          financeUids: _financeUids,
          statusType: values.statusType,
          notes: values.remark
        };

        // set the promise
        promise = new Promise((resolve, reject) => {
          props.financeApprovalDispatch.bulkCreateRequest({
            resolve, 
            reject,
            companyUid: user.company.uid,
            positionUid: user.position.uid,
            data: payload, 
          });
        });
      }
    }

    // handling promise
    promise
      .then((response: boolean) => {
        // set submitting status
        actions.setSubmitting(false);

        // clear form status
        actions.setStatus();
        
        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(financeMessage.approval.message.createSuccess)
        });

        // redirect to approval list
        props.history.push('/finance/approvals');
      })
      .catch((error: IValidationErrorResponse) => {
        // set submitting status
        actions.setSubmitting(false);
        
        // set form status
        actions.setStatus(error);
        
        // error on form fields
        if (error.errors) {
          error.errors.forEach(item => {
            // in case to handle incorrect field on other fields
            let field = item.field;

            if (item.field === 'financeUid') {
              field = 'statusType';
            }

            actions.setFieldError(field, props.intl.formatMessage({id: item.message}));
          });
        }

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(financeMessage.approval.message.createFailure)
        });
      });
  }
};

export const FinanceApprovalPayment = compose(
  withRouter,
  withUser,
  withLayout,
  withMasterPage,
  withFinanceApproval,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
)(FinanceApprovalPaymentView);