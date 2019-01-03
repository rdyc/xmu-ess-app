import { withLayout, WithLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { withOrganizationHierarchy, WithOrganizationHierarchy } from '@organization/hoc/withOrganizationHierarchy';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, mapper, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { organizationHierarchyListView } from './OrganizationHierarchyListView';

interface OwnHandlers {
  handleChangeFilter: (companyUid: string) => void;
}

interface OwnState {
  companyUid: string | undefined;
}

interface OwnRouteParams {
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

const createProps: mapper<OrganizationHierarchyListProps, OwnState> = (): OwnState => ({
  companyUid: undefined
});

const stateUpdaters: StateUpdaters<OrganizationHierarchyListProps, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),  
};

const handlerCreators: HandleCreators<OrganizationHierarchyListProps, OwnHandlers> = {
  handleChangeFilter: (props: OrganizationHierarchyListProps) => (companyUid: string) => {
    props.stateUpdate({
      companyUid
    });
  },  
};

export type OrganizationHierarchyListProps
  = WithUser
  & WithLayout
  & RouteComponentProps<OwnRouteParams>
  & OwnState
  & OwnStateUpdaters
  & OwnHandlers
  & RouteComponentProps
  & InjectedIntlProps
  & WithOrganizationHierarchy;

export default compose<OrganizationHierarchyListProps, {}>(
  withUser,
  withLayout,
  withRouter,
  injectIntl,
  withOrganizationHierarchy,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<OrganizationHierarchyListProps, OwnHandlers>(handlerCreators),
)(organizationHierarchyListView);