import { WorkflowStatusType } from '@common/classes/types';
import AppMenu from '@constants/AppMenu';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { PurchaseUserAction } from '@purchase/classes/types';
import { PurchaseSettlementDetailView } from '@purchase/components/purchaseSettlement/detail/PurchaseSettlementDetailView';
import { WithPurchaseSettlement, withPurchaseSettlement } from '@purchase/hoc/purchaseSettlement/withPurchaseSettlement';
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

export type PurchaseSettlementDetailProps
  = WithPurchaseSettlement
  & WithUser
  & WithLayout
  & WithAppBar
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnState
  & OwnStateUpdaters
  & Handler;

const createProps: mapper<PurchaseSettlementDetailProps, OwnState> = (props: PurchaseSettlementDetailProps): OwnState => ({
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

const handlerCreators: HandleCreators<PurchaseSettlementDetailProps, Handler> = {
  handlePurchaseRefresh: (props: PurchaseSettlementDetailProps) => () => {
    const { match } = props;
    const { user } = props.userState;
    const { loadDetailRequest } = props.purchaseSettlementDispatch;

    if (user) {
      loadDetailRequest({
        purchaseUid: match.params.purchaseUid,
        companyUid: user.company.uid,
        positionUid: user.position.uid,
      });
    }
  },
  handlePurchaseModify: (props: PurchaseSettlementDetailProps) => () => {
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
  handleDialogOpen: (props: PurchaseSettlementDetailProps) => (title: string, description: string, cancelText?: string, confirmText?: string, fullScreen?: boolean) => {
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
  handleDialogClose: (props: PurchaseSettlementDetailProps) => () => {
    const { stateReset } = props;

    stateReset();
  },
  handleDialogConfirmed: (props: PurchaseSettlementDetailProps) => () => {
    const { match, history, stateReset } = props;
    const purchaseUid = match.params.purchaseUid;

    stateReset();

    history.push('/purchase/settlement/form/', { uid: purchaseUid });
  },
};

const lifecycles: ReactLifeCycleFunctions<PurchaseSettlementDetailProps, OwnState> = {
  componentDidMount() {
    const {
      match, layoutDispatch, appBarDispatch, intl,
      handlePurchaseRefresh, handlePurchaseModify,
    } = this.props;

    const { user } = this.props.userState;
    const { loadDetailRequest } = this.props.purchaseSettlementDispatch;

    layoutDispatch.changeView({
      uid: AppMenu.PurchaseSettlementRequest,
      parentUid: AppMenu.Purchase,
      title: intl.formatMessage({ id: 'purchasesettlement.detail.title' }),
      subTitle: intl.formatMessage({ id: 'purchasesettlement.detail.subTitle' })
    });

    layoutDispatch.navBackShow();
    layoutDispatch.moreShow();

    const handleMenuClick = (menu: IAppBarMenu): void => {
      switch (menu.id) {
        case PurchaseUserAction.Refresh:
          handlePurchaseRefresh();
          break;

        case PurchaseUserAction.Modify:
          handlePurchaseModify();
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
  componentWillReceiveProps(nextProps: PurchaseSettlementDetailProps) {
    if (nextProps.purchaseSettlementState.detail.response !== this.props.purchaseSettlementState.detail.response) {
      const { intl } = nextProps;
      const { response } = nextProps.purchaseSettlementState.detail;
      const { assignMenus } = nextProps.appBarDispatch;

      const isStatusTypeEquals = (statusTypes: string[]): boolean => {
        let result = false;

        if (response && response.data) {
          result = statusTypes.indexOf(response.data.statusType) !== -1;
        }

        return result;
      };

      const currentMenus = [
        {
          id: PurchaseUserAction.Refresh,
          name: intl.formatMessage({ id: 'global.action.refresh' }),
          enabled: true,
          visible: true
        },
        {
          id: PurchaseUserAction.Modify,
          name: intl.formatMessage({ id: 'purchase.action.modify' }),
          enabled: response !== undefined,
          visible: isStatusTypeEquals([WorkflowStatusType.Submitted, WorkflowStatusType.InProgress, WorkflowStatusType.Approved])
        }
      ];

      assignMenus(currentMenus);
    }
  },
  componentWillUnmount() {
    const { layoutDispatch, appBarDispatch, purchaseSettlementDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();
    layoutDispatch.actionCentreHide();

    appBarDispatch.dispose();

    purchaseSettlementDispatch.loadDetailDispose();
  }
};

export const PurchaseSettlementDetail = compose<PurchaseSettlementDetailProps, {}>(
  withUser,
  withLayout,
  withAppBar,
  withRouter,
  withPurchaseSettlement,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<PurchaseSettlementDetailProps, Handler>(handlerCreators),
  lifecycle<PurchaseSettlementDetailProps, OwnState>(lifecycles),
)(PurchaseSettlementDetailView);