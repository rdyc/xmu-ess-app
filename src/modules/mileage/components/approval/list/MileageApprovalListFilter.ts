import { ISystemList } from '@common/classes/response';
import { ICollectionValue } from '@layout/classes/core';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithStyles, withStyles } from '@material-ui/core';
import { IMileageApprovalGetAllFilter } from '@mileage/classes/filters';
import styles from '@styles';
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
  withStateHandlers,
} from 'recompose';

import { IMileageRequest } from '@mileage/classes/response';
import { MileageApprovalListFilterView } from './MileageApprovalListFilterView';

const getYear: number = Number(moment().format('YYYY'));

const yearList: ICollectionValue[] = [
  {value: getYear - 1, name: (getYear - 1).toString() },
  {value: getYear, name: (getYear).toString() },
  {value: getYear + 1, name: (getYear + 1).toString() },
];

const monthList: ICollectionValue[] = [];

moment.months().map((item, i) => (
  monthList.push({value: i + 1, name: item.toString()})
  )
);

const completionStatus: ICollectionValue[] = [
  { value: 'pending', name: 'Pending' },
  { value: 'complete', name: 'Complete' }
];

export type IMileageApprovalListFilterResult = Pick<IMileageApprovalGetAllFilter, 
  'employeeUid' | 'month' | 'year' | 'statusType' | 'status' | 'isNotify'>;

interface OwnOption {
  isOpen: boolean;
  initialProps?: IMileageApprovalListFilterResult;
  onClose: (event: React.MouseEvent<HTMLElement>) => void;
  onApply: (filter: IMileageApprovalListFilterResult) => void;
}

interface OwnState {
  completionStatus: ICollectionValue[];

  monthList: ICollectionValue[];

  yearList: ICollectionValue[];

  // filter employee
  isFilterEmployeeOpen: boolean;
  filterEmployee?: IMileageRequest;

  // filter month
  isFilterMonthOpen: boolean;
  filterMonth?: ICollectionValue;

  // filter year
  isFilterYearOpen: boolean;
  filterYear?: ICollectionValue;

  // filter status
  isFilterStatusOpen: boolean;
  filterStatus?: ISystemList;

  // filter completion
  isFilterCompletionOpen: boolean;
  filterCompletion?: ICollectionValue;

  // filter notify
  filterNotify?: boolean;
}

interface OwnStateUpdater extends StateHandlerMap<OwnState> {
  // main filter
  setFilterReset: StateHandler<OwnState>;

  // filter employee
  setFilterEmployeeVisibility: StateHandler<OwnState>;
  setFilterEmployee: StateHandler<OwnState>;

  // filter month
  setFilterMonthVisibility: StateHandler<OwnState>;
  setFilterMonth: StateHandler<OwnState>;

  // filter month
  setFilterYearVisibility: StateHandler<OwnState>;
  setFilterYear: StateHandler<OwnState>;

  // filter status
  setFilterStatusVisibility: StateHandler<OwnState>;
  setFilterStatus: StateHandler<OwnState>;

  // filter completion
  setFilterCompletionVisibility: StateHandler<OwnState>;
  setFilterCompletion: StateHandler<OwnState>;

  // filter notify
  setFilterNotify: StateHandler<OwnState>;
}

interface OwnHandler {
  // main filter
  handleFilterOnReset: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterOnApply: (event: React.MouseEvent<HTMLElement>) => void;

  // filter employee
  handleFilterEmployeeVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterEmployeeOnSelected: (employee: IMileageRequest) => void;
  handleFilterEmployeeOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterEmployeeOnClose: () => void;

  // filter month
  handleFilterMonthVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterMonthOnSelected: (data: ICollectionValue) => void;
  handleFilterMonthOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterMonthOnClose: () => void;

  // filter year
  handleFilterYearVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterYearOnSelected: (data: ICollectionValue) => void;
  handleFilterYearOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterYearOnClose: () => void;

  // filter status
  handleFilterStatusVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterStatusOnSelected: (data: ISystemList) => void;
  handleFilterStatusOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterStatusOnClose: () => void;

  // filter completion
  handleFilterCompletionVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterCompletionOnSelected: (data: ICollectionValue) => void;
  handleFilterCompletionOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterCompletionOnClose: () => void;

  // filter notify
  handleFilterNotifyOnChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

export type MileageApprovalListFilterProps
  = OwnOption
  & OwnState
  & OwnHandler
  & OwnStateUpdater
  & WithStyles<typeof styles>
  & WithLayout
  & InjectedIntlProps;

const createProps: mapper<MileageApprovalListFilterProps, OwnState> = (props: MileageApprovalListFilterProps): OwnState => ({
  monthList,
  yearList,
  completionStatus,
  isFilterEmployeeOpen: false,
  isFilterMonthOpen: false,
  isFilterYearOpen: false,
  isFilterStatusOpen: false,
  isFilterCompletionOpen: false,

  // pass initial value for primitive types only, bellow is 'boolean'
  filterNotify: props.initialProps && props.initialProps.isNotify
});

const stateUpdaters: StateUpdaters<MileageApprovalListFilterProps, OwnState, OwnStateUpdater> = {
  // main filter
  setFilterReset: () => () => ({
    filterEmployee: undefined,
    filterMonth: undefined,
    filterYear: undefined,
    filterStatus: undefined,
    filterCompletion: undefined,
    filterNotify: undefined
  }),

  // filter employee
  setFilterEmployeeVisibility: (prevState: OwnState) => () => ({
    isFilterEmployeeOpen: !prevState.isFilterEmployeeOpen
  }),
  setFilterEmployee: () => (employee?: IMileageRequest) => ({
    isFilterEmployeeOpen: false,
    filterEmployee: employee
  }),
  
  // filter month
  setFilterMonthVisibility: (prevState: OwnState) => () => ({
    isFilterMonthOpen: !prevState.isFilterMonthOpen
  }),
  setFilterMonth: () => (data?: ICollectionValue) => ({
    isFilterMonthOpen: false,
    filterMonth: data
  }),

  // filter year
  setFilterYearVisibility: (prevState: OwnState) => () => ({
    isFilterYearOpen: !prevState.isFilterYearOpen
  }),
  setFilterYear: () => (data?: ICollectionValue) => ({
    isFilterYearOpen: false,
    filterYear: data
  }),

  // filter status
  setFilterStatusVisibility: (prevState: OwnState) => () => ({
    isFilterStatusOpen: !prevState.isFilterStatusOpen
  }),
  setFilterStatus: () => (data?: ISystemList) => ({
    isFilterStatusOpen: false,
    filterStatus: data
  }),

  // filter completion
  setFilterCompletionVisibility: (prevState: OwnState) => () => ({
    isFilterCompletionOpen: !prevState.isFilterCompletionOpen
  }),
  setFilterCompletion: (prevState: OwnState) => (data?: ICollectionValue) => ({
    isFilterCompletionOpen: false,
    filterCompletion: data
  }),

  // filter notify
  setFilterNotify: (prevState: OwnState) => (checked: boolean) => ({
    filterNotify: checked
  }),
};

const handlerCreators: HandleCreators<MileageApprovalListFilterProps, OwnHandler> = {
  // main filter
  handleFilterOnReset: (props: MileageApprovalListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterReset();
  },
  handleFilterOnApply: (props: MileageApprovalListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.onApply({
      employeeUid: props.filterEmployee && props.filterEmployee.employeeUid,
      month: props.filterMonth && props.filterMonth.value,
      year: props.filterYear && props.filterYear.value,
      statusType: props.filterStatus && props.filterStatus.type,
      status: props.filterCompletion && props.filterCompletion.value,
      isNotify: props.filterNotify
    });
  },

  // filter employee
  handleFilterEmployeeVisibility: (props: MileageApprovalListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterEmployeeVisibility();
  },
  handleFilterEmployeeOnSelected: (props: MileageApprovalListFilterProps) => (employee: IMileageRequest) => {
    props.setFilterEmployee(employee);
  },
  handleFilterEmployeeOnClear: (props: MileageApprovalListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterEmployee();
  },
  handleFilterEmployeeOnClose: (props: MileageApprovalListFilterProps) => () => {
    props.setFilterEmployeeVisibility();
  },

  // filter month
  handleFilterMonthVisibility: (props: MileageApprovalListFilterProps) => () => {
    props.setFilterMonthVisibility();
  },
  handleFilterMonthOnSelected: (props: MileageApprovalListFilterProps) => (data: ICollectionValue) => {
    props.setFilterMonth(data);
  },
  handleFilterMonthOnClear: (props: MileageApprovalListFilterProps) => () => {
    props.setFilterMonth();
  },
  handleFilterMonthOnClose: (props: MileageApprovalListFilterProps) => () => {
    props.setFilterMonthVisibility();
  },
  
  // filter year
  handleFilterYearVisibility: (props: MileageApprovalListFilterProps) => () => {
    props.setFilterYearVisibility();
  },
  handleFilterYearOnSelected: (props: MileageApprovalListFilterProps) => (data: ICollectionValue) => {
    props.setFilterYear(data);
  },
  handleFilterYearOnClear: (props: MileageApprovalListFilterProps) => () => {
    props.setFilterYear();
  },
  handleFilterYearOnClose: (props: MileageApprovalListFilterProps) => () => {
    props.setFilterYearVisibility();
  },
  
  // filter status
  handleFilterStatusVisibility: (props: MileageApprovalListFilterProps) => () => {
    props.setFilterStatusVisibility();
  },
  handleFilterStatusOnSelected: (props: MileageApprovalListFilterProps) => (data: ISystemList) => {
    props.setFilterStatus(data);
  },
  handleFilterStatusOnClear: (props: MileageApprovalListFilterProps) => () => {
    props.setFilterStatus();
  },
  handleFilterStatusOnClose: (props: MileageApprovalListFilterProps) => () => {
    props.setFilterStatusVisibility();
  },

  // filter completion
  handleFilterCompletionVisibility: (props: MileageApprovalListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterCompletionVisibility();
  },
  handleFilterCompletionOnSelected: (props: MileageApprovalListFilterProps) => (data: ICollectionValue) => {
    props.setFilterCompletion(data);
  },
  handleFilterCompletionOnClear: (props: MileageApprovalListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterCompletion();
  },
  handleFilterCompletionOnClose: (props: MileageApprovalListFilterProps) => () => {
    props.setFilterCompletionVisibility();
  },

  // filter notify
  handleFilterNotifyOnChange: (props: MileageApprovalListFilterProps) => (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    props.setFilterNotify(checked);
  }
};

export const MileageApprovalListFilter = compose<MileageApprovalListFilterProps, OwnOption>(
  setDisplayName('MileageApprovalListFilter'),
  withLayout,
  withStyles(styles),
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators)
)(MileageApprovalListFilterView);