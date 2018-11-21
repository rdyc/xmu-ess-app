import AppMenu from '@constants/AppMenu';
import { ExpenseUserAction } from '@expense/classes/types';
import { RequestDetailView } from '@expense/components/request/detail/RequestDetailView';
import { WithExpenseRequest, withExpenseRequest } from '@expense/hoc/withExpenseRequest';
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

export type RequestDetailProps
  = WithExpenseRequest
  & WithUser
  & WithLayout
  & WithAppBar
  & RouteComponentProps<OwnRouteParams> 
  & InjectedIntlProps
  & OwnState
  & OwnStateUpdaters
  & Handler;

const createProps: mapper<RequestDetailProps, OwnState> = (props: RequestDetailProps): OwnState => ({ 
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

const handlerCreators: HandleCreators<RequestDetailProps, Handler> = {
    handleExpenseRefresh: (props: RequestDetailProps) => () => { 
      const { match } = props;
      const { user } = props.userState;
      const { loadDetailRequest } = props.expenseRequestDispatch;

      if (user) {
        loadDetailRequest({
          expenseUid: match.params.expenseUid,
          companyUid: user.company.uid,
          positionUid: user.position.uid,
        }); 
      }
    },

    handleExpenseModify: (props: RequestDetailProps) => () => { 
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
    handleDialogOpen: (props: RequestDetailProps) => (title: string, description: string, cancelText?: string, confirmText?: string, fullScreen?: boolean) => { 
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
    handleDialogClose: (props: RequestDetailProps) => () => { 
      const { stateReset } = props;
  
      stateReset();
    },
    handleDialogConfirmed: (props: RequestDetailProps) => () => { 
      const { match, history, stateReset } = props;
      const expenseUid = match.params.expenseUid;
  
      stateReset();
  
      history.push('/expense/requests/form', { uid: expenseUid });
    },
  };

const lifecycles: ReactLifeCycleFunctions<RequestDetailProps, OwnState> = {
    componentDidMount() {
      const { 
        match, layoutDispatch, appBarDispatch, intl, 
        handleExpenseRefresh, handleExpenseModify, 
      } = this.props;
  
      const { user } = this.props.userState;
      const { loadDetailRequest } = this.props.expenseRequestDispatch;
  
      layoutDispatch.changeView({
        uid: AppMenu.ExpenseRequest,
        parentUid: AppMenu.Expense,
        title: intl.formatMessage({id: 'expense.detail.title'}),
        subTitle : intl.formatMessage({id: 'expense.detail.subTitle'})
      });
  
      layoutDispatch.navBackShow();
      layoutDispatch.moreShow();
      
      const handleMenuClick = (menu: IAppBarMenu): void => {
        switch (menu.id) {
          case ExpenseUserAction.Refresh:
            handleExpenseRefresh();
            break;
          
          case ExpenseUserAction.Modify:
            handleExpenseModify();
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
    componentWillReceiveProps(nextProps: RequestDetailProps) {
      if (nextProps.expenseRequestState.detail.response !== this.props.expenseRequestState.detail.response) {
        const { intl } = nextProps;
        const { assignMenus } = nextProps.appBarDispatch;
          
        const currentMenus = [
          {
            id: ExpenseUserAction.Refresh,
            name: intl.formatMessage({id: 'global.action.refresh'}),
            enabled: true,
            visible: true
          },
        ];
  
        assignMenus(currentMenus);
      }
    },
    componentWillUnmount() {
      const { layoutDispatch, appBarDispatch, expenseRequestDispatch } = this.props;
  
      layoutDispatch.changeView(null);
      layoutDispatch.navBackHide();
      layoutDispatch.moreHide();
      layoutDispatch.actionCentreHide();
  
      appBarDispatch.dispose();
  
      expenseRequestDispatch.loadDetailDispose();
    }
  };

export const RequestDetail = compose<RequestDetailProps, {}>(
    withUser,
    withLayout,
    withAppBar,
    withRouter,
    withExpenseRequest,
    injectIntl,
    withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters), 
    withHandlers<RequestDetailProps, Handler>(handlerCreators),
    lifecycle<RequestDetailProps, OwnState>(lifecycles),
  )(RequestDetailView);