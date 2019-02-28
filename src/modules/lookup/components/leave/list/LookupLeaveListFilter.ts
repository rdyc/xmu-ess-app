import { WithUser, withUser } from '@layout/hoc/withUser';
import { ILookupCompany } from '@lookup/classes';
import { ILookupLeaveGetAllFilter } from '@lookup/classes/filters/leave/ILookupLeaveGetAllFilter';
import { WithStyles, withStyles, WithTheme } from '@material-ui/core';
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

import { LookupLeaveListFilterView } from './LookupLeaveListFilterView';

export type ILookupLeaveListFilterResult = Pick<ILookupLeaveGetAllFilter, 'companyUid' >;

interface IOwnOption {
  isOpen: boolean;
  initialProps?: ILookupLeaveListFilterResult;
  onClose: (event: React.MouseEvent<HTMLElement>) => void;
  onApply: (filter: ILookupLeaveListFilterResult) => void;
}

interface IOwnState {
  // filter company
  isFilterCompanyOpen: boolean;
  filterCompany?: ILookupCompany;
  
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
  handleFilterCompanyOnSelected: (company: ILookupCompany) => void;
  handleFilterCompanyOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterCompanyOnClose: () => void;
}

export type LookupLeaveListFilterProps 
  = IOwnOption
  & WithUser
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithStyles<typeof styles>
  & WithTheme
  & InjectedIntlProps;

const createProps: mapper<LookupLeaveListFilterProps, IOwnState> = (props: LookupLeaveListFilterProps): IOwnState => ({
  isFilterCompanyOpen: false,
});

const stateUpdaters: StateUpdaters<LookupLeaveListFilterProps, IOwnState, IOwnStateUpdater> = { 
  // main filter
  setFilterReset: (prevState: IOwnState) => () => ({
    filterCompany: undefined,
  }),

  // filter company
  setFilterCompanyVisibility: (prevState: IOwnState) => () => ({
    isFilterCompanyOpen: !prevState.isFilterCompanyOpen,
  }),
  setFilterCompany: (prevState: IOwnState) => (company?: ILookupCompany) => ({
    isFilterCompanyOpen: false,
    filterCompany: company,
  }),
};

const handlerCreators: HandleCreators<LookupLeaveListFilterProps, IOwnHandler> = {
  // main filter
  handleFilterOnReset: (props: LookupLeaveListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterReset();
  },
  handleFilterOnApply: (props: LookupLeaveListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.onApply({
      companyUid: props.filterCompany && props.filterCompany.uid,
    });
  },

  // filter company
  handleFilterCompanyVisibility: (props: LookupLeaveListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterCompanyVisibility(); 
  },
  handleFilterCompanyOnSelected: (props: LookupLeaveListFilterProps) => (company: ILookupCompany) => {
    props.setFilterCompany(company);
  },
  handleFilterCompanyOnClear: (props: LookupLeaveListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterCompany();
  },
  handleFilterCompanyOnClose: (props: LookupLeaveListFilterProps) => () => {
    props.setFilterCompanyVisibility();
  },

};

export const LookupLeaveListFilter = compose<LookupLeaveListFilterProps, IOwnOption>(
  setDisplayName('LookupLeaveListFilter'),
  withUser,
  injectIntl,
  withStyles(styles, { withTheme: true }),
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators)
)(LookupLeaveListFilterView);