import { withLayout, WithLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithLookupRole, withLookupRole } from '@lookup/hoc/withLookupRole';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, mapper, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { LookupRoleListView } from './LookupRoleListView';

interface OwnHandlers {
  handleChangeFilter: (companyUid: string) => void;
}

interface OwnState {
  companyUid: string | undefined;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

const createProps: mapper<RoleListProps, OwnState> = (props: RoleListProps): OwnState => ({
  companyUid: undefined
});

const stateUpdaters: StateUpdaters<RoleListProps, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const handlerCreators: HandleCreators<RoleListProps, OwnHandlers> = {
  handleChangeFilter: (props: RoleListProps) => (companyUid: string) => {
    props.stateUpdate({
      companyUid
    });
  }
};

export type RoleListProps
  = WithUser
  & WithLayout
  & OwnState
  & OwnStateUpdaters
  & OwnHandlers
  & RouteComponentProps
  & InjectedIntlProps
  & WithLookupRole;

export default compose<RoleListProps, {}>(
  withUser,
  withLayout,
  withRouter,
  injectIntl,
  withLookupRole,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<RoleListProps, OwnHandlers>(handlerCreators),
)(LookupRoleListView);