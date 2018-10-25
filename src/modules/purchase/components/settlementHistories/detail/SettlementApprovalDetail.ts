import AppMenu from '@constants/AppMenu';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { PurchaseApprovalUserAction } from '@purchase/classes/types';
import { SettlementApprovalDetailView } from '@purchase/components/settlementHistories/detail/SettlementApprovalDetailView';
import { WithSettlementApproval, withSettlementApproval } from '@purchase/hoc/settlementHistories/withSettlementApproval';
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
  handlePurchaseRefresh: () => void;
  handlePurchaseModify: () => void;
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
  purchaseUid: string;
}

export type SettlementApprovalDetailProps
  = WithSettlementApproval
  & WithUser
  & WithLayout
  & WithAppBar
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnState
  & OwnStateUpdaters
  & Handler;

const createProps: mapper<SettlementApprovalDetailProps, OwnState> = (props: SettlementApprovalDetailProps): OwnState => ({
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

const handlerCreators: HandleCreators<SettlementApprovalDetailProps, Handler> = {
  handlePurchaseRefresh: (props: SettlementApprovalDetailProps) => () => {
    const { match } = props;
    const { user } = props.userState;
    const { loadDetailRequest } = props.settlementApprovalDispatch;

    if (user) {
      loadDetailRequest({
        purchaseUid: match.params.purchaseUid,
        companyUid: user.company.uid,
        positionUid: user.position.uid,
      });
    }
  },

  handlePurchaseModify: (props: SettlementApprovalDetailProps) => () => {
    const { intl, stateUpdate } = props;

    stateUpdate({
      dialogFullScreen: false,
      dialogOpen: true,
      dialogTitle: intl.formatMessage({ id: 'purchase.dialog.modifyTitle' }),
      dialogDescription: intl.formatMessage({ id: 'purchase.dialog.modifyDescription' }),
      dialogCancelText: intl.formatMessage({ id: 'global.action.disaggree' }),
      dialogConfirmedText: intl.formatMessage({ id: 'global.action.aggree' })
    });
  },
  handleDialogOpen: (props: SettlementApprovalDetailProps) => (title: string, description: string, cancelText?: string, confirmText?: string, fullScreen?: boolean) => {
    const { intl, stateUpdate, dialogCancelText, dialogConfirmedText } = props;

    stateUpdate({
      dialogFullScreen: fullScreen || false,
      dialogOpen: true,
      dialogTitle: title,
      dialogDescription: description,
      dialogCancelText: cancelText || intl.formatMessage({ id: dialogCancelText }),
      dialogConfirmedText: confirmText || intl.formatMessage({ id: dialogConfirmedText })
    });
  },
  handleDialogClose: (props: SettlementApprovalDetailProps) => () => {
    const { stateReset } = props;

    stateReset();
  },
  handleDialogConfirmed: (props: SettlementApprovalDetailProps) => () => {
    const { match, history, stateReset } = props;
    const purchaseUid = match.params.purchaseUid;

    stateReset();

    history.push('/purchase/settlement/form/', { uid: purchaseUid });
  },
};

const lifecycles: ReactLifeCycleFunctions<SettlementApprovalDetailProps, OwnState> = {
  componentDidMount() {
    const {
      match, layoutDispatch, appBarDispatch, intl,
      handlePurchaseRefresh,
    } = this.props;

    const { user } = this.props.userState;
    const { loadDetailRequest } = this.props.settlementApprovalDispatch;

    layoutDispatch.changeView({
      uid: AppMenu.PurchaseSettlementApproval,
      parentUid: AppMenu.Purchase,
      title: intl.formatMessage({ id: 'purchasesettlementapproval.detail.title' }),
      subTitle: intl.formatMessage({ id: 'purchasesettlementapproval.detail.subTitle' })
    });

    layoutDispatch.navBackShow();
    layoutDispatch.moreShow();

    const handleMenuClick = (menu: IAppBarMenu): void => {
      switch (menu.id) {
        case PurchaseApprovalUserAction.Refresh:
          handlePurchaseRefresh();
          break;

        default:
          break;
      }
    };

    appBarDispatch.assignCallback(handleMenuClick);

    if (user) {
      loadDetailRequest({
        purchaseUid: match.params.purchaseUid,
        companyUid: user.company.uid,
        positionUid: user.position.uid,
      });
    }
  },
  componentWillReceiveProps(nextProps: SettlementApprovalDetailProps) {
    if (nextProps.settlementApprovalState.detail.response !== this.props.settlementApprovalState.detail.response) {
      const { intl } = nextProps;
      const { assignMenus } = nextProps.appBarDispatch;

      const currentMenus = [
        {
          id: PurchaseApprovalUserAction.Refresh,
          name: intl.formatMessage({ id: 'global.action.refresh' }),
          enabled: true,
          visible: true
        }
      ];

      assignMenus(currentMenus);
    }
  },
  componentWillUnmount() {
    const { layoutDispatch, appBarDispatch, settlementApprovalDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();
    layoutDispatch.actionCentreHide();

    appBarDispatch.dispose();

    settlementApprovalDispatch.loadDetailDispose();
  }
};

export const SettlementApprovalDetail = compose<SettlementApprovalDetailProps, {}>(
  withUser,
  withLayout,
  withAppBar,
  withRouter,
  withSettlementApproval,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<SettlementApprovalDetailProps, Handler>(handlerCreators),
  lifecycle<SettlementApprovalDetailProps, OwnState>(lifecycles),
)(SettlementApprovalDetailView);