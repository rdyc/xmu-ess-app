import { IEmployee } from '@account/classes/response';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { ILookupCompany } from '@lookup/classes';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { ISummaryBillableFilter } from '@summary/classes/filters';
import * as moment from 'moment';
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
  withStateHandlers
} from 'recompose';
import { BillableListFilterView } from './BillableListFilterView';

export type IBillableListFilterResult = Pick<
  ISummaryBillableFilter,
  'companyUid' | 'employeeUid' | 'start' | 'end'
>;

interface OwnOption {
  isAdmin: boolean;
  className: string;
  isLoading: boolean;
  onClickSync: (event: React.MouseEvent<HTMLElement>) => void;
  onApply: (filter: IBillableListFilterResult) => void;
}

interface OwnState {
  isFilterOpen: boolean;

  // filter company
  isFilterCompanyOpen: boolean;
  filterCompany?: ILookupCompany;
  filterNonAdmin?: string;

  // filter employee
  isFilterEmployeeOpen: boolean;
  filterEmployee?: IEmployee;

  // filter start
  isFilterStartOpen: boolean;
  filterStart?: string;

  // filter end
  isFilterEndOpen: boolean;
  filterEnd?: string;

  start?: string;
  end?: string;
}

interface OwnStateUpdater extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;

  // main filter
  setFilterReset: StateHandler<OwnState>;
  setFilterVisibility: StateHandler<OwnState>;

  // filter Company
  setFilterCompanyVisibility: StateHandler<OwnState>;
  setFilterCompany: StateHandler<OwnState>;

  // filter Employee
  setFilterEmployeeVisibility: StateHandler<OwnState>;
  setFilterEmployee: StateHandler<OwnState>;

  // filter Start
  setFilterStartVisibility: StateHandler<OwnState>;
  setFilterStart: StateHandler<OwnState>;

  // filter End
  setFilterEndVisibility: StateHandler<OwnState>;
  setFilterEnd: StateHandler<OwnState>;
}

interface OwnHandler {
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
  handleFilterEmployeeVisibility: (
    event: React.MouseEvent<HTMLElement>
  ) => void;
  handleFilterEmployeeOnSelected: (data: IEmployee) => void;
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

export type BillableListFilterProps = OwnOption &
  OwnState &
  OwnHandler &
  OwnStateUpdater &
  WithStyles<typeof styles> &
  WithLayout &
  WithUser &
  InjectedIntlProps;

const createProps: mapper<BillableListFilterProps, OwnState> = (
  props: BillableListFilterProps
): OwnState => {
  const { user } = props.userState;

  return {
    isFilterCompanyOpen: false,
    isFilterEmployeeOpen: false,
    isFilterEndOpen: false,
    isFilterStartOpen: false,
    isFilterOpen: false,
    filterNonAdmin: user && user.company.name,
    filterStart: moment()
      .startOf('year')
      .toISOString(true),
    filterEnd: moment().toISOString(true),
    start: moment()
    .startOf('year')
    .toISOString(true),
    end: moment().toISOString(true)
  };
};

const stateUpdaters: StateUpdaters<
  BillableListFilterProps,
  OwnState,
  OwnStateUpdater
> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),

  // main filter
  setFilterReset: (prevState: OwnState) => () => ({
    filterCompany: undefined,
    filterEmployee: undefined,
    filterStart: prevState.start,
    filterEnd: prevState.end
  }),
  setFilterVisibility: (prevState: OwnState) => () => ({
    isFilterOpen: !prevState.isFilterOpen
  }),

  // filter Company
  setFilterCompanyVisibility: (prevState: OwnState) => () => ({
    isFilterCompanyOpen: !prevState.isFilterCompanyOpen
  }),
  setFilterCompany: () => (data?: ILookupCompany) => ({
    isFilterCompanyOpen: false,
    filterCompany: data
  }),

  // filter Employee
  setFilterEmployeeVisibility: (prevState: OwnState) => () => ({
    isFilterEmployeeOpen: !prevState.isFilterEmployeeOpen
  }),
  setFilterEmployee: () => (data?: IEmployee) => ({
    isFilterEmployeeOpen: false,
    filterEmployee: data
  }),

  // filter Start
  setFilterStartVisibility: (prevState: OwnState) => () => ({
    isFilterStartOpen: !prevState.isFilterStartOpen,
  }),
  setFilterStart: () => (data?: string) => ({
    isFilterStartOpen: false,
    filterStart: data
  }),

  // filter End
  setFilterEndVisibility: (prevState: OwnState) => () => ({
    isFilterEndOpen: !prevState.isFilterEndOpen
  }),
  setFilterEnd: (prevState: OwnState) => (data?: string) => ({
    isFilterEndOpen: false,
    filterEnd: data
  })
};

const handlerCreators: HandleCreators<BillableListFilterProps, OwnHandler> = {
  // main filter
  handleFilterOnReset: (props: BillableListFilterProps) => (
    event: React.MouseEvent<HTMLElement>
  ) => {
    props.setFilterReset();
  },
  handleFilterOnApply: (props: BillableListFilterProps) => (
    event: React.MouseEvent<HTMLElement>
  ) => {
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
  handleFilterCompanyOnSelected: (props: BillableListFilterProps) => (
    data: ILookupCompany
  ) => {
    props.setFilterCompany(data);
  },
  handleFilterCompanyOnClear: (props: BillableListFilterProps) => () => {
    props.setFilterCompany();
  },
  handleFilterCompanyOnClose: (props: BillableListFilterProps) => () => {
    props.setFilterCompanyVisibility();
  },

  // filter Employee
  handleFilterEmployeeVisibility: (props: BillableListFilterProps) => () => {
    props.setFilterEmployeeVisibility();
  },
  handleFilterEmployeeOnSelected: (props: BillableListFilterProps) => (
    data: IEmployee
  ) => {
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
  handleFilterStartOnSelected: (props: BillableListFilterProps) => (
    data: string
  ) => {
    props.setFilterStart(data);
  },
  handleFilterStartOnClear: (props: BillableListFilterProps) => () => {
    props.setFilterStart(props.start);
  },
  handleFilterStartOnClose: (props: BillableListFilterProps) => () => {
    props.setFilterStartVisibility();
  },

  // filter End
  handleFilterEndVisibility: (props: BillableListFilterProps) => (
    event: React.MouseEvent<HTMLElement>
  ) => {
    props.setFilterEndVisibility();
  },
  handleFilterEndOnSelected: (props: BillableListFilterProps) => (
    data: string
  ) => {
    props.setFilterEnd(data);
  },
  handleFilterEndOnClear: (props: BillableListFilterProps) => (
    event: React.MouseEvent<HTMLElement>
  ) => {
    props.setFilterEnd(props.end);
  },
  handleFilterEndOnClose: (props: BillableListFilterProps) => () => {
    props.setFilterEndVisibility();
  },
};

export const BillableListFilter = compose<BillableListFilterProps, OwnOption>(
  setDisplayName('BillableListFilter'),
  withLayout,
  withUser,
  injectIntl,
  withStyles(styles),
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators)
)(BillableListFilterView);
