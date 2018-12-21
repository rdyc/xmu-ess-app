import { withLayout, WithLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { withPurchaseApproval, WithPurchaseApproval } from '@purchase/hoc/purchaseApproval/withPurchaseApproval';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, mapper, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { PurchaseApprovalListView } from './PurchaseApprovalListView';

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

const createProps: mapper<PurchaseApprovalListProps, OwnState> = (): OwnState => ({
  customerUid: undefined
});

const stateUpdaters: StateUpdaters<PurchaseApprovalListProps, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),
};

const handlerCreators: HandleCreators<PurchaseApprovalListProps, OwnHandlers> = {
  handleChangeFilter: (props: PurchaseApprovalListProps) => (customerUid: string) => {
    props.stateUpdate({
      customerUid
    });
  },
};

export type PurchaseApprovalListProps
  = WithUser
  & WithLayout
  & RouteComponentProps<OwnRouteParams>
  & OwnState
  & OwnStateUpdaters
  & OwnHandlers
  & RouteComponentProps
  & InjectedIntlProps
  & WithPurchaseApproval;

export const PurchaseApprovalList = compose<PurchaseApprovalListProps, {}>(
  withUser,
  withLayout,
  withRouter,
  injectIntl,
  withPurchaseApproval,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<PurchaseApprovalListProps, OwnHandlers>(handlerCreators),
)(PurchaseApprovalListView);