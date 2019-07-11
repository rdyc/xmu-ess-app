import { ICollectionValue } from '@layout/classes/core';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { ILookupCompany } from '@lookup/classes';
import { withLookupCompany, WithLookupCompany } from '@lookup/hoc/withLookupCompany';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { ISummaryMappingFilter } from '@summary/classes/filters';
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
import { ResourceMappingFilterView } from './ResourceMappingFilterView';

const getYear: number = Number(moment().format('YYYY'));

const yearList: ICollectionValue[] = [
  {value: getYear - 1, name: (getYear - 1).toString() },
  {value: getYear, name: (getYear).toString() },
  {value: getYear + 1, name: (getYear + 1).toString() },
];

export type IResourceMappingFilterResult = Pick<ISummaryMappingFilter, 'companyUid' | 'year'>;

interface IOwnOption {
  isAdmin: boolean;
  isStartup: boolean;
  initialProps?: IResourceMappingFilterResult;  
  isLoading: boolean;
  onClickSync: (event: React.MouseEvent<HTMLElement>) => void;
  onApply: (filter: IResourceMappingFilterResult) => void;
  isSummary: boolean;
  handleSummary: (checked: boolean) => void;
  setSummary: (checked: boolean) => void;
}

interface IOwnState {
  isFilterOpen: boolean;

  yearList: ICollectionValue[];

  // filter company
  isFilterCompanyOpen: boolean;
  filterCompany?: ILookupCompany;
  filterCompanyNonAdmin?: string;

  // filter year
  isFilterYearOpen: boolean;
  filterYear?: ICollectionValue;

  // filter summary
  filterSummary?: boolean;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  stateUpdate: StateHandler<IOwnState>;

  // main filter
  setFilterReset: StateHandler<IOwnState>;
  setFilterVisibility: StateHandler<IOwnState>;

  // filter Company
  setFilterCompanyVisibility: StateHandler<IOwnState>;
  setFilterCompany: StateHandler<IOwnState>;

  // filter year
  setFilterYearVisibility: StateHandler<IOwnState>;
  setFilterYear: StateHandler<IOwnState>;

  // filter summary
  setFilterSummary: StateHandler<IOwnState>;
}

interface IOwnHandler {
  // mainfilter
  handleFilterOnReset: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterOnApply: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterVisibility: (event: React.MouseEvent<HTMLElement>) => void;

  // filter Company
  handleFilterCompanyVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterCompanyOnSelected: (data: ILookupCompany) => void;
  handleFilterCompanyOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterCompanyOnClose: () => void;

  // filter year
  handleFilterYearVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterYearOnSelected: (data: ICollectionValue) => void;
  handleFilterYearOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterYearOnClose: () => void;

  // filter summary
  handleFilterSummaryOnChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

export type ResourceMappingFilterProps 
  = IOwnOption 
  & IOwnState 
  & IOwnHandler 
  & IOwnStateUpdater 
  & WithLookupCompany
  & WithStyles<typeof styles> 
  & WithUser 
  & InjectedIntlProps;

const createProps: mapper<ResourceMappingFilterProps, IOwnState> = (props: ResourceMappingFilterProps): IOwnState => {
  return {
    yearList,
    isFilterCompanyOpen: false,
    isFilterYearOpen: false,
    isFilterOpen: true,

    // pass inital value
    filterSummary: props.isSummary
  };
};

const stateUpdaters: StateUpdaters<ResourceMappingFilterProps, IOwnState, IOwnStateUpdater> = {
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),

  // main filter
  setFilterReset: (prevState: IOwnState, props: ResourceMappingFilterProps) => () => ({
    filterCompany: undefined,
    filterYear: undefined,
    filterSummary: false
  }),
  setFilterVisibility: (prevState: IOwnState) => () => ({
    isFilterOpen: !prevState.isFilterOpen
  }),

  // filter Company
  setFilterCompanyVisibility: (prevState: IOwnState) => () => ({
    isFilterCompanyOpen: !prevState.isFilterCompanyOpen
  }),
  setFilterCompany: (prevState: IOwnState) => (data?: ILookupCompany) => ({
    isFilterCompanyOpen: false,
    filterCompany: data
  }),

  // filter year
  setFilterYearVisibility: (prevState: IOwnState) => () => ({
    isFilterYearOpen: !prevState.isFilterYearOpen
  }),
  setFilterYear: () => (data?: ICollectionValue) => ({
    isFilterYearOpen: false,
    filterYear: data
  }),
  
  // filter summary
  setFilterSummary: () => (checked: boolean) => ({
    filterSummary: checked
  })
};

const handlerCreators: HandleCreators<ResourceMappingFilterProps, IOwnHandler> = {
  // main filter
  handleFilterOnReset: (props: ResourceMappingFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterReset();
  },
  handleFilterOnApply: (props: ResourceMappingFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    if (props.filterCompany && props.filterYear) {
      props.onApply({
        companyUid: props.filterCompany.uid,
        year: props.filterYear.value,
      });
    }
    props.setFilterVisibility();
  },
  handleFilterVisibility: (props: ResourceMappingFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterVisibility();
  },

  // filter Company
  handleFilterCompanyVisibility: (props: ResourceMappingFilterProps) => () => {
    props.setFilterCompanyVisibility();
  },
  handleFilterCompanyOnSelected: (props: ResourceMappingFilterProps) => (data: ILookupCompany) => {
    props.setFilterCompany(data);
  },
  handleFilterCompanyOnClear: (props: ResourceMappingFilterProps) => () => {
    props.setFilterCompany();
  },
  handleFilterCompanyOnClose: (props: ResourceMappingFilterProps) => () => {
    props.setFilterCompanyVisibility();
  },

  // filter year
  handleFilterYearVisibility: (props: ResourceMappingFilterProps) => () => {
    props.setFilterYearVisibility();
  },
  handleFilterYearOnSelected: (props: ResourceMappingFilterProps) => (data: ICollectionValue) => {
    props.setFilterYear(data);
  },
  handleFilterYearOnClear: (props: ResourceMappingFilterProps) => () => {
    props.setFilterYear();
  },
  handleFilterYearOnClose: (props: ResourceMappingFilterProps) => () => {
    props.setFilterYearVisibility();
  },

  // filter summary
  handleFilterSummaryOnChange: (props: ResourceMappingFilterProps) => (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    props.setFilterSummary(checked);
    props.setSummary(checked);
  }
};

const lifecycles: ReactLifeCycleFunctions<ResourceMappingFilterProps, IOwnState> = {
  componentDidMount() {
    if (this.props.initialProps) {
      const { companyUid, year } = this.props.initialProps;

      // filter company
      if (companyUid) {
        const { response } = this.props.lookupCompanyState.list;

        if (response && response.data) {
          const selected = response.data.find(item => item.uid === companyUid);

          this.props.setFilterCompany(selected);
        }
      }

      // filter year
      if (year) {
        const selected = yearList.find(item => item.value === year);

        this.props.setFilterYear(selected);
      }
    }
  },
};

export const ResourceMappingFilter = compose<ResourceMappingFilterProps, IOwnOption>(
  setDisplayName('ResourceMappingFilter'),
  withUser,
  withLookupCompany,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  withStyles(styles),
  lifecycle(lifecycles),
  injectIntl
)(ResourceMappingFilterView);
