import { ISystemList } from '@common/classes/response';
import { IExpenseApprovalGetAllFilter } from '@expense/classes/filters/approval';
import { ICollectionValue } from '@layout/classes/core';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { ICustomerList } from '@lookup/classes/response';
import { WithStyles, withStyles } from '@material-ui/core';
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

import { WithUser, withUser } from '@layout/hoc/withUser';
import { ILookupCustomerGetListFilter } from '@lookup/classes/filters/customer';
import { ExpenseApprovalListFilterView } from './ExpenseApprovalListFilterView';

const completionStatus: ICollectionValue[] = [
  { value: 'pending', name: 'Pending' },
  { value: 'complete', name: 'Complete' }
];

export type IExpenseApprovalListFilterResult = Pick<IExpenseApprovalGetAllFilter, 'customerUid' | 'expenseType' | 'statusType' | 'status' | 'isNotify' >;

interface IOwnOption {
  isOpen: boolean;
  initialProps?: IExpenseApprovalListFilterResult;
  onClose: (event: React.MouseEvent<HTMLElement>) => void;
  onApply: (filter: IExpenseApprovalListFilterResult) => void;
}

interface IOwnState {
  completionStatus: ICollectionValue[];

  // filter customer
  isFilterCustomerOpen: boolean;
  filterCustomer?: ICustomerList;

  // filter type
  isFilterTypeOpen: boolean;
  filterType?: ISystemList;

  // filter status
  isFilterStatusOpen: boolean;
  filterStatus?: ISystemList;

  // filter completion
  isFilterCompletionOpen: boolean;
  filterCompletion?: ICollectionValue;

  // filter rejected
  filterNotify?: boolean;

  // filter Customer Dialog
  filterCustomerDialog: ILookupCustomerGetListFilter;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  // main filter
  setFilterReset: StateHandler<IOwnState>;

  // filter customer
  setFilterCustomerVisibility: StateHandler<IOwnState>;
  setFilterCustomer: StateHandler<IOwnState>;

  // filter type
  setFilterTypeVisibility: StateHandler<IOwnState>;
  setFilterType: StateHandler<IOwnState>;

  // filter status
  setFilterStatusVisibility: StateHandler<IOwnState>;
  setFilterStatus: StateHandler<IOwnState>;

  // filter completion
  setFilterCompletionVisibility: StateHandler<IOwnState>;
  setFilterCompletion: StateHandler<IOwnState>;
  
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

  // filter type
  handleFilterTypeVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterTypeOnSelected: (data: ISystemList) => void;
  handleFilterTypeOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterTypeOnClose: () => void;

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

  // filter rejected
  handleFilterRejectedOnChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

export type ExpenseApprovalListFilterProps 
  = IOwnOption
  & WithUser
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithStyles<typeof styles>
  & WithLayout
  & InjectedIntlProps;

const createProps: mapper<ExpenseApprovalListFilterProps, IOwnState> = (props: ExpenseApprovalListFilterProps): IOwnState => ({
  completionStatus,
  isFilterCustomerOpen: false,
  isFilterTypeOpen: false,
  isFilterCompletionOpen: false,
  isFilterStatusOpen: false,

  // pass initial value for primitive types only, bellow is 'boolean'
  filterNotify: props.initialProps && props.initialProps.isNotify,

  // default filter customer dialog
  filterCustomerDialog: {
    companyUid: props.userState.user ? props.userState.user.company.uid : undefined
  }
});

const stateUpdaters: StateUpdaters<ExpenseApprovalListFilterProps, IOwnState, IOwnStateUpdater> = { 
  // main filter
  setFilterReset: (prevState: IOwnState) => () => ({
    filterCustomer: undefined,
    filterType: undefined,
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

  // filter type
  setFilterTypeVisibility: (prevState: IOwnState) => () => ({
    isFilterTypeOpen: !prevState.isFilterTypeOpen
  }),
  setFilterType: (prevState: IOwnState) => (data?: ISystemList) => ({
    isFilterTypeOpen: false,
    filterType: data
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

  // filter rejected
  setFilterRejected: (prevState: IOwnState) => (checked: boolean) => ({
    filterNotify: checked
  }),
};

const handlerCreators: HandleCreators<ExpenseApprovalListFilterProps, IOwnHandler> = {
  // main filter
  handleFilterOnReset: (props: ExpenseApprovalListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterReset();
  },
  handleFilterOnApply: (props: ExpenseApprovalListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.onApply({
      customerUid: props.filterCustomer && props.filterCustomer.uid,
      expenseType: props.filterType && props.filterType.type,
      statusType: props.filterStatus && props.filterStatus.type,
      status: props.filterCompletion && props.filterCompletion.value,
      isNotify: props.filterNotify,
    });
  },

  // filter customer
  handleFilterCustomerVisibility: (props: ExpenseApprovalListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterCustomerVisibility();
  },
  handleFilterCustomerOnSelected: (props: ExpenseApprovalListFilterProps) => (customer: ICustomerList) => {
    props.setFilterCustomer(customer);
  },
  handleFilterCustomerOnClear: (props: ExpenseApprovalListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterCustomer();
  },
  handleFilterCustomerOnClose: (props: ExpenseApprovalListFilterProps) => () => {
    props.setFilterCustomerVisibility();
  },

  // filter type
  handleFilterTypeVisibility: (props: ExpenseApprovalListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterTypeVisibility();
  },
  handleFilterTypeOnSelected: (props: ExpenseApprovalListFilterProps) => (data: ISystemList) => {
    props.setFilterType(data);
  },
  handleFilterTypeOnClear: (props: ExpenseApprovalListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterType();
  },
  handleFilterTypeOnClose: (props: ExpenseApprovalListFilterProps) => () => {
    props.setFilterTypeVisibility();
  },
  
  // filter status
  handleFilterStatusVisibility: (props: ExpenseApprovalListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterStatusVisibility();
  },
  handleFilterStatusOnSelected: (props: ExpenseApprovalListFilterProps) => (data: ISystemList) => {
    props.setFilterStatus(data);
  },
  handleFilterStatusOnClear: (props: ExpenseApprovalListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterStatus();
  },
  handleFilterStatusOnClose: (props: ExpenseApprovalListFilterProps) => () => {
    props.setFilterStatusVisibility();
  },

  // filter completion
  handleFilterCompletionVisibility: (props: ExpenseApprovalListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterCompletionVisibility();
  },
  handleFilterCompletionOnSelected: (props: ExpenseApprovalListFilterProps) => (data: ICollectionValue) => {
    props.setFilterCompletion(data);
  },
  handleFilterCompletionOnClear: (props: ExpenseApprovalListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterCompletion();
  },
  handleFilterCompletionOnClose: (props: ExpenseApprovalListFilterProps) => () => {
    props.setFilterCompletionVisibility();
  },
  
  // filter rejected
  handleFilterRejectedOnChange: (props: ExpenseApprovalListFilterProps) => (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    props.setFilterRejected(checked);
  },
};

export const ExpenseApprovalListFilter = compose<ExpenseApprovalListFilterProps, IOwnOption>(
  setDisplayName('ExpenseApprovalListFilter'),
  withUser,
  withLayout,
  withStyles(styles),
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators)
)(ExpenseApprovalListFilterView);