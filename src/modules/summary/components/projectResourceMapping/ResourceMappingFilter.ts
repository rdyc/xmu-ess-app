import { IEmployeeListFilter } from '@account/classes/filters';
import { EmployeeCheck } from '@account/components/dialog';
import { WithAccountEmployee, withAccountEmployee } from '@account/hoc/withAccountEmployee';
import { ISystemList } from '@common/classes/response';
import { SystemCheck } from '@common/components/dialog/lookupSystemDialog/LookupSystemCheck';
import { WithCommonSystem, withCommonSystem } from '@common/hoc/withCommonSystem';
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

export type IResourceMappingFilterResult = Pick<ISummaryMappingFilter, 'companyUid' | 'year' | 'summary' | 'professionTypes' | 'competencyTypes' | 'employeeUids'>;

interface IOwnOption {
  isAdmin: boolean;
  isStartup: boolean;
  initialProps?: IResourceMappingFilterResult;  
  isLoading: boolean;
  onClickSync: (event: React.MouseEvent<HTMLElement>) => void;
  onApply: (filter: IResourceMappingFilterResult) => void;
}

interface IOwnState {
  isFilterOpen: boolean;

  yearList: ICollectionValue[];

  // filter company
  isFilterCompanyOpen: boolean;
  filterCompany?: ILookupCompany;

  // filter year
  isFilterYearOpen: boolean;
  filterYear?: ICollectionValue;

  // filter profession
  isFilterProfessionOpen: boolean;
  filterProfession?: ISystemList;

  // filter competency
  isFilterCompetencyOpen: boolean;
  filterCompetency?: SystemCheck[];

  // filter summary
  filterSummary?: boolean;

  // filter employee
  isFilterEmployeeOpen: boolean;
  filterEmployee?: EmployeeCheck[];
  filterEmployeeList?: IEmployeeListFilter;
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

  // filter profession
  setFilterProfessionVisibility: StateHandler<IOwnState>;
  setFilterProfession: StateHandler<IOwnState>;

  // filter competency
  setFilterCompetencyVisibility: StateHandler<IOwnState>;
  setFilterCompetency: StateHandler<IOwnState>;

  // filter summary
  setFilterSummary: StateHandler<IOwnState>;

  // filter Employee
  setFilterEmployeeVisibility: StateHandler<IOwnState>;
  setFilterEmployee: StateHandler<IOwnState>;  
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

  // filter Employee
  handleFilterEmployeeVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterEmployeeOnSelected: (data?: EmployeeCheck[]) => void;
  handleFilterEmployeeOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterEmployeeOnClose: () => void;

  // filter profession
  handleFilterProfessionVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterProfessionOnSelected: (data: ISystemList) => void;
  handleFilterProfessionOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterProfessionOnClose: () => void;

  // filter competency
  handleFilterCompetencyVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterCompetencyOnSelected: (data: SystemCheck[]) => void;
  handleFilterCompetencyOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterCompetencyOnClose: () => void;

  // filter summary
  handleFilterSummaryOnChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

export type ResourceMappingFilterProps 
  = IOwnOption 
  & IOwnState 
  & IOwnHandler 
  & IOwnStateUpdater 
  & WithLookupCompany
  & WithAccountEmployee
  & WithCommonSystem
  & WithStyles<typeof styles> 
  & WithUser 
  & InjectedIntlProps;

const createProps: mapper<ResourceMappingFilterProps, IOwnState> = (props: ResourceMappingFilterProps): IOwnState => {
  return {
    yearList,
    isFilterCompanyOpen: false,
    isFilterYearOpen: false,
    isFilterOpen: true,
    isFilterCompetencyOpen: false,
    isFilterProfessionOpen: false,
    isFilterEmployeeOpen: false,

    // pass inital value
    // filterCompetency: []
    // filterSummary: props.isSummary
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
    filterProfession: undefined,
    filterCompetency: undefined,
    filterSummary: false,
    filterEmployee: undefined,
    filterEmployeeList: undefined
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
    filterCompany: data,
    filterEmployeeList: {
      companyUids: data && data.uid,
      orderBy: 'fullName',
      direction: 'ascending'
    }
  }),

  // filter year
  setFilterYearVisibility: (prevState: IOwnState) => () => ({
    isFilterYearOpen: !prevState.isFilterYearOpen
  }),
  setFilterYear: () => (data?: ICollectionValue) => ({
    isFilterYearOpen: false,
    filterYear: data
  }),

  // filter Employee
  setFilterEmployeeVisibility: (prevState: IOwnState) => () => ({
    isFilterEmployeeOpen: !prevState.isFilterEmployeeOpen
  }),
  setFilterEmployee: () => (data?: EmployeeCheck[]) => ({
    isFilterEmployeeOpen: false,
    filterEmployee: data
  }),
  
  // filter profession
  setFilterProfessionVisibility: (prevState: IOwnState) => () => ({
    isFilterProfessionOpen: !prevState.isFilterProfessionOpen
  }),
  setFilterProfession: (prevState: IOwnState) => (data?: ISystemList) => ({
    isFilterProfessionOpen: false,
    filterProfession: data
  }),

  // filter competency
  setFilterCompetencyVisibility: (prevState: IOwnState) => () => ({
    isFilterCompetencyOpen: !prevState.isFilterCompetencyOpen
  }),
  setFilterCompetency: (prevState: IOwnState) => (data?: SystemCheck[]) => ({
    isFilterCompetencyOpen: false,
    filterCompetency: data
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
      const competency: string[] = [];
      if (props.filterCompetency) {
        props.filterCompetency.map(data => {
          if (data.isCheck) {
            competency.push(data.item.type);
          }
        });
      }
      const employee: string[] = [];
      if (props.filterEmployee) {
        props.filterEmployee.map(data => {
          if (data.isCheck) {
            employee.push(data.employee.uid);
          }  
        });
      }
      
      props.onApply({
        companyUid: props.filterCompany.uid,
        year: props.filterYear.value,
        professionTypes: props.filterProfession && props.filterProfession.type,
        competencyTypes: competency.length > 0 ? competency.join() : undefined,
        employeeUids: employee.length > 0 ? employee.join() : undefined,
        summary: props.filterSummary
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
    props.setFilterEmployee();
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

  // filter Employee
  handleFilterEmployeeVisibility: (props: ResourceMappingFilterProps) => () => {
    props.setFilterEmployeeVisibility();
  },
  handleFilterEmployeeOnSelected: (props: ResourceMappingFilterProps) => (data?: EmployeeCheck[]) => {
    props.setFilterEmployee(data);
  },
  handleFilterEmployeeOnClear: (props: ResourceMappingFilterProps) => () => {
    props.setFilterEmployee();
  },
  handleFilterEmployeeOnClose: (props: ResourceMappingFilterProps) => () => {
    props.setFilterEmployeeVisibility();
  },

  // filter Profession
  handleFilterProfessionVisibility: (props: ResourceMappingFilterProps) => () => {
    props.setFilterProfessionVisibility();
  },
  handleFilterProfessionOnSelected: (props: ResourceMappingFilterProps) => (data: ISystemList) => {
    props.setFilterProfession(data);
  },
  handleFilterProfessionOnClear: (props: ResourceMappingFilterProps) => () => {
    props.setFilterProfession();
  },
  handleFilterProfessionOnClose: (props: ResourceMappingFilterProps) => () => {
    props.setFilterProfessionVisibility();
  },

  // filter Competency
  handleFilterCompetencyVisibility: (props: ResourceMappingFilterProps) => () => {
    props.setFilterCompetencyVisibility();
  },
  handleFilterCompetencyOnSelected: (props: ResourceMappingFilterProps) => (data: SystemCheck[]) => {
    props.setFilterCompetency(data);
  },
  handleFilterCompetencyOnClear: (props: ResourceMappingFilterProps) => () => {
    props.setFilterCompetency();
  },
  handleFilterCompetencyOnClose: (props: ResourceMappingFilterProps) => () => {
    props.setFilterCompetencyVisibility();
  },
  // filter summary
  handleFilterSummaryOnChange: (props: ResourceMappingFilterProps) => (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    props.setFilterSummary(checked);
    // props.setSummary(checked);
  }
};

const lifecycles: ReactLifeCycleFunctions<ResourceMappingFilterProps, IOwnState> = {
  componentDidMount() {
    if (this.props.initialProps) {
      const { companyUid, year, competencyTypes, professionTypes, employeeUids } = this.props.initialProps;

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

      // filter profession
      if (professionTypes) {
        const { response } = this.props.commonProfessionListState;

        if (response && response.data) {
          const selected = response.data.find(item => item.type === professionTypes);

          this.props.setFilterProfession(selected);
        }
      }

      // filter competency
      if (competencyTypes) {
        const { response } = this.props.commonCompetencyListState;

        if (response && response.data) {
          const comp: SystemCheck[] = [];
          const temp: string[] = competencyTypes.split(',');
          
          response.data.map(item => {
            const isTrue = temp.find(tempx => tempx === item.type);

            if (isTrue) {
              comp.push({
                item,
                isCheck: true
              });
            } else {
              comp.push({
                item,
                isCheck: false
              });
            }
          });

          this.props.setFilterCompetency(comp);
        }
      }

      // filter employee
      if (employeeUids) {
        const { response } = this.props.accountEmployeeState.list;

        if (response && response.data) {
          const emp: EmployeeCheck[] = [];
          const temp: string[] = employeeUids.split(',');

          response.data.map(item => {
            const isTrue = temp.find(tempx => tempx === item.uid);

            if (isTrue) {
              emp.push({
                employee: item,
                isCheck: true
              });
            } else {
              emp.push({
                employee: item,
                isCheck: false
              });
            }
          });

          this.props.setFilterEmployee(emp);
        }
      }
    }
  },
};

export const ResourceMappingFilter = compose<ResourceMappingFilterProps, IOwnOption>(
  setDisplayName('ResourceMappingFilter'),
  withUser,
  withCommonSystem,
  withLookupCompany,
  withAccountEmployee,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  withStyles(styles),
  lifecycle(lifecycles),
  injectIntl
)(ResourceMappingFilterView);
