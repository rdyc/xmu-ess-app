import { WithUser, withUser } from '@layout/hoc/withUser';
import { ILookupRoleGetAllFilter } from '@lookup/classes/filters/role';
import { ICompanyList } from '@lookup/classes/response';
import { WithLookupCompany, withLookupCompany } from '@lookup/hoc/withLookupCompany';
import { WithStyles, withStyles } from '@material-ui/core';
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

import { LookupRoleListFilterView } from './LookupRoleListFilterView';

export type ILookupRoleListFilterResult = Pick<ILookupRoleGetAllFilter, 'companyUid'>;

interface IOwnOption {
  isOpen: boolean;
  initialProps?: ILookupRoleListFilterResult;
  onClose: (event: React.MouseEvent<HTMLElement>) => void;
  onApply: (filter: ILookupRoleListFilterResult) => void;
}

interface IOwnState {
  // filter company
  isFilterCompanyOpen: boolean;
  filterCompany?: ICompanyList;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
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
  handleFilterCompanyOnSelected: (customer: ICompanyList) => void;
  handleFilterCompanyOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterCompanyOnClose: () => void;
}

export type LookupRoleListFilterProps
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithStyles<typeof styles>
  & WithUser
  & WithLookupCompany
  & InjectedIntlProps;

const createProps: mapper<LookupRoleListFilterProps, IOwnState> = (props: LookupRoleListFilterProps): IOwnState => ({
  isFilterCompanyOpen: false,
});

const stateUpdaters: StateUpdaters<LookupRoleListFilterProps, IOwnState, IOwnStateUpdater> = {
  // main filter
  setFilterReset: (prevState: IOwnState) => () => ({
    filterCompany: undefined
  }),

  // filter company
  setFilterCompanyVisibility: (prevState: IOwnState) => () => ({
    isFilterCompanyOpen: !prevState.isFilterCompanyOpen
  }),
  setFilterCompany: (prevState: IOwnState) => (company?: ICompanyList) => ({
    isFilterCompanyOpen: false,
    filterCompany: company
  })
};

const handlerCreators: HandleCreators<LookupRoleListFilterProps, IOwnHandler> = {
  // main filter
  handleFilterOnReset: (props: LookupRoleListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterReset();
  },
  handleFilterOnApply: (props: LookupRoleListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.onApply({
      companyUid: props.filterCompany && props.filterCompany.uid
    });
  },

  // filter company
  handleFilterCompanyVisibility: (props: LookupRoleListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterCompanyVisibility();
  },
  handleFilterCompanyOnSelected: (props: LookupRoleListFilterProps) => (company: ICompanyList) => {
    props.setFilterCompany(company);
  },
  handleFilterCompanyOnClear: (props: LookupRoleListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterCompany();
  },
  handleFilterCompanyOnClose: (props: LookupRoleListFilterProps) => () => {
    props.setFilterCompanyVisibility();
  },
};

const lifecycles: ReactLifeCycleFunctions<LookupRoleListFilterProps, IOwnState> = {
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

export const LookupRoleListFilter = compose<LookupRoleListFilterProps, IOwnOption>(
  setDisplayName('LookupRoleListFilter'),
  withUser,
  withLookupCompany,
  injectIntl,
  withStyles(styles),
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(LookupRoleListFilterView);