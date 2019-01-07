import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { ILookupRoleGetAllFilter } from '@lookup/classes/filters/role';
import { ICompanyList } from '@lookup/classes/response';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, mapper, setDisplayName, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
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
  & WithUser
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithStyles<typeof styles>
  & WithLayout
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

export const LookupRoleListFilter = compose<LookupRoleListFilterProps, IOwnOption>(
  setDisplayName('LookupRoleListFilter'),
  withUser,
  withLayout,
  withStyles(styles),
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators)
)(LookupRoleListFilterView);