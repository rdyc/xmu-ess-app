import AppMenu from '@constants/AppMenu';
import { IExpenseApprovalPostPayload } from '@expense/classes/request/approval';
import { IExpense } from '@expense/classes/response';
import { ApprovalView } from '@expense/components/approval/detail/approval/ApprovalView';
import { WithExpenseApproval, withExpenseApproval } from '@expense/hoc/withExpenseApproval';
import { expenseRequestMessage } from '@expense/locales/messages/expenseRequestMessage';
import { FormMode } from '@generic/types';
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

export type ApprovalData = {
  information: {
    isApproved: boolean | null | undefined;
    remark: string | null | undefined;
  },
};

interface OwnHandlers {
  handleSubmit: (payload: ApprovalData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface OwnRouteParams {
  expenseUid: string;
}

interface ApproveProps {
  isApproved: boolean | null;
  remark: string | null;
  valid: boolean;
  submitting: boolean;
}

interface OwnState {
  companyUid?: string | undefined;
  positionUid?: string | undefined;
  expenseUid?: string | undefined;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type ApprovalProps
  = WithExpenseApproval
  & ApproveProps
  & WithUser
  & WithLayout
  & WithAppBar
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;

const handlerCreators: HandleCreators<ApprovalProps, OwnHandlers> = {
  
  handleSubmit: (props: ApprovalProps) => (formData: ApprovalData) => { 
    const { expenseUid, intl, match } = props;
    const { user } = props.userState;
    const { createRequest } = props.expenseApprovalDispatch;

    if (!user) {
      return Promise.reject('user was not found');
    }

    const payload = {
      ...formData.information,
    };

    if (!expenseUid) {
      const message = intl.formatMessage(expenseRequestMessage.emptyExpenseUid);

      return Promise.reject(message);
    }

    // creating
    return new Promise((resolve, reject) => {
        createRequest({
          resolve, 
          reject,
          expenseUid: match.params.expenseUid,
          companyUid: user.company.uid,
          positionUid: user.position.uid,
          data: payload as IExpenseApprovalPostPayload,
        });
      });
  },
  handleSubmitSuccess: (props: ApprovalProps) => (response: IExpense) => {
    const { intl, history } = props;
    const { alertAdd } = props.layoutDispatch;
    
    let message: string = '';

    message = intl.formatMessage(expenseRequestMessage.createSuccess, { uid: response.uid });

    alertAdd({
      message,
      time: new Date()
    });

    history.push('/approval/expense/list');
  },
  handleSubmitFail: (props: ApprovalProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
    const { intl } = props;
    const { alertAdd } = props.layoutDispatch;
    
    if (errors) {
      // validation errors from server (400: Bad Request)
      alertAdd({
        time: new Date(),
        message: isObject(submitError) ? submitError.message : submitError
      });
    } else {
      // another errors from server
      let message: string = '';

      message = intl.formatMessage(expenseRequestMessage.createFailure);

      alertAdd({
        message,
        time: new Date(),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

const createProps: mapper<ApprovalProps, OwnState> = (props: ApprovalProps): OwnState => ({ 
});

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const lifecycles: ReactLifeCycleFunctions<ApprovalProps, {}> = {
  componentDidMount() {
    const { layoutDispatch, intl, history, stateUpdate } = this.props;
    const { loadDetailRequest } = this.props.expenseApprovalDispatch;
    const { user } = this.props.userState;
    
    const view = {
      title: 'expense.form.newTitle',
      subTitle: 'expense.form.newSubTitle',
    };

    if (!user) {
      return;
    }

    stateUpdate({ 
      companyUid: user.company.uid,
      positionUid: user.position.uid
    });

    if (!isNullOrUndefined(history.location.state)) {
      view.title = 'expense.form.editTitle';
      view.subTitle = 'expense.form.editSubTitle';

      stateUpdate({ 
        formMode: FormMode.Edit,
        expenseUid: history.location.state.uid
      });

      loadDetailRequest({
        companyUid: user.company.uid,
        positionUid: user.position.uid,
        expenseUid: history.location.state.uid
      });
    }

    layoutDispatch.changeView({
      uid: AppMenu.ExpenseRequest,
      parentUid: AppMenu.Expense,
      title: intl.formatMessage({id: view.title}),
      subTitle : intl.formatMessage({id: view.subTitle})
    });

    layoutDispatch.navBackShow(); 
  },
  componentWillUnmount() {
    const { layoutDispatch, appBarDispatch, expenseApprovalDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();
    layoutDispatch.actionCentreHide();

    appBarDispatch.dispose();

    expenseApprovalDispatch.createDispose();
  }
};

export default compose<ApprovalProps, {}>(
  withUser,
  withLayout,
  withAppBar,
  withRouter,
  withExpenseApproval,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<ApprovalProps, OwnHandlers>(handlerCreators),
  lifecycle<ApprovalProps, {}>(lifecycles),
)(ApprovalView);