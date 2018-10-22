import AppMenu from '@constants/AppMenu';
import { FinanceApprovalUserAction } from '@finance/classes/types';
import { ApprovalDetailView } from '@finance/components/approval/detail/ApprovalDetailView';
import { WithFinanceApproval, withFinanceApproval } from '@finance/hoc/withFinanceApproval';
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

interface Handler {
  handleFinanceRefresh: () => void;
}

interface OwnState {
  action?: FinanceApprovalUserAction | undefined;
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
  financeUid: string;
}

export type ApprovalDetailProps
  = WithFinanceApproval
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
    handleFinanceRefresh: (props: ApprovalDetailProps) => () => { 
      const { match } = props;
      const { user } = props.userState;
      const { loadDetailRequest } = props.financeApprovalDispatch;
  
      if (user) {
        loadDetailRequest({
          financeUid: match.params.financeUid,
          companyUid: user.company.uid,
          positionUid: user.position.uid,
        });
      }
    },
  };
  
const lifecycles: ReactLifeCycleFunctions<ApprovalDetailProps, OwnState> = {
    componentDidMount() {
      const { 
        match, layoutDispatch, appBarDispatch, intl, 
        handleFinanceRefresh
      } = this.props;
  
      const { user } = this.props.userState;
      const { loadDetailRequest } = this.props.financeApprovalDispatch;
  
      layoutDispatch.changeView({
        uid: AppMenu.FinanceApproval,
        parentUid: AppMenu.Finance,
        title: intl.formatMessage({id: 'finance.detail.title'}),
        subTitle : intl.formatMessage({id: 'finance.detail.subTitle'})
      });
  
      layoutDispatch.navBackShow();
      layoutDispatch.moreShow();
      
      const handleMenuClick = (menu: IAppBarMenu): void => {
        switch (menu.id) {
          case FinanceApprovalUserAction.Refresh:
            handleFinanceRefresh();
            break;
        
          default:
            break;
        }
      };
  
      appBarDispatch.assignCallback(handleMenuClick);
  
      if (user) {
        loadDetailRequest({
          financeUid: match.params.financeUid,
          companyUid: user.company.uid,
          positionUid: user.position.uid,
        });
      }
    },
    componentWillReceiveProps(nextProps: ApprovalDetailProps) {
      if (nextProps.financeApprovalState.detail.response !== this.props.financeApprovalState.detail.response) {
        const { intl } = nextProps;
        const { assignMenus } = nextProps.appBarDispatch;
          
        const currentMenus = [
          {
            id: FinanceApprovalUserAction.Refresh,
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
  
export const ApprovalDetail = compose<ApprovalDetailProps, {}>(
    withUser,
    withLayout,
    withAppBar,
    withRouter,
    withFinanceApproval,
    injectIntl,
    withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters), 
    withHandlers<ApprovalDetailProps, Handler>(handlerCreators),
    lifecycle<ApprovalDetailProps, OwnState>(lifecycles),
  )(ApprovalDetailView);