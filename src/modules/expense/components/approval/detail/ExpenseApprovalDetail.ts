import { WorkflowStatusType } from '@common/classes/types';
import { IExpenseApprovalPostPayload } from '@expense/classes/request/approval';
import { WithExpenseApproval, withExpenseApproval } from '@expense/hoc/withExpenseApproval';
import { expenseMessage } from '@expense/locales/messages/expenseMessage';
import { RadioGroupChoice } from '@layout/components/input/radioGroup';
import { ModuleDefinition, NotificationType } from '@layout/helper/redirector';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithNotification, withNotification } from '@layout/hoc/withNotification';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { WorkflowApprovalFormData } from '@organization/components/workflow/approval/WorkflowApprovalForm';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
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

import { ExpenseUserAction } from '@expense/classes/types';
import { IAppBarMenu } from '@layout/interfaces';
import { ExpenseApprovalDetailView } from './ExpenseApprovalDetailView';

interface OwnRouteParams {
  expenseUid: string;
}

interface OwnHandler {
  handleOnLoadApi: () => void;
  handleValidate: (payload: WorkflowApprovalFormData) => FormErrors;
  handleSubmit: (payload: WorkflowApprovalFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface OwnState {
  isApprove?: boolean | undefined;
  shouldDataReload: boolean;
  approvalTitle: string;
  approvalSubHeader: string;
  approvalChoices: RadioGroupChoice[];
  approvalTrueValue: string;
  approvalDialogTitle: string;
  approvalDialogContentText: string;
  approvalDialogCancelText: string;
  approvalDialogConfirmedText: string;
  pageOptions?: IAppBarMenu[];
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
  setDataload: StateHandler<OwnState>;
  setOptions: StateHandler<OwnState>;
}

export type ExpenseApprovalDetailProps 
  = WithUser
  & WithLayout
  & WithExpenseApproval
  & WithNotification
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnState
  & OwnHandler
  & OwnStateUpdaters;

const createProps: mapper<ExpenseApprovalDetailProps, OwnState> = (props: ExpenseApprovalDetailProps): OwnState => { 
  const { intl } = props;

  return {
    shouldDataReload: false,
    approvalTitle: intl.formatMessage(expenseMessage.approval.section.title),
    approvalSubHeader: intl.formatMessage(expenseMessage.approval.section.subTitle),
    approvalChoices: [
      { value: WorkflowStatusType.Approved, label: intl.formatMessage(organizationMessage.workflow.option.approve) },
      { value: WorkflowStatusType.Rejected, label: intl.formatMessage(organizationMessage.workflow.option.reject) }
    ],
    approvalTrueValue: WorkflowStatusType.Approved,
    approvalDialogTitle: intl.formatMessage(expenseMessage.approval.dialog.title),
    approvalDialogContentText: intl.formatMessage(expenseMessage.approval.dialog.content),
    approvalDialogCancelText: intl.formatMessage(layoutMessage.action.cancel),
    approvalDialogConfirmedText: intl.formatMessage(layoutMessage.action.continue),
  };
};

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),
  setDataload: (prevState: OwnState) => (): Partial<OwnState> => ({
    shouldDataReload: !prevState.shouldDataReload
  }),
  setOptions: (prevState: OwnState, props: ExpenseApprovalDetailProps) => (options?: IAppBarMenu[]): Partial<OwnState> => ({
    pageOptions: options
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
  handleValidate: (props: ExpenseApprovalDetailProps) => (formData: WorkflowApprovalFormData) => { 
    const errors = {};
  
    const requiredFields = ['isApproved', 'remark'];    
  
    requiredFields.forEach(field => {
      if (!formData[field] || isNullOrUndefined(formData[field])) {
        errors[field] = props.intl.formatMessage(organizationMessage.workflow.fieldFor(field, 'fieldRequired'));
      }
    });
    
    return errors;
  },
  handleSubmit: (props: ExpenseApprovalDetailProps) => (formData: WorkflowApprovalFormData) => { 
    const { match, intl, stateUpdate } = props;
    const { user } = props.userState;
    const { createRequest } = props.expenseApprovalDispatch;

    // user checking
    if (!user) {
      return Promise.reject('user was not found');
    }

    // props checking
    if (!match.params.expenseUid) {
      const message = intl.formatMessage(expenseMessage.request.message.emptyProps);

      return Promise.reject(message);
    }

    // compare approval status string
    const isApproved = formData.isApproved === WorkflowStatusType.Approved;

    stateUpdate({
      isApprove: isApproved,
    });
    
    // generate payload
    const payload: IExpenseApprovalPostPayload = {
      isApproved,
      remark: !isApproved ? formData.remark : undefined
    };

    // dispatch create request
    return new Promise((resolve, reject) => {
      createRequest({
        resolve, 
        reject,
        expenseUid: match.params.expenseUid, 
        companyUid: user.company.uid,
        positionUid: user.position.uid,
        data: payload, 
      });
    });
  },
  handleSubmitSuccess: (props: ExpenseApprovalDetailProps) => () => {
    const { intl, match, isApprove } = props;
    const { alertAdd } = props.layoutDispatch;
    let message: string = '';
    if (isApprove) {
      message = intl.formatMessage(expenseMessage.approval.message.approveSuccess, { uid: match.params.expenseUid });
    } else {
      message = intl.formatMessage(expenseMessage.approval.message.rejectSuccess, { uid: match.params.expenseUid });
    }
    alertAdd({
      message,
      time: new Date()
    });

    props.setDataload();

    // notification: mark as complete
    props.notificationDispatch.markAsComplete({
      moduleUid: ModuleDefinition.Expense,
      detailType: NotificationType.Approval,
      itemUid: match.params.expenseUid
    });
  },
  handleSubmitFail: (props: ExpenseApprovalDetailProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
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
        message: intl.formatMessage(expenseMessage.approval.message.createFailure),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  },
};

const lifecycles: ReactLifeCycleFunctions<ExpenseApprovalDetailProps, OwnState> = {
  componentDidUpdate(prevProps: ExpenseApprovalDetailProps) {
    if (this.props.shouldDataReload && this.props.shouldDataReload !== prevProps.shouldDataReload) {
      // turn of shoul load
      this.props.setDataload();

      // load from api
      this.props.handleOnLoadApi();
    }

    if (this.props.match.params.expenseUid !== prevProps.match.params.expenseUid) {
      this.props.handleOnLoadApi();
    }

    if (this.props.expenseApprovalState.detail.response !== prevProps.expenseApprovalState.detail.response) {
      const { isLoading } = this.props.expenseApprovalState.detail;

      const options: IAppBarMenu[] = [
        {
          id: ExpenseUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !isLoading,
          visible: true,
          onClick: this.props.handleOnLoadApi,
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
  withExpenseApproval,
  withNotification,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters), 
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
)(ExpenseApprovalDetailView);