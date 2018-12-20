// import { ISystemList } from '@common/classes/response';
import { ICollectionValue } from '@layout/classes/core';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { ICustomerList } from '@lookup/classes/response';
import { WithStyles, withStyles } from '@material-ui/core';
import { IPurchaseApprovalGetAllFilter } from '@purchase/classes/filters/purchaseApproval';
import styles from '@styles';
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

import { PurchaseApprovalListFilterView } from './PurchaseApprovalListFilterView';

const completionStatus: ICollectionValue[] = [
  { value: 'pending', name: 'Pending' },
  { value: 'complete', name: 'Complete' }
]; 

export type IPurchaseApprovalListFilterResult = Pick<IPurchaseApprovalGetAllFilter, 'customerUid' | 'status' | 'isNotify'>;

interface IOwnOption {
  companyUid?: string; 
  isOpen: boolean;
  initialProps?: IPurchaseApprovalListFilterResult;
  onClose: (event: React.MouseEvent<HTMLElement>) => void;
  onApply: (filter: IPurchaseApprovalListFilterResult) => void;
}

interface IOwnState {
  completionStatus: ICollectionValue[];

  // filter customer
  isFilterCustomerOpen: boolean;
  filterCustomer?: ICustomerList;

  // filter status
  // isFilterStatusOpen: boolean;
  // filterStatus?: ISystemList;

  // filter completion
  isFilterCompletionOpen: boolean;
  filterCompletion?: ICollectionValue;

  // filter notify
  filterNotify?: boolean;
  
  customerPayload?: {
    companyUid: string;
  };
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  // main filter
  setFilterReset: StateHandler<IOwnState>;

  // filter customer
  setFilterCustomerVisibility: StateHandler<IOwnState>;
  setFilterCustomer: StateHandler<IOwnState>;

  // setFilterStatusVisibility: StateHandler<IOwnState>;
  // setFilterStatus: StateHandler<IOwnState>;

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

  // filter status
  // handleFilterStatusVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  // handleFilterStatusOnSelected: (data: ISystemList) => void;
  // handleFilterStatusOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  // handleFilterStatusOnClose: () => void;

  // filter completion
  handleFilterCompletionVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterCompletionOnSelected: (data: ICollectionValue) => void;
  handleFilterCompletionOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterCompletionOnClose: () => void;

  // filter notify
  handleFilterNotifyOnChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

export type PurchaseApprovalListFilterProps 
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithStyles<typeof styles>
  & WithLayout
  & InjectedIntlProps;

const createProps: mapper<PurchaseApprovalListFilterProps, IOwnState> = (props: PurchaseApprovalListFilterProps): IOwnState => ({
  completionStatus,
  isFilterCustomerOpen: false,
  isFilterCompletionOpen: false,
  // isFilterStatusOpen: false,

  customerPayload: {
    companyUid: props.companyUid || ''
  },

  // pass initial value for primitive types only, bellow is 'boolean'
  filterNotify: props.initialProps && props.initialProps.isNotify
});

const stateUpdaters: StateUpdaters<PurchaseApprovalListFilterProps, IOwnState, IOwnStateUpdater> = { 
  // main filter
  setFilterReset: (prevState: IOwnState) => () => ({
    filterCustomer: undefined,
    filterCompletion: undefined,
    filterNotify: undefined
  }),

  // filter customer
  setFilterCustomerVisibility: (prevState: IOwnState, props: PurchaseApprovalListFilterProps) => () => ({
    isFilterCustomerOpen: !prevState.isFilterCustomerOpen,
    customerPayload: { companyUid: props.companyUid || '' }
  }),
  setFilterCustomer: (prevState: IOwnState) => (customer?: ICustomerList) => ({
    isFilterCustomerOpen: false,
    filterCustomer: customer
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

const handlerCreators: HandleCreators<PurchaseApprovalListFilterProps, IOwnHandler> = {
  // main filter
  handleFilterOnReset: (props: PurchaseApprovalListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterReset();
  },
  handleFilterOnApply: (props: PurchaseApprovalListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.onApply({
      customerUid: props.filterCustomer && props.filterCustomer.uid,
      status: props.filterCompletion && props.filterCompletion.value,
      // statusType: props.filterStatus && props.filterStatus.type,
      isNotify: props.filterNotify
    });
  },

  // filter customer
  handleFilterCustomerVisibility: (props: PurchaseApprovalListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterCustomerVisibility(); 
  },
  handleFilterCustomerOnSelected: (props: PurchaseApprovalListFilterProps) => (customer: ICustomerList) => {
    props.setFilterCustomer(customer);
  },
  handleFilterCustomerOnClear: (props: PurchaseApprovalListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterCustomer();
  },
  handleFilterCustomerOnClose: (props: PurchaseApprovalListFilterProps) => () => {
    props.setFilterCustomerVisibility();
  },

  // filter status
  // handleFilterStatusVisibility: (props: PurchaseApprovalListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
  //   props.setFilterStatusVisibility();
  // },
  // handleFilterStatusOnSelected: (props: PurchaseApprovalListFilterProps) => (data: ISystemList) => {
  //   props.setFilterStatus(data);
  // },
  // handleFilterStatusOnClear: (props: PurchaseApprovalListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
  //   props.setFilterStatus();
  // },
  // handleFilterStatusOnClose: (props: PurchaseApprovalListFilterProps) => () => {
  //   props.setFilterStatusVisibility();
  // },

  // filter completion
  handleFilterCompletionVisibility: (props: PurchaseApprovalListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterCompletionVisibility();
  },
  handleFilterCompletionOnSelected: (props: PurchaseApprovalListFilterProps) => (data: ICollectionValue) => {
    props.setFilterCompletion(data);
  },
  handleFilterCompletionOnClear: (props: PurchaseApprovalListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterCompletion();
  },
  handleFilterCompletionOnClose: (props: PurchaseApprovalListFilterProps) => () => {
    props.setFilterCompletionVisibility();
  },
  
  // filter notify
  handleFilterNotifyOnChange: (props: PurchaseApprovalListFilterProps) => (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    props.setFilterNotify(checked);
  }
};

export const PurchaseApprovalListFilter = compose<PurchaseApprovalListFilterProps, IOwnOption>(
  setDisplayName('PurchaseApprovalListFilter'),
  withLayout,
  withStyles(styles),
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators)
)(PurchaseApprovalListFilterView);