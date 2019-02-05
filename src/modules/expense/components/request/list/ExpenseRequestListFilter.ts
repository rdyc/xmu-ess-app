import { ISystemList } from '@common/classes/response';
import { IExpenseRequestGetAllFilter } from '@expense/classes/filters/request';
import { ICollectionValue } from '@layout/classes/core';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { ICustomerList } from '@lookup/classes/response';
import { WithStyles, withStyles } from '@material-ui/core';
import { IProjectList } from '@project/classes/response';
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

import { ExpenseRequestListFilterView } from './ExpenseRequestListFilterView';

const completionStatus: ICollectionValue[] = [
  { value: 'pending', name: 'Pending' },
  { value: 'complete', name: 'Complete' }
];

export type IExpenseRequestListFilterResult = Pick<IExpenseRequestGetAllFilter, 'customerUid' | 'projectUid' | 'expenseType' | 'statusType' | 'status' | 'start' | 'end' | 'isRejected' >;

interface IOwnOption {
  isOpen: boolean;
  initialProps?: IExpenseRequestListFilterResult;
  onClose: (event: React.MouseEvent<HTMLElement>) => void;
  onApply: (filter: IExpenseRequestListFilterResult) => void;
}

interface IOwnState {
  completionStatus: ICollectionValue[];

  // filter customer
  isFilterCustomerOpen: boolean;
  filterCustomer?: ICustomerList;

  // filter project
  isFilterProjectOpen: boolean;
  filterProject?: IProjectList;

  // filter type
  isFilterTypeOpen: boolean;
  filterType?: ISystemList;

  // filter status
  isFilterStatusOpen: boolean;
  filterStatus?: ISystemList;

  // filter start
  isFilterStartOpen: boolean;
  filterStart?: string;

  // filter end
  isFilterEndOpen: boolean;
  filterEnd?: string;

  // filter completion
  isFilterCompletionOpen: boolean;
  filterCompletion?: ICollectionValue;

  // filter rejected
  filterRejected?: boolean;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  // main filter
  setFilterReset: StateHandler<IOwnState>;

  // filter customer
  setFilterCustomerVisibility: StateHandler<IOwnState>;
  setFilterCustomer: StateHandler<IOwnState>;

  // filter project
  setFilterProjectVisibility: StateHandler<IOwnState>;
  setFilterProject: StateHandler<IOwnState>;

  // filter type
  setFilterTypeVisibility: StateHandler<IOwnState>;
  setFilterType: StateHandler<IOwnState>;

  // filter status
  setFilterStatusVisibility: StateHandler<IOwnState>;
  setFilterStatus: StateHandler<IOwnState>;

  // filter Start
  setFilterStartVisibility: StateHandler<IOwnState>;
  setFilterStart: StateHandler<IOwnState>;

  // filter End
  setFilterEndVisibility: StateHandler<IOwnState>;
  setFilterEnd: StateHandler<IOwnState>;

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

  // filter project
  handleFilterProjectVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterProjectOnSelected: (project: IProjectList) => void;
  handleFilterProjectOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterProjectOnClose: () => void;

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

  // filter completion
  handleFilterCompletionVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterCompletionOnSelected: (data: ICollectionValue) => void;
  handleFilterCompletionOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterCompletionOnClose: () => void;

  // filter rejected
  handleFilterRejectedOnChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

export type ExpenseRequestListFilterProps 
  = IOwnOption
  & WithUser
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithStyles<typeof styles>
  & WithLayout
  & InjectedIntlProps;

const createProps: mapper<ExpenseRequestListFilterProps, IOwnState> = (props: ExpenseRequestListFilterProps): IOwnState => ({
  completionStatus,
  isFilterCustomerOpen: false,
  isFilterProjectOpen: false,
  isFilterTypeOpen: false,
  isFilterCompletionOpen: false,
  isFilterStatusOpen: false,
  isFilterStartOpen: false,
  isFilterEndOpen: false,

  // pass initial value for primitive types only, bellow is 'boolean'
  filterRejected: props.initialProps && props.initialProps.isRejected
});

const stateUpdaters: StateUpdaters<ExpenseRequestListFilterProps, IOwnState, IOwnStateUpdater> = { 
  // main filter
  setFilterReset: (prevState: IOwnState) => () => ({
    filterCustomer: undefined,
    filterType: undefined,
    filterStatus: undefined,
    filterCompletion: undefined,
    filterRejected: undefined,
    filterProject: undefined,
    filterStart: undefined,
    filterEnd: undefined,
  }),

  // filter customer
  setFilterCustomerVisibility: (prevState: IOwnState) => () => ({
    isFilterCustomerOpen: !prevState.isFilterCustomerOpen
  }),
  setFilterCustomer: (prevState: IOwnState) => (customer?: ICustomerList) => ({
    isFilterCustomerOpen: false,
    filterCustomer: customer,
    filterProjectDialog: {
      customerUids: customer && customer.uid
    }
  }),

  // filter project
  setFilterProjectVisibility: (prevState: IOwnState) => () => ({
    isFilterProjectOpen: !prevState.isFilterProjectOpen
  }),
  setFilterProject: (prevState: IOwnState) => (project?: IProjectList) => ({
    isFilterProjectOpen: false,
    filterProject: project
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
    filterRejected: checked
  }),
};

const handlerCreators: HandleCreators<ExpenseRequestListFilterProps, IOwnHandler> = {
  // main filter
  handleFilterOnReset: (props: ExpenseRequestListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterReset();
  },
  handleFilterOnApply: (props: ExpenseRequestListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.onApply({
      customerUid: props.filterCustomer && props.filterCustomer.uid,
      projectUid: props.filterProject && props.filterProject.uid,
      expenseType: props.filterType && props.filterType.type,
      statusType: props.filterStatus && props.filterStatus.type,
      status: props.filterCompletion && props.filterCompletion.value,
      start: props.filterStart,
      end: props.filterEnd,
      isRejected: props.filterRejected,
    });
  },

  // filter customer
  handleFilterCustomerVisibility: (props: ExpenseRequestListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterCustomerVisibility();
  },
  handleFilterCustomerOnSelected: (props: ExpenseRequestListFilterProps) => (customer: ICustomerList) => {
    props.setFilterCustomer(customer);
    props.setFilterProject();
  },
  handleFilterCustomerOnClear: (props: ExpenseRequestListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterCustomer();
    props.setFilterProject();
  },
  handleFilterCustomerOnClose: (props: ExpenseRequestListFilterProps) => () => {
    props.setFilterCustomerVisibility();
  },

  // filter project
  handleFilterProjectVisibility: (props: ExpenseRequestListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterProjectVisibility();
  },
  handleFilterProjectOnSelected: (props: ExpenseRequestListFilterProps) => (project: IProjectList) => {
    props.setFilterProject(project);
  },
  handleFilterProjectOnClear: (props: ExpenseRequestListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterProject();
  },
  handleFilterProjectOnClose: (props: ExpenseRequestListFilterProps) => () => {
    props.setFilterProjectVisibility();
  },

  // filter type
  handleFilterTypeVisibility: (props: ExpenseRequestListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterTypeVisibility();
  },
  handleFilterTypeOnSelected: (props: ExpenseRequestListFilterProps) => (data: ISystemList) => {
    props.setFilterType(data);
  },
  handleFilterTypeOnClear: (props: ExpenseRequestListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterType();
  },
  handleFilterTypeOnClose: (props: ExpenseRequestListFilterProps) => () => {
    props.setFilterTypeVisibility();
  },
  
  // filter status
  handleFilterStatusVisibility: (props: ExpenseRequestListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterStatusVisibility();
  },
  handleFilterStatusOnSelected: (props: ExpenseRequestListFilterProps) => (data: ISystemList) => {
    props.setFilterStatus(data);
  },
  handleFilterStatusOnClear: (props: ExpenseRequestListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterStatus();
  },
  handleFilterStatusOnClose: (props: ExpenseRequestListFilterProps) => () => {
    props.setFilterStatusVisibility();
  },

  // filter Start
  handleFilterStartVisibility: (props: ExpenseRequestListFilterProps) => () => {
    props.setFilterStartVisibility();
  },
  handleFilterStartOnSelected: (props: ExpenseRequestListFilterProps) => (
    data: string
  ) => {
    props.setFilterStart(data);
  },
  handleFilterStartOnClear: (props: ExpenseRequestListFilterProps) => () => {
    props.setFilterStart(props.start);
  },
  handleFilterStartOnClose: (props: ExpenseRequestListFilterProps) => () => {
    props.setFilterStartVisibility();
  },

  // filter End
  handleFilterEndVisibility: (props: ExpenseRequestListFilterProps) => (
    event: React.MouseEvent<HTMLElement>
  ) => {
    props.setFilterEndVisibility();
  },
  handleFilterEndOnSelected: (props: ExpenseRequestListFilterProps) => (
    data: string
  ) => {
    props.setFilterEnd(data);
  },
  handleFilterEndOnClear: (props: ExpenseRequestListFilterProps) => (
    event: React.MouseEvent<HTMLElement>
  ) => {
    props.setFilterEnd(props.end);
  },
  handleFilterEndOnClose: (props: ExpenseRequestListFilterProps) => () => {
    props.setFilterEndVisibility();
  },

  // filter completion
  handleFilterCompletionVisibility: (props: ExpenseRequestListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterCompletionVisibility();
  },
  handleFilterCompletionOnSelected: (props: ExpenseRequestListFilterProps) => (data: ICollectionValue) => {
    props.setFilterCompletion(data);
  },
  handleFilterCompletionOnClear: (props: ExpenseRequestListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterCompletion();
  },
  handleFilterCompletionOnClose: (props: ExpenseRequestListFilterProps) => () => {
    props.setFilterCompletionVisibility();
  },
  
  // filter rejected
  handleFilterRejectedOnChange: (props: ExpenseRequestListFilterProps) => (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    props.setFilterRejected(checked);
  },
};

export const ExpenseRequestListFilter = compose<ExpenseRequestListFilterProps, IOwnOption>(
  setDisplayName('ExpenseRequestListFilter'),
  withUser,
  withLayout,
  withStyles(styles),
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators)
)(ExpenseRequestListFilterView);