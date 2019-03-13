import { IEmployeeListFilter } from '@account/classes/filters';
import { IEmployee } from '@account/classes/response';
import { WithAccountEmployee, withAccountEmployee } from '@account/hoc/withAccountEmployee';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { ILookupCompany } from '@lookup/classes';
import { WithLookupCompany, withLookupCompany } from '@lookup/hoc/withLookupCompany';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { ISummaryBillableFilter } from '@summary/classes/filters';
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

import { BillableListFilterView } from './BillableListFilterView';

export type IBillableListFilterResult = Pick<ISummaryBillableFilter, 'companyUid' | 'employeeUid' | 'start' | 'end'>;

interface OwnOption {
  isAdmin: boolean;
  initialProps?: IBillableListFilterResult;  
  isLoading: boolean;
  onClickSync: (event: React.MouseEvent<HTMLElement>) => void;
  onApply: (filter: IBillableListFilterResult) => void;
}

interface IOwnState {
  isFilterOpen: boolean;

  // filter company
  isFilterCompanyOpen: boolean;
  filterCompany: ILookupCompany;
  filterCompanyNonAdmin?: string;

  // filter employee
  isFilterEmployeeOpen: boolean;
  filterEmployee?: IEmployee;

  // filter start
  isFilterStartOpen: boolean;
  filterStart: string;

  // filter end
  isFilterEndOpen: boolean;
  filterEnd: string;

  start?: string;
  end?: string;

  filterEmployeeList?: IEmployeeListFilter;
  resetCompany?: ILookupCompany;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  stateUpdate: StateHandler<IOwnState>;

  // main filter
  setFilterReset: StateHandler<IOwnState>;
  setFilterVisibility: StateHandler<IOwnState>;

  // filter Company
  setFilterCompanyVisibility: StateHandler<IOwnState>;
  setFilterCompany: StateHandler<IOwnState>;

  // filter Employee
  setFilterEmployeeVisibility: StateHandler<IOwnState>;
  setFilterEmployee: StateHandler<IOwnState>;

  // filter Start
  setFilterStartVisibility: StateHandler<IOwnState>;
  setFilterStart: StateHandler<IOwnState>;

  // filter End
  setFilterEndVisibility: StateHandler<IOwnState>;
  setFilterEnd: StateHandler<IOwnState>;
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

  // filter Employee
  handleFilterEmployeeVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterEmployeeOnSelected: (data?: IEmployee) => void;
  handleFilterEmployeeOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterEmployeeOnClose: () => void;

  // filter Start
  handleFilterStartVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterStartOnSelected: (data: string) => void;
  handleFilterStartOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterStartOnClose: () => void;

  // filter End
  handleFilterEndVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterEndOnSelected: (data: string) => void;
  handleFilterEndOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterEndOnClose: () => void;
}

export type BillableListFilterProps 
  = OwnOption 
  & IOwnState 
  & IOwnHandler 
  & IOwnStateUpdater 
  & WithLookupCompany
  & WithAccountEmployee
  & WithStyles<typeof styles> 
  & WithUser 
  & InjectedIntlProps;

const createProps: mapper<BillableListFilterProps, IOwnState> = (props: BillableListFilterProps): IOwnState => {
  const { user } = props.userState;
  let getCompany: ILookupCompany = {
    uid: '',
    code: '',
    name: ''
  };

  if (user) {
    getCompany = {
      uid: user.company.uid,
      code: user.company.code,
      name: user.company.name
    };
  }

  return {
    isFilterCompanyOpen: false,
    isFilterEmployeeOpen: false,
    isFilterEndOpen: false,
    isFilterStartOpen: false,
    isFilterOpen: false,
    filterCompany: getCompany,
    resetCompany: getCompany,
    filterCompanyNonAdmin: user && user.company.name,
    filterEmployeeList: {
      companyUids: user && user.company.uid,
      orderBy: 'fullName',
      direction: 'ascending'
    },
    filterStart: moment()
      .startOf('year')
      .toISOString(true),
    filterEnd: moment().format('YYYY MM DD'),
    start: moment()
    .startOf('year')
    .toISOString(true),
    end: moment().format('YYYY MM DD')
  };
};

const stateUpdaters: StateUpdaters<BillableListFilterProps, IOwnState, IOwnStateUpdater> = {
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),

  // main filter
  setFilterReset: (prevState: IOwnState, props: BillableListFilterProps) => () => ({
    filterCompany: prevState.resetCompany,
    filterEmployee: undefined,
    filterStart: prevState.start,
    filterEnd: prevState.end,
    filterEmployeeList: props.userState.user && {
      companyUids: props.userState.user && props.userState.user.company.uid,
      orderBy: 'fullName',
      direction: 'ascending'
    }
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
    },
    filterEmployee: (prevState.filterCompany === data ? prevState.filterEmployee : undefined)
  }),

  // filter Employee
  setFilterEmployeeVisibility: (prevState: IOwnState) => () => ({
    isFilterEmployeeOpen: !prevState.isFilterEmployeeOpen
  }),
  setFilterEmployee: () => (data?: IEmployee) => ({
    isFilterEmployeeOpen: false,
    filterEmployee: data
  }),

  // filter Start
  setFilterStartVisibility: (prevState: IOwnState) => () => ({
    isFilterStartOpen: !prevState.isFilterStartOpen,
  }),
  setFilterStart: () => (data?: string) => ({
    isFilterStartOpen: false,
    filterStart: data
  }),

  // filter End
  setFilterEndVisibility: (prevState: IOwnState) => () => ({
    isFilterEndOpen: !prevState.isFilterEndOpen
  }),
  setFilterEnd: (prevState: IOwnState) => (data?: string) => ({
    isFilterEndOpen: false,
    filterEnd: data
  })
};

const handlerCreators: HandleCreators<BillableListFilterProps, IOwnHandler> = {
  // main filter
  handleFilterOnReset: (props: BillableListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterReset();
  },
  handleFilterOnApply: (props: BillableListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.onApply({
      companyUid: props.filterCompany && props.filterCompany.uid,
      employeeUid: props.filterEmployee && props.filterEmployee.uid,
      start: props.filterStart,
      end: props.filterEnd
    });
    props.setFilterVisibility();
  },
  handleFilterVisibility: (props: BillableListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterVisibility();
  },

  // filter Company
  handleFilterCompanyVisibility: (props: BillableListFilterProps) => () => {
    props.setFilterCompanyVisibility();
  },
  handleFilterCompanyOnSelected: (props: BillableListFilterProps) => (data: ILookupCompany) => {
    props.setFilterCompany(data);
  },
  handleFilterCompanyOnClear: (props: BillableListFilterProps) => () => {
    props.setFilterCompany(props.resetCompany);
    if (props.isAdmin) {
      props.setFilterEmployee();
    }
  },
  handleFilterCompanyOnClose: (props: BillableListFilterProps) => () => {
    props.setFilterCompanyVisibility();
  },

  // filter Employee
  handleFilterEmployeeVisibility: (props: BillableListFilterProps) => () => {
    props.setFilterEmployeeVisibility();
  },
  handleFilterEmployeeOnSelected: (props: BillableListFilterProps) => (data?: IEmployee) => {
    props.setFilterEmployee(data);
  },
  handleFilterEmployeeOnClear: (props: BillableListFilterProps) => () => {
    props.setFilterEmployee();
  },
  handleFilterEmployeeOnClose: (props: BillableListFilterProps) => () => {
    props.setFilterEmployeeVisibility();
  },

  // filter Start
  handleFilterStartVisibility: (props: BillableListFilterProps) => () => {
    props.setFilterStartVisibility();
  },
  handleFilterStartOnSelected: (props: BillableListFilterProps) => (data: string) => {
    props.setFilterStart(data);
    if (moment(data).isAfter(props.filterEnd)) {
      props.setFilterEnd();
    }
  },
  handleFilterStartOnClear: (props: BillableListFilterProps) => () => {
    props.setFilterStart(props.start);
  },
  handleFilterStartOnClose: (props: BillableListFilterProps) => () => {
    props.setFilterStartVisibility();
  },

  // filter End
  handleFilterEndVisibility: (props: BillableListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterEndVisibility();
  },
  handleFilterEndOnSelected: (props: BillableListFilterProps) => (data: string) => {
    props.setFilterEnd(data);
    if (moment(data).isBefore(props.filterStart)) {
      props.setFilterStart();
    }
  },
  handleFilterEndOnClear: (props: BillableListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterEnd(props.end);
  },
  handleFilterEndOnClose: (props: BillableListFilterProps) => () => {
    props.setFilterEndVisibility();
  },
};

const lifecycles: ReactLifeCycleFunctions<BillableListFilterProps, IOwnState> = {
  componentDidMount() {
    if (this.props.initialProps) {
      const { companyUid, employeeUid, start, end } = this.props.initialProps;

      if (companyUid) {
        const { response } = this.props.lookupCompanyState.list;

        if (response && response.data) {
          const selected = response.data.find(item => item.uid === companyUid);

          this.props.setFilterCompany(selected);
        }
      }

      if (employeeUid) {
        const { response } = this.props.accountEmployeeState.list;

        if (response && response.data) {
          const selected = response.data.find(item => item.uid === employeeUid);

          this.props.setFilterEmployee(selected);
        }
      }

      if (start) {
        this.props.setFilterStart(start);
      }

      if (end) {
        this.props.setFilterEnd(end);
      }
    }
  }
};

export const BillableListFilter = compose<BillableListFilterProps, OwnOption>(
  setDisplayName('BillableListFilter'),
  withUser,
  withLookupCompany,
  withAccountEmployee,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  withStyles(styles),
  lifecycle(lifecycles),
  injectIntl
)(BillableListFilterView);
