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
  handlePurchaseModify: () => void;
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

const handlerCreators: HandleCreators<PurchaseRequestDetailProps, OwnHandler> = {
  handlePurchaseModify: (props: PurchaseRequestDetailProps) => () => {
    props.setModify();
  },
  handleDialogClose: (props: PurchaseRequestDetailProps) => () => {
    props.setDefault();
  },
  handleDialogConfirmed: (props: PurchaseRequestDetailProps) => () => {
    const { response } = props.purchaseRequestState.detail;

    let purchaseUid: string | undefined;

    if (!props.action || !response) {
      return;
    } 

    if (response.data) {
      purchaseUid = response.data.uid;
    }

    props.setDefault();

    props.history.push('/purchase/requests/form/', { uid: purchaseUid });
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