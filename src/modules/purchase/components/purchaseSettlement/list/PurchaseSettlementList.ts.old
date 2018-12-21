import { withLayout, WithLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { withPurchaseSettlement, WithPurchaseSettlement } from '@purchase/hoc/purchaseSettlement/withPurchaseSettlement';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, mapper, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { PurchaseSettlementListView } from './PurchaseSettlementListView';

interface OwnHandlers {
  handleChangeFilter: (customerUid: string) => void;
}

interface OwnState {
  customerUid: string | undefined;
}

interface OwnRouteParams {
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

const createProps: mapper<PurchaseSettlementListProps, OwnState> = (): OwnState => ({
  customerUid: undefined
});

const stateUpdaters: StateUpdaters<PurchaseSettlementListProps, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),
};

const handlerCreators: HandleCreators<PurchaseSettlementListProps, OwnHandlers> = {
  handleChangeFilter: (props: PurchaseSettlementListProps) => (customerUid: string) => {
    props.stateUpdate({
      customerUid
    });
  },
};

export type PurchaseSettlementListProps
  = WithUser
  & WithLayout
  & RouteComponentProps<OwnRouteParams>
  & OwnState
  & OwnStateUpdaters
  & OwnHandlers
  & RouteComponentProps
  & InjectedIntlProps
  & WithPurchaseSettlement;

export const PurchaseSettlementList = compose<PurchaseSettlementListProps, {}>(
  withUser,
  withLayout,
  withRouter,
  injectIntl,
  withPurchaseSettlement,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<PurchaseSettlementListProps, OwnHandlers>(handlerCreators),
)(PurchaseSettlementListView);