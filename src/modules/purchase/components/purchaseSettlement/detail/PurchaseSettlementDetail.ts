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
  handlePurchaseModify: () => void;
  handlePurchaseSettle: () => void; 
  handleDialogClose: () => void;
  handleDialogConfirmed: () => void;
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
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disaggree),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.aggree)
  }),
  setSettle: (prevState: OwnState, props: PurchaseSettlementDetailProps) => (): Partial<OwnState> => ({
    action: PurchaseUserAction.Settle,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(purchaseMessage.settlement.confirm.settleTitle),
    dialogContent: props.intl.formatMessage(purchaseMessage.settlement.confirm.settleDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disaggree),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.aggree)
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
  handlePurchaseModify: (props: PurchaseSettlementDetailProps) => () => {
    props.setModify();
  },
  
  handlePurchaseSettle: (props: PurchaseSettlementDetailProps) => () => {
    props.setSettle();
  },

  handleDialogClose: (props: PurchaseSettlementDetailProps) => () => {
    props.setDefault();
  },
  handleDialogConfirmed: (props: PurchaseSettlementDetailProps) => () => {
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

    props.setDefault();

    props.history.push('/purchase/settlements/form/', { uid: purchaseUid, statusType: status });
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