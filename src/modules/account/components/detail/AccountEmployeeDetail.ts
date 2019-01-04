import { WithAccountEmployee, withAccountEmployee } from '@account/hoc/withAccountEmployee';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, mapper, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { AccountEmployeeDetailView } from './AccountEmployeeDetailView';

interface OwnRouteParams {
  employeeUid: string;
}

interface OwnState {
  tab: number;
}

interface OwnHandler {
  handleTab: (event: any, value: any) => void;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type AccountEmployeeDetailProps
  = OwnState
  & OwnHandler
  & OwnStateUpdaters
  & RouteComponentProps<OwnRouteParams>
  & WithUser
  & WithAccountEmployee
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps;

const createProps: mapper<AccountEmployeeDetailProps, OwnState> = (): OwnState => ({
  tab: 0
});

const stateUpdaters: StateUpdaters<AccountEmployeeDetailProps, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const handlerCreators: HandleCreators<AccountEmployeeDetailProps, OwnHandler> = {
  handleTab: (props: AccountEmployeeDetailProps) => (event: any, value: any) => {
    props.stateUpdate({
      tab: value
    });
  }
};

export const AccountEmployeeDetail = compose<AccountEmployeeDetailProps, {}>(
  withRouter,
  withUser,
  withAccountEmployee,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<AccountEmployeeDetailProps, OwnHandler>(handlerCreators)
)(AccountEmployeeDetailView);