import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { ICompanyList } from '@lookup/classes/response';
import { WithStyles, withStyles } from '@material-ui/core';
import { IOrganizationHierarchyAllFilter } from '@organization/classes/filters/hierarchy';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import {
  compose,
  HandleCreators,
  lifecycle,
  mapper,
  ReactLifeCycleFunctions,
  setDisplayName,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';

import { WithUser, withUser } from '@layout/hoc/withUser';
import { ILookupCompanyGetListFilter } from '@lookup/classes/filters/company';
import { withLookupCompany, WithLookupCompany } from '@lookup/hoc/withLookupCompany';
import { OrganizationHierarchyListFilterView } from './OrganizationHierarchyListFilterView';

export type IOrganizationHierarchyListFilterResult = Pick<IOrganizationHierarchyAllFilter, 'companyUid' >;

interface IOwnOption {
  isOpen: boolean;
  initialProps?: IOrganizationHierarchyListFilterResult;
  onClose: (event: React.MouseEvent<HTMLElement>) => void;
  onApply: (filter: IOrganizationHierarchyListFilterResult) => void;
}

interface IOwnState {
  // filter company
  isFilterCompanyOpen: boolean;
  filterCompany?: ICompanyList;

  // filter company Dialog
  filterCompanyDialog: ILookupCompanyGetListFilter;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  // main filter
  setFilterReset: StateHandler<IOwnState>;

  // filter company
  setFilterCompanyVisibility: StateHandler<IOwnState>;
  setFilterCompany: StateHandler<IOwnState>;
}

interface IOwnHandler {
  // main filter
  handleFilterOnReset: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterOnApply: (event: React.MouseEvent<HTMLElement>) => void;

  // filter company
  handleFilterCompanyVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterCompanyOnSelected: (company: ICompanyList) => void;
  handleFilterCompanyOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterCompanyOnClose: () => void;
}

export type OrganizationHierarchyListFilterProps 
  = IOwnOption
  & WithUser
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithLookupCompany
  & WithStyles<typeof styles>
  & WithLayout
  & InjectedIntlProps;

const createProps: mapper<OrganizationHierarchyListFilterProps, IOwnState> = (): IOwnState => ({
  isFilterCompanyOpen: false,

  // default filter project dialog
  filterCompanyDialog: {
    orderBy: 'uid'
  }
});

const stateUpdaters: StateUpdaters<OrganizationHierarchyListFilterProps, IOwnState, IOwnStateUpdater> = { 
  // main filter
  setFilterReset: () => () => ({
    filterCompany: undefined,
  }),

  // filter company
  setFilterCompanyVisibility: (prevState: IOwnState) => () => ({
    isFilterCompanyOpen: !prevState.isFilterCompanyOpen
  }),
  setFilterCompany: () => (company?: ICompanyList) => ({
    isFilterCompanyOpen: false,
    filterCompany: company,
  }),
};

const handlerCreators: HandleCreators<OrganizationHierarchyListFilterProps, IOwnHandler> = {
  // main filter
  handleFilterOnReset: (props: OrganizationHierarchyListFilterProps) => () => {
    props.setFilterReset();
  },
  handleFilterOnApply: (props: OrganizationHierarchyListFilterProps) => () => {
    props.onApply({
      companyUid: props.filterCompany && props.filterCompany.uid,
    });
  },

  // filter company
  handleFilterCompanyVisibility: (props: OrganizationHierarchyListFilterProps) => () => {
    props.setFilterCompanyVisibility();
  },
  handleFilterCompanyOnSelected: (props: OrganizationHierarchyListFilterProps) => (company: ICompanyList) => {
    props.setFilterCompany(company);
  },
  handleFilterCompanyOnClear: (props: OrganizationHierarchyListFilterProps) => () => {
    props.setFilterCompany();
  },
  handleFilterCompanyOnClose: (props: OrganizationHierarchyListFilterProps) => () => {
    props.setFilterCompanyVisibility();
  },
};

const lifecycles: ReactLifeCycleFunctions<OrganizationHierarchyListFilterProps, IOwnState> = {
  componentDidMount() { 
    // handling previous filter after leaving list page
    if (this.props.initialProps) {
      const { companyUid } = this.props.initialProps;

      // filter company
      if (companyUid) {
        const { response } = this.props.lookupCompanyState.list;
        
        if (response && response.data) {
          const selected = response.data.find(item => item.uid === companyUid);
          
          this.props.setFilterCompany(selected);
        }
      }
    }
  }
};

export const OrganizationHierarchyListFilter = compose<OrganizationHierarchyListFilterProps, IOwnOption>(
  setDisplayName('OrganizationHierarchyListFilter'),
  withUser,
  withLayout,
  withLookupCompany,
  withStyles(styles),
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
)(OrganizationHierarchyListFilterView);