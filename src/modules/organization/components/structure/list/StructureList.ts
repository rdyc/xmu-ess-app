import { withLayout, WithLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { withOrganizationStructure, WithOrganizationStructure } from '@organization/hoc/withOrganizationStructure';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, mapper, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { structureListView } from './StructureListView';

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

const createProps: mapper<OrganizationStructureListProps, OwnState> = (): OwnState => ({
  companyUid: undefined
});

const stateUpdaters: StateUpdaters<OrganizationStructureListProps, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),  
};

const handlerCreators: HandleCreators<OrganizationStructureListProps, OwnHandlers> = {
  handleChangeFilter: (props: OrganizationStructureListProps) => (companyUid: string) => {
    props.stateUpdate({
      companyUid
    });
  },  
};

export type OrganizationStructureListProps
  = WithUser
  & WithLayout
  & RouteComponentProps<OwnRouteParams>
  & OwnState
  & OwnStateUpdaters
  & OwnHandlers
  & RouteComponentProps
  & InjectedIntlProps
  & WithOrganizationStructure;

export const StructureList = compose<OrganizationStructureListProps, {}>(
  withUser,
  withLayout,
  withRouter,
  injectIntl,
  withOrganizationStructure,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<OrganizationStructureListProps, OwnHandlers>(handlerCreators),
)(structureListView);