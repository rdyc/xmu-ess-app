import { ICollectionValue } from '@layout/classes/core';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { ILookupCompany } from '@lookup/classes';
import { ILookupLeaveGetAllFilter } from '@lookup/classes/filters/leave/ILookupLeaveGetAllFilter';
import { withLookupCompany, WithLookupCompany } from '@lookup/hoc/withLookupCompany';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import * as moment from 'moment';
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
import { LookupLeaveListFilterView } from './LookupLeaveListFilterView';

export type ILookupLeaveListFilterResult = Pick<ILookupLeaveGetAllFilter, 'companyUid' | 'year' >;

const getYear: number = Number(moment().format('YYYY'));

const yearList: ICollectionValue[] = [
  {value: getYear - 1, name: (getYear - 1).toString() },
  {value: getYear, name: (getYear).toString() },
  {value: getYear + 1, name: (getYear + 1).toString() },
];

interface IOwnOption {
  isOpen: boolean;
  initialProps?: ILookupLeaveListFilterResult;
  onClose: (event: React.MouseEvent<HTMLElement>) => void;
  onApply: (filter: ILookupLeaveListFilterResult) => void;
}

interface IOwnState {
  yearList: ICollectionValue[];
  
  // filter year
  isFilterYearOpen: boolean;
  filterYear?: ICollectionValue;
  
  // filter company
  isFilterCompanyOpen: boolean;
  filterCompany?: ILookupCompany;
  
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  // main filter
  setFilterReset: StateHandler<IOwnState>;

  // filter year
  setFilterYearVisibility: StateHandler<IOwnState>;
  setFilterYear: StateHandler<IOwnState>;

  // filter company
  setFilterCompanyVisibility: StateHandler<IOwnState>;
  setFilterCompany: StateHandler<IOwnState>;
}

interface IOwnHandler {
  // main filter
  handleFilterOnReset: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterOnApply: (event: React.MouseEvent<HTMLElement>) => void;

  // filter year
  handleFilterYearVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterYearOnSelected: (data: ICollectionValue) => void;
  handleFilterYearOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterYearOnClose: () => void;

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
  & WithLookupCompany
  & WithStyles<typeof styles>
  & InjectedIntlProps;

const createProps: mapper<LookupLeaveListFilterProps, IOwnState> = (props: LookupLeaveListFilterProps): IOwnState => ({
  yearList,
  isFilterYearOpen: false,
  isFilterCompanyOpen: false,
});

const stateUpdaters: StateUpdaters<LookupLeaveListFilterProps, IOwnState, IOwnStateUpdater> = { 
  // main filter
  setFilterReset: (prevState: IOwnState) => () => ({
    filterYear: undefined,
    filterCompany: undefined
  }),

  // filter year
  setFilterYearVisibility: (prevState: IOwnState) => () => ({
    isFilterYearOpen: !prevState.isFilterYearOpen
  }),
  setFilterYear: () => (data?: ICollectionValue) => ({
    isFilterYearOpen: false,
    filterYear: data
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
      year: props.filterYear && props.filterYear.value,
      companyUid: props.filterCompany && props.filterCompany.uid,
    });
  },

  // filter year
  handleFilterYearVisibility: (props: LookupLeaveListFilterProps) => () => {
    props.setFilterYearVisibility();
  },
  handleFilterYearOnSelected: (props: LookupLeaveListFilterProps) => (data: ICollectionValue) => {
    props.setFilterYear(data);
  },
  handleFilterYearOnClear: (props: LookupLeaveListFilterProps) => () => {
    props.setFilterYear();
  },
  handleFilterYearOnClose: (props: LookupLeaveListFilterProps) => () => {
    props.setFilterYearVisibility();
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

const lifecycles: ReactLifeCycleFunctions<LookupLeaveListFilterProps, IOwnState> = {
  componentDidMount() {
    if (this.props.initialProps) {
      const { companyUid, year } = this.props.initialProps;

      // filter year
      if (year) {
        const selected = yearList.find(item => item.value === year);

        this.props.setFilterYear(selected);
      }
      
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

export const LookupLeaveListFilter = compose<LookupLeaveListFilterProps, IOwnOption>(
  setDisplayName('LookupLeaveListFilter'),
  withLookupCompany,
  withUser,
  injectIntl,
  withStyles(styles),
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(LookupLeaveListFilterView);