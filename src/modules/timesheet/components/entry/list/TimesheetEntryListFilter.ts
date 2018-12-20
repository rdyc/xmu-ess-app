// import { ISystemList } from '@common/classes/response';
// import { ICollectionValue } from '@layout/classes/core';
// import { WithLayout, withLayout } from '@layout/hoc/withLayout';
// import { ICustomerList } from '@lookup/classes/response';
// import { WithStyles, withStyles } from '@material-ui/core';
// import styles from '@styles';
// import { ITimesheetGetAllFilter } from '@timesheet/classes/filters';
// import { InjectedIntlProps, injectIntl } from 'react-intl';
// import { compose, HandleCreators, mapper, setDisplayName, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';

// const completionStatus: ICollectionValue[] = [
//   { value: 'pending', name: 'Pending' },
//   { value: 'complete', name: 'Complete' }
// ];

// export type ITimesheetEntryListFilterResult = Pick<ITimesheetGetAllFilter, 'customerUid' | 'projectUid' | 'companyUid' | 'statusType' | 'status' | 'isRejected'>;

// interface IOwnOption {
//   isOpen: boolean;
//   initialProps?: ITimesheetEntryListFilterResult;
//   onClose: (event: React.MouseEvent<HTMLElement>) => void;
//   onApply: (filter: ITimesheetEntryListFilterResult) => void;
// }

// interface IOwnState {
//   completionStatus: ICollectionValue[];

//   // filter customer
//   isFilterCustomerOpen: boolean;
//   filterCustomer?: ICustomerList;

//   // filter status
//   isFilterStatusOpen: boolean;
//   filterStatus?: ISystemList;

//   // filter completion
//   isFilterCompletionOpen: boolean;
//   filterCompletion?: ICollectionValue;

//   // filter rejected
//   filterRejected?: boolean;
// }

// interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
//   // main filter
//   setFilterReset: StateHandler<IOwnState>;

//   // filter customer
//   setFilterCustomerVisibility: StateHandler<IOwnState>;
//   setFilterCustomer: StateHandler<IOwnState>;

//   // filter status
//   setFilterStatusVisibility: StateHandler<IOwnState>;
//   setFilterStatus: StateHandler<IOwnState>;

//   // filter completion
//   setFilterCompletionVisibility: StateHandler<IOwnState>;
//   setFilterCompletion: StateHandler<IOwnState>;

//   // filter rejected
//   setFilterRejected: StateHandler<IOwnState>;
// }

// interface IOwnHandler {
//   // main filter
//   handleFilterOnReset: (event: React.MouseEvent<HTMLElement>) => void;
//   handleFilterOnApply: (event: React.MouseEvent<HTMLElement>) => void;

//   // filter customer
//   handleFilterCustomerVisibility: (event: React.MouseEvent<HTMLElement>) => void;
//   handleFilterCustomerOnSelected: (customer: ICustomerList) => void;
//   handleFilterCustomerOnClear: (event: React.MouseEvent<HTMLElement>) => void;
//   handleFilterCustomerOnClose: () => void;

//   // filter status
//   handleFilterStatusVisibility: (event: React.MouseEvent<HTMLElement>) => void;
//   handleFilterStatusOnSelected: (data: ISystemList) => void;
//   handleFilterStatusOnClear: (event: React.MouseEvent<HTMLElement>) => void;
//   handleFilterStatusOnClose: () => void;

//   // filter completion
//   handleFilterCompletionVisibility: (event: React.MouseEvent<HTMLElement>) => void;
//   handleFilterCompletionOnSelected: (data: ICollectionValue) => void;
//   handleFilterCompletionOnClear: (event: React.MouseEvent<HTMLElement>) => void;
//   handleFilterCompletionOnClose: () => void;

//   // filter rejected
//   handleFilterRejectedOnChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
// }

// export type TimesheetEntryListFilterProps
//   = IOwnOption
//   & IOwnState
//   & IOwnStateUpdater
//   & IOwnHandler
//   & WithStyles<typeof styles>
//   & WithLayout
//   & InjectedIntlProps;

// const createProps: mapper<TimesheetEntryListFilterProps, IOwnState> = (props: TimesheetEntryListFilterProps): IOwnState => ({
//   completionStatus,
//   isFilterCustomerOpen: false,
//   isFilterCompletionOpen: false,
//   isFilterStatusOpen: false,

//   // pass initial value for primitive types only, bellow is 'boolean'
//   filterRejected: props.initialProps && props.initialProps.isRejected,
// });

// const stateUpdaters: StateUpdaters<TimesheetEntryListFilterProps, IOwnState, IOwnStateUpdater> = { 
//   // main filter
//   setFilterReset: (prevState: IOwnState) => () => ({
//     filterCustomer: undefined,
//     filterStatus: undefined,
//     filterCompletion: undefined,
//     filterRejected: undefined
//   }),

//   // filter customer
//   setFilterCustomerVisibility: (prevState: IOwnState) => () => ({
//     isFilterCustomerOpen: !prevState.isFilterCustomerOpen
//   }),
//   setFilterCustomer: (prevState: IOwnState) => (customer?: ICustomerList) => ({
//     isFilterCustomerOpen: false,
//     filterCustomer: customer
//   }),

//   // filter status
//   setFilterStatusVisibility: (prevState: IOwnState) => () => ({
//     isFilterStatusOpen: !prevState.isFilterStatusOpen
//   }),
//   setFilterStatus: (prevState: IOwnState) => (data?: ISystemList) => ({
//     isFilterStatusOpen: false,
//     filterStatus: data
//   }),

//   // filter completion
//   setFilterCompletionVisibility: (prevState: IOwnState) => () => ({
//     isFilterCompletionOpen: !prevState.isFilterCompletionOpen
//   }),
//   setFilterCompletion: (prevState: IOwnState) => (data?: ICollectionValue) => ({
//     isFilterCompletionOpen: false,
//     filterCompletion: data
//   }),

//   // filter rejected
//   setFilterRejected: (prevState: IOwnState) => (checked: boolean) => ({
//     filterRejected: checked
//   }),
// };

// const handlerCreators: HandleCreators<TimesheetEntryListFilterProps, IOwnHandler> = {
//   // main filter
//   handleFilterOnReset: (props: TimesheetEntryListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
//     props.setFilterReset();
//   },
//   handleFilterOnApply: (props: TimesheetEntryListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
//     props.onApply({
//       customerUid: props.filterCustomer && props.filterCustomer.uid,
//       statusType: props.filterStatus && props.filterStatus.type,
//       status: props.filterCompletion && props.filterCompletion.value,
//       isRejected: props.filterRejected,
//     });
//   },

//   // filter customer
//   handleFilterCustomerVisibility: (props: TimesheetEntryListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
//     props.setFilterCustomerVisibility();
//   },
//   handleFilterCustomerOnSelected: (props: TimesheetEntryListFilterProps) => (customer: ICustomerList) => {
//     props.setFilterCustomer(customer);
//   },
//   handleFilterCustomerOnClear: (props: TimesheetEntryListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
//     props.setFilterCustomer();
//   },
//   handleFilterCustomerOnClose: (props: TimesheetEntryListFilterProps) => () => {
//     props.setFilterCustomerVisibility();
//   },
  
//   // filter status
//   handleFilterStatusVisibility: (props: TimesheetEntryListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
//     props.setFilterStatusVisibility();
//   },
//   handleFilterStatusOnSelected: (props: TimesheetEntryListFilterProps) => (data: ISystemList) => {
//     props.setFilterStatus(data);
//   },
//   handleFilterStatusOnClear: (props: TimesheetEntryListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
//     props.setFilterStatus();
//   },
//   handleFilterStatusOnClose: (props: TimesheetEntryListFilterProps) => () => {
//     props.setFilterStatusVisibility();
//   },

//   // filter completion
//   handleFilterCompletionVisibility: (props: TimesheetEntryListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
//     props.setFilterCompletionVisibility();
//   },
//   handleFilterCompletionOnSelected: (props: TimesheetEntryListFilterProps) => (data: ICollectionValue) => {
//     props.setFilterCompletion(data);
//   },
//   handleFilterCompletionOnClear: (props: TimesheetEntryListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
//     props.setFilterCompletion();
//   },
//   handleFilterCompletionOnClose: (props: TimesheetEntryListFilterProps) => () => {
//     props.setFilterCompletionVisibility();
//   },
  
//   // filter rejected
//   handleFilterRejectedOnChange: (props: TimesheetEntryListFilterProps) => (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
//     props.setFilterRejected(checked);
//   }
// };

// export const TimesheetEntryListFilter = compose<TimesheetEntryListFilterProps, IOwnOption>(
//   setDisplayName('TimesheetEntryListFilter'),
//   withLayout,
//   withStyles(styles),
//   injectIntl,
//   withStateHandlers(createProps, stateUpdaters),
//   withHandlers(handlerCreators)
// )(TimesheetEntryListFilterView);
