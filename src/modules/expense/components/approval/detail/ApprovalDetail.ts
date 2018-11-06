import AppMenu from '@constants/AppMenu';
import { IExpenseApprovalPostPayload } from '@expense/classes/request/approval';
import { WithExpenseApproval, withExpenseApproval } from '@expense/hoc/withExpenseApproval';
import { expenseApprovalMessage } from '@expense/locales/messages/expenseApprovalMessage';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  compose,
  HandleCreators,
  lifecycle,
  mapper,
  ReactLifeCycleFunctions,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';
import { Dispatch } from 'redux';
import { FormErrors } from 'redux-form';
import { isNullOrUndefined, isObject } from 'util';

import { WorkflowStatusType } from '@common/classes/types';
import { ExpenseApprovalUserAction } from '@expense/classes/types';
import { RadioGroupChoice } from '@layout/components/input/radioGroup';
import { IAppBarMenu } from '@layout/interfaces';
import { WorkflowApprovalFormData } from '@organization/components/workflow/approval/WorkflowApprovalForm';
import { ApprovalDetailView } from './ApprovalDetailView';

interface OwnHandlers {
  handleRefresh: () => void;
  handleValidate: (payload: WorkflowApprovalFormData) => FormErrors;
  handleSubmit: (payload: WorkflowApprovalFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface OwnRouteParams {
  expenseUid: string;
}

interface OwnState {
  isApprove?: boolean | undefined;
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
}

export type ExpenseApprovalDetailProps
  = WithExpenseApproval
  & WithUser
  & WithLayout
  & WithAppBar
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;

const handlerCreators: HandleCreators<ExpenseApprovalDetailProps, OwnHandlers> = {
  handleValidate: (props: ExpenseApprovalDetailProps) => (formData: WorkflowApprovalFormData) => { 
    const errors = {
      information: {}
    };
  
    const requiredFields = ['isApproved', 'remark'];    
  
    requiredFields.forEach(field => {
      if (!formData[field] || isNullOrUndefined(formData[field])) {
        errors.information[field] = props.intl.formatMessage({id: `global.form.approval.field.${field}.required`});
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
      const message = intl.formatMessage(expenseApprovalMessage.emptyProps);

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
      remark: !isApproved ? formData.remark : null
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
  handleSubmitSuccess: (props: ExpenseApprovalDetailProps) => (response: boolean) => {
    const { intl, history, match, isApprove } = props;
    const { alertAdd } = props.layoutDispatch;

    let message: string = '';

    if (isApprove) {
      message = intl.formatMessage(expenseApprovalMessage.approveSuccess, {uid: match.params.expenseUid});
    } else {
      message = intl.formatMessage(expenseApprovalMessage.rejectSuccess, {uid: match.params.expenseUid});
    }

    alertAdd({
      message,
      time: new Date()
    });

    if (match.params.expenseUid) {
      history.push(`/approval/expense/list`);
    }
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
        message: intl.formatMessage(expenseApprovalMessage.createFailure),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  },
  handleRefresh: (props: ExpenseApprovalDetailProps) => () => { 
    const { match } = props;
    const { user } = props.userState;
    const { loadDetailRequest } = props.expenseApprovalDispatch;

    if (user) {
      loadDetailRequest({
        companyUid: user.company.uid,
        positionUid: user.position.uid,
        expenseUid: match.params.expenseUid
      });
    }
  }
};

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const lifecycles: ReactLifeCycleFunctions<ExpenseApprovalDetailProps, {}> = {
  componentDidMount() {
    const { layoutDispatch, intl, appBarDispatch, handleRefresh, match } = this.props;
    const { user } = this.props.userState;
    const { loadDetailRequest } = this.props.expenseApprovalDispatch;

    layoutDispatch.changeView({
      uid: AppMenu.ExpenseApproval,
      parentUid: AppMenu.Expense,
      title: intl.formatMessage({id: 'expense.form.approval.newTitle'}),
      subTitle : intl.formatMessage({id: 'expense.form.approval.newSubTitle'})
    });
    
    layoutDispatch.navBackShow(); 
    layoutDispatch.moreShow();
    
    const handleMenuClick = (menu: IAppBarMenu): void => {
      switch (menu.id) {
        case ExpenseApprovalUserAction.Refresh:
          handleRefresh();
          break;

        default:
          break;
      }
    };

    appBarDispatch.assignCallback(handleMenuClick);

    if (user) {
      loadDetailRequest({
        companyUid: user.company.uid,
        positionUid: user.position.uid,
        expenseUid: match.params.expenseUid
      });
    }
  },
  componentWillReceiveProps(nextProps: ExpenseApprovalDetailProps) {
    if (nextProps.expenseApprovalState.detail.response !== this.props.expenseApprovalState.detail.response) {
      const { intl } = nextProps;
      const { assignMenus } = nextProps.appBarDispatch;

      const currentMenus = [
        {
          id: ExpenseApprovalUserAction.Refresh,
          name: intl.formatMessage({id: 'global.action.refresh'}),
          enabled: true,
          visible: true
        }
      ];

      assignMenus(currentMenus);
    }
  },
  componentWillUnmount() {
    const { layoutDispatch, appBarDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();
    layoutDispatch.actionCentreHide();

    appBarDispatch.dispose();
  }
};

const createProps: mapper<ExpenseApprovalDetailProps, OwnState> = (props: ExpenseApprovalDetailProps): OwnState => {
  const { intl } = props;

  return {
    approvalTitle: intl.formatMessage({id: 'expense.approvalTitle'}),
    approvalSubHeader: intl.formatMessage({id: 'expense.approvalSubHeader'}),
    approvalChoices: [
      { value: WorkflowStatusType.Approved, label: intl.formatMessage({id: 'workflow.approval.action.approve'}) },
      { value: WorkflowStatusType.Rejected, label: intl.formatMessage({id: 'workflow.approval.action.reject'}) }
    ],
    approvalTrueValue: WorkflowStatusType.Approved,
    approvalDialogTitle: intl.formatMessage({id: 'expense.dialog.approvalTitle'}),
    approvalDialogContentText: intl.formatMessage({id: 'expense.dialog.approvalContent'}),
    approvalDialogCancelText: intl.formatMessage({id: 'global.action.cancel'}),
    approvalDialogConfirmedText: intl.formatMessage({id: 'global.action.continue'}),
  };
};

export const ApprovalDetail = compose<ExpenseApprovalDetailProps, {}>(
  withUser,
  withLayout,
  withAppBar,
  withRouter,
  withExpenseApproval,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<ExpenseApprovalDetailProps, OwnHandlers>(handlerCreators),
  lifecycle<ExpenseApprovalDetailProps, {}>(lifecycles),
)(ApprovalDetailView);