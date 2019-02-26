import { WorkflowStatusType } from '@common/classes/types';
import { IPopupMenuOption } from '@layout/components/PopupMenu';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { PurchaseUserAction } from '@purchase/classes/types';
import { PurchaseSettlementDetailView } from '@purchase/components/purchaseSettlement/detail/PurchaseSettlementDetailView';
import { WithPurchaseSettlement, withPurchaseSettlement } from '@purchase/hoc/purchaseSettlement/withPurchaseSettlement';
import { purchaseMessage } from '@purchase/locales/messages/purchaseMessage';
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

interface OwnRouteParams {
  purchaseUid: string;
}

interface OwnHandler {
  handleOnLoadApi: () => void;
  handleOnSelectedMenu: (item: IPopupMenuOption) => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
}

interface OwnState {
  menuOptions?: IPopupMenuOption[];
  shouldLoad: boolean;
  action?: PurchaseUserAction;
  dialogFullScreen: boolean;
  dialogOpen: boolean;
  dialogTitle?: string;
  dialogContent?: string;
  dialogCancelLabel?: string;
  dialogConfirmLabel?: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  setShouldLoad: StateHandler<OwnState>;
  setOptions: StateHandler<OwnState>;
  setDefault: StateHandler<OwnState>;
  setModify: StateHandler<OwnState>;
}

export type PurchaseSettlementDetailProps
  = WithUser
  & WithPurchaseSettlement
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnState
  & OwnStateUpdaters
  & OwnHandler;

const createProps: mapper<PurchaseSettlementDetailProps, OwnState> = (props: PurchaseSettlementDetailProps): OwnState => ({
  dialogFullScreen: false,
  dialogOpen: false,
  shouldLoad: false,
});

const stateUpdaters: StateUpdaters<PurchaseSettlementDetailProps, OwnState, OwnStateUpdaters> = {
  setShouldLoad: (state: OwnState, props: PurchaseSettlementDetailProps) => (): Partial<OwnState> => ({
    shouldLoad: !state.shouldLoad
  }),
  setOptions: (prevState: OwnState, props: PurchaseSettlementDetailProps) => (options?: IAppBarMenu[]): Partial<OwnState> => ({
    menuOptions: options
  }),
  setModify: (prevState: OwnState, props: PurchaseSettlementDetailProps) => (): Partial<OwnState> => ({
    action: PurchaseUserAction.Modify,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(purchaseMessage.settlement.confirm.modifyTitle),
    dialogContent: props.intl.formatMessage(purchaseMessage.settlement.confirm.modifyDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disaggre),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.aggre)
  }),
  setDefault: (prevState: OwnState) => (): Partial<OwnState> => ({
    ...prevState,
    action: undefined,
    dialogFullScreen: false,
    dialogOpen: false,
    dialogTitle: undefined,
    dialogContent: undefined,
    dialogCancelLabel: undefined,
    dialogConfirmLabel: undefined,
  })
};

const handlerCreators: HandleCreators<PurchaseSettlementDetailProps, OwnHandler> = {
  handleOnLoadApi: (props: PurchaseSettlementDetailProps) => () => {
    if (props.userState.user && props.match.params.purchaseUid && !props.purchaseSettlementState.detail.isLoading) {
      props.purchaseSettlementDispatch.loadDetailRequest({
        companyUid: props.userState.user.company.uid,
        positionUid: props.userState.user.position.uid,
        purchaseUid: props.match.params.purchaseUid
      });
    }
  },
  handleOnSelectedMenu: (props: PurchaseSettlementDetailProps) => (item: IPopupMenuOption) => {
    switch (item.id) {
      case PurchaseUserAction.Refresh:
        props.setShouldLoad();
        break;
      case PurchaseUserAction.Modify:
        props.setModify();
        break;

      default:
        break;
    }
  },
  handleOnCloseDialog: (props: PurchaseSettlementDetailProps) => () => {
    props.setDefault();
  },
  handleOnConfirm: (props: PurchaseSettlementDetailProps) => () => {
    const { response } = props.purchaseSettlementState.detail;
    
    let status: string | null | undefined;
    let purchaseUid: string | undefined;

    if (!props.action || !response) {
      return;
    }

    if (response.data) {
      status = response.data.statusType; 
      purchaseUid = response.data.uid;
    }

    const actions = [
      PurchaseUserAction.Modify,
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case PurchaseUserAction.Modify:
          next = '/purchase/settlement/requests/form/';
          break;

        default:
          break;
      }

      props.setDefault();

      props.history.push(next, { 
        uid: purchaseUid, 
        statusType: status 
      });
    }
  },
};

const lifecycles: ReactLifeCycleFunctions<PurchaseSettlementDetailProps, OwnState> = {
  componentDidUpdate(prevProps: PurchaseSettlementDetailProps) {
    // handle updated route params
    if (this.props.match.params.purchaseUid !== prevProps.match.params.purchaseUid) {
      this.props.handleOnLoadApi();
    }

    // handle updated response state
    if (this.props.purchaseSettlementState.detail.response !== prevProps.purchaseSettlementState.detail.response) {
      const { isLoading, response } = this.props.purchaseSettlementState.detail;

      // find status type
      let _statusType: string | undefined = undefined;

      if (response && response.data) {
        _statusType = response.data.statusType;
      }

      // checking status types
      const isContains = (statusType: string | undefined, statusTypes: string[]): boolean => {
        return statusType ? statusTypes.indexOf(statusType) !== -1 : false;
      };

      // generate option menus
      const options: IPopupMenuOption[] = [
        {
          id: PurchaseUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !isLoading,
          visible: true,
        },
        {
          id: PurchaseUserAction.Modify,
          name: this.props.intl.formatMessage(layoutMessage.action.modify),
          enabled: _statusType !== undefined,
          visible: isContains(_statusType, [WorkflowStatusType.Submitted, WorkflowStatusType.InProgress, WorkflowStatusType.AdjustmentNeeded, WorkflowStatusType.Rejected]),
        },
      ];

      this.props.setOptions(options);
    }
  }
};

export const PurchaseSettlementDetail = compose(
  setDisplayName('PurchaseSettlementDetail'),
  withUser,
  withRouter,
  withPurchaseSettlement,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(PurchaseSettlementDetailView);