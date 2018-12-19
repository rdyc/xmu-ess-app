import { withLayout, WithLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { withPurchaseRequest, WithPurchaseRequest } from '@purchase/hoc/purchaseRequest/withPurchaseRequest';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, mapper, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { PurchaseRequestListView } from './PurchaseRequestListView';

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

const createProps: mapper<PurchaseRequestListProps, OwnState> = (): OwnState => ({
  customerUid: undefined
});

const stateUpdaters: StateUpdaters<PurchaseRequestListProps, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),
};

const handlerCreators: HandleCreators<PurchaseRequestListProps, OwnHandlers> = {
  handleChangeFilter: (props: PurchaseRequestListProps) => (customerUid: string) => {
    props.stateUpdate({
      customerUid
    });
  },
};

export type PurchaseRequestListProps
  = WithUser
  & WithLayout
  & RouteComponentProps<OwnRouteParams>
  & OwnState
  & OwnStateUpdaters
  & OwnHandlers
  & RouteComponentProps
  & InjectedIntlProps
  & WithPurchaseRequest;

export const PurchaseRequestList = compose<PurchaseRequestListProps, {}>(
  withUser,
  withLayout,
  withRouter,
  injectIntl,
  withPurchaseRequest,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<PurchaseRequestListProps, OwnHandlers>(handlerCreators),
)(PurchaseRequestListView);