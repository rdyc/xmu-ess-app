// import { ISystemList } from '@common/classes/response';
// import { ICollectionValue } from '@layout/classes/core';
// import { WithLayout, withLayout } from '@layout/hoc/withLayout';
// import { ICustomerList } from '@lookup/classes/response';
// import { WithStyles, withStyles } from '@material-ui/core';
// import { IProjectRegistrationGetAllFilter } from '@project/classes/filters/registration';
// import styles from '@styles';
// import { InjectedIntlProps, injectIntl } from 'react-intl';
// import {
//   compose,
//   HandleCreators,
//   mapper,
//   setDisplayName,
//   StateHandler,
//   StateHandlerMap,
//   StateUpdaters,
//   withHandlers,
//   withStateHandlers,
// } from 'recompose';
// import * as moment from 'moment';
// import { IMileageRequestGetAllFilter } from '@mileage/classes/filters';

// import { ILookupCompany } from '@lookup/classes';

// const getYear: number = Number(moment().format('YYYY'));

// const year: ICollectionValue = [
//   {value: getYear - 1, name: (getYear - 1).toString() },
//   {value: getYear, name: (getYear).toString() },
//   {value: getYear + 1, name: (getYear + 1).toString() },
// ];

// const month: ICollectionValue[] = moment.months().map((item, i) => [
//   {value: i + 1, name: item.toString()}
// ]);

// export type IMileageRequestListFilterResult = Pick<IMileageRequestGetAllFilter, 'month' | 'year' | 
// 'isRejected' | 'statusType'>;

// interface OwnOption {
//   isOpen: boolean;
//   initialProps?: IMileageRequestListFilterResult;
//   onClose: (event: React.MouseEvent<HTMLElement>) => void;
//   onApply: (filter: IMileageRequestListFilterResult) => void;
// }

// interface OwnState {
//   filterMonth: ICollectionValue[];

//   filterYear: ICollectionValue[]

//   // filter status
//   isFilterStatusOpen: boolean;
//   filterStatus?: ISystemList;

//   // filter rejected
//   filterRejected?: boolean;
// }

// interface OwnStateUpdater extends StateHandlerMap<OwnState> {
//   // main filter
//   setFilterReset: StateHandler<OwnState>;

//   // filter month
//   setFilterMonthVisibility: StateHandler<OwnState>;
//   setFilterMonth: StateHandler<OwnState>;

//   // filter month
//   setFilterYearVisibility: StateHandler<OwnState>;
//   setFilterYear: StateHandler<OwnState>;

//   // filter status
//   setFilterStatusVisibility: StateHandler<OwnState>;
//   setFilterStatus: StateHandler<OwnState>;

//   // filter rejected
//   setFilterRejected: StateHandler<OwnState>;
// }

// interface OwnHandler {
//   // main filter
//   handleFilterOnReset: (event: React.MouseEvent<HTMLElement>) => void;
//   handleFilterOnApply: (event: React.MouseEvent<HTMLElement>) => void;

//   // filter month
//   handleFilterMonthVisibility: (event: React.MouseEvent<HTMLElement>) => void;
//   handleFilterMonthOnSelected: (data: ICollectionValue) => void;
//   handleFilterMonthOnClear: (event: React.MouseEvent<HTMLElement>) => void;
//   handleFilterMonthOnClose: () => void;

//   // filter year
//   handleFilterYearVisibility: (event: React.MouseEvent<HTMLElement>) => void;
//   handleFilterYearOnSelected: (data: ICollectionValue) => void;
//   handleFilterYearOnClear: (event: React.MouseEvent<HTMLElement>) => void;
//   handleFilterYearOnClose: () => void;

//   // filter status
//   handleFilterStatusVisibility: (event: React.MouseEvent<HTMLElement>) => void;
//   handleFilterStatusOnSelected: (data: ISystemList) => void;
//   handleFilterStatusOnClear: (event: React.MouseEvent<HTMLElement>) => void;
//   handleFilterStatusOnClose: () => void;

//   // filter rejected
//   handleFilterRejectedOnChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
// }

// export type MileageRequestListFilterProps
//   = OwnOption
//   & OwnState
//   & OwnHandler
//   & OwnStateUpdater
//   & WithStyles<typeof styles>
//   & WithLayout
//   & InjectedIntlProps;

// const createProps: mapper<MileageRequestListFilterProps, OwnState> = (props: MileageRequestListFilterProps): OwnState => ({
//   filterMonth,
//   filterYear,
//   isFilterStatusOpen: false,

// })