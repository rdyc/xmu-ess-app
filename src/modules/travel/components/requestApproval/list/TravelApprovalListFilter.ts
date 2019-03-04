import { ISystemList } from '@common/classes/response';
import { WithCommonSystem, withCommonSystem } from '@common/hoc/withCommonSystem';
import { ICollectionValue } from '@layout/classes/core';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { ICustomerList } from '@lookup/classes/response';
import { WithLookupCustomer, withLookupCustomer } from '@lookup/hoc/withLookupCustomer';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { ITravelApprovalgetAllFilter } from '@travel/classes/filters/ITravelApprovalGetAlFilter';
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

import { TravelApprovalListFilterView } from './TravelApprovalListFilterView';

const completionStatus: ICollectionValue[] = [
  { value: 'pending', name: 'Pending' },
  { value: 'complete', name: 'Complete' }
];

export type ITravelApprovalListFilterResult = Pick<ITravelApprovalgetAllFilter, 'customerUid' | 'statusType' | 'status' | 'isNotify'>;

interface IOwnOption {
  isOpen: boolean;
  initialProps?: ITravelApprovalListFilterResult;
  onClose: (event: React.MouseEvent<HTMLElement>) => void;
  onApply: (filter: ITravelApprovalListFilterResult) => void;
}

interface IOwnState {
  completionStatus: ICollectionValue[];

  // filter customer
  isFilterCustomerOpen: boolean;
  filterCustomer?: ICustomerList;

  // filter status
  isFilterStatusOpen: boolean;
  filterStatus?: ISystemList;

  // filter completion
  isFilterCompletionOpen: boolean;
  filterCompletion?: ICollectionValue;

  // filter start
  isFilterStartOpen: boolean;
  filterStart?: string;

  // filter end
  isFilterEndOpen: boolean;
  filterEnd?: string;

  // filter notify
  filterNotify?: boolean;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  // main filter
  setFilterReset: StateHandler<IOwnState>;

  // filter customer
  setFilterCustomerVisibility: StateHandler<IOwnState>;
  setFilterCustomer: StateHandler<IOwnState>;

  // filter status
  setFilterStatusVisibility: StateHandler<IOwnState>;
  setFilterStatus: StateHandler<IOwnState>;

  // filter completion
  setFilterCompletionVisibility: StateHandler<IOwnState>;
  setFilterCompletion: StateHandler<IOwnState>;

  // filter Start
  setFilterStartVisibility: StateHandler<IOwnState>;
  setFilterStart: StateHandler<IOwnState>;

  // filter End
  setFilterEndVisibility: StateHandler<IOwnState>;
  setFilterEnd: StateHandler<IOwnState>;

  // filter rejected
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

  // filter rejected
  handleFilterNotifyOnChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

export type TravelApprovalListFilterProps
  = IOwnOption
  & WithUser
  & WithLookupCustomer
  & WithCommonSystem
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithStyles<typeof styles>
  & InjectedIntlProps;

const createProps: mapper<TravelApprovalListFilterProps, IOwnState> = (props: TravelApprovalListFilterProps): IOwnState => ({
  completionStatus,
  isFilterCustomerOpen: false,
  isFilterStatusOpen: false,
  isFilterCompletionOpen: false,
  isFilterStartOpen: false,
  isFilterEndOpen: false,

  // pass initial value for primitive types only, bellow is 'boolean'
  filterNotify: props.initialProps && props.initialProps.isNotify
});

const stateUpdaters: StateUpdaters<TravelApprovalListFilterProps, IOwnState, IOwnStateUpdater> = {
  // main filter
  setFilterReset: (prevState: IOwnState) => () => ({
    filterCustomer: undefined,
    filterProject: undefined,
    filterStatus: undefined,
    filterCompletion: { value: 'pending', name: 'Pending'},
    filterNotify: undefined,
  }),

  // filter customer
  setFilterCustomerVisibility: (prevState: IOwnState) => () => ({
    isFilterCustomerOpen: !prevState.isFilterCustomerOpen
  }),
  setFilterCustomer: (prevState: IOwnState) => (customer?: ICustomerList) => ({
    isFilterCustomerOpen: false,
    filterCustomer: customer
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

  // filter Start
  setFilterStartVisibility: (prevState: IOwnState) => () => ({
    isFilterStartOpen: !prevState.isFilterStartOpen,
  }),
  setFilterStart: (prevState: IOwnState) => (data?: string) => ({
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
  }),

  // filter rejected
  setFilterNotify: (prevState: IOwnState) => (checked: boolean) => ({
    filterNotify: checked
  }),
};

const handlerCreators: HandleCreators<TravelApprovalListFilterProps, IOwnHandler> = {
  // main filter
  handleFilterOnReset: (props: TravelApprovalListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterReset();
  },
  handleFilterOnApply: (props: TravelApprovalListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.onApply({
      customerUid: props.filterCustomer && props.filterCustomer.uid,
      statusType: props.filterStatus && props.filterStatus.type,
      status: props.filterCompletion && props.filterCompletion.value,
      isNotify: props.filterNotify
    });
  },

  // filter customer
  handleFilterCustomerVisibility: (props: TravelApprovalListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterCustomerVisibility();
  },
  handleFilterCustomerOnSelected: (props: TravelApprovalListFilterProps) => (customer: ICustomerList) => {
    props.setFilterCustomer(customer);
  },
  handleFilterCustomerOnClear: (props: TravelApprovalListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterCustomer();
  },
  handleFilterCustomerOnClose: (props: TravelApprovalListFilterProps) => () => {
    props.setFilterCustomerVisibility();
  },

  // filter status
  handleFilterStatusVisibility: (props: TravelApprovalListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterStatusVisibility();
  },
  handleFilterStatusOnSelected: (props: TravelApprovalListFilterProps) => (data: ISystemList) => {
    props.setFilterStatus(data);
  },
  handleFilterStatusOnClear: (props: TravelApprovalListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterStatus();
  },
  handleFilterStatusOnClose: (props: TravelApprovalListFilterProps) => () => {
    props.setFilterStatusVisibility();
  },

  // filter completion
  handleFilterCompletionVisibility: (props: TravelApprovalListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterCompletionVisibility();
  },
  handleFilterCompletionOnSelected: (props: TravelApprovalListFilterProps) => (data: ICollectionValue) => {
    props.setFilterCompletion(data);
  },
  handleFilterCompletionOnClear: (props: TravelApprovalListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterCompletion({ value: 'pending', name: 'Pending'});
  },
  handleFilterCompletionOnClose: (props: TravelApprovalListFilterProps) => () => {
    props.setFilterCompletionVisibility();
  },

  // filter Start
  handleFilterStartVisibility: (props: TravelApprovalListFilterProps) => () => {
    props.setFilterStartVisibility();
  },
  handleFilterStartOnSelected: (props: TravelApprovalListFilterProps) => (
    data: string
  ) => {
    props.setFilterStart(data);
  },
  handleFilterStartOnClear: (props: TravelApprovalListFilterProps) => () => {
    props.setFilterStart(props.start);
  },
  handleFilterStartOnClose: (props: TravelApprovalListFilterProps) => () => {
    props.setFilterStartVisibility();
  },

  // filter End
  handleFilterEndVisibility: (props: TravelApprovalListFilterProps) => (
    event: React.MouseEvent<HTMLElement>
  ) => {
    props.setFilterEndVisibility();
  },
  handleFilterEndOnSelected: (props: TravelApprovalListFilterProps) => (
    data: string
  ) => {
    props.setFilterEnd(data);
  },
  handleFilterEndOnClear: (props: TravelApprovalListFilterProps) => (
    event: React.MouseEvent<HTMLElement>
  ) => {
    props.setFilterEnd(props.end);
  },
  handleFilterEndOnClose: (props: TravelApprovalListFilterProps) => () => {
    props.setFilterEndVisibility();
  },

  // filter new owner
  handleFilterNotifyOnChange: (props: TravelApprovalListFilterProps) => (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    props.setFilterNotify(checked);
    if (checked) {
      props.setFilterCompletion();
    } else {
      props.setFilterCompletion({ value: 'pending', name: 'Pending'});
    }
  }
};

const lifecycles: ReactLifeCycleFunctions<TravelApprovalListFilterProps, IOwnState> = {
  componentDidMount() { 
    // handling previous filter after leaving list page
    if (this.props.initialProps) {
      const { customerUid, statusType, status } = this.props.initialProps;

      // filter customer
      if (customerUid) {
        const { response } = this.props.lookupCustomerState.list;
        
        if (response && response.data) {
          const selected = response.data.find(item => item.uid === customerUid);
          
          this.props.setFilterCustomer(selected);
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
      
      // filter completion
      if (status) {
        const selected = completionStatus.find(item => item.value === status);

        this.props.setFilterCompletion(selected);
      }
    }
  }
};

export const TravelApprovalListFilter = compose<TravelApprovalListFilterProps, IOwnOption>(
  setDisplayName('TravelApprovalListFilter'),
  withUser,
  withLookupCustomer,
  withCommonSystem,
  injectIntl,
  withStyles(styles),
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(TravelApprovalListFilterView);