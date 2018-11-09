import { WorkflowStatusType } from '@common/classes/types';
import AppMenu from '@constants/AppMenu';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { PurchaseUserAction } from '@purchase/classes/types';
import { PurchaseRequestDetailView } from '@purchase/components/purchaseRequest/detail/PurchaseRequestDetailView';
import { WithPurchaseRequest, withPurchaseRequest } from '@purchase/hoc/purchaseRequest/withPurchaseRequest';
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

export type PurchaseRequestDetailProps
  = WithPurchaseRequest
  & WithUser
  & WithLayout
  & WithAppBar
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnState
  & OwnStateUpdaters
  & Handler;

const createProps: mapper<PurchaseRequestDetailProps, OwnState> = (props: PurchaseRequestDetailProps): OwnState => ({
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

const handlerCreators: HandleCreators<PurchaseRequestDetailProps, Handler> = {
  handlePurchaseRefresh: (props: PurchaseRequestDetailProps) => () => {
    const { match } = props;
    const { user } = props.userState;
    const { loadDetailRequest } = props.purchaseRequestDispatch;

    if (user) {
      loadDetailRequest({
        purchaseUid: match.params.purchaseUid,
        companyUid: user.company.uid,
        positionUid: user.position.uid,
      });
    }
  },
  handlePurchaseModify: (props: PurchaseRequestDetailProps) => () => {
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
  handleDialogOpen: (props: PurchaseRequestDetailProps) => (title: string, description: string, cancelText?: string, confirmText?: string, fullScreen?: boolean) => {
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
  handleDialogClose: (props: PurchaseRequestDetailProps) => () => {
    const { stateReset } = props;

    stateReset();
  },
  handleDialogConfirmed: (props: PurchaseRequestDetailProps) => () => {
    const { match, history, stateReset } = props;
    const purchaseUid = match.params.purchaseUid;

    stateReset();

    history.push('/purchase/requests/form/', { uid: purchaseUid });
  },
};

const lifecycles: ReactLifeCycleFunctions<PurchaseRequestDetailProps, OwnState> = {
  componentDidMount() {
    const {
      match, layoutDispatch, appBarDispatch, intl,
      handlePurchaseRefresh, handlePurchaseModify,
    } = this.props;

    const { user } = this.props.userState;
    const { loadDetailRequest } = this.props.purchaseRequestDispatch;

    layoutDispatch.changeView({
      uid: AppMenu.PurchaseRequest,
      parentUid: AppMenu.Purchase,
      title: intl.formatMessage({ id: 'purchase.detail.title' }),
      subTitle: intl.formatMessage({ id: 'purchase.detail.subTitle' })
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
  componentWillReceiveProps(nextProps: PurchaseRequestDetailProps) {
    if (nextProps.purchaseRequestState.detail.response !== this.props.purchaseRequestState.detail.response) {
      const { intl } = nextProps;
      const { response } = nextProps.purchaseRequestState.detail;
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
          visible: isStatusTypeEquals([WorkflowStatusType.Submitted, WorkflowStatusType.InProgress])
        }
      ];

      assignMenus(currentMenus);
    }
  },
  componentWillUnmount() {
    const { layoutDispatch, appBarDispatch, purchaseRequestDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();
    layoutDispatch.actionCentreHide();

    appBarDispatch.dispose();

    purchaseRequestDispatch.loadDetailDispose();
  }
};

export const PurchaseRequestDetail = compose<PurchaseRequestDetailProps, {}>(
  withUser,
  withLayout,
  withAppBar,
  withRouter,
  withPurchaseRequest,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<PurchaseRequestDetailProps, Handler>(handlerCreators),
  lifecycle<PurchaseRequestDetailProps, OwnState>(lifecycles),
)(PurchaseRequestDetailView);