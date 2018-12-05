import { WithUser, withUser } from '@layout/hoc/withUser';
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
  mapper,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';

interface OwnHandler {
  handleOnModify: () => void;
  handleOnSettle: () => void; 
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
}

interface OwnState {
  action?: PurchaseUserAction;
  dialogFullScreen: boolean;
  dialogOpen: boolean;
  dialogTitle?: string;
  dialogContent?: string;
  dialogCancelLabel?: string;
  dialogConfirmLabel?: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  setDefault: StateHandler<OwnState>;
  setModify: StateHandler<OwnState>;
  setSettle: StateHandler<OwnState>;
}

interface OwnRouteParams {
  purchaseUid: string;
}

export type PurchaseSettlementDetailProps
  = WithPurchaseSettlement
  & WithUser
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnState
  & OwnStateUpdaters
  & OwnHandler;

const createProps: mapper<PurchaseSettlementDetailProps, OwnState> = (props: PurchaseSettlementDetailProps): OwnState => ({
  dialogFullScreen: false,
  dialogOpen: false,
});

const stateUpdaters: StateUpdaters<PurchaseSettlementDetailProps, OwnState, OwnStateUpdaters> = {
  setModify: (prevState: OwnState, props: PurchaseSettlementDetailProps) => (): Partial<OwnState> => ({
    action: PurchaseUserAction.Modify,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(purchaseMessage.settlement.confirm.modifyTitle),
    dialogContent: props.intl.formatMessage(purchaseMessage.settlement.confirm.modifyDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disaggre),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.aggre)
  }),
  setSettle: (prevState: OwnState, props: PurchaseSettlementDetailProps) => (): Partial<OwnState> => ({
    action: PurchaseUserAction.Settle,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(purchaseMessage.settlement.confirm.settleTitle),
    dialogContent: props.intl.formatMessage(purchaseMessage.settlement.confirm.settleDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disaggre),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.aggre)
  }),
  setDefault: (prevState: OwnState) => (): Partial<OwnState> => ({
    ...prevState,
    dialogFullScreen: false,
    dialogOpen: false,
    dialogTitle: undefined,
    dialogContent: undefined,
    dialogCancelLabel: undefined,
    dialogConfirmLabel: undefined,
  })
};

const handlerCreators: HandleCreators<PurchaseSettlementDetailProps, OwnHandler> = {
  handleOnModify: (props: PurchaseSettlementDetailProps) => () => {
    props.setModify();
  },
  
  handleOnSettle: (props: PurchaseSettlementDetailProps) => () => {
    props.setSettle();
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
      PurchaseUserAction.Settle,
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case PurchaseUserAction.Modify:
          next = '/purchase/settlements/form/';
          break;
        case PurchaseUserAction.Settle:
          next = '/purchase/settlements/form/';
          break;

        default:
          break;
      }

      props.setDefault();

      props.history.push(next, { uid: purchaseUid, statusType: status });
    }
  },
};

export const PurchaseSettlementDetail = compose(
  withUser,
  withRouter,
  withPurchaseSettlement,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
)(PurchaseSettlementDetailView);