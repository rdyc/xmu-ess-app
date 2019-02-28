import { ISystemList } from '@common/classes/response';
import { WithCommonSystem, withCommonSystem } from '@common/hoc/withCommonSystem';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { ICustomerList } from '@lookup/classes/response';
import { WithLookupCustomer, withLookupCustomer } from '@lookup/hoc/withLookupCustomer';
import { WithStyles, withStyles, WithTheme } from '@material-ui/core';
import { IPurchaseGetAllFilter } from '@purchase/classes/filters/purchaseRequest';
import styles from '@styles';
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

import { ICollectionValue } from '@layout/classes/core';
import { PurchaseRequestListFilterView } from './PurchaseRequestListFilterView';

export type IPurchaseRequestListFilterResult = Pick<IPurchaseGetAllFilter, 'customerUid' | 'isRejected' | 'isSettlement' | 'statusType' | 'status' >;

const completionStatus: ICollectionValue[] = [
  { value: 'pending', name: 'Pending' },
  { value: 'complete', name: 'Complete' }
]; 

interface IOwnOption {
  isOpen: boolean;
  initialProps?: IPurchaseRequestListFilterResult;
  onClose: (event: React.MouseEvent<HTMLElement>) => void;
  onApply: (filter: IPurchaseRequestListFilterResult) => void;
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

  // filter settlement
  filterSettlement?: boolean;
  
  // filter reject
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

  // filter completion
  setFilterCompletionVisibility: StateHandler<IOwnState>;
  setFilterCompletion: StateHandler<IOwnState>;

  // filter settlement
  setFilterSettlement: StateHandler<IOwnState>;

   // filter reject
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

  // filter completion
  handleFilterCompletionVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterCompletionOnSelected: (data: ICollectionValue) => void;
  handleFilterCompletionOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterCompletionOnClose: () => void;

  // filter settlement
  handleFilterSettlementOnChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  
  // filter reject
  handleFilterRejectOnChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

export type PurchaseRequestListFilterProps 
  = IOwnOption
  & WithUser
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithLookupCustomer
  & WithCommonSystem
  & WithStyles<typeof styles>
  & WithTheme
  & InjectedIntlProps;

const createProps: mapper<PurchaseRequestListFilterProps, IOwnState> = (props: PurchaseRequestListFilterProps): IOwnState => ({
  completionStatus,
  isFilterCompletionOpen: false,
  isFilterCustomerOpen: false,
  isFilterStatusOpen: false,

  // pass initial value for primitive types only, bellow is 'boolean'
  filterSettlement: props.initialProps && props.initialProps.isSettlement,
  filterRejected: props.initialProps && props.initialProps.isRejected
});

const stateUpdaters: StateUpdaters<PurchaseRequestListFilterProps, IOwnState, IOwnStateUpdater> = { 
  // main filter
  setFilterReset: (prevState: IOwnState) => () => ({
    filterCustomer: undefined,
    filterSettlement: undefined,
    filterRejected: undefined,
    filterCompletion: { value: 'pending', name: 'Pending' },
    filterStatus: undefined
  }),

  // filter customer
  setFilterCustomerVisibility: (prevState: IOwnState, props: PurchaseRequestListFilterProps) => () => ({
    isFilterCustomerOpen: !prevState.isFilterCustomerOpen,
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

  // filter settlement
  setFilterSettlement: (prevState: IOwnState) => (checked: boolean) => ({
    filterSettlement: checked
  }),

  // filter reject
  setFilterRejected: (prevState: IOwnState) => (checked: boolean) => ({
    filterRejected: checked
  }),
};

const handlerCreators: HandleCreators<PurchaseRequestListFilterProps, IOwnHandler> = {
  // main filter
  handleFilterOnReset: (props: PurchaseRequestListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterReset();
  },
  handleFilterOnApply: (props: PurchaseRequestListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.onApply({
      customerUid: props.filterCustomer && props.filterCustomer.uid,
      statusType: props.filterStatus && props.filterStatus.type,
      status: props.filterCompletion && props.filterCompletion.value,
      isSettlement: props.filterSettlement,
      isRejected: props.filterRejected,
    });
  },

  // filter customer
  handleFilterCustomerVisibility: (props: PurchaseRequestListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterCustomerVisibility(); 
  },
  handleFilterCustomerOnSelected: (props: PurchaseRequestListFilterProps) => (customer: ICustomerList) => {
    props.setFilterCustomer(customer);
  },
  handleFilterCustomerOnClear: (props: PurchaseRequestListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterCustomer();
  },
  handleFilterCustomerOnClose: (props: PurchaseRequestListFilterProps) => () => {
    props.setFilterCustomerVisibility();
  },

  // filter status
  handleFilterStatusVisibility: (props: PurchaseRequestListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterStatusVisibility();
  },
  handleFilterStatusOnSelected: (props: PurchaseRequestListFilterProps) => (data: ISystemList) => {
    props.setFilterStatus(data);
  },
  handleFilterStatusOnClear: (props: PurchaseRequestListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterStatus();
  },
  handleFilterStatusOnClose: (props: PurchaseRequestListFilterProps) => () => {
    props.setFilterStatusVisibility();
  },

  // filter completion
  handleFilterCompletionVisibility: (props: PurchaseRequestListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterCompletionVisibility();
  },
  handleFilterCompletionOnSelected: (props: PurchaseRequestListFilterProps) => (data: ICollectionValue) => {
    props.setFilterCompletion(data);
  },
  handleFilterCompletionOnClear: (props: PurchaseRequestListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterCompletion({ value: 'pending', name: 'Pending' });
  },
  handleFilterCompletionOnClose: (props: PurchaseRequestListFilterProps) => () => {
    props.setFilterCompletionVisibility();
  },

  // filter settlement
  handleFilterSettlementOnChange: (props: PurchaseRequestListFilterProps) => (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    props.setFilterSettlement(checked);
  },

  // filter reject
  handleFilterRejectOnChange: (props: PurchaseRequestListFilterProps) => (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    props.setFilterRejected(checked);
  }
};

const lifecycles: ReactLifeCycleFunctions<PurchaseRequestListFilterProps, IOwnState> = {
  componentDidMount() {
    if (this.props.initialProps) {
      const {customerUid, statusType, status, isSettlement, isRejected} = this.props.initialProps;

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

      // filter status
      if (status) {
        const selected = completionStatus.find(item => item.value === status);

        this.props.setFilterCompletion(selected);
      }

      if (isSettlement) {
        this.props.setFilterSettlement(isSettlement);
      }

      if (isRejected) {
        this.props.setFilterRejected(isRejected);
      }
    }
  }
};

export const PurchaseRequestListFilter = compose<PurchaseRequestListFilterProps, IOwnOption>(
  setDisplayName('PurchaseRequestListFilter'),
  withUser,
  withLookupCustomer,
  withCommonSystem,
  injectIntl,
  withStyles(styles, { withTheme: true }),
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(PurchaseRequestListFilterView);