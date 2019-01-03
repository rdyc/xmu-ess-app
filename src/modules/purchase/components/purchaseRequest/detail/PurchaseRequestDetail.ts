import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { PurchaseUserAction } from '@purchase/classes/types';
import { PurchaseRequestDetailView } from '@purchase/components/purchaseRequest/detail/PurchaseRequestDetailView';
import { WithPurchaseRequest, withPurchaseRequest } from '@purchase/hoc/purchaseRequest/withPurchaseRequest';
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
  setSettle: StateHandler<OwnState>;
  setModify: StateHandler<OwnState>;
}

interface OwnRouteParams {
  purchaseUid: string;
}

export type PurchaseRequestDetailProps
  = WithPurchaseRequest
  & WithUser
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnState
  & OwnStateUpdaters
  & OwnHandler;

const createProps: mapper<PurchaseRequestDetailProps, OwnState> = (props: PurchaseRequestDetailProps): OwnState => ({
  dialogFullScreen: false,
  dialogOpen: false,
});

const stateUpdaters: StateUpdaters<PurchaseRequestDetailProps, OwnState, OwnStateUpdaters> = {
  setModify: (prevState: OwnState, props: PurchaseRequestDetailProps) => (): Partial<OwnState> => ({
    action: PurchaseUserAction.Modify,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(purchaseMessage.request.confirm.modifyTitle),
    dialogContent: props.intl.formatMessage(purchaseMessage.request.confirm.modifyDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disaggre),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.aggre)
  }),
  setSettle: (prevState: OwnState, props: PurchaseRequestDetailProps) => (): Partial<OwnState> => ({
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

const handlerCreators: HandleCreators<PurchaseRequestDetailProps, OwnHandler> = {
  handleOnModify: (props: PurchaseRequestDetailProps) => () => {
    props.setModify();
  },
  handleOnSettle: (props: PurchaseRequestDetailProps) => () => {
    props.setSettle();
  },
  handleOnCloseDialog: (props: PurchaseRequestDetailProps) => () => {
    props.setDefault();
  },
  handleOnConfirm: (props: PurchaseRequestDetailProps) => () => {
    const { response } = props.purchaseRequestState.detail;

    let purchaseUid: string | undefined;

    if (!props.action || !response) {
      return;
    } 

    if (response.data) {
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
          next = '/purchase/requests/form';
          break;

        case PurchaseUserAction.Settle:
          next = '/purchase/settlement/requests/form/';
          break;
          
        default:
          break;
      }

      props.setDefault();

      props.history.push(next, { uid: purchaseUid });
    }
  },
};

export const PurchaseRequestDetail = compose(
  withUser,
  withRouter,
  withPurchaseRequest,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
)(PurchaseRequestDetailView);