import { FinanceStatusType, ModuleType, WorkflowStatusType } from '@common/classes/types';
import { IFinanceApprovalPostPayload } from '@finance/classes/request/approval';
import { FinanceUserAction } from '@finance/classes/types';
import { DocumentPath } from '@finance/classes/types/DocumentPath';
import { WithFinanceApproval, withFinanceApproval } from '@finance/hoc/withFinanceApproval';
import { financeMessage } from '@finance/locales/messages/financeMessage';
import { RadioGroupChoice } from '@layout/components/input/radioGroup';
import { IPopupMenuOption } from '@layout/components/PopupMenu';
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

import { FinanceApprovalDetailView } from './FinanceApprovalDetailView';

interface IOwnRouteParams {
  financeUid: string;
}

interface IOwnHandler {
  handleOnLoadApi: () => void;
  handleOnSelectedMenu: (item: IPopupMenuOption) => void;
  handleToDocument: (moduleUid: string, documentUid: string) => void;
  handleOnSubmit: (values: IWorkflowApprovalFormValue, actions: FormikActions<IWorkflowApprovalFormValue>) => void;
}

interface IOwnState {
  menuOptions?: IPopupMenuOption[];
  action?: FinanceUserAction;
  shouldReload: boolean;
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
  setOptions: StateHandler<IOwnState>;
  setShouldLoad: StateHandler<IOwnState>;
}

export type FinanceApprovalDetailProps 
  = WithUser
  & WithFinanceApproval
  & WithLayout
  & WithMasterPage
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<FinanceApprovalDetailProps, IOwnState> = (props: FinanceApprovalDetailProps): IOwnState => {
  const { intl } = props;

  return {
    shouldReload: false,
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

const stateUpdaters: StateUpdaters<FinanceApprovalDetailProps, IOwnState, IOwnStateUpdater> = {
  setOptions: () => (options?: IPopupMenuOption[]): Partial<IOwnState> => ({
    menuOptions: options
  }),
  setShouldLoad: (prevState: IOwnState) => (): Partial<IOwnState> => ({
    shouldReload: !prevState.shouldReload
  })
};

const handlerCreators: HandleCreators<FinanceApprovalDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: FinanceApprovalDetailProps) => () => { 
    if (props.userState.user && props.match.params.financeUid && !props.financeApprovalState.detail.isLoading) {
      props.financeApprovalDispatch.loadDetailRequest({
        companyUid: props.userState.user.company.uid,
        positionUid: props.userState.user.position.uid,
        financeUid: props.match.params.financeUid
      });
    }
  },
  handleOnSelectedMenu: (props: FinanceApprovalDetailProps) => (item: IPopupMenuOption) => {
    switch (item.id) {
      case FinanceUserAction.Refresh:
        props.setShouldLoad();
        break;
    
      default:
        break;
    }
  },
  handleToDocument: (props: FinanceApprovalDetailProps) => (moduleUid: string, documentUid: string) => {
    const { history } = props;
    let path: string = '';
    
    switch (moduleUid) {
      case ModuleType.Expense:
      path = DocumentPath.Expense;
      break;

      case ModuleType.Purchase:
      path = DocumentPath.Purchase;
      break;

      case ModuleType.PurchaseSettlement:
      path = DocumentPath.PurchaseSettlement;
      break;

      case ModuleType.Mileage:
      path = DocumentPath.Mileage;
      break;

      case ModuleType.Travel:
      path = DocumentPath.Travel;
      break;

      case ModuleType.TravelSettlement:
      path = DocumentPath.TravelSettlement;
      break;

      default:

    }

    history.push(`/${path}/${documentUid}`, {financeUid: props.match.params.financeUid});
  },
  handleOnSubmit: (props: FinanceApprovalDetailProps) => (values: IWorkflowApprovalFormValue, actions: FormikActions<IWorkflowApprovalFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise((resolve, reject) => undefined);

    if (user) {
      // must have financeUid
      if (props.match.params.financeUid) {
        // fill payload
        const payload: IFinanceApprovalPostPayload = {
          statusType: values.statusType,
          notes: values.remark
        };

        // set the promise
        promise = new Promise((resolve, reject) => {
          props.financeApprovalDispatch.createRequest({
            resolve, 
            reject,
            financeUid: props.match.params.financeUid, 
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

        // set next load
        props.setShouldLoad();
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

const lifecycles: ReactLifeCycleFunctions<FinanceApprovalDetailProps, IOwnState> = {
  componentDidUpdate(prevProps: FinanceApprovalDetailProps) {
    if (this.props.shouldReload && this.props.shouldReload !== prevProps.shouldReload) {
      // turn of shoul load
      this.props.setShouldLoad();

      // load from api
      this.props.handleOnLoadApi();
    }

    if (this.props.match.params.financeUid !== prevProps.match.params.financeUid) {
      this.props.handleOnLoadApi();
    }

    if (this.props.financeApprovalState.detail.response !== prevProps.financeApprovalState.detail.response) {
      const options: IPopupMenuOption[] = [
        {
          id: FinanceUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !this.props.financeApprovalState.detail.isLoading,
          visible: true,
        },
      ];

      this.props.setOptions(options);
    }
  },
};

export const FinanceApprovalDetail = compose(
  setDisplayName('FinanceApprovalDetail'),
  withRouter,
  withUser,
  withLayout,
  withMasterPage,
  withFinanceApproval,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters), 
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(FinanceApprovalDetailView);