import { ISystemList } from '@common/classes/response';
import { WithCommonSystem, withCommonSystem } from '@common/hoc/withCommonSystem';
import { ICollectionValue } from '@layout/classes/core';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { ICustomerList } from '@lookup/classes/response';
import { WithLookupCustomer, withLookupCustomer } from '@lookup/hoc/withLookupCustomer';
import { WithStyles, withStyles, WithTheme } from '@material-ui/core';
import styles from '@styles';
import { ITimesheetApprovalGetAllFilter } from '@timesheet/classes/filters';
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

import { TimesheetApprovalHistoryListFilterView } from './TimesheetApprovalHistoryListFilterView';

const completionStatus: ICollectionValue[] = [
  { value: 'pending', name: 'Pending' },
  { value: 'complete', name: 'Complete' }
];

export type ITimesheetApprovalHistoryListFilterResult = Pick<ITimesheetApprovalGetAllFilter, 'customerUid' | 'activityType' | 'companyUid' | 'statusType' | 'status' | 'isNotify'>;

interface IOwnOption {
  isOpen: boolean;
  initialProps?: ITimesheetApprovalHistoryListFilterResult;
  onClose: (event: React.MouseEvent<HTMLElement>) => void;
  onApply: (filter: ITimesheetApprovalHistoryListFilterResult) => void;
}

interface IOwnState {
  completionStatus: ICollectionValue[];

  // filter customer
  isFilterCustomerOpen: boolean;
  filterCustomer?: ICustomerList;

  // filter activity type
  isFilterActivityTypeOpen: boolean;
  filterActivityType?: ISystemList;

  // filter status
  isFilterStatusOpen: boolean;
  filterStatus?: ISystemList;

  // filter completion
  isFilterCompletionOpen: boolean;
  filterCompletion?: ICollectionValue;

  // filter notify
  filterNotify?: boolean;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  // main filter
  setFilterReset: StateHandler<IOwnState>;

  // filter customer
  setFilterCustomerVisibility: StateHandler<IOwnState>;
  setFilterCustomer: StateHandler<IOwnState>;

  // filter activity type
  setFilterActivityTypeVisibility: StateHandler<IOwnState>;
  setFilterActivityType: StateHandler<IOwnState>;

  // filter status
  setFilterStatusVisibility: StateHandler<IOwnState>;
  setFilterStatus: StateHandler<IOwnState>;

  // filter completion
  setFilterCompletionVisibility: StateHandler<IOwnState>;
  setFilterCompletion: StateHandler<IOwnState>;

  // filter notify
  setFilterNotify: StateHandler<IOwnState>;
}

interface IOwnHandler {
  // main filter
  handleFilterOnReset: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterOnApply: (event: React.MouseEvent<HTMLElement>) => void;

  // filter customer
  handleFilterCustomerVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterCustomerOnSelected: (customer: ICustomerList) => void;
  handleFilterCustomerOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterCustomerOnClose: () => void;

  // filter activity type
  handleFilterActivityTypeVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterActivityTypeOnSelected: (data: ISystemList) => void;
  handleFilterActivityTypeOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterActivityTypeOnClose: () => void;

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

export type TimesheetApprovalHistoryListFilterProps
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithStyles<typeof styles>
  & WithTheme
  & WithUser
  & WithLookupCustomer
  & WithCommonSystem
  & InjectedIntlProps;

const createProps: mapper<TimesheetApprovalHistoryListFilterProps, IOwnState> = (props: TimesheetApprovalHistoryListFilterProps): IOwnState => ({
  completionStatus,
  isFilterCustomerOpen: false,
  isFilterActivityTypeOpen: false,
  isFilterCompletionOpen: false,
  isFilterStatusOpen: false,

  // pass initial value for primitive types only, bellow is 'boolean'
  filterNotify: props.initialProps && props.initialProps.isNotify
});

const stateUpdaters: StateUpdaters<TimesheetApprovalHistoryListFilterProps, IOwnState, IOwnStateUpdater> = {
  // main filter
  setFilterReset: (prevState: IOwnState) => () => ({
    filterCustomer: undefined,
    filterActivityType: undefined,
    filterStatus: undefined,
    filterCompletion: undefined,
    filterNotify: undefined
  }),

  // filter customer
  setFilterCustomerVisibility: (prevState: IOwnState) => () => ({
    isFilterCustomerOpen: !prevState.isFilterCustomerOpen
  }),
  setFilterCustomer: (prevState: IOwnState) => (customer?: ICustomerList) => ({
    isFilterCustomerOpen: false,
    filterCustomer: customer
  }),

  // filter activity type
  setFilterActivityTypeVisibility: (prevState: IOwnState) => () => ({
    isFilterActivityTypeOpen: !prevState.isFilterActivityTypeOpen
  }),
  setFilterActivityType: (prevState: IOwnState) => (data?: ISystemList) => ({
    isFilterActivityTypeOpen: false,
    filterActivityType: data
  }),

  // filter status
  setFilterStatusVisibility: (prevState: IOwnState) => () => ({
    isFilterStatusOpen: !prevState.isFilterStatusOpen
  }),
  setFilterStatus: (prevState: IOwnState) => (data?: ISystemList) => ({
    isFilterStatusOpen: false,
    filterStatus: data
  }),

  // filter completion
  setFilterCompletionVisibility: (prevState: IOwnState) => () => ({
    isFilterCompletionOpen: !prevState.isFilterCompletionOpen
  }),
  setFilterCompletion: (prevState: IOwnState) => (data?: ICollectionValue) => ({
    isFilterCompletionOpen: false,
    filterCompletion: data
  }),

  // filter notify
  setFilterNotify: (prevState: IOwnState) => (checked: boolean) => ({
    filterNotify: checked
  }),
};

const handlerCreators: HandleCreators<TimesheetApprovalHistoryListFilterProps, IOwnHandler> = {
  // main filter
  handleFilterOnReset: (props: TimesheetApprovalHistoryListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterReset();
  },
  handleFilterOnApply: (props: TimesheetApprovalHistoryListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.onApply({
      customerUid: props.filterCustomer && props.filterCustomer.uid,
      activityType: props.filterActivityType && props.filterActivityType.type,
      statusType: props.filterStatus && props.filterStatus.type,
      status: props.filterCompletion && props.filterCompletion.value,
      isNotify: props.filterNotify
    });
  },

  // filter customer
  handleFilterCustomerVisibility: (props: TimesheetApprovalHistoryListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterCustomerVisibility();
  },
  handleFilterCustomerOnSelected: (props: TimesheetApprovalHistoryListFilterProps) => (customer: ICustomerList) => {
    props.setFilterCustomer(customer);
  },
  handleFilterCustomerOnClear: (props: TimesheetApprovalHistoryListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterCustomer();
  },
  handleFilterCustomerOnClose: (props: TimesheetApprovalHistoryListFilterProps) => () => {
    props.setFilterCustomerVisibility();
  },

  // filter activity type
  handleFilterActivityTypeVisibility: (props: TimesheetApprovalHistoryListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterActivityTypeVisibility();
  },
  handleFilterActivityTypeOnSelected: (props: TimesheetApprovalHistoryListFilterProps) => (data: ISystemList) => {
    props.setFilterActivityType(data);
  },
  handleFilterActivityTypeOnClear: (props: TimesheetApprovalHistoryListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterActivityType();
  },
  handleFilterActivityTypeOnClose: (props: TimesheetApprovalHistoryListFilterProps) => () => {
    props.setFilterActivityTypeVisibility();
  },

  // filter status
  handleFilterStatusVisibility: (props: TimesheetApprovalHistoryListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterStatusVisibility();
  },
  handleFilterStatusOnSelected: (props: TimesheetApprovalHistoryListFilterProps) => (data: ISystemList) => {
    props.setFilterStatus(data);
  },
  handleFilterStatusOnClear: (props: TimesheetApprovalHistoryListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterStatus();
  },
  handleFilterStatusOnClose: (props: TimesheetApprovalHistoryListFilterProps) => () => {
    props.setFilterStatusVisibility();
  },

  // filter completion
  handleFilterCompletionVisibility: (props: TimesheetApprovalHistoryListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterCompletionVisibility();
  },
  handleFilterCompletionOnSelected: (props: TimesheetApprovalHistoryListFilterProps) => (data: ICollectionValue) => {
    props.setFilterCompletion(data);
  },
  handleFilterCompletionOnClear: (props: TimesheetApprovalHistoryListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterCompletion();
  },
  handleFilterCompletionOnClose: (props: TimesheetApprovalHistoryListFilterProps) => () => {
    props.setFilterCompletionVisibility();
  },

  // filter notify
  handleFilterNotifyOnChange: (props: TimesheetApprovalHistoryListFilterProps) => (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    props.setFilterNotify(checked);
  }
};

const lifecycles: ReactLifeCycleFunctions<TimesheetApprovalHistoryListFilterProps, IOwnState> = {
  componentDidMount() { 
    // handling previous filter after leaving list page
    if (this.props.initialProps) {
      const { customerUid, activityType, statusType, status } = this.props.initialProps;

      // filter customer
      if (customerUid) {
        const { response } = this.props.lookupCustomerState.list;
        
        if (response && response.data) {
          const selected = response.data.find(item => item.uid === customerUid);
          
          this.props.setFilterCustomer(selected);
        }
      }

      // filter project type
      if (activityType) {
        const { response } = this.props.commonActivityListState;
        
        if (response && response.data) {
          const selected = response.data.find(item => item.type === activityType);
          
          this.props.setFilterActivityType(selected);
        }
      }

      // filter status type
      if (statusType) {
        const { response } = this.props.commonStatusListState;
        
        if (response && response.data) {
          const selected = response.data.find(item => item.type === statusType);
          
          this.props.setFilterStatus(selected);
        }
      }

      // filter status
      if (status) {
        const selected = completionStatus.find(item => item.value === status);
          
        this.props.setFilterCompletion(selected);
      }
    }
  }
};

export const TimesheetApprovalHistoryListFilter = compose<TimesheetApprovalHistoryListFilterProps, IOwnOption>(
  setDisplayName('TimesheetApprovalHistoryListFilter'),
  withUser,
  withLookupCustomer,
  withCommonSystem,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  withStyles(styles, { withTheme: true }),
)(TimesheetApprovalHistoryListFilterView);