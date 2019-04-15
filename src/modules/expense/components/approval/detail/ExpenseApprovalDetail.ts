import { WorkflowStatusType } from '@common/classes/types';
import { ExpenseUserAction } from '@expense/classes/types';
import { WithExpenseApproval, withExpenseApproval } from '@expense/hoc/withExpenseApproval';
import { expenseMessage } from '@expense/locales/messages/expenseMessage';
import { RadioGroupChoice } from '@layout/components/input/radioGroup';
import { IPopupMenuOption } from '@layout/components/PopupMenu';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithNotification, withNotification } from '@layout/hoc/withNotification';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IValidationErrorResponse } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { ModuleDefinitionType, NotificationType } from '@layout/types';
import { IWorkflowApprovalPayload } from '@organization/classes/request/workflow/approval';
import { IWorkflowApprovalFormValue } from '@organization/components/workflow/approval/form/WorkflowApprovalForm';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
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

import { ExpenseApprovalDetailView } from './ExpenseApprovalDetailView';

interface OwnRouteParams {
  expenseUid: string;
}

interface OwnHandler {
  handleOnLoadApi: () => void;
  handleOnSelectedMenu: (item: IPopupMenuOption) => void;
  handleOnSubmit: (values: IWorkflowApprovalFormValue, actions: FormikActions<IWorkflowApprovalFormValue>) => void;
}

interface IOwnState {
  isApprove?: boolean | undefined;
  menuOptions?: IPopupMenuOption[];
  shouldDataReload: boolean;
  approvalTitle: string;
  approvalSubHeader: string;
  approvalStatusTypes: RadioGroupChoice[];
  approvalTrueValues: string[];
  approvalDialogTitle: string;
  approvalDialogContentText: string;
  approvalDialogCancelText: string;
  approvalDialogConfirmedText: string;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  setOptions: StateHandler<IOwnState>;
  setShouldLoad: StateHandler<IOwnState>;
}

export type ExpenseApprovalDetailProps 
  = WithUser
  & WithLayout
  & WithMasterPage
  & WithExpenseApproval
  & WithNotification
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & IOwnState
  & OwnHandler
  & IOwnStateUpdaters;

const createProps: mapper<ExpenseApprovalDetailProps, IOwnState> = (props: ExpenseApprovalDetailProps): IOwnState => { 
  const { intl } = props;

  return {
    shouldDataReload: false,
    approvalTitle: intl.formatMessage(expenseMessage.approval.section.title),
    approvalSubHeader: intl.formatMessage(expenseMessage.approval.section.subTitle),
    approvalStatusTypes: [
      { value: WorkflowStatusType.Approved, label: intl.formatMessage(organizationMessage.workflow.option.approve) },
      { value: WorkflowStatusType.Rejected, label: intl.formatMessage(organizationMessage.workflow.option.reject) }
    ],
    approvalTrueValues: [WorkflowStatusType.Approved],
    approvalDialogTitle: intl.formatMessage(expenseMessage.approval.dialog.title),
    approvalDialogContentText: intl.formatMessage(expenseMessage.approval.dialog.content),
    approvalDialogCancelText: intl.formatMessage(layoutMessage.action.cancel),
    approvalDialogConfirmedText: intl.formatMessage(layoutMessage.action.continue),
  };
};

const stateUpdaters: StateUpdaters<{}, IOwnState, IOwnStateUpdaters> = {
  setShouldLoad: (prevState: IOwnState) => (): Partial<IOwnState> => ({
    shouldDataReload: !prevState.shouldDataReload
  }),
  setOptions: () => (options?: IPopupMenuOption[]): Partial<IOwnState> => ({
    menuOptions: options
  }),
};

const handlerCreators: HandleCreators<ExpenseApprovalDetailProps, OwnHandler> = {
  handleOnLoadApi: (props: ExpenseApprovalDetailProps) => () => { 
    if (props.userState.user && props.match.params.expenseUid && !props.expenseApprovalState.detail.isLoading) {
      props.expenseApprovalDispatch.loadDetailRequest({
        companyUid: props.userState.user.company.uid,
        positionUid: props.userState.user.position.uid,
        expenseUid: props.match.params.expenseUid
      });
    }
  },
  handleOnSelectedMenu: (props: ExpenseApprovalDetailProps) => (item: IPopupMenuOption) => {
    switch (item.id) {
      case ExpenseUserAction.Refresh:
        props.setShouldLoad();
        break;
    
      default:
        break;
    }
  },
  handleOnSubmit: (props: ExpenseApprovalDetailProps) => (values: IWorkflowApprovalFormValue, actions: FormikActions<IWorkflowApprovalFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise((resolve, reject) => undefined);

    // compare approval status string
    const isApproved = props.approvalTrueValues.indexOf(values.statusType) !== -1;
    
    if (user) {
      // must have expenseUid
      if (props.match.params.expenseUid) {

        // fill payload
        const payload: IWorkflowApprovalPayload = {
          isApproved,
          remark: !isApproved ? values.remark : undefined
        };

        // set the promise
        promise = new Promise((resolve, reject) => {
          props.expenseApprovalDispatch.createRequest({
            resolve, 
            reject,
            expenseUid: props.match.params.expenseUid, 
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
          message: props.intl.formatMessage(isApproved ?  expenseMessage.approval.message.approveSuccess : expenseMessage.approval.message.rejectSuccess, { uid: props.match.params.expenseUid })
        });
       
        // notification: mark as complete
        props.notificationDispatch.markAsComplete({
          moduleUid: ModuleDefinitionType.Expense,
          detailType: NotificationType.Approval,
          itemUid: props.match.params.expenseUid
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

            if (item.field === 'expenseUid') {
              field = 'statusType';
            }

            actions.setFieldError(field, props.intl.formatMessage({id: item.message}));
          });
        }

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(expenseMessage.approval.message.createFailure)
        });
      });
  }
};

const lifecycles: ReactLifeCycleFunctions<ExpenseApprovalDetailProps, IOwnState> = {
  componentDidUpdate(prevProps: ExpenseApprovalDetailProps) {
    if (this.props.shouldDataReload && this.props.shouldDataReload !== prevProps.shouldDataReload) {
      // turn of shoul load
      this.props.setShouldLoad();

      // load from api
      this.props.handleOnLoadApi();
    }

    if (this.props.match.params.expenseUid !== prevProps.match.params.expenseUid) {
      this.props.handleOnLoadApi();
    }

    if (this.props.expenseApprovalState.detail.response !== prevProps.expenseApprovalState.detail.response) {
      const { isLoading } = this.props.expenseApprovalState.detail;

      const options: IPopupMenuOption[] = [
        {
          id: ExpenseUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !isLoading,
          visible: true,
        },
      ];

      this.props.setOptions(options);
    }
  },
};

export const ExpenseApprovalDetail = compose(
  setDisplayName('ExpenseApprovalDetail'),
  withRouter,
  withUser,
  withLayout,
  withMasterPage,
  withExpenseApproval,
  withNotification,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters), 
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
)(ExpenseApprovalDetailView);