import { withLayout, WithLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { withSettlementApproval, WithSettlementApproval } from '@purchase/hoc/settlementApproval/withSettlementApproval';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, mapper, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { SettlementApprovalListView } from './SettlementApprovalListView';

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

const createProps: mapper<SettlementApprovalListProps, OwnState> = (): OwnState => ({
  customerUid: undefined
});

const stateUpdaters: StateUpdaters<SettlementApprovalListProps, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),
};

const handlerCreators: HandleCreators<SettlementApprovalListProps, OwnHandlers> = {
  handleChangeFilter: (props: SettlementApprovalListProps) => (customerUid: string) => {
    props.stateUpdate({
      customerUid
    });
  },
};

export type SettlementApprovalListProps
  = WithUser
  & WithLayout
  & RouteComponentProps<OwnRouteParams>
  & OwnState
  & OwnStateUpdaters
  & OwnHandlers
  & RouteComponentProps
  & InjectedIntlProps
  & WithSettlementApproval;

export const SettlementApprovalList = compose<SettlementApprovalListProps, {}>(
  withUser,
  withLayout,
  withRouter,
  injectIntl,
  withSettlementApproval,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<SettlementApprovalListProps, OwnHandlers>(handlerCreators),
)(SettlementApprovalListView);