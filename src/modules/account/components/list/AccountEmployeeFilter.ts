import { IEmployeeAllFilter } from '@account/classes/filters';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { ILookupCompany, ILookupRole } from '@lookup/classes';
import { ILookupRoleGetListFilter } from '@lookup/classes/filters/role';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import {
  compose,
  HandleCreators,
  mapper,
  setDisplayName,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';
import { AccountEmployeeFilterView } from './AccountEmployeeFilterView';

export type IAccountEmployeeFilterResult = Pick<IEmployeeAllFilter, 
  'companyUids' | 'roleUids'>;

interface OwnOption {
  isOpen: boolean;
  initialProps?: IAccountEmployeeFilterResult;
  onClose: (event: React.MouseEvent<HTMLElement>) => void;
  onApply: (filter: IAccountEmployeeFilterResult) => void;
}

interface OwnState {
  // filter company
  isFilterCompanyOpen: boolean;
  filterCompany?: ILookupCompany;

  // filter role
  filterRoleValue?: ILookupRoleGetListFilter;
  isFilterRoleOpen: boolean;
  filterRole?: ILookupRole;
}

interface OwnStateUpdater extends StateHandlerMap<OwnState> {
  // main filter
  setFilterReset: StateHandler<OwnState>;

  // filter company
  setFilterCompanyVisibility: StateHandler<OwnState>;
  setFilterCompany: StateHandler<OwnState>;

  // filter role
  setFilterRoleVisibility: StateHandler<OwnState>;
  setFilterRole: StateHandler<OwnState>;
}

interface OwnHandler {
  // main filter
  handleFilterOnReset: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterOnApply: (event: React.MouseEvent<HTMLElement>) => void;

  // filter company
  handleFilterCompanyVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterCompanyOnSelected: (data: ILookupCompany) => void;
  handleFilterCompanyOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterCompanyOnClose: () => void;
  
  // filter role
  handleFilterRoleVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterRoleOnSelected: (data: ILookupRole) => void;
  handleFilterRoleOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterRoleOnClose: () => void;
}

export type AccountEmployeeFilterFilterProps
  = OwnOption
  & OwnState
  & OwnHandler
  & OwnStateUpdater
  & WithStyles<typeof styles>
  & WithLayout
  & InjectedIntlProps;

const createProps: mapper<AccountEmployeeFilterFilterProps, OwnState> = (): OwnState => ({
  isFilterCompanyOpen: false,
  isFilterRoleOpen: false,
});

const stateUpdaters: StateUpdaters<AccountEmployeeFilterFilterProps, OwnState, OwnStateUpdater> = {
  // main filter
  setFilterReset: () => () => ({
    filterCompany: undefined,
    filterRole: undefined
  }),

  // filter company
  setFilterCompanyVisibility: (prevState: OwnState) => () => ({
    isFilterCompanyOpen: !prevState.isFilterCompanyOpen
  }),
  setFilterCompany: () => (data?: ILookupCompany) => ({
    isFilterCompanyOpen: false,
    filterCompany: data,
    filterRoleValue: {
      companyUid: data && data.uid
    }
  }),

  // filter role
  setFilterRoleVisibility: (prevState: OwnState) => () => ({
    isFilterRoleOpen: !prevState.isFilterRoleOpen
  }),
  setFilterRole: () => (data?: ILookupRole) => ({
    isFilterRoleOpen: false,
    filterRole: data
  }),
};

const handlerCreators: HandleCreators<AccountEmployeeFilterFilterProps, OwnHandler> = {
  // main filter
  handleFilterOnReset: (props: AccountEmployeeFilterFilterProps) => () => {
    props.setFilterReset();
  },
  handleFilterOnApply: (props: AccountEmployeeFilterFilterProps) => () => {
    props.onApply({
      companyUids: props.filterCompany && [props.filterCompany.uid],
      roleUids: props.filterRole && [props.filterRole.uid]
    });
  },

  // filter company
  handleFilterCompanyVisibility: (props: AccountEmployeeFilterFilterProps) => () => {
    props.setFilterCompanyVisibility();
  },
  handleFilterCompanyOnSelected: (props: AccountEmployeeFilterFilterProps) => (data: ILookupCompany) => {
    props.setFilterCompany(data);
  },
  handleFilterCompanyOnClear: (props: AccountEmployeeFilterFilterProps) => () => {
    props.setFilterCompany();
    props.setFilterRole();
  },
  handleFilterCompanyOnClose: (props: AccountEmployeeFilterFilterProps) => () => {
    props.setFilterCompanyVisibility();
  },

  // filter role
  handleFilterRoleVisibility: (props: AccountEmployeeFilterFilterProps) => () => {
    props.setFilterRoleVisibility();
  },
  handleFilterRoleOnSelected: (props: AccountEmployeeFilterFilterProps) => (data: ILookupRole) => {
    props.setFilterRole(data);
  },
  handleFilterRoleOnClear: (props: AccountEmployeeFilterFilterProps) => () => {
    props.setFilterRole();
  },
  handleFilterRoleOnClose: (props: AccountEmployeeFilterFilterProps) => () => {
    props.setFilterRoleVisibility();
  },
};

export const AccountEmployeeFilter = compose<AccountEmployeeFilterFilterProps, OwnOption>(
  setDisplayName('AccountEmployeeFilter'),
  withLayout,
  withStyles(styles),
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators)
)(AccountEmployeeFilterView);