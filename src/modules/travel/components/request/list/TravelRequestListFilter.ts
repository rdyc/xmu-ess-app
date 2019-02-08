import { ISystemList } from '@common/classes/response';
import { ICollectionValue } from '@layout/classes/core';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { ICustomerList } from '@lookup/classes/response';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { ITravelRequestGetAllFilter } from '@travel/classes/filters';
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

import { WithCommonSystem, withCommonSystem } from '@common/hoc/withCommonSystem';
import { WithLookupCustomer, withLookupCustomer } from '@lookup/hoc/withLookupCustomer';
import { TravelRequestListFilterView } from './TravelRequestListFilterView';

const completionStatus: ICollectionValue[] = [
  { value: 'pending', name: 'Pending' },
  { value: 'complete', name: 'Complete' }
];

export type ITravelRequestListFilterResult = Pick<ITravelRequestGetAllFilter, 'customerUid' | 'statusType' | 'isRejected' | 'isSettlement'>;

interface IOwnOption {
  isOpen: boolean;
  initialProps?: ITravelRequestListFilterResult;
  onClose: (event: React.MouseEvent<HTMLElement>) => void;
  onApply: (filter: ITravelRequestListFilterResult) => void;
}

interface IOwnState {
  completionStatus: ICollectionValue[];

  // filter customer
  isFilterCustomerOpen: boolean;
  filterCustomer?: ICustomerList;

  // filter status
  isFilterStatusOpen: boolean;
  filterStatus?: ISystemList;

  // filter start
  isFilterStartOpen: boolean;
  filterStart?: string;

  // filter end
  isFilterEndOpen: boolean;
  filterEnd?: string;

  // filter is Ready to settle
  filterSettlement?: boolean;

  // filter rejected
  filterRejected?: boolean;
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

  // filter Start
  setFilterStartVisibility: StateHandler<IOwnState>;
  setFilterStart: StateHandler<IOwnState>;

  // filter End
  setFilterEndVisibility: StateHandler<IOwnState>;
  setFilterEnd: StateHandler<IOwnState>;

  // filter is Ready to settle
  setFilterSettlement: StateHandler<IOwnState>;

  // filter rejected
  setFilterRejected: StateHandler<IOwnState>;
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

  // filter ready to settle
  handleFilterSettlementOnChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;

  // filter rejected
  handleFilterRejectedOnChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

export type TravelRequestListFilterProps
  = IOwnOption
  & WithUser
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithLookupCustomer
  & WithCommonSystem
  & WithStyles<typeof styles>
  & WithLayout
  & InjectedIntlProps;

const createProps: mapper<TravelRequestListFilterProps, IOwnState> = (props: TravelRequestListFilterProps): IOwnState => ({
  completionStatus,
  isFilterCustomerOpen: false,
  isFilterStatusOpen: false,
  isFilterStartOpen: false,
  isFilterEndOpen: false,

  // pass initial value for primitive types only, bellow is 'boolean'
  filterRejected: props.initialProps && props.initialProps.isRejected,
  filterSettlement: props.initialProps && props.initialProps.isSettlement
});

const stateUpdaters: StateUpdaters<TravelRequestListFilterProps, IOwnState, IOwnStateUpdater> = {
  // main filter
  setFilterReset: (prevState: IOwnState) => () => ({
    filterCustomer: undefined,
    filterType: undefined,
    filterStatus: undefined,
    filterSettlement: undefined,
    filterRejected: undefined
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
  setFilterRejected: (prevState: IOwnState) => (checked: boolean) => ({
    filterRejected: checked
  }),

  // filter settlement
  setFilterSettlement: (prevState: IOwnState) => (checked: boolean) => ({
    filterSettlement: checked
  }),
};

const handlerCreators: HandleCreators<TravelRequestListFilterProps, IOwnHandler> = {
  // main filter
  handleFilterOnReset: (props: TravelRequestListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterReset();
  },
  handleFilterOnApply: (props: TravelRequestListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.onApply({
      customerUid: props.filterCustomer && props.filterCustomer.uid,
      statusType: props.filterStatus && props.filterStatus.type,
      isRejected: props.filterRejected,
      isSettlement: props.filterSettlement
    });
  },

  // filter customer
  handleFilterCustomerVisibility: (props: TravelRequestListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterCustomerVisibility();
  },
  handleFilterCustomerOnSelected: (props: TravelRequestListFilterProps) => (customer: ICustomerList) => {
    props.setFilterCustomer(customer);
  },
  handleFilterCustomerOnClear: (props: TravelRequestListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterCustomer();
  },
  handleFilterCustomerOnClose: (props: TravelRequestListFilterProps) => () => {
    props.setFilterCustomerVisibility();
  },

  // filter status
  handleFilterStatusVisibility: (props: TravelRequestListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterStatusVisibility();
  },
  handleFilterStatusOnSelected: (props: TravelRequestListFilterProps) => (data: ISystemList) => {
    props.setFilterStatus(data);
  },
  handleFilterStatusOnClear: (props: TravelRequestListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterStatus();
  },
  handleFilterStatusOnClose: (props: TravelRequestListFilterProps) => () => {
    props.setFilterStatusVisibility();
  },

  // filter Start
  handleFilterStartVisibility: (props: TravelRequestListFilterProps) => () => {
    props.setFilterStartVisibility();
  },
  handleFilterStartOnSelected: (props: TravelRequestListFilterProps) => (
    data: string
  ) => {
    props.setFilterStart(data);
  },
  handleFilterStartOnClear: (props: TravelRequestListFilterProps) => () => {
    props.setFilterStart(props.start);
  },
  handleFilterStartOnClose: (props: TravelRequestListFilterProps) => () => {
    props.setFilterStartVisibility();
  },

  // filter End
  handleFilterEndVisibility: (props: TravelRequestListFilterProps) => (
    event: React.MouseEvent<HTMLElement>
  ) => {
    props.setFilterEndVisibility();
  },
  handleFilterEndOnSelected: (props: TravelRequestListFilterProps) => (
    data: string
  ) => {
    props.setFilterEnd(data);
  },
  handleFilterEndOnClear: (props: TravelRequestListFilterProps) => (
    event: React.MouseEvent<HTMLElement>
  ) => {
    props.setFilterEnd(props.end);
  },
  handleFilterEndOnClose: (props: TravelRequestListFilterProps) => () => {
    props.setFilterEndVisibility();
  },

  // filter rejected
  handleFilterRejectedOnChange: (props: TravelRequestListFilterProps) => (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    props.setFilterRejected(checked);
  },

  // filter new owner
  handleFilterSettlementOnChange: (props: TravelRequestListFilterProps) => (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    props.setFilterSettlement(checked);
  }
};

const lifecycles: ReactLifeCycleFunctions<TravelRequestListFilterProps, IOwnState> = {
  componentDidMount() { 
    // handling previous filter after leaving list page
    if (this.props.initialProps) {
      const { customerUid, statusType } = this.props.initialProps;

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
    }
  }
};

export const TravelRequestListFilter = compose<TravelRequestListFilterProps, IOwnOption>(
  setDisplayName('TravelRequestListFilter'),
  withUser,
  withLayout,
  withLookupCustomer,
  withCommonSystem,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  withStyles(styles)
)(TravelRequestListFilterView);