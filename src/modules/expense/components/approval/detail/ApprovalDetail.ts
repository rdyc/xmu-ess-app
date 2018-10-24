import AppMenu from '@constants/AppMenu';
import { ExpenseApprovalUserAction } from '@expense/classes/types';
import { ApprovalDetailView } from '@expense/components/approval/detail/ApprovalDetailView';
import { WithExpenseApproval, withExpenseApproval } from '@expense/hoc/withExpenseApproval';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
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

export interface Handler {
  handleExpenseRefresh: () => void;
  handleExpenseModify: () => void;
  handleDialogOpen: (title: string, description: string, cancelText?: string, confirmText?: string, fullScreen?: boolean) => void;
  handleDialogClose: () => void;
  handleDialogConfirmed: () => void;
}

interface OwnState {
  dialogFullScreen: boolean;
  dialogOpen: boolean;
  dialogTitle?: string | undefined;
  dialogDescription?: string | undefined;
  dialogCancelText: string;
  dialogConfirmedText: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

interface OwnRouteParams {
  expenseUid: string;
}

export type ApprovalDetailProps
  = WithExpenseApproval
  & WithUser
  & WithLayout
  & WithAppBar
  & RouteComponentProps<OwnRouteParams> 
  & InjectedIntlProps
  & OwnState
  & OwnStateUpdaters
  & Handler;

const createProps: mapper<ApprovalDetailProps, OwnState> = (props: ApprovalDetailProps): OwnState => ({ 
    dialogFullScreen: false,
    dialogOpen: false,
    dialogCancelText: 'global.action.cancel',
    dialogConfirmedText: 'global.action.ok',
  });

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
    stateUpdate: (prevState: OwnState) => (newState: any) => ({
      ...prevState,
      ...newState
    }),
    stateReset: (prevState: OwnState) => () => ({
      ...prevState,
      dialogFullScreen: false,
      dialogOpen: false,
      dialogTitle: undefined,
      dialogDescription: undefined,
      dialogCancelText: 'global.action.cancel',
      dialogConfirmedText: 'global.action.ok',
    })
  };

const handlerCreators: HandleCreators<ApprovalDetailProps, Handler> = {
    handleExpenseRefresh: (props: ApprovalDetailProps) => () => { 
      const { match } = props;
      const { user } = props.userState;
      const { loadDetailRequest } = props.expenseApprovalDispatch;

      if (user) {
        loadDetailRequest({
          expenseUid: match.params.expenseUid,
          companyUid: user.company.uid,
          positionUid: user.position.uid,
        }); 
      }
    },

    handleExpenseModify: (props: ApprovalDetailProps) => () => { 
      const { intl, stateUpdate } = props;

      stateUpdate({
        dialogFullScreen: false,
        dialogOpen: true,
        dialogTitle: intl.formatMessage({id: 'expense.dialog.modifyTitle'}), 
        dialogDescription: intl.formatMessage({id: 'expense.dialog.modifyDescription'}),
        dialogCancelText: intl.formatMessage({id: 'global.action.disaggree'}),
        dialogConfirmedText: intl.formatMessage({id: 'global.action.aggree'})
      });
    },
    handleDialogOpen: (props: ApprovalDetailProps) => (title: string, description: string, cancelText?: string, confirmText?: string, fullScreen?: boolean) => { 
      const { intl, stateUpdate, dialogCancelText, dialogConfirmedText } = props;
  
      stateUpdate({ 
        dialogFullScreen: fullScreen || false,
        dialogOpen: true,
        dialogTitle: title,
        dialogDescription: description,
        dialogCancelText: cancelText || intl.formatMessage({id: dialogCancelText}),
        dialogConfirmedText: confirmText || intl.formatMessage({id: dialogConfirmedText})
      });
    },
    handleDialogClose: (props: ApprovalDetailProps) => () => { 
      const { stateReset } = props;
  
      stateReset();
    },
    handleDialogConfirmed: (props: ApprovalDetailProps) => () => { 
      const { match, history, stateReset } = props;
      const expenseUid = match.params.expenseUid;
  
      stateReset();
  
      history.push('/expense/form/', { uid: expenseUid });
    },
  };

const lifecycles: ReactLifeCycleFunctions<ApprovalDetailProps, OwnState> = {
    componentDidMount() {
      const { 
        match, layoutDispatch, appBarDispatch, intl, 
        handleExpenseRefresh,
      } = this.props;
  
      const { user } = this.props.userState;
      const { loadDetailRequest } = this.props.expenseApprovalDispatch;
  
      layoutDispatch.changeView({
        uid: AppMenu.ExpenseApproval,
        parentUid: AppMenu.Expense,
        title: intl.formatMessage({id: 'expense.detail.title'}),
        subTitle : intl.formatMessage({id: 'expense.detail.subTitle'})
      });
  
      layoutDispatch.navBackShow();
      layoutDispatch.moreShow();
      
      const handleMenuClick = (menu: IAppBarMenu): void => {
        switch (menu.id) {
          case ExpenseApprovalUserAction.Refresh:
            handleExpenseRefresh();
            break;
        
          default:
            break;
        }
      };
  
      appBarDispatch.assignCallback(handleMenuClick);
  
      if (user) {
        loadDetailRequest({
          expenseUid: match.params.expenseUid,
          companyUid: user.company.uid,
          positionUid: user.position.uid,
        });
      }
    },
    componentWillReceiveProps(nextProps: ApprovalDetailProps) {
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
      const { layoutDispatch, appBarDispatch, expenseApprovalDispatch } = this.props;
  
      layoutDispatch.changeView(null);
      layoutDispatch.navBackHide();
      layoutDispatch.moreHide();
      layoutDispatch.actionCentreHide();
  
      appBarDispatch.dispose();
  
      expenseApprovalDispatch.loadDetailDispose();
    }
  };

export const ApprovalDetail = compose<ApprovalDetailProps, {}>(
    withUser,
    withLayout,
    withAppBar,
    withRouter,
    withExpenseApproval,
    injectIntl,
    withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters), 
    withHandlers<ApprovalDetailProps, Handler>(handlerCreators),
    lifecycle<ApprovalDetailProps, OwnState>(lifecycles),
  )(ApprovalDetailView);