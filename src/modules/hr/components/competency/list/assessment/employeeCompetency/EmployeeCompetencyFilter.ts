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

interface IOwnOption {
  isOpen: boolean;
  initialProps?: IEmployeeCompetencyFilterResult;
  onClose: (event: React.MouseEvent<HTMLElement>) => void;
  onApply: (filter: IEmployeeCompetencyFilterResult) => void;
}

interface IOwnState {
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
  currentYear: ICollectionValue;
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

  // filter asses
  setFilterAssess: StateHandler<IOwnState>;

  // filter active
  setFilterActive: StateHandler<IOwnState>;
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
  handleFilterCompanyOnSelected: (data: ILookupCompany) => void;
  handleFilterCompanyOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterCompanyOnClose: () => void;
  
  // filter assess
  handleFilterAssessOnChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;

  // filter status
  handleFilterActiveOnChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

export type EmployeeCompetencyFilterProps
  = IOwnOption
  & IOwnState
  & IOwnHandler
  & IOwnStateUpdater
  & WithStyles<typeof styles>
  & WithLookupCompany
  & InjectedIntlProps;

const createProps: mapper<EmployeeCompetencyFilterProps, IOwnState> = (props: EmployeeCompetencyFilterProps): IOwnState => ({
  yearList,
  currentYear: {
    name: Number(moment().format('YYYY')).toString(),
    value: Number(moment().format('YYYY'))
  },
  isFilterYearOpen: false,
  isFilterCompanyOpen: false,

  // pass initial value for primitive types only, bellow is 'boolean'
  filterAssess: props.initialProps && props.initialProps.isAssess,
  filterActive: props.initialProps && props.initialProps.isActive,
});

const stateUpdaters: StateUpdaters<EmployeeCompetencyFilterProps, IOwnState, IOwnStateUpdater> = {
  // main filter
  setFilterReset: (prevState: IOwnState) => () => ({
    filterYear: prevState.currentYear,
    filterCompany: undefined,
    filterAssess: undefined,
    filterActive: true
  }),

  // filter year
  setFilterYearVisibility: (prevState: IOwnState) => () => ({
    isFilterYearOpen: !prevState.isFilterYearOpen
  }),
  setFilterYear: (prevState: IOwnState) => (data?: ICollectionValue) => ({
    isFilterYearOpen: false,
    filterYear: data
  }),

  // filter company
  setFilterCompanyVisibility: (prevState: IOwnState) => () => ({
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

const handlerCreators: HandleCreators<EmployeeCompetencyFilterProps, IOwnHandler> = {
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
    props.setFilterYear(props.currentYear);
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

const lifecycles: ReactLifeCycleFunctions<EmployeeCompetencyFilterProps, IOwnState> = {
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

export const EmployeeCompetencyFilter = compose<EmployeeCompetencyFilterProps, IOwnOption>(
  setDisplayName('EmployeeCompetencyFilter'),
  withLookupCompany,
  injectIntl,
  withStyles(styles),
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(EmployeeCompetencyFilterView);