import { IAccountEmployeeCompetencyGetAllFilter } from '@hr/classes/filters';
import { ICollectionValue } from '@layout/classes/core';
import { ILookupCompany } from '@lookup/classes';
import { WithLookupCompany, withLookupCompany } from '@lookup/hoc/withLookupCompany';
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

import { EmployeeCompetencyFilterView } from './EmployeeCompetencyFilterView';

export type IEmployeeCompetencyFilterResult = Pick<IAccountEmployeeCompetencyGetAllFilter,
  'companyUid' | 'year' | 'isAssess' | 'isActive'>;

const getYear: number = Number(moment().format('YYYY'));

const yearList: ICollectionValue[] = [
  {value: getYear - 1, name: (getYear - 1).toString() },
  {value: getYear, name: (getYear).toString() },
  {value: getYear + 1, name: (getYear + 1).toString() },
];

interface OwnOption {
  isOpen: boolean;
  initialProps?: IEmployeeCompetencyFilterResult;
  onClose: (event: React.MouseEvent<HTMLElement>) => void;
  onApply: (filter: IEmployeeCompetencyFilterResult) => void;
}

interface OwnState {
  yearList: ICollectionValue[];
  
  // filter year
  isFilterYearOpen: boolean;
  filterYear?: ICollectionValue;

  // filter company
  isFilterCompanyOpen: boolean;
  filterCompany?: ILookupCompany;

  // filter assess
  filterAssess?: boolean;

  // filter is active
  filterActive?: boolean;
}

interface OwnStateUpdater extends StateHandlerMap<OwnState> {
  // main filter
  setFilterReset: StateHandler<OwnState>;

  // filter year
  setFilterYearVisibility: StateHandler<OwnState>;
  setFilterYear: StateHandler<OwnState>;

  // filter company
  setFilterCompanyVisibility: StateHandler<OwnState>;
  setFilterCompany: StateHandler<OwnState>;

  // filter asses
  setFilterAssess: StateHandler<OwnState>;

  // filter active
  setFilterActive: StateHandler<OwnState>;
}

interface OwnHandler {
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
  handleFilterCompanyOnSelected: (data: ILookupCompany) => void;
  handleFilterCompanyOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterCompanyOnClose: () => void;
  
  // filter assess
  handleFilterAssessOnChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;

  // filter status
  handleFilterActiveOnChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

export type EmployeeCompetencyFilterProps
  = OwnOption
  & OwnState
  & OwnHandler
  & OwnStateUpdater
  & WithStyles<typeof styles>
  & WithLookupCompany
  & InjectedIntlProps;

const createProps: mapper<EmployeeCompetencyFilterProps, OwnState> = (props: EmployeeCompetencyFilterProps): OwnState => ({
  yearList,
  isFilterYearOpen: false,
  isFilterCompanyOpen: false,

  // pass initial value for primitive types only, bellow is 'boolean'
  filterAssess: props.initialProps && props.initialProps.isAssess,
  filterActive: props.initialProps && props.initialProps.isActive,
});

const stateUpdaters: StateUpdaters<EmployeeCompetencyFilterProps, OwnState, OwnStateUpdater> = {
  // main filter
  setFilterReset: () => () => ({
    filterYear: undefined,
    filterCompany: undefined,
    filterAssess: undefined,
    filterActive: true
  }),

  // filter year
  setFilterYearVisibility: (prevState: OwnState) => () => ({
    isFilterYearOpen: !prevState.isFilterYearOpen
  }),
  setFilterYear: () => (data?: ICollectionValue) => ({
    isFilterYearOpen: false,
    filterYear: data
  }),

  // filter company
  setFilterCompanyVisibility: (prevState: OwnState) => () => ({
    isFilterCompanyOpen: !prevState.isFilterCompanyOpen
  }),
  setFilterCompany: () => (data?: ILookupCompany) => ({
    isFilterCompanyOpen: false,
    filterCompany: data,
  }),

  // filter assess
  setFilterAssess: () => (checked: boolean) => ({
    filterAssess: checked
  }),

  // filter active
  setFilterActive: () => (checked: boolean) => ({
    filterActive: checked
  }),
};

const handlerCreators: HandleCreators<EmployeeCompetencyFilterProps, OwnHandler> = {
  // main filter
  handleFilterOnReset: (props: EmployeeCompetencyFilterProps) => () => {
    props.setFilterReset();
  },
  handleFilterOnApply: (props: EmployeeCompetencyFilterProps) => () => {
    props.onApply({
      year: props.filterYear && props.filterYear.value,
      companyUid: props.filterCompany && props.filterCompany.uid,
      isAssess: props.filterAssess,
      isActive: props.filterActive
    });
  },

  // filter year
  handleFilterYearVisibility: (props: EmployeeCompetencyFilterProps) => () => {
    props.setFilterYearVisibility();
  },
  handleFilterYearOnSelected: (props: EmployeeCompetencyFilterProps) => (data: ICollectionValue) => {
    props.setFilterYear(data);
  },
  handleFilterYearOnClear: (props: EmployeeCompetencyFilterProps) => () => {
    props.setFilterYear();
  },
  handleFilterYearOnClose: (props: EmployeeCompetencyFilterProps) => () => {
    props.setFilterYearVisibility();
  },

  // filter company
  handleFilterCompanyVisibility: (props: EmployeeCompetencyFilterProps) => () => {
    props.setFilterCompanyVisibility();
  },
  handleFilterCompanyOnSelected: (props: EmployeeCompetencyFilterProps) => (data: ILookupCompany) => {
    props.setFilterCompany(data);
  },
  handleFilterCompanyOnClear: (props: EmployeeCompetencyFilterProps) => () => {
    props.setFilterCompany();
    props.setFilterPosition();
  },
  handleFilterCompanyOnClose: (props: EmployeeCompetencyFilterProps) => () => {
    props.setFilterCompanyVisibility();
  },

  // filter assess
  handleFilterAssessOnChange: (props: EmployeeCompetencyFilterProps) => (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    props.setFilterAssess(checked);
  },

  // filter active
  handleFilterActiveOnChange: (props: EmployeeCompetencyFilterProps) => (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    props.setFilterActive(checked);
  },
};

const lifecycles: ReactLifeCycleFunctions<EmployeeCompetencyFilterProps, OwnState> = {
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

export const EmployeeCompetencyFilter = compose<EmployeeCompetencyFilterProps, OwnOption>(
  setDisplayName('EmployeeCompetencyFilter'),
  withLookupCompany,
  injectIntl,
  withStyles(styles),
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(EmployeeCompetencyFilterView);